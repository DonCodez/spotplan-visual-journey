
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import DayColumn from './DayColumn';

const ScheduleCanvas = () => {
  const { state } = useTripCreation();

  if (state.tripDates.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-lg font-medium mb-2">No dates selected</p>
          <p className="text-sm">Please set your trip dates to continue</p>
        </div>
      </div>
    );
  }

  if (!state.selectedDay) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">👆</div>
          <p className="text-lg font-medium mb-2">Select a day above</p>
          <p className="text-sm">Choose a day to start building your schedule</p>
        </div>
      </div>
    );
  }

  const selectedDate = new Date(state.selectedDay);
  const dayNumber = state.tripDates.findIndex(date => 
    date.toISOString().split('T')[0] === state.selectedDay
  ) + 1;
  const daySchedule = state.dailySchedules[state.selectedDay];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Daily Schedule - Day {dayNumber}</h3>
        <p className="text-sm text-gray-600">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="p-4">
        <DayColumn
          date={state.selectedDay}
          dayNumber={dayNumber}
          schedule={daySchedule}
        />
      </div>
    </motion.div>
  );
};

export default ScheduleCanvas;
