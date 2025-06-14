
import { TimeSlot, DaySchedule, Place, Restaurant, Hotel } from '@/types/schedule';

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
  isAccommodationModalOpen: boolean;
  
  // Backend Integration: Add these fields when implementing API
  // isLoading?: boolean;
  // error?: string | null;
  // tripId?: string; // Will be set when trip is created on backend
  // placesData?: Place[]; // From Google Places API
  // restaurantsData?: Restaurant[]; // Filtered restaurants
  // hotelsData?: Hotel[]; // Available hotels
}

export type TripCreationAction =
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
