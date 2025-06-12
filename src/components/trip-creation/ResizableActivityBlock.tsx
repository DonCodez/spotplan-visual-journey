
import React, { useState, useRef, useCallback } from 'react';
import { Resizable } from 'react-resizable';
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

const PIXELS_PER_MINUTE = 2; // 2px = 1 minute for better granularity
const SNAP_INTERVAL_MINUTES = 30; // 30-minute snapping
const SNAP_INTERVAL_PIXELS = SNAP_INTERVAL_MINUTES * PIXELS_PER_MINUTE; // 60px
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
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

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

  const snapToGrid = useCallback((value: number): number => {
    return Math.round(value / SNAP_INTERVAL_PIXELS) * SNAP_INTERVAL_PIXELS;
  }, []);

  const calculateNewEndTime = useCallback((newHeight: number): string => {
    const snappedHeight = snapToGrid(newHeight);
    const constrainedHeight = Math.max(
      MIN_DURATION_MINUTES * PIXELS_PER_MINUTE,
      Math.min(MAX_DURATION_MINUTES * PIXELS_PER_MINUTE, snappedHeight)
    );
    
    const newDurationMinutes = constrainedHeight / PIXELS_PER_MINUTE;
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + newDurationMinutes;
    
    const newEndHours = Math.floor(endMinutes / 60);
    const newEndMins = endMinutes % 60;
    
    // Ensure we don't go past midnight
    if (newEndHours >= 24) {
      return '23:59';
    }
    
    return `${newEndHours.toString().padStart(2, '0')}:${newEndMins.toString().padStart(2, '0')}`;
  }, [startTime, snapToGrid]);

  const handleResize = useCallback((event: any, { size }: { size: { height: number } }) => {
    const newEndTime = calculateNewEndTime(size.height);
    setPreviewEndTime(newEndTime);

    // Debounce the actual resize callback
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
  }, [calculateNewEndTime]);

  const handleResizeStart = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setPreviewEndTime(null);
  }, []);

  const handleResizeStop = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsResizing(false);
    
    if (previewEndTime) {
      onResize(startTime, previewEndTime);
    }
    setPreviewEndTime(null);
  }, [previewEndTime, startTime, onResize]);

  const handleResizeHandleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleResizeHandlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
  }, []);

  const displayEndTime = previewEndTime || endTime;
  const displayHeight = previewEndTime ? 
    calculateDuration(startTime, previewEndTime) * PIXELS_PER_MINUTE : 
    height;

  return (
    <Resizable
      height={displayHeight}
      width={0}
      onResize={handleResize}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      resizeHandles={['s']}
      minConstraints={[0, MIN_DURATION_MINUTES * PIXELS_PER_MINUTE]}
      maxConstraints={[0, MAX_DURATION_MINUTES * PIXELS_PER_MINUTE]}
      handle={
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-6 cursor-ns-resize flex items-center justify-center z-30",
            "bg-transparent hover:bg-gray-200/70 transition-colors group",
            "border-t-2 border-transparent hover:border-spot-primary/30"
          )}
          onMouseDown={handleResizeHandleMouseDown}
          onPointerDown={handleResizeHandlePointerDown}
          style={{ pointerEvents: 'auto' }}
        >
          <div className={cn(
            "w-16 h-1.5 bg-gray-400 rounded-full transition-all duration-200",
            "group-hover:bg-spot-primary group-hover:h-2 shadow-sm"
          )} />
          {isResizing && previewEndTime && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg">
              {formatTimeRange(startTime, previewEndTime)}
            </div>
          )}
        </div>
      }
    >
      <div
        className={cn(
          "relative bg-white rounded-lg border-2 transition-all duration-200",
          isDragging ? "border-spot-primary/60 shadow-lg opacity-80 rotate-1" : "border-spot-primary shadow-sm",
          isResizing && "border-spot-primary/80 shadow-md ring-2 ring-spot-primary/20",
        )}
        style={{ 
          ...style,
          height: `${displayHeight}px`,
          minHeight: `${MIN_DURATION_MINUTES * PIXELS_PER_MINUTE}px`,
          pointerEvents: 'none'
        }}
      >
        {/* Draggable Content Area - excluding bottom resize zone */}
        <div
          ref={setNodeRef}
          className={cn(
            "cursor-move relative z-10 h-full rounded-lg",
            "hover:bg-gray-50/50 transition-colors duration-200"
          )}
          style={{ 
            pointerEvents: 'auto',
            paddingBottom: '24px' // Space for resize handle
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
                style={{ pointerEvents: 'auto' }}
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
      </div>
    </Resizable>
  );
};

export default ResizableActivityBlock;
