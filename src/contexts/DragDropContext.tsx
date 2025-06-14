
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DragDropState {
  isDragging: boolean;
  draggedItem: any | null;
  draggedItemType: 'place' | 'restaurant' | null;
  mousePosition: { x: number; y: number } | null;
  setDragging: (isDragging: boolean) => void;
  setDraggedItem: (item: any | null, type: 'place' | 'restaurant' | null) => void;
  setMousePosition: (position: { x: number; y: number } | null) => void;
  getDropTarget: () => HTMLElement | null;
}

const DragDropContext = createContext<DragDropState | undefined>(undefined);

export const DragDropProvider = ({ children }: { children: ReactNode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItemState] = useState<any | null>(null);
  const [draggedItemType, setDraggedItemType] = useState<'place' | 'restaurant' | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  const setDragging = (dragging: boolean) => {
    setIsDragging(dragging);
    if (!dragging) {
      setDraggedItemState(null);
      setDraggedItemType(null);
      setMousePosition(null);
    }
  };

  const setDraggedItem = (item: any | null, type: 'place' | 'restaurant' | null) => {
    setDraggedItemState(item);
    setDraggedItemType(type);
  };

  const getDropTarget = () => {
    if (!mousePosition) return null;
    
    const elements = document.elementsFromPoint(mousePosition.x, mousePosition.y);
    for (const element of elements) {
      if (element.classList.contains('time-slot-drop-zone')) {
        return element as HTMLElement;
      }
    }
    return null;
  };

  return (
    <DragDropContext.Provider value={{
      isDragging,
      draggedItem,
      draggedItemType,
      mousePosition,
      setDragging,
      setDraggedItem,
      setMousePosition,
      getDropTarget
    }}>
      {children}
    </DragDropContext.Provider>
  );
};

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
};
