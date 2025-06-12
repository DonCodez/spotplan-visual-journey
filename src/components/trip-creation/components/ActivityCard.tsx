
import React from 'react';
import { MapPin, X, Clock, GripVertical } from 'lucide-react';
import { ScheduleItem } from '@/types/schedule';
import { formatTimeRange, calculateDuration } from '@/utils/timeUtils';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  item: ScheduleItem;
  startTime: string;
  endTime: string;
  isMoving: boolean;
  isResizing: boolean;
  height: number;
  onRemove: () => void;
}

const MIN_DURATION_MINUTES = 30;
const PIXELS_PER_MINUTE = 2;

const ActivityCard = ({
  item,
  startTime,
  endTime,
  isMoving,
  isResizing,
  height,
  onRemove
}: ActivityCardProps) => {
  return (
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
          {formatTimeRange(startTime, endTime)}
        </span>
      </div>
      
      {item.rating && (
        <p className="text-xs text-gray-500 mt-1">
          ⭐ {item.rating}
        </p>
      )}
      
      {height > 120 && (
        <div className="mt-2 text-xs text-gray-400">
          Duration: {Math.round(calculateDuration(startTime, endTime) / 60 * 10) / 10}h
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
