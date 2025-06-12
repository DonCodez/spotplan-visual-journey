
import React, { useRef, useEffect } from 'react';
import Moveable from 'react-moveable';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScheduleItem, Restaurant } from '@/types/schedule';
import { useMoveableContext } from './MoveableProvider';

interface PlaceCardProps {
  item: ScheduleItem;
  isDragging?: boolean;
  className?: string;
}

const PlaceCard = ({ item, isDragging = false, className }: PlaceCardProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);
  const { handleDragStart, handleDrag, handleDragEnd, isDragging: globalIsDragging } = useMoveableContext();

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

  const handleDragStartEvent = (e: any) => {
    e.preventDefault();
    handleDragStart(item, e);
  };

  const handleDragEvent = (e: any) => {
    e.preventDefault();
    handleDrag(e);
  };

  const handleDragEndEvent = (e: any) => {
    e.preventDefault();
    handleDragEnd(e);
  };

  // Don't render moveable for dragging overlay
  if (isDragging) {
    return (
      <div
        className={cn(
          "bg-white border-2 border-spot-primary rounded-lg p-3 shadow-lg min-w-[250px]",
          className
        )}
      >
        <div className="flex gap-3">
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
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={targetRef}
        className={cn(
          "bg-white border border-gray-200 rounded-lg p-3 cursor-grab transition-all duration-200",
          "hover:border-spot-primary hover:shadow-md hover:scale-105",
          globalIsDragging && "opacity-50 scale-95",
          className
        )}
      >
        <div className="flex gap-3">
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
        </div>
      </div>

      <Moveable
        ref={moveableRef}
        target={targetRef.current}
        draggable={true}
        throttleDrag={0}
        onDragStart={handleDragStartEvent}
        onDrag={handleDragEvent}
        onDragEnd={handleDragEndEvent}
        renderDirections={[]}
      />
    </>
  );
};

export default PlaceCard;
