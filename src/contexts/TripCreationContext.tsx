
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TimeSlot, DaySchedule, Place, Restaurant, Hotel } from '@/types/schedule';

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
  
  // Schedule Builder State
  tripDates: Date[];
  dailySchedules: Record<string, DaySchedule>;
  selectedDay: string | null;
  activeMealSlot: string | null;
  accommodations: Hotel[];
  
  // Accommodation Modal State
  isAccommodationModalOpen: boolean;
  
  // Backend Integration: Add these fields when implementing API
  // isLoading?: boolean;
  // error?: string | null;
  // tripId?: string; // Will be set when trip is created on backend
  // placesData?: Place[]; // From Google Places API
  // restaurantsData?: Restaurant[]; // Filtered restaurants
  // hotelsData?: Hotel[]; // Available hotels
}

type TripCreationAction =
  | { type: 'SET_TRIP_TYPE'; payload: 'group' | 'personal' }
  | { type: 'SET_DESTINATION_TYPE'; payload: 'domestic' | 'international' }
  | { type: 'SET_SELECTED_COUNTRY'; payload: string }
  | { type: 'SET_GROUP_SIZE'; payload: number }
  | { type: 'SET_GROUP_MEMBERS'; payload: GroupMember[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_TRIP_DATES'; payload: Date[] }
  | { type: 'SET_DAILY_SCHEDULES'; payload: Record<string, DaySchedule> }
  | { type: 'SET_SELECTED_DAY'; payload: string | null }
  | { type: 'SET_ACTIVE_MEAL_SLOT'; payload: string | null }
  | { type: 'UPDATE_TIME_SLOT'; payload: { date: string; slotId: string; item: any } }
  | { type: 'ADD_ACCOMMODATION'; payload: Hotel }
  | { type: 'OPEN_ACCOMMODATION_MODAL' }
  | { type: 'CLOSE_ACCOMMODATION_MODAL' }
  | { type: 'ADD_ITEM_TO_SCHEDULE'; payload: { dayKey: string; timeSlotId: string; item: any; startTime: string; endTime: string } }
  | { type: 'RESET' };
  // Backend Integration: Add these actions when implementing API
  // | { type: 'SET_LOADING'; payload: boolean }
  // | { type: 'SET_ERROR'; payload: string | null }
  // | { type: 'SET_TRIP_ID'; payload: string }
  // | { type: 'SET_PLACES_DATA'; payload: Place[] }
  // | { type: 'SET_RESTAURANTS_DATA'; payload: Restaurant[] }
  // | { type: 'SET_HOTELS_DATA'; payload: Hotel[] }

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  // Generate hourly slots from 6 AM to 11 PM
  for (let hour = 6; hour <= 23; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    
    let type: 'activity' | 'meal' | 'accommodation' | 'free' = 'free';
    let isEditable = true;
    
    // Pre-fill meal slots
    if (hour === 8) {
      type = 'meal';
      // Can be edited to change meal times
    } else if (hour === 13) {
      type = 'meal';
    } else if (hour === 20) {
      type = 'meal';
    }
    
    slots.push({
      id: `slot-${hour}`,
      startTime,
      endTime,
      type,
      isEditable,
    });
  }
  
  return slots;
};

const initialState: TripCreationState = {
  tripType: null,
  destinationType: null,
  selectedCountry: null,
  groupSize: 1,
  groupMembers: [],
  currentStep: 1,
  tripDates: [],
  dailySchedules: {},
  selectedDay: null,
  activeMealSlot: null,
  accommodations: [],
  isAccommodationModalOpen: false,
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
    case 'SET_TRIP_DATES':
      // Generate daily schedules when dates are set
      const schedules: Record<string, DaySchedule> = {};
      action.payload.forEach(date => {
        const dateKey = date.toISOString().split('T')[0];
        schedules[dateKey] = {
          date: dateKey,
          timeSlots: generateTimeSlots(),
        };
      });
      return { 
        ...state, 
        tripDates: action.payload,
        dailySchedules: schedules,
        selectedDay: action.payload.length > 0 ? action.payload[0].toISOString().split('T')[0] : null
      };
    case 'SET_SELECTED_DAY':
      return { ...state, selectedDay: action.payload };
    case 'SET_ACTIVE_MEAL_SLOT':
      return { ...state, activeMealSlot: action.payload };
    case 'UPDATE_TIME_SLOT': {
      const { date, slotId, item } = action.payload;
      const updatedSchedules = { ...state.dailySchedules };
      const daySchedule = updatedSchedules[date];
      if (daySchedule) {
        daySchedule.timeSlots = daySchedule.timeSlots.map(slot =>
          slot.id === slotId ? { ...slot, item, type: item ? 'activity' : 'free' } : slot
        );
      }
      return { ...state, dailySchedules: updatedSchedules };
    }
    case 'ADD_ACCOMMODATION':
      return { ...state, accommodations: [...state.accommodations, action.payload] };
    case 'OPEN_ACCOMMODATION_MODAL':
      return { ...state, isAccommodationModalOpen: true };
    case 'CLOSE_ACCOMMODATION_MODAL':
      return { ...state, isAccommodationModalOpen: false };
    case 'ADD_ITEM_TO_SCHEDULE': {
      const { dayKey, timeSlotId, item, startTime, endTime } = action.payload;
      const scheduleUpdates = { ...state.dailySchedules };
      const targetDaySchedule = scheduleUpdates[dayKey];
      if (targetDaySchedule) {
        // Find or create time slot for the specific time
        const existingSlotIndex = targetDaySchedule.timeSlots.findIndex(slot => 
          slot.startTime === startTime && slot.endTime === endTime
        );
        
        if (existingSlotIndex >= 0) {
          // Update existing slot
          targetDaySchedule.timeSlots[existingSlotIndex] = {
            ...targetDaySchedule.timeSlots[existingSlotIndex],
            item,
            type: item ? 'activity' : 'free'
          };
        } else {
          // Add new slot
          targetDaySchedule.timeSlots.push({
            id: timeSlotId,
            startTime,
            endTime,
            type: 'activity',
            item,
            isEditable: true
          });
          // Sort slots by time
          targetDaySchedule.timeSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
        }
      }
      return { ...state, dailySchedules: scheduleUpdates };
    }
    case 'RESET':
      return initialState;
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

export default {
  TripCreationProvider,
  useTripCreation,
};
