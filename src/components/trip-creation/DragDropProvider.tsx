
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
      
      if (dropTarget?.date && dropTarget?.slotId) {
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
