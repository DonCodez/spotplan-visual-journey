
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { format, differenceInDays, addDays } from 'date-fns';
import DayColumn from './DayColumn';

const ScheduleCanvas = () => {
  const { state } = useTripCreation();

  // Calculate trip days from context
  const getTripDays = () => {
    if (state.dateType === 'single' && state.startDate) {
      return [{ date: state.startDate, dayNumber: 1 }];
    } else if (state.dateType === 'range' && state.dateRange?.from) {
      const startDate = state.dateRange.from;
      const endDate = state.dateRange.to || startDate;
      const days = differenceInDays(endDate, startDate) + 1;
      
      return Array.from({ length: days }, (_, index) => ({
        date: addDays(startDate, index),
        dayNumber: index + 1,
      }));
    }
    
    // Fallback to single day if no dates selected
    return [{ date: new Date(), dayNumber: 1 }];
  };

  const tripDays = getTripDays();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
    >
      <div id="canvas-grid" className="overflow-x-auto">
        <div className="flex min-w-max">
          {tripDays.map((day) => (
            <DayColumn
              key={day.dayNumber}
              dayNumber={day.dayNumber}
              date={day.date}
              isSelected={day.dayNumber === 1} // Default to Day 1 selected
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleCanvas;
