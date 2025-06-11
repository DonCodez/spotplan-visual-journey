
import React from 'react';
import { Calendar } from 'lucide-react';
import { DaySchedule } from '@/types/schedule';
import TimeSlot from './TimeSlot';

interface DayColumnProps {
  date: string;
  dayNumber: number;
  schedule: DaySchedule;
}

const DayColumn = ({ date, dayNumber, schedule }: DayColumnProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-3">
      {/* Day Header */}
      <div className="text-center p-3 bg-spot-primary/10 rounded-lg border border-spot-primary/20">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Calendar className="h-4 w-4 text-spot-primary" />
          <span className="font-semibold text-spot-primary">Day {dayNumber}</span>
        </div>
        <p className="text-sm text-gray-600">{formatDate(date)}</p>
      </div>
      
      {/* Time Slots */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {schedule?.timeSlots.map((slot) => (
          <TimeSlot
            key={slot.id}
            slot={slot}
            date={date}
          />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
