
import React, { useState } from 'react';
import { TimeSlot, ScheduleItem } from '@/types/schedule';
import { timeToPosition, positionToTime, snapTimeToInterval, calculateDuration } from '@/utils/timeUtils';
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
const SNAP_INTERVAL_MINUTES = 30;

const TimeGrid = ({ 
  date, 
  timeSlots, 
  onUpdateTimeSlot, 
  startHour = 6, 
  endHour = 23 
}: TimeGridProps) => {
  const [dragOverTime, setDragOverTime] = useState<string | null>(null);
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
      const duration = calculateDuration(slot.startTime, slot.endTime);
      const [hours, minutes] = newStartTime.split(':').map(Number);
      const startMinutes = hours * 60 + minutes;
      const endMinutes = startMinutes + duration;
      const endHours = Math.floor(endMinutes / 60);
      const endMins = endMinutes % 60;
      const newEndTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
      
      onUpdateTimeSlot(slotId, slot.item, newStartTime, newEndTime);
    }
  };

  const handleActivityRemove = (slotId: string) => {
    onUpdateTimeSlot(slotId, null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    
    // Calculate time from mouse position
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const time = positionToTime(y, startHour, PIXELS_PER_MINUTE);
    const snappedTime = snapTimeToInterval(time, SNAP_INTERVAL_MINUTES);
    setDragOverTime(snappedTime);
  };

  const handleDragLeave = () => {
    setDragOverTime(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverTime(null);
    
    try {
      const itemData = e.dataTransfer.getData('application/json');
      const item: ScheduleItem = JSON.parse(itemData);
      
      // Calculate drop position
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const dropTime = positionToTime(y, startHour, PIXELS_PER_MINUTE);
      const startTime = snapTimeToInterval(dropTime, SNAP_INTERVAL_MINUTES);
      
      // Calculate end time based on item type
      const defaultDuration = item.type === 'restaurant' ? 90 : 60; // 90 min for restaurants, 60 for places
      const [hours, minutes] = startTime.split(':').map(Number);
      const startMinutes = hours * 60 + minutes;
      const endMinutes = startMinutes + defaultDuration;
      const endHours = Math.floor(endMinutes / 60);
      const endMins = endMinutes % 60;
      const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
      
      // Create a new slot ID
      const slotId = `slot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      onUpdateTimeSlot(slotId, item, startTime, endTime);
    } catch (error) {
      console.error('Failed to parse dropped item:', error);
    }
  };

  return (
    <div className="flex bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <TimeRuler startHour={startHour} endHour={endHour} />
      
      <div 
        className="flex-1 relative" 
        style={{ height: `${totalHeight}px` }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
        
        {/* Drop indicator */}
        {dragOverTime && (
          <div
            className="absolute left-2 right-2 h-1 bg-spot-primary rounded-full z-30 transition-all duration-200"
            style={{
              top: `${timeToPosition(dragOverTime, startHour, PIXELS_PER_MINUTE)}px`,
            }}
          >
            <div className="absolute -top-6 left-0 bg-spot-primary text-white text-xs px-2 py-1 rounded shadow-lg">
              Drop at {dragOverTime}
            </div>
          </div>
        )}
        
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
