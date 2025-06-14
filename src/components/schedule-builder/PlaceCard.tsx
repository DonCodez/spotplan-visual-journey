
import React, { useRef, useEffect } from 'react';
import { Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Moveable from 'moveable';
import { useDragDrop } from '@/contexts/DragDropContext';

interface PlaceCardProps {
  place: {
    id: string;
    title: string;
    rating: number;
    distance: string;
    thumbnail: string;
    type: string;
    priceLevel?: string;
  };
  className?: string;
}

const PlaceCard = ({ place, className }: PlaceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable | null>(null);
  const { isDragging, setDragging, setDraggedItem, setMousePosition, getDropTarget } = useDragDrop();

  useEffect(() => {
    if (!cardRef.current) return;

    const moveable = new Moveable(document.body, {
      target: cardRef.current,
      draggable: true,
      throttleDrag: 0,
      edgeDraggable: false,
      startDragRotate: 0,
      throttleDragRotate: 0,
    });

    moveable.on('dragStart', (e) => {
      console.log('Drag started for:', place.title);
      setDragging(true);
      setDraggedItem(place, place.type === 'restaurant' ? 'restaurant' : 'place');
      if (cardRef.current) {
        cardRef.current.style.opacity = '0.7';
        cardRef.current.style.transform = 'scale(1.05)';
        cardRef.current.style.zIndex = '1000';
        cardRef.current.style.pointerEvents = 'none';
      }
    });

    moveable.on('drag', (e) => {
      const mouseX = e.clientX || (e.inputEvent?.clientX);
      const mouseY = e.clientY || (e.inputEvent?.clientY);
      
      if (mouseX !== undefined && mouseY !== undefined) {
        setMousePosition({ x: mouseX, y: mouseY });
      }
      
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${e.translate[0]}px, ${e.translate[1]}px) scale(1.05)`;
      }
    });

    moveable.on('dragEnd', (e) => {
      console.log('Drag ended');
      const dropTarget = getDropTarget();
      
      if (dropTarget) {
        console.log('Found drop target, placing item');
        // Trigger drop on the target element
        const dropEvent = new CustomEvent('moveableDrop', {
          detail: { item: place, type: place.type === 'restaurant' ? 'restaurant' : 'place' }
        });
        dropTarget.dispatchEvent(dropEvent);
      }
      
      setDragging(false);
      if (cardRef.current) {
        cardRef.current.style.opacity = '1';
        cardRef.current.style.transform = 'scale(1)';
        cardRef.current.style.zIndex = 'auto';
        cardRef.current.style.pointerEvents = 'auto';
      }
    });

    moveableRef.current = moveable;

    return () => {
      moveable.destroy();
    };
  }, [place, setDragging, setDraggedItem, setMousePosition, getDropTarget]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "bg-white border border-gray-200 rounded-lg p-3 cursor-grab hover:shadow-md transition-shadow duration-200",
        isDragging && "pointer-events-none",
        className
      )}
    >
      <div className="flex gap-3">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <img 
            src={place.thumbnail} 
            alt={place.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm truncate">{place.title}</h3>
          
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{place.rating}</span>
            {place.priceLevel && (
              <span className="text-sm text-gray-600 ml-2">{place.priceLevel}</span>
            )}
          </div>
          
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{place.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
