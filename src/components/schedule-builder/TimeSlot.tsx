
import React, { useState } from 'react';
import { useDragDrop } from '@/contexts/DragDropContext';
import ScheduleItem from './ScheduleItem';

interface TimeSlotProps {
  id: string;
  time: string;
  duration: string;
  type: 'activity' | 'meal';
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  emoji?: string;
  dayNumber: number;
}

const TimeSlot = ({ id, time, duration, type, mealType, emoji, dayNumber }: TimeSlotProps) => {
  const { state } = useDragDrop();
  const [placedItem, setPlacedItem] = useState<any>(null);
  const isHovered = state.hoveredSlot === id;
  const isDragOver = isHovered && state.isDragging;

  React.useEffect(() => {
    // Handle drop when dragging ends over this slot
    if (isHovered && !state.isDragging && state.draggedItem && !placedItem) {
      // Check if it's a meal slot and item is restaurant, or if it's an activity slot
      const canDrop = type === 'activity' || 
        (type === 'meal' && state.draggedItem.category === 'restaurant');
      
      if (canDrop) {
        setPlacedItem(state.draggedItem);
      }
    }
  }, [isHovered, state.isDragging, state.draggedItem, type, placedItem]);

  const handleRemoveItem = () => {
    setPlacedItem(null);
  };

  return (
    <div
      id={id}
      className={`time-slot p-3 min-h-[80px] transition-colors ${
        isDragOver 
          ? 'bg-green-100 border-l-4 border-[#317312]'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {emoji && <span className="text-lg">{emoji}</span>}
          <div>
            <span className="font-medium text-gray-900 text-sm">{time}</span>
            <span className="text-xs text-gray-500 ml-2">{duration}</span>
          </div>
        </div>
        {type === 'meal' && !placedItem && (
          <span className="text-xs text-gray-400 capitalize">{mealType}</span>
        )}
      </div>

      {placedItem ? (
        <ScheduleItem 
          item={placedItem} 
          onRemove={handleRemoveItem}
          startTime={time}
        />
      ) : isDragOver ? (
        <div className="border-2 border-dashed border-[#317312] rounded-lg p-2 text-center">
          <span className="text-sm text-[#317312]">Drop here</span>
        </div>
      ) : null}
    </div>
  );
};

export default TimeSlot;
