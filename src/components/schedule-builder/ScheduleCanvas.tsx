
import React, { useState } from 'react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { format, addDays } from 'date-fns';
import DayColumn from './DayColumn';

const ScheduleCanvas = () => {
  const { state } = useTripCreation();
  const [selectedDay, setSelectedDay] = useState(0);

  // Generate days from trip dates
  const generateDays = () => {
    if (state.dateType === 'single' && state.startDate) {
      return [state.startDate];
    } else if (state.dateType === 'range' && state.dateRange?.from) {
      const days = [];
      const start = state.dateRange.from;
      const end = state.dateRange.to || start;
      
      let current = start;
      while (current <= end) {
        days.push(current);
        current = addDays(current, 1);
      }
      return days;
    }
    
    // This should not happen since we check for valid dates in the page component
    return [new Date()];
  };

  const days = generateDays();

  return (
    <div className="h-full bg-gray-50">
      {/* Day Selector */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Select Day</h3>
          <span className="text-sm text-gray-500">{days.length} days total</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg border text-center min-w-[120px] transition-colors ${
                selectedDay === index
                  ? 'bg-[#6EBB2D] border-[#6EBB2D] text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-xs font-medium">Day {index + 1}</div>
              <div className="text-xs mt-1">
                {format(day, 'EEE, MMM d')}
              </div>
            </button>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Scroll horizontally or use arrows to navigate
        </p>
      </div>

      {/* Schedule Grid */}
      <div className="p-4">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h4 className="font-medium text-gray-900">
              Daily Schedule - Day {selectedDay + 1}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {format(days[selectedDay], 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          
          <div id="canvas-grid" className="p-4">
            <DayColumn dayIndex={selectedDay} date={days[selectedDay]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCanvas;
