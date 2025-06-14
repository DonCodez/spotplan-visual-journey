
import React from 'react';
import { cn } from '@/lib/utils';

interface TimeSlotProps {
  time: string;
  hour24: number;
  isMealSlot?: boolean;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  dayIndex: number;
}

const TimeSlot = ({ time, hour24, isMealSlot, mealType, dayIndex }: TimeSlotProps) => {
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

  return (
    <div 
      className={cn(
        "time-slot flex items-center gap-4 p-3 border border-gray-100 rounded-lg min-h-[60px] transition-colors hover:bg-gray-50",
        isMealSlot && "bg-green-50 border-green-200"
      )}
    >
      <div className="w-20 text-sm font-medium text-gray-600">
        {time}
      </div>
      
      <div className="flex-1 min-h-[40px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
        {isMealSlot ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">{getMealEmoji(mealType)}</span>
            <span>{getMealLabel(mealType)}</span>
            <span className="text-xs text-gray-400">
              ({time.replace(':00', '')} - {hour24 + 1}:00 {hour24 + 1 <= 12 ? 'AM' : 'PM'})
            </span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">Drop activity here</span>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
