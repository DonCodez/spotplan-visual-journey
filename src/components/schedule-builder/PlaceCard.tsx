
import React, { useRef, useEffect } from 'react';
import Moveable from 'moveable';
import { useDragDrop, PlaceData } from '@/contexts/DragDropContext';
import { Star, MapPin } from 'lucide-react';

interface PlaceCardProps {
  place: PlaceData;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);
  const { setDraggedItem, setIsDragging, setHoveredSlot } = useDragDrop();

  useEffect(() => {
    if (!cardRef.current) return;

    const moveable = new Moveable(document.body, {
      target: cardRef.current,
      draggable: true,
      origin: false,
    });

    moveableRef.current = moveable;

    moveable.on('dragStart', () => {
      setDraggedItem(place);
      setIsDragging(true);
      if (cardRef.current) {
        cardRef.current.style.opacity = '0.7';
        cardRef.current.style.zIndex = '1000';
      }
    });

    moveable.on('drag', (e) => {
      e.target.style.transform = e.transform;
      
      // Check for drop zone collisions using coordinates
      const dropZones = document.querySelectorAll('.time-slot');
      const dragRect = e.target.getBoundingClientRect();
      const dragCenterX = dragRect.left + dragRect.width / 2;
      const dragCenterY = dragRect.top + dragRect.height / 2;

      let hoveredZone = null;
      dropZones.forEach((zone) => {
        const zoneRect = zone.getBoundingClientRect();
        if (
          dragCenterX >= zoneRect.left &&
          dragCenterX <= zoneRect.right &&
          dragCenterY >= zoneRect.top &&
          dragCenterY <= zoneRect.bottom
        ) {
          hoveredZone = zone.id;
        }
      });

      setHoveredSlot(hoveredZone);
    });

    moveable.on('dragEnd', (e) => {
      // Reset position and opacity
      e.target.style.transform = '';
      e.target.style.opacity = '1';
      e.target.style.zIndex = '';
      
      setIsDragging(false);
      setDraggedItem(null);
      setHoveredSlot(null);
    });

    return () => {
      moveable.destroy();
    };
  }, [place, setDraggedItem, setIsDragging, setHoveredSlot]);

  const getPriceLevelDisplay = (level: number) => {
    return '$'.repeat(level);
  };

  return (
    <div
      ref={cardRef}
      className="place-suggestion bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-start space-x-3">
        <img
          src={place.image}
          alt={place.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm truncate">
            {place.title}
          </h4>
          <div className="flex items-center space-x-1 mt-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600">{place.rating}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{place.distance}</span>
            {place.priceLevel && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600">
                  {getPriceLevelDisplay(place.priceLevel)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
