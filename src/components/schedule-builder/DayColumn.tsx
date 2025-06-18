
import React from 'react';
import { format } from 'date-fns';
import TimeSlot from './TimeSlot';

interface DayColumnProps {
  dayNumber: number;
  date: Date;
  isSelected: boolean;
}

const DayColumn = ({ dayNumber, date, isSelected }: DayColumnProps) => {
  // Generate time slots from 8 AM to 10 PM
  const timeSlots = [
    { time: '8:00 AM', duration: '1 hour', type: 'meal', mealType: 'breakfast', emoji: '🥣' },
    { time: '9:00 AM', duration: '1 hour', type: 'activity' },
    { time: '10:00 AM', duration: '1 hour', type: 'activity' },
    { time: '11:00 AM', duration: '1 hour', type: 'activity' },
    { time: '12:00 PM', duration: '1 hour', type: 'activity' },
    { time: '1:00 PM', duration: '1 hour', type: 'meal', mealType: 'lunch', emoji: '🍽️' },
    { time: '2:00 PM', duration: '1 hour', type: 'activity' },
    { time: '3:00 PM', duration: '1 hour', type: 'activity' },
    { time: '4:00 PM', duration: '1 hour', type: 'activity' },
    { time: '5:00 PM', duration: '1 hour', type: 'activity' },
    { time: '6:00 PM', duration: '1 hour', type: 'activity' },
    { time: '7:00 PM', duration: '1 hour', type: 'activity' },
    { time: '8:00 PM', duration: '1 hour', type: 'meal', mealType: 'dinner', emoji: '🍲' },
    { time: '9:00 PM', duration: '1 hour', type: 'activity' },
    { time: '10:00 PM', duration: '1 hour', type: 'activity' },
  ];

  return (
    <div className={`day-column min-w-[280px] border-r border-gray-200 last:border-r-0 ${isSelected ? 'bg-green-50' : ''}`}>
      {/* Day Header */}
      <div className={`p-4 border-b border-gray-200 text-center ${isSelected ? 'bg-[#317312] text-white' : 'bg-gray-50'}`}>
        <h3 className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-900'}`}>
          Day {dayNumber}
        </h3>
        <p className={`text-sm ${isSelected ? 'text-green-100' : 'text-gray-600'}`}>
          {format(date, 'MMM dd, yyyy')}
        </p>
      </div>

      {/* Time Slots */}
      <div className="divide-y divide-gray-100">
        {timeSlots.map((slot, index) => (
          <TimeSlot
            key={`day-${dayNumber}-slot-${index}`}
            id={`day-${dayNumber}-slot-${index}`}
            time={slot.time}
            duration={slot.duration}
            type={slot.type}
            mealType={slot.mealType}
            emoji={slot.emoji}
            dayNumber={dayNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
