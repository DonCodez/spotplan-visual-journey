
import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import { useDraggable } from '@dnd-kit/core';
import { MapPin, X, Clock, GripVertical } from 'lucide-react';
import { ScheduleItem } from '@/types/schedule';
import { formatTimeRange, calculateDuration } from '@/utils/timeUtils';
import { cn } from '@/lib/utils';
import 'react-resizable/css/styles.css';

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
  const height = Math.max(60, duration * 1.5); // 1.5px per minute, minimum 60px

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
    disabled: isResizing, // Disable dragging while resizing
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleResize = (event: any, { size }: { size: { height: number } }) => {
    // Convert height back to duration (minimum 15 minutes, snap to 15-minute intervals)
    const newDuration = Math.max(15, Math.round((size.height / 1.5) / 15) * 15);
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + newDuration;
    
    const newEndHours = Math.floor(endMinutes / 60);
    const newEndMins = endMinutes % 60;
    const newEndTime = `${newEndHours.toString().padStart(2, '0')}:${newEndMins.toString().padStart(2, '0')}`;
    
    onResize(startTime, newEndTime);
  };

  const getItemIcon = () => {
    switch (item.type) {
      case 'restaurant':
        return '🍽️';
      case 'hotel':
        return '🏨';
      default:
        return <MapPin className="h-3 w-3 text-spot-primary flex-shrink-0" />;
    }
  };

  const getItemBgColor = () => {
    switch (item.type) {
      case 'restaurant':
        return 'bg-orange-50 border-orange-200';
      case 'hotel':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-spot-primary';
    }
  };

  return (
    <Resizable
      height={height}
      width={0}
      onResize={handleResize}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={() => setIsResizing(false)}
      resizeHandles={['s']}
      minConstraints={[0, 60]}
      maxConstraints={[0, 480]}
    >
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "relative rounded-lg border-2 shadow-sm transition-all duration-200",
          getItemBgColor(),
          isDragging && "opacity-50 rotate-2 shadow-lg z-50",
          isResizing && "border-spot-primary/60 shadow-md"
        )}
      >
        {/* Drag handle area */}
        <div
          className="p-3 h-full flex flex-col cursor-move"
          {...listeners}
          {...attributes}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {typeof getItemIcon() === 'string' ? (
                <span className="text-sm">{getItemIcon()}</span>
              ) : (
                getItemIcon()
              )}
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </h4>
            </div>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2 z-10"
              style={{ pointerEvents: 'auto' }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="h-3 w-3" />
            <span>{formatTimeRange(startTime, endTime)}</span>
            <span className="text-gray-400">({duration} min)</span>
          </div>
          
          {item.rating && (
            <p className="text-xs text-gray-500 mt-1">
              ⭐ {item.rating}
            </p>
          )}
        </div>
        
        {/* Resize handle */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-3 cursor-ns-resize flex items-center justify-center bg-gradient-to-t from-gray-100 to-transparent rounded-b-lg"
          style={{ pointerEvents: 'auto' }}
        >
          <GripVertical className="w-4 h-2 text-gray-400" />
        </div>
      </div>
    </Resizable>
  );
};

export default ResizableActivityBlock;
