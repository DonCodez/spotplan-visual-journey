
import React from 'react';
import { Clock, UtensilsCrossed, MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TimeSlot as TimeSlotType } from '@/types/schedule';
import { useTripCreation } from '@/contexts/TripCreationContext';

interface TimeSlotProps {
  slot: TimeSlotType;
  date: string;
}

const TimeSlot = ({ slot, date }: TimeSlotProps) => {
  const { dispatch } = useTripCreation();

  const handleRemoveItem = () => {
    dispatch({
      type: 'UPDATE_TIME_SLOT',
      payload: {
        date,
        slotId: slot.id,
        item: null,
      },
    });
  };

  const getMealLabel = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 7 && hour <= 10) return 'Breakfast';
    if (hour >= 11 && hour <= 15) return 'Lunch';
    if (hour >= 17 && hour <= 22) return 'Dinner';
    return null;
  };

  const mealLabel = slot.type === 'meal' ? getMealLabel(slot.startTime) : null;

  return (
    <div
      className={cn(
        "min-h-[60px] border-2 border-dashed rounded-lg p-3 transition-all duration-200",
        "border-gray-200 hover:border-gray-300",
        slot.item && "border-solid border-spot-primary bg-spot-primary/5"
      )}
      data-time-slot="true"
      data-date={date}
      data-slot-id={slot.id}
    >
      {/* Time Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {slot.startTime} - {slot.endTime}
          </span>
        </div>
        
        {mealLabel && (
          <div className="flex items-center gap-1">
            <UtensilsCrossed className="h-3 w-3 text-orange-500" />
            <span className="text-xs text-orange-600 font-medium">
              {mealLabel}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      {slot.item ? (
        <div className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <MapPin className="h-3 w-3 text-spot-primary" />
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {slot.item.title}
                </h4>
              </div>
              {slot.item.rating && (
                <p className="text-xs text-gray-500">
                  ⭐ {slot.item.rating}
                </p>
              )}
            </div>
            <button
              onClick={handleRemoveItem}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-xs text-gray-400">
            Drop activity here
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlot;
