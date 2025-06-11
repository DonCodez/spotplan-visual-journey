
import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { ScheduleItem } from '@/types/schedule';
import { positionToTime, snapToGrid, timeToPosition } from '@/utils/timeUtils';
import PlaceCard from './PlaceCard';

interface DragDropProviderProps {
  children: React.ReactNode;
}

const DragDropProvider = ({ children }: DragDropProviderProps) => {
  const { dispatch } = useTripCreation();
  const [activeItem, setActiveItem] = React.useState<ScheduleItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(active.data.current?.item || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.data.current?.item) {
      const item = active.data.current.item as ScheduleItem;
      const dropTarget = over.data.current;
      
      // Handle drop on time grid
      if (dropTarget?.type === 'time-grid' && dropTarget?.date) {
        const rect = over.rect;
        const y = event.delta.y + (active.rect.current.translated?.top || 0) - (rect?.top || 0);
        const snappedPosition = snapToGrid(Math.max(0, y), 30); // Snap to 30-minute intervals
        const startTime = positionToTime(snappedPosition, 6);
        
        // Default duration based on item type
        const defaultDuration = item.duration || (item.type === 'restaurant' ? 90 : 120);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const endMinutes = startHours * 60 + startMinutes + defaultDuration;
        const endHours = Math.floor(endMinutes / 60);
        const endMins = endMinutes % 60;
        const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
        
        dispatch({
          type: 'ADD_ITEM_TO_SCHEDULE',
          payload: {
            dayKey: dropTarget.date,
            timeSlotId: `slot-${Date.now()}`,
            item,
            startTime,
            endTime,
          },
        });
      }
      // Handle drop on existing time slot (legacy support)
      else if (dropTarget?.date && dropTarget?.slotId) {
        dispatch({
          type: 'UPDATE_TIME_SLOT',
          payload: {
            date: dropTarget.date,
            slotId: dropTarget.slotId,
            item,
          },
        });
      }
    }
    
    setActiveItem(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeItem ? (
          <div className="transform rotate-6 opacity-90">
            <PlaceCard item={activeItem} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragDropProvider;
