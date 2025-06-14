
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DragDropState {
  isDragging: boolean;
  draggedItem: any | null;
  draggedItemType: 'place' | 'restaurant' | null;
  setDragging: (isDragging: boolean) => void;
  setDraggedItem: (item: any | null, type: 'place' | 'restaurant' | null) => void;
}

const DragDropContext = createContext<DragDropState | undefined>(undefined);

export const DragDropProvider = ({ children }: { children: ReactNode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItemState] = useState<any | null>(null);
  const [draggedItemType, setDraggedItemType] = useState<'place' | 'restaurant' | null>(null);

  const setDragging = (dragging: boolean) => {
    setIsDragging(dragging);
    if (!dragging) {
      setDraggedItemState(null);
      setDraggedItemType(null);
    }
  };

  const setDraggedItem = (item: any | null, type: 'place' | 'restaurant' | null) => {
    setDraggedItemState(item);
    setDraggedItemType(type);
  };

  return (
    <DragDropContext.Provider value={{
      isDragging,
      draggedItem,
      draggedItemType,
      setDragging,
      setDraggedItem
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
