
import React from 'react';
import TimeSlot from './TimeSlot';

interface DayColumnProps {
  dayIndex: number;
  date: Date;
}

const DayColumn = ({ dayIndex, date }: DayColumnProps) => {
  // Generate time slots from 6:00 AM to 10:00 PM
  const timeSlots = [];
  for (let hour = 6; hour <= 22; hour++) {
    timeSlots.push({
      time: `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`,
      hour24: hour,
      isMealSlot: hour === 8 || hour === 13 || hour === 20, // 8 AM, 1 PM, 8 PM
      mealType: hour === 8 ? 'breakfast' : hour === 13 ? 'lunch' : hour === 20 ? 'dinner' : undefined
    });
  }

  return (
    <div className="day-column space-y-1">
      {timeSlots.map((slot, index) => (
        <TimeSlot
          key={`${dayIndex}-${slot.hour24}`}
          time={slot.time}
          hour24={slot.hour24}
          isMealSlot={slot.isMealSlot}
          mealType={slot.mealType}
          dayIndex={dayIndex}
        />
      ))}
    </div>
  );
};

export default DayColumn;
