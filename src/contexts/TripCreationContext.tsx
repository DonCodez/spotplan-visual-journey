
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TripCreationState, TripCreationAction } from '@/types/tripCreation';
import { tripCreationReducer, initialState } from '@/reducers/tripCreationReducer';

// Backend Integration Notes for bolt.new:
// 1. This context manages trip creation state on the frontend
// 2. When ready to connect backend, add API calls to:
//    - POST /api/trips - to create new trip
//    - POST /api/trips/{id}/members - to add group members
//    - GET /api/countries - to fetch countries list
//    - GET /api/places - Google Places API integration
//    - GET /api/restaurants - Restaurant filtering and search
//    - GET /api/hotels - Hotel booking integration
//    - POST /api/trips/{id}/schedule - Save daily schedules
// 3. Consider adding validation schema with Zod for API requests
// 4. Add loading states and error handling for API calls

interface TripCreationContextType {
  state: TripCreationState;
  dispatch: React.Dispatch<TripCreationAction>;
  // Backend Integration: Add these methods when implementing API
  // createTrip: () => Promise<void>;
  // updateTrip: () => Promise<void>;
  // saveGroupMembers: () => Promise<void>;
  // fetchPlaces: (day: string, coordinates?: { lat: number; lng: number }) => Promise<Place[]>;
  // fetchRestaurants: (day: string, mealType: string, coordinates?: { lat: number; lng: number }) => Promise<Restaurant[]>;
  // fetchHotels: (day: string, coordinates?: { lat: number; lng: number }) => Promise<Hotel[]>;
  // saveSchedule: () => Promise<void>;
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

  // const fetchPlaces = async (day: string, coordinates?: { lat: number; lng: number }) => {
  //   try {
  //     const params = new URLSearchParams({
  //       day,
  //       lat: coordinates?.lat.toString() || '',
  //       lng: coordinates?.lng.toString() || '',
  //       type: 'tourist_attraction',
  //       country: state.selectedCountry || ''
  //     });
  //     const response = await fetch(`/api/places?${params}`);
  //     const places = await response.json();
  //     dispatch({ type: 'SET_PLACES_DATA', payload: places });
  //     return places;
  //   } catch (error) {
  //     console.error('Failed to fetch places:', error);
  //     return [];
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
