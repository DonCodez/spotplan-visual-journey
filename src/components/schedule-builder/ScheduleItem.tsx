
import React from 'react';
import { X, Star, MapPin, Clock } from 'lucide-react';
import { PlaceData } from '@/contexts/DragDropContext';

interface ScheduleItemProps {
  item: PlaceData;
  onRemove: () => void;
  startTime: string;
}

const ScheduleItem = ({ item, onRemove, startTime }: ScheduleItemProps) => {
  return (
    <div className="scheduled-item bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <img
            src={item.image}
            alt={item.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm truncate">
              {item.title}
            </h4>
            <div className="flex items-center space-x-1 mt-1">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">{startTime}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">{item.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{item.distance}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
