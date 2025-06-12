
import React, { useState } from 'react';
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
  const duration = calculateDuration(startTime, endTime);
  const height = Math.max(60, duration); // 1px per minute, minimum 60px

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

  const handleResize = (event: any, { size }: { size: { height: number } }) => {
    // Snap to 30-minute intervals (30px = 30 minutes)
    const snappedHeight = Math.max(60, Math.round(size.height / 30) * 30);
    const newDuration = snappedHeight; // 1px = 1 minute
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + newDuration;
    
    const newEndHours = Math.floor(endMinutes / 60);
    const newEndMins = endMinutes % 60;
    const newEndTime = `${newEndHours.toString().padStart(2, '0')}:${newEndMins.toString().padStart(2, '0')}`;
    
    onResize(startTime, newEndTime);
  };

  const handleResizeStart = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleResizeStop = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsResizing(false);
  };

  const handleResizeHandleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleResizeHandlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <Resizable
      height={height}
      width={0}
      onResize={handleResize}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      resizeHandles={['s']}
      minConstraints={[0, 60]}
      maxConstraints={[0, 480]}
      handle={
        <div
          className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize flex items-center justify-center z-20 bg-transparent hover:bg-gray-200/70 transition-colors group"
          onMouseDown={handleResizeHandleMouseDown}
          onPointerDown={handleResizeHandlePointerDown}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="w-12 h-2 bg-gray-400 rounded-full group-hover:bg-gray-600 transition-colors shadow-sm" />
        </div>
      }
    >
      <div
        className={cn(
          "relative bg-white rounded-lg border-2 border-spot-primary shadow-sm transition-all duration-200 pointer-events-none",
          isDragging && "opacity-50 rotate-2 shadow-lg",
          isResizing && "border-spot-primary/60 shadow-md",
        )}
        style={{ 
          ...style,
          height: `${height}px`,
          minHeight: '60px'
        }}
      >
        {/* Draggable Content Area - excluding bottom resize zone */}
        <div
          ref={setNodeRef}
          className="cursor-move relative z-10 h-full"
          style={{ 
            pointerEvents: 'auto',
            paddingBottom: '16px' // Space for resize handle
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
                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
                style={{ pointerEvents: 'auto' }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formatTimeRange(startTime, endTime)}</span>
            </div>
            
            {item.rating && (
              <p className="text-xs text-gray-500 mt-1">
                ⭐ {item.rating}
              </p>
            )}
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default ResizableActivityBlock;
