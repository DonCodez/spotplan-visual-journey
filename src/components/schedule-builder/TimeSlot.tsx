
import React, { useState } from 'react';
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
  const { isDragging, draggedItem, setDragging } = useDragDrop();
  const [isDropZone, setIsDropZone] = useState(false);
  const [droppedItem, setDroppedItem] = useState<DroppedItem | null>(null);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isDragging && !droppedItem) {
      setIsDropZone(true);
    }
  };

  const handleDragLeave = () => {
    setIsDropZone(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZone(false);
    
    if (draggedItem && !droppedItem) {
      setDroppedItem({
        id: draggedItem.id,
        title: draggedItem.title,
        type: draggedItem.type
      });
      setDragging(false);
    }
  };

  const handleRemoveItem = () => {
    setDroppedItem(null);
  };

  const handleMouseEnter = () => {
    if (isDragging && !droppedItem) {
      setIsDropZone(true);
    }
  };

  const handleMouseLeave = () => {
    setIsDropZone(false);
  };

  return (
    <div 
      className={cn(
        "time-slot flex items-center gap-4 p-3 border border-gray-100 rounded-lg min-h-[60px] transition-all duration-200",
        isMealSlot && "bg-green-50 border-green-200",
        isDropZone && "border-blue-400 bg-blue-50 border-2",
        isDragging && "hover:border-blue-400 hover:bg-blue-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-20 text-sm font-medium text-gray-600">
        {time}
      </div>
      
      <div className="flex-1 min-h-[40px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center relative">
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
