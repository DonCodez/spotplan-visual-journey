
import React from 'react';
import { TimeSlot, ScheduleItem } from '@/types/schedule';
import { timeToPosition, positionToTime } from '@/utils/timeUtils';
import { cn } from '@/lib/utils';
import TimeRuler from './TimeRuler';
import ResizableActivityBlock from './ResizableActivityBlock';

interface TimeGridProps {
  date: string;
  timeSlots: TimeSlot[];
  onUpdateTimeSlot: (slotId: string, item: ScheduleItem | null, startTime?: string, endTime?: string) => void;
  startHour?: number;
  endHour?: number;
}

const PIXELS_PER_MINUTE = 2;

const TimeGrid = ({ 
  date, 
  timeSlots, 
  onUpdateTimeSlot, 
  startHour = 6, 
  endHour = 23 
}: TimeGridProps) => {
  const totalHeight = (endHour - startHour + 1) * 60 * PIXELS_PER_MINUTE;

  const handleActivityResize = (slotId: string, newStartTime: string, newEndTime: string) => {
    const slot = timeSlots.find(s => s.id === slotId);
    if (slot?.item) {
      onUpdateTimeSlot(slotId, slot.item, newStartTime, newEndTime);
    }
  };

  const handleActivityDrag = (slotId: string, newStartTime: string) => {
    const slot = timeSlots.find(s => s.id === slotId);
    if (slot?.item) {
      // Calculate the duration and new end time
      const duration = timeToPosition(slot.endTime, startHour, PIXELS_PER_MINUTE) - timeToPosition(slot.startTime, startHour, PIXELS_PER_MINUTE);
      const newPosition = timeToPosition(newStartTime, startHour, PIXELS_PER_MINUTE);
      const newEndTime = positionToTime(newPosition + duration, startHour, PIXELS_PER_MINUTE);
      
      onUpdateTimeSlot(slotId, slot.item, newStartTime, newEndTime);
    }
  };

  const handleActivityRemove = (slotId: string) => {
    onUpdateTimeSlot(slotId, null);
  };

  return (
    <div className="flex bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <TimeRuler startHour={startHour} endHour={endHour} />
      
      <div className="flex-1 relative" style={{ height: `${totalHeight}px` }}>
        {/* Grid background */}
        <div className="absolute inset-0">
          {Array.from({ length: (endHour - startHour + 1) * 4 }).map((_, index) => {
            const position = index * 15 * PIXELS_PER_MINUTE;
            const isHour = index % 4 === 0;
            const isHalfHour = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={cn(
                  "absolute left-0 right-0 border-t",
                  isHour ? "border-gray-300" : isHalfHour ? "border-gray-200" : "border-gray-100"
                )}
                style={{ top: `${position}px` }}
              />
            );
          })}
        </div>
        
        {/* Drop zones for empty time slots */}
        {Array.from({ length: Math.floor(totalHeight / (30 * PIXELS_PER_MINUTE)) }).map((_, index) => {
          const position = index * 30 * PIXELS_PER_MINUTE;
          const time = positionToTime(position, startHour, PIXELS_PER_MINUTE);
          
          return (
            <div
              key={`drop-zone-${index}`}
              className={cn(
                "absolute left-2 right-2 rounded border-2 border-dashed transition-all duration-200",
                "border-transparent hover:border-spot-primary/30 hover:bg-spot-primary/5"
              )}
              style={{ 
                top: `${position}px`,
                height: `${30 * PIXELS_PER_MINUTE}px`
              }}
              data-time={time}
            />
          );
        })}
        
        {/* Activity blocks */}
        {timeSlots
          .filter(slot => slot.item)
          .map((slot) => {
            const position = timeToPosition(slot.startTime, startHour, PIXELS_PER_MINUTE);
            
            return (
              <div
                key={slot.id}
                className="absolute left-2 right-2 z-10"
                style={{ top: `${position}px` }}
              >
                <ResizableActivityBlock
                  item={slot.item!}
                  startTime={slot.startTime}
                  endTime={slot.endTime}
                  date={date}
                  slotId={slot.id}
                  onResize={(newStartTime, newEndTime) => 
                    handleActivityResize(slot.id, newStartTime, newEndTime)
                  }
                  onDrag={(newStartTime) => 
                    handleActivityDrag(slot.id, newStartTime)
                  }
                  onRemove={() => handleActivityRemove(slot.id)}
                />
              </div>
            );
          })}
        
        {/* Current time indicator (if today) */}
        {date === new Date().toISOString().split('T')[0] && (
          <div className="absolute left-0 right-0 z-20">
            <div 
              className="h-0.5 bg-red-500 shadow-sm"
              style={{ 
                top: `${timeToPosition(
                  new Date().toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  }),
                  startHour,
                  PIXELS_PER_MINUTE
                )}px` 
              }}
            />
            <div
              className="absolute w-2 h-2 bg-red-500 rounded-full -translate-x-1 -translate-y-1"
              style={{ 
                top: `${timeToPosition(
                  new Date().toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  }),
                  startHour,
                  PIXELS_PER_MINUTE
                )}px`,
                left: '0px'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeGrid;
