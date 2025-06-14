
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useDragDrop } from '@/contexts/DragDropContext';
import { X } from 'lucide-react';

interface TimeSlotProps {
  time: string;
  hour24: number;
  isMealSlot?: boolean;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  dayIndex: number;
}

interface DroppedItem {
  id: string;
  title: string;
  type: string;
}

const TimeSlot = ({ time, hour24, isMealSlot, mealType, dayIndex }: TimeSlotProps) => {
  const { isDragging, mousePosition } = useDragDrop();
  const [isDropZone, setIsDropZone] = useState(false);
  const [droppedItem, setDroppedItem] = useState<DroppedItem | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const getMealEmoji = (type?: string) => {
    switch (type) {
      case 'breakfast': return '🥣';
      case 'lunch': return '🍽️';
      case 'dinner': return '🍲';
      default: return '';
    }
  };

  const getMealLabel = (type?: string) => {
    switch (type) {
      case 'breakfast': return 'Breakfast';
      case 'lunch': return 'Lunch';
      case 'dinner': return 'Dinner';
      default: return '';
    }
  };

  useEffect(() => {
    if (!dropZoneRef.current || !isDragging || droppedItem) {
      setIsDropZone(false);
      return;
    }

    if (mousePosition) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      const isOver = mousePosition.x >= rect.left && 
                     mousePosition.x <= rect.right && 
                     mousePosition.y >= rect.top && 
                     mousePosition.y <= rect.bottom;
      setIsDropZone(isOver);
    }
  }, [mousePosition, isDragging, droppedItem]);

  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDrop = (e: CustomEvent) => {
      console.log('Drop event received:', e.detail);
      if (!droppedItem && e.detail.item) {
        setDroppedItem({
          id: e.detail.item.id,
          title: e.detail.item.title,
          type: e.detail.type
        });
        setIsDropZone(false);
      }
    };

    dropZone.addEventListener('moveableDrop', handleDrop as EventListener);
    
    return () => {
      dropZone.removeEventListener('moveableDrop', handleDrop as EventListener);
    };
  }, [droppedItem]);

  const handleRemoveItem = () => {
    setDroppedItem(null);
  };

  return (
    <div 
      className={cn(
        "time-slot flex items-center gap-4 p-3 border border-gray-100 rounded-lg min-h-[60px] transition-all duration-200",
        isMealSlot && "bg-green-50 border-green-200",
        isDropZone && "border-blue-400 bg-blue-50 border-2",
        isDragging && !droppedItem && "hover:border-blue-400 hover:bg-blue-50"
      )}
    >
      <div className="w-20 text-sm font-medium text-gray-600">
        {time}
      </div>
      
      <div 
        ref={dropZoneRef}
        className={cn(
          "time-slot-drop-zone flex-1 min-h-[40px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center relative transition-all duration-200",
          isDropZone && "border-blue-400 bg-blue-100"
        )}
      >
        {droppedItem ? (
          <div className="flex items-center justify-between w-full px-3 py-2 bg-white rounded border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{droppedItem.title}</span>
              <span className="text-xs text-gray-500 capitalize">({droppedItem.type})</span>
            </div>
            <button
              onClick={handleRemoveItem}
              className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-red-600" />
            </button>
          </div>
        ) : isMealSlot ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">{getMealEmoji(mealType)}</span>
            <span>{getMealLabel(mealType)}</span>
            <span className="text-xs text-gray-400">
              ({time.replace(':00', '')} - {hour24 + 1}:00 {hour24 + 1 <= 12 ? 'AM' : 'PM'})
            </span>
          </div>
        ) : isDropZone ? (
          <span className="text-xs text-blue-600 font-medium">Drop here</span>
        ) : (
          <span className="text-xs text-gray-400">Drop activity here</span>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
