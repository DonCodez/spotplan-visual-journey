
import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { ScheduleItem } from '@/types/schedule';
import { positionToTime, snapToGrid, timeToPosition } from '@/utils/timeUtils';
import PlaceCard from './PlaceCard';

interface MoveableContextType {
  activeItem: ScheduleItem | null;
  setActiveItem: (item: ScheduleItem | null) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  dragTarget: HTMLElement | null;
  setDragTarget: (target: HTMLElement | null) => void;
  handleDragStart: (item: ScheduleItem, target: HTMLElement) => void;
  handleDragEnd: (x: number, y: number) => void;
}

const MoveableContext = createContext<MoveableContextType | null>(null);

export const useMoveableContext = () => {
  const context = useContext(MoveableContext);
  if (!context) {
    throw new Error('useMoveableContext must be used within MoveableProvider');
  }
  return context;
};

interface MoveableProviderProps {
  children: React.ReactNode;
}

const MoveableProvider = ({ children }: MoveableProviderProps) => {
  const { dispatch } = useTripCreation();
  const [activeItem, setActiveItem] = useState<ScheduleItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState<HTMLElement | null>(null);

  const handleDragStart = useCallback((item: ScheduleItem, target: HTMLElement) => {
    setActiveItem(item);
    setDragTarget(target);
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((x: number, y: number) => {
    if (!activeItem) return;

    // Find drop target by coordinates
    const elementUnderMouse = document.elementFromPoint(x, y);
    const timeGrid = elementUnderMouse?.closest('[data-time-grid]');
    
    if (timeGrid) {
      const date = timeGrid.getAttribute('data-date');
      const rect = timeGrid.getBoundingClientRect();
      const relativeY = y - rect.top;
      const snappedPosition = snapToGrid(Math.max(0, relativeY), 30);
      const startTime = positionToTime(snappedPosition, 6);
      
      // Default duration based on item type
      const defaultDuration = activeItem.duration || (activeItem.type === 'restaurant' ? 90 : 120);
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const endMinutes = startHours * 60 + startMinutes + defaultDuration;
      const endHours = Math.floor(endMinutes / 60);
      const endMins = endMinutes % 60;
      const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
      
      if (date) {
        dispatch({
          type: 'ADD_ITEM_TO_SCHEDULE',
          payload: {
            dayKey: date,
            timeSlotId: `slot-${Date.now()}`,
            item: activeItem,
            startTime,
            endTime,
          },
        });
      }
    }
    
    setActiveItem(null);
    setDragTarget(null);
    setIsDragging(false);
  }, [activeItem, dispatch]);

  const contextValue: MoveableContextType = {
    activeItem,
    setActiveItem,
    isDragging,
    setIsDragging,
    dragTarget,
    setDragTarget,
    handleDragStart,
    handleDragEnd,
  };

  return (
    <MoveableContext.Provider value={contextValue}>
      {children}
      {/* Drag overlay */}
      {isDragging && activeItem && (
        <div 
          className="fixed top-0 left-0 pointer-events-none z-50"
          style={{ 
            transform: 'translate(-50%, -50%)',
            zIndex: 9999 
          }}
          id="drag-overlay"
        >
          <div className="transform rotate-6 opacity-90">
            <PlaceCard item={activeItem} isDragging />
          </div>
        </div>
      )}
    </MoveableContext.Provider>
  );
};

export default MoveableProvider;
