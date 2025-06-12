
import React, { useState, useRef, useCallback } from 'react';
import Moveable from 'moveable';
import { useDraggable } from '@dnd-kit/core';
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
}

const PIXELS_PER_MINUTE = 2;
const SNAP_INTERVAL_MINUTES = 30;
const MIN_DURATION_MINUTES = 30;
const MAX_DURATION_MINUTES = 480; // 8 hours

const ResizableActivityBlock = ({
  item,
  startTime,
  endTime,
  date,
  slotId,
  onResize,
  onRemove,
}: ResizableActivityBlockProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [previewEndTime, setPreviewEndTime] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const duration = calculateDuration(startTime, endTime);
  const height = Math.max(MIN_DURATION_MINUTES * PIXELS_PER_MINUTE, duration * PIXELS_PER_MINUTE);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `activity-${date}-${slotId}`,
    data: {
      item,
      startTime,
      endTime,
      date,
      slotId,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const calculateNewEndTime = useCallback((newHeight: number): string => {
    const constrainedHeight = Math.max(
      MIN_DURATION_MINUTES * PIXELS_PER_MINUTE,
      Math.min(MAX_DURATION_MINUTES * PIXELS_PER_MINUTE, newHeight)
    );
    
    // Snap to 30-minute intervals
    const snappedMinutes = Math.round((constrainedHeight / PIXELS_PER_MINUTE) / SNAP_INTERVAL_MINUTES) * SNAP_INTERVAL_MINUTES;
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + snappedMinutes;
    
    const newEndHours = Math.floor(endMinutes / 60);
    const newEndMins = endMinutes % 60;
    
    // Ensure we don't go past midnight
    if (newEndHours >= 24) {
      return '23:59';
    }
    
    return `${newEndHours.toString().padStart(2, '0')}:${newEndMins.toString().padStart(2, '0')}`;
  }, [startTime]);

  const handleResizeStart = useCallback(() => {
    setIsResizing(true);
    setPreviewEndTime(null);
  }, []);

  const handleResize = useCallback((e: any) => {
    const newHeight = e.height;
    const newEndTime = calculateNewEndTime(newHeight);
    setPreviewEndTime(newEndTime);
  }, [calculateNewEndTime]);

  const handleResizeEnd = useCallback((e: any) => {
    setIsResizing(false);
    
    if (previewEndTime) {
      onResize(startTime, previewEndTime);
    }
    setPreviewEndTime(null);
  }, [previewEndTime, startTime, onResize]);

  const displayEndTime = previewEndTime || endTime;
  const displayHeight = previewEndTime ? 
    calculateDuration(startTime, previewEndTime) * PIXELS_PER_MINUTE : 
    height;

  return (
    <>
      <div
        ref={(node) => {
          setNodeRef(node);
          if (targetRef.current !== node) {
            targetRef.current = node;
          }
        }}
        className={cn(
          "relative bg-white rounded-lg border-2 transition-all duration-200",
          isDragging ? "border-spot-primary/60 shadow-lg opacity-80 rotate-1" : "border-spot-primary shadow-sm",
          isResizing && "border-spot-primary/80 shadow-md ring-2 ring-spot-primary/20",
        )}
        style={{ 
          ...style,
          height: `${displayHeight}px`,
          minHeight: `${MIN_DURATION_MINUTES * PIXELS_PER_MINUTE}px`,
        }}
      >
        {/* Draggable Content Area */}
        <div
          className={cn(
            "cursor-move relative z-10 h-full rounded-lg",
            "hover:bg-gray-50/50 transition-colors duration-200"
          )}
          style={{ 
            paddingBottom: '12px' // Space for resize area
          }}
          {...listeners}
          {...attributes}
        >
          <div className="p-3 h-full flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <GripVertical className="h-3 w-3 text-gray-400 flex-shrink-0" />
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
                isResizing && "text-spot-primary font-medium"
              )}>
                {formatTimeRange(startTime, displayEndTime)}
              </span>
            </div>
            
            {item.rating && (
              <p className="text-xs text-gray-500 mt-1">
                ⭐ {item.rating}
              </p>
            )}
            
            {displayHeight > 120 && (
              <div className="mt-2 text-xs text-gray-400">
                Duration: {Math.round(calculateDuration(startTime, displayEndTime) / 60 * 10) / 10}h
              </div>
            )}
          </div>
        </div>

        {/* Resize handle area */}
        <div className="absolute bottom-0 left-0 right-0 h-3 cursor-ns-resize bg-transparent hover:bg-gray-200/70 transition-colors" />
      </div>

      {/* Moveable component for resizing */}
      <Moveable
        target={targetRef.current}
        resizable={true}
        throttleResize={0}
        renderDirections={['s']}
        edge={false}
        zoom={1}
        origin={false}
        padding={{ bottom: 0 }}
        onResizeStart={handleResizeStart}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
        snappable={true}
        snapThreshold={5}
        verticalGuidelines={[]}
        horizontalGuidelines={[]}
        snapGridWidth={SNAP_INTERVAL_MINUTES * PIXELS_PER_MINUTE}
        snapGridHeight={SNAP_INTERVAL_MINUTES * PIXELS_PER_MINUTE}
        isDisplaySnapDigit={false}
        isDisplayInnerSnapDigit={false}
        keepRatio={false}
        throttleDrag={0}
        minHeight={MIN_DURATION_MINUTES * PIXELS_PER_MINUTE}
        maxHeight={MAX_DURATION_MINUTES * PIXELS_PER_MINUTE}
      />

      {/* Preview tooltip during resize */}
      {isResizing && previewEndTime && (
        <div className="fixed z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
             style={{
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)'
             }}>
          {formatTimeRange(startTime, previewEndTime)}
        </div>
      )}
    </>
  );
};

export default ResizableActivityBlock;
