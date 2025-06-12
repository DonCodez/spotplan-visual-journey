
import React, { useState, useRef, useCallback } from 'react';
import Moveable from 'react-moveable';
import { MapPin, X, Clock, GripVertical } from 'lucide-react';
import { ScheduleItem } from '@/types/schedule';
import { formatTimeRange, calculateDuration } from '@/utils/timeUtils';
import { cn } from '@/lib/utils';

interface ResizableActivityBlockProps {
  item: ScheduleItem;
  startTime: string;
  endTime: string;
  date: string;
  slotId: string;
  onResize: (newStartTime: string, newEndTime: string) => void;
  onRemove: () => void;
  onDrag?: (newStartTime: string) => void;
}

const PIXELS_PER_MINUTE = 2;
const SNAP_INTERVAL_MINUTES = 30;
const SNAP_INTERVAL_PIXELS = SNAP_INTERVAL_MINUTES * PIXELS_PER_MINUTE;
const MIN_DURATION_MINUTES = 30;
const MAX_DURATION_MINUTES = 480;

const ResizableActivityBlock = ({
  item,
  startTime,
  endTime,
  date,
  slotId,
  onResize,
  onRemove,
  onDrag,
}: ResizableActivityBlockProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [previewEndTime, setPreviewEndTime] = useState<string | null>(null);
  const [previewStartTime, setPreviewStartTime] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const duration = calculateDuration(startTime, endTime);
  const height = Math.max(MIN_DURATION_MINUTES * PIXELS_PER_MINUTE, duration * PIXELS_PER_MINUTE);

  const calculateNewEndTime = useCallback((newHeight: number): string => {
    const constrainedHeight = Math.max(
      MIN_DURATION_MINUTES * PIXELS_PER_MINUTE,
      Math.min(MAX_DURATION_MINUTES * PIXELS_PER_MINUTE, newHeight)
    );
    
    const newDurationMinutes = constrainedHeight / PIXELS_PER_MINUTE;
    const [hours, minutes] = startTime.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      console.warn('Invalid startTime:', startTime);
      return '23:59';
    }
    
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + newDurationMinutes;
    
    const newEndHours = Math.floor(endMinutes / 60);
    const newEndMins = Math.round(endMinutes % 60);
    
    if (newEndHours >= 24) {
      return '23:59';
    }
    
    const constrainedHours = Math.min(23, Math.max(0, newEndHours));
    const constrainedMinutes = Math.min(59, Math.max(0, newEndMins));
    
    return `${constrainedHours.toString().padStart(2, '0')}:${constrainedMinutes.toString().padStart(2, '0')}`;
  }, [startTime]);

  const calculateNewStartTime = useCallback((yPosition: number): string => {
    const startHour = 6;
    const totalMinutes = Math.max(0, Math.round(yPosition / PIXELS_PER_MINUTE));
    const hours = Math.floor(totalMinutes / 60) + startHour;
    const minutes = totalMinutes % 60;
    
    const constrainedHours = Math.min(23, Math.max(startHour, hours));
    const constrainedMinutes = constrainedHours === 23 && minutes > 59 ? 59 : Math.max(0, Math.round(minutes));
    
    return `${constrainedHours.toString().padStart(2, '0')}:${constrainedMinutes.toString().padStart(2, '0')}`;
  }, []);

  const handleDrag = useCallback(({ transform }: any) => {
    const yPosition = Math.max(0, transform[1]);
    const snappedY = Math.round(yPosition / SNAP_INTERVAL_PIXELS) * SNAP_INTERVAL_PIXELS;
    const newStartTime = calculateNewStartTime(snappedY);
    setPreviewStartTime(newStartTime);
    
    if (targetRef.current) {
      targetRef.current.style.transform = `translateY(${snappedY}px)`;
    }
  }, [calculateNewStartTime]);

  const handleDragEnd = useCallback(() => {
    setIsMoving(false);
    if (previewStartTime && onDrag) {
      onDrag(previewStartTime);
    }
    setPreviewStartTime(null);
    
    if (targetRef.current) {
      targetRef.current.style.transform = '';
    }
  }, [previewStartTime, onDrag]);

  const handleResize = useCallback(({ width, height: newHeight }: any) => {
    const snappedHeight = Math.round(newHeight / SNAP_INTERVAL_PIXELS) * SNAP_INTERVAL_PIXELS;
    const newEndTime = calculateNewEndTime(snappedHeight);
    setPreviewEndTime(newEndTime);
    
    if (targetRef.current) {
      targetRef.current.style.height = `${snappedHeight}px`;
    }
  }, [calculateNewEndTime]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    if (previewEndTime) {
      onResize(startTime, previewEndTime);
    }
    setPreviewEndTime(null);
    
    if (targetRef.current) {
      targetRef.current.style.height = '';
    }
  }, [previewEndTime, startTime, onResize]);

  const displayEndTime = previewEndTime && previewEndTime !== 'Invalid Date' ? previewEndTime : endTime;
  const displayStartTime = previewStartTime && previewStartTime !== 'Invalid Date' ? previewStartTime : startTime;

  return (
    <div className="relative">
      <div
        ref={targetRef}
        className={cn(
          "relative bg-white rounded-lg border-2 transition-all duration-200 group",
          (isMoving || isResizing) ? "border-spot-primary/60 shadow-lg opacity-80" : "border-spot-primary shadow-sm hover:shadow-md",
        )}
        style={{ 
          height: `${height}px`,
          minHeight: `${MIN_DURATION_MINUTES * PIXELS_PER_MINUTE}px`,
        }}
      >
        {/* Main card content - draggable area */}
        <div className="p-3 h-full flex flex-col cursor-move group-hover:bg-gray-50/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <GripVertical className="h-3 w-3 text-gray-400 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
              <MapPin className="h-3 w-3 text-spot-primary flex-shrink-0" />
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </h4>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2 p-0.5 rounded hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span className={cn(
              "transition-colors duration-200",
              (isMoving || isResizing) && "text-spot-primary font-medium"
            )}>
              {formatTimeRange(displayStartTime, displayEndTime)}
            </span>
          </div>
          
          {item.rating && (
            <p className="text-xs text-gray-500 mt-1">
              ⭐ {item.rating}
            </p>
          )}
          
          {height > 120 && (
            <div className="mt-2 text-xs text-gray-400">
              Duration: {Math.round(calculateDuration(displayStartTime, displayEndTime) / 60 * 10) / 10}h
            </div>
          )}
        </div>

        {/* Resize handle at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-gradient-to-t from-spot-primary/20 to-transparent hover:from-spot-primary/40 transition-colors rounded-b-lg flex items-center justify-center group/resize">
          <div className="w-8 h-0.5 bg-spot-primary rounded-full opacity-60 group-hover/resize:opacity-100 transition-opacity" />
        </div>
      </div>

      <Moveable
        target={targetRef}
        draggable={true}
        resizable={true}
        keepRatio={false}
        throttleDrag={0}
        throttleResize={0}
        origin={false}
        edge={false}
        zoom={1}
        bounds={{ left: 0, top: 0, right: 0, bottom: 2000 }}
        snappable={true}
        snapThreshold={5}
        snapGridWidth={SNAP_INTERVAL_PIXELS}
        snapGridHeight={SNAP_INTERVAL_PIXELS}
        renderDirections={['s']}
        resizeFormat={(size: number[]) => size}
        dragArea={true}
        onDragStart={() => setIsMoving(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onResizeStart={() => setIsResizing(true)}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
      />
      
      {(isMoving || isResizing) && (previewEndTime || previewStartTime) && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded shadow-lg z-50 whitespace-nowrap">
          {isMoving ? 'Moving to: ' : 'Resizing to: '}
          {formatTimeRange(displayStartTime, displayEndTime)}
        </div>
      )}
    </div>
  );
};

export default ResizableActivityBlock;
