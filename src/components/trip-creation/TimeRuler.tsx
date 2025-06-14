
import React from 'react';
import { formatTimeAMPM } from '@/utils/timeUtils';

interface TimeRulerProps {
  startHour?: number;
  endHour?: number;
  pixelsPerMinute?: number;
}

const TimeRuler = ({ startHour = 6, endHour = 23, pixelsPerMinute = 2 }: TimeRulerProps) => {
  const hours = [];
  
  for (let hour = startHour; hour <= endHour; hour++) {
    hours.push(hour);
  }

  return (
    <div className="w-20 flex-shrink-0 relative">
      {/* Hour labels */}
      {hours.map((hour) => {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        const position = (hour - startHour) * 60 * pixelsPerMinute; // Use pixelsPerMinute for consistency
        
        return (
          <div
            key={hour}
            className="absolute left-0 right-0 flex items-center justify-end pr-2 -translate-y-2"
            style={{ top: `${position}px` }}
          >
            <span className="text-xs text-gray-500 font-medium">
              {formatTimeAMPM(timeString)}
            </span>
          </div>
        );
      })}
      
      {/* 30-minute marks */}
      {hours.map((hour) => {
        if (hour < endHour) {
          const halfHourPosition = (hour - startHour) * 60 * pixelsPerMinute + 30 * pixelsPerMinute;
          return (
            <div
              key={`${hour}-30`}
              className="absolute right-0 w-2 border-t border-gray-200"
              style={{ top: `${halfHourPosition}px` }}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default TimeRuler;
