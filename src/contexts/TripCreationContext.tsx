
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface GroupMember {
  id: string;
  name: string;
  email: string;
}

export interface TripCreationState {
  tripType: 'group' | 'personal' | null;
  destinationType: 'domestic' | 'international' | null;
  selectedCountry: string | null;
  groupSize: number;
  groupMembers: GroupMember[];
  currentStep: number;
}

type TripCreationAction =
  | { type: 'SET_TRIP_TYPE'; payload: 'group' | 'personal' }
  | { type: 'SET_DESTINATION_TYPE'; payload: 'domestic' | 'international' }
  | { type: 'SET_SELECTED_COUNTRY'; payload: string }
  | { type: 'SET_GROUP_SIZE'; payload: number }
  | { type: 'SET_GROUP_MEMBERS'; payload: GroupMember[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'RESET' };

const initialState: TripCreationState = {
  tripType: null,
  destinationType: null,
  selectedCountry: null,
  groupSize: 1,
  groupMembers: [],
  currentStep: 1,
};

const tripCreationReducer = (state: TripCreationState, action: TripCreationAction): TripCreationState => {
  switch (action.type) {
    case 'SET_TRIP_TYPE':
      return { 
        ...state, 
        tripType: action.payload,
        // Reset group data when switching away from group
        ...(action.payload === 'personal' && { groupSize: 1, groupMembers: [] })
      };
    case 'SET_DESTINATION_TYPE':
      return { ...state, destinationType: action.payload };
    case 'SET_SELECTED_COUNTRY':
      return { ...state, selectedCountry: action.payload };
    case 'SET_GROUP_SIZE':
      return { ...state, groupSize: action.payload };
    case 'SET_GROUP_MEMBERS':
      return { ...state, groupMembers: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface TripCreationContextType {
  state: TripCreationState;
  dispatch: React.Dispatch<TripCreationAction>;
}

const TripCreationContext = createContext<TripCreationContextType | undefined>(undefined);

export const TripCreationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tripCreationReducer, initialState);

  return (
    <TripCreationContext.Provider value={{ state, dispatch }}>
      {children}
    </TripCreationContext.Provider>
  );
};

export const useTripCreation = () => {
  const context = useContext(TripCreationContext);
  if (context === undefined) {
    throw new Error('useTripCreation must be used within a TripCreationProvider');
  }
  return context;
};
