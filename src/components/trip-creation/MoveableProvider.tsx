
import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { ScheduleItem } from '@/types/schedule';
import { positionToTime, snapToGrid, timeToPosition } from '@/utils/timeUtils';
import PlaceCard from './PlaceCard';

interface MoveableContextType {
  activeItem: ScheduleItem | null;
  setActiveItem: (item: ScheduleItem | null) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  dragPosition: { x: number; y: number } | null;
  setDragPosition: (position: { x: number; y: number } | null) => void;
  handleDragStart: (item: ScheduleItem, e: any) => void;
  handleDrag: (e: any) => void;
  handleDragEnd: (e: any) => void;
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
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  const handleDragStart = useCallback((item: ScheduleItem, e: any) => {
    setActiveItem(item);
    setIsDragging(true);
    setDragPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleDrag = useCallback((e: any) => {
    if (isDragging && activeItem) {
      setDragPosition({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, activeItem]);

  const handleDragEnd = useCallback((e: any) => {
    if (!activeItem || !isDragging) return;

    // Find drop target by coordinates
    const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);
    const timeGrid = elementUnderMouse?.closest('[data-time-grid]');
    
    if (timeGrid) {
      const date = timeGrid.getAttribute('data-date');
      const rect = timeGrid.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      
      // Snap to 30-minute intervals (30px = 30 minutes)
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
    
    // Reset drag state
    setActiveItem(null);
    setIsDragging(false);
    setDragPosition(null);
  }, [activeItem, isDragging, dispatch]);

  const contextValue: MoveableContextType = {
    activeItem,
    setActiveItem,
    isDragging,
    setIsDragging,
    dragPosition,
    setDragPosition,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };

  return (
    <MoveableContext.Provider value={contextValue}>
      {children}
      {/* Drag overlay */}
      {isDragging && activeItem && dragPosition && (
        <div 
          className="fixed pointer-events-none z-50"
          style={{ 
            left: `${dragPosition.x}px`,
            top: `${dragPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 9999 
          }}
        >
          <div className="transform rotate-6 opacity-90 scale-105">
            <PlaceCard item={activeItem} isDragging />
          </div>
        </div>
      )}
    </MoveableContext.Provider>
  );
};

export default MoveableProvider;
