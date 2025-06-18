
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlaceData {
  id: string;
  title: string;
  rating: number;
  distance: string;
  image: string;
  category: 'attraction' | 'restaurant' | 'hotel';
  priceLevel?: number;
}

interface DragDropState {
  draggedItem: PlaceData | null;
  isDragging: boolean;
  hoveredSlot: string | null;
}

interface DragDropContextType {
  state: DragDropState;
  setDraggedItem: (item: PlaceData | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  setHoveredSlot: (slotId: string | null) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export const DragDropProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DragDropState>({
    draggedItem: null,
    isDragging: false,
    hoveredSlot: null,
  });

  const setDraggedItem = (item: PlaceData | null) => {
    setState(prev => ({ ...prev, draggedItem: item }));
  };

  const setIsDragging = (isDragging: boolean) => {
    setState(prev => ({ ...prev, isDragging }));
  };

  const setHoveredSlot = (slotId: string | null) => {
    setState(prev => ({ ...prev, hoveredSlot: slotId }));
  };

  return (
    <DragDropContext.Provider value={{
      state,
      setDraggedItem,
      setIsDragging,
      setHoveredSlot,
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

export type { PlaceData };
