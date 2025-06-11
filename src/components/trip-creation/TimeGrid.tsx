
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TimeSlot, ScheduleItem } from '@/types/schedule';
import { timeToPosition, positionToTime, snapToGrid } from '@/utils/timeUtils';
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

const TimeGrid = ({ 
  date, 
  timeSlots, 
  onUpdateTimeSlot, 
  startHour = 6, 
  endHour = 23 
}: TimeGridProps) => {
  const totalHeight = (endHour - startHour + 1) * 60; // 60px per hour
  
  const { isOver, setNodeRef } = useDroppable({
    id: `time-grid-${date}`,
    data: { date, type: 'time-grid' },
  });

  const handleActivityResize = (slotId: string, newStartTime: string, newEndTime: string) => {
    const slot = timeSlots.find(s => s.id === slotId);
    if (slot?.item) {
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
            const position = index * 15; // 15-minute intervals
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
        
        {/* Drop zone */}
        <div
          ref={setNodeRef}
          className={cn(
            "absolute inset-0 transition-colors duration-200",
            isOver && "bg-spot-primary/5"
          )}
        >
          {/* Activity blocks */}
          {timeSlots
            .filter(slot => slot.item)
            .map((slot) => {
              const position = timeToPosition(slot.startTime, startHour);
              
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
                    onRemove={() => handleActivityRemove(slot.id)}
                  />
                </div>
              );
            })}
          
          {/* Drop zones for empty time slots */}
          {Array.from({ length: Math.floor(totalHeight / 30) }).map((_, index) => {
            const position = index * 30;
            const time = positionToTime(position, startHour);
            
            return (
              <div
                key={`drop-zone-${index}`}
                className="absolute left-2 right-2 h-8 rounded border-2 border-dashed border-transparent hover:border-spot-primary/30 transition-colors duration-200"
                style={{ top: `${position}px` }}
                data-time={time}
              />
            );
          })}
        </div>
        
        {/* Current time indicator (if today) */}
        {date === new Date().toISOString().split('T')[0] && (
          <div className="absolute left-0 right-0 z-20">
            <div 
              className="h-0.5 bg-red-500"
              style={{ 
                top: `${timeToPosition(
                  new Date().toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                )}px` 
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeGrid;
