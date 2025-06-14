import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Backend Integration Notes for bolt.new:
// 1. This context manages trip creation state on the frontend
// 2. When ready to connect backend, add API calls to:
//    - POST /api/trips - to create new trip
//    - POST /api/trips/{id}/members - to add group members
//    - GET /api/countries - to fetch countries list
// 3. Consider adding validation schema with Zod for API requests
// 4. Add loading states and error handling for API calls

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  // Backend Note: Add userId field when user authentication is implemented
  // userId?: string;
}

export interface TripCreationState {
  tripType: 'group' | 'personal' | null;
  destinationType: 'domestic' | 'international' | null;
  selectedCountry: string | null;
  groupSize: number;
  groupMembers: GroupMember[];
  currentStep: number;
  // -- ADDED FOR DATE SELECTOR --
  dateType: "single" | "range";
  startDate: Date | null;
  dateRange: import("react-day-picker").DateRange | undefined;
  // ... backend notes ...
}

type TripCreationAction =
  | { type: 'SET_TRIP_TYPE'; payload: 'group' | 'personal' }
  | { type: 'SET_DESTINATION_TYPE'; payload: 'domestic' | 'international' }
  | { type: 'SET_SELECTED_COUNTRY'; payload: string }
  | { type: 'SET_GROUP_SIZE'; payload: number }
  | { type: 'SET_GROUP_MEMBERS'; payload: GroupMember[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'RESET' }
  // ---- NEW DATE ACTIONS ----
  | { type: 'SET_DATE_TYPE'; payload: "single" | "range" }
  | { type: 'SET_START_DATE'; payload: Date | null }
  | { type: 'SET_DATE_RANGE'; payload: import("react-day-picker").DateRange | undefined };

const initialState: TripCreationState = {
  tripType: null,
  destinationType: null,
  selectedCountry: null,
  groupSize: 1,
  groupMembers: [],
  currentStep: 1,
  // --- INITIALIZE DATES ---
  dateType: "single",
  startDate: null,
  dateRange: undefined,
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
    case 'SET_DATE_TYPE':
      return { ...state, dateType: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    default:
      return state;
  }
};

interface TripCreationContextType {
  state: TripCreationState;
  dispatch: React.Dispatch<TripCreationAction>;
  // Backend Integration: Add these methods when implementing API
  // createTrip: () => Promise<void>;
  // updateTrip: () => Promise<void>;
  // saveGroupMembers: () => Promise<void>;
}

const TripCreationContext = createContext<TripCreationContextType | undefined>(undefined);

export const TripCreationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(tripCreationReducer, initialState);

  // Backend Integration: Implement these functions when connecting to API
  // const createTrip = async () => {
  //   try {
  //     dispatch({ type: 'SET_LOADING', payload: true });
  //     const response = await fetch('/api/trips', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         tripType: state.tripType,
  //         destinationType: state.destinationType,
  //         selectedCountry: state.selectedCountry,
  //         groupSize: state.groupSize,
  //         groupMembers: state.groupMembers
  //       })
  //     });
  //     const data = await response.json();
  //     dispatch({ type: 'SET_TRIP_ID', payload: data.id });
  //   } catch (error) {
  //     dispatch({ type: 'SET_ERROR', payload: error.message });
  //   } finally {
  //     dispatch({ type: 'SET_LOADING', payload: false });
  //   }
  // };

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
