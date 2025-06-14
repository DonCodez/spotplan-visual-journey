
import React from 'react';
import { Star, MapPin, DollarSign, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScheduleItem, Restaurant } from '@/types/schedule';

interface PlaceCardProps {
  item: ScheduleItem;
  isDragging?: boolean;
  className?: string;
  onAddToSchedule?: (item: ScheduleItem) => void;
}

const PlaceCard = ({
  item,
  isDragging = false,
  className,
  onAddToSchedule,
}: PlaceCardProps) => {
  const renderPriceLevel = (priceLevel: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <DollarSign
        key={i}
        className={cn(
          "h-3 w-3",
          i < priceLevel ? "text-green-500" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <button
      type="button"
      aria-label={`Add ${item.title} to your schedule`}
      onClick={onAddToSchedule ? () => onAddToSchedule(item) : undefined}
      className={cn(
        "bg-white border border-gray-200 rounded-lg p-3 cursor-pointer transition-all duration-200 flex w-full text-left relative group active:scale-98",
        "hover:border-spot-primary hover:shadow-md hover:scale-105",
        isDragging && "opacity-50 scale-95",
        className
      )}
      tabIndex={0}
    >
      <div className="flex gap-3 w-full">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={item.thumbnail || '/placeholder.svg'}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate mb-1">
            {item.title}
          </h4>
          
          {/* Rating */}
          {item.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{item.rating}</span>
            </div>
          )}
          
          {/* Distance */}
          {item.distance && (
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">{item.distance}</span>
            </div>
          )}
          
          {/* Type-specific info */}
          {item.type === 'restaurant' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {(item as Restaurant).cuisine}
              </span>
              <div className="flex">
                {renderPriceLevel((item as Restaurant).priceLevel)}
              </div>
            </div>
          )}
          
          {item.type === 'place' && (
            <span className="text-xs text-gray-500">
              {(item as any).category}
            </span>
          )}
        </div>
        <span className="absolute top-2 right-2 pointer-events-none opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all z-10">
          <Plus className="h-5 w-5 text-spot-primary drop-shadow-sm" />
        </span>
      </div>
    </button>
  );
};

export default PlaceCard;
