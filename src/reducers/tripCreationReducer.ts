
import { TripCreationState, TripCreationAction } from '@/types/tripCreation';
import { DaySchedule, TimeSlot } from '@/types/schedule';
import { generateTimeSlots } from '@/utils/scheduleUtils';

export const initialState: TripCreationState = {
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

export const tripCreationReducer = (state: TripCreationState, action: TripCreationAction): TripCreationState => {
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
    case 'UPDATE_TIME_SLOT':
      const { date, slotId, item } = action.payload;
      const updatedSchedules = { ...state.dailySchedules };
      const daySchedule = updatedSchedules[date];
      if (daySchedule) {
        daySchedule.timeSlots = daySchedule.timeSlots.map(slot =>
          slot.id === slotId ? { ...slot, item, type: item ? 'activity' : 'free' } : slot
        );
      }
      return { ...state, dailySchedules: updatedSchedules };
    case 'ADD_ACCOMMODATION':
      return { ...state, accommodations: [...state.accommodations, action.payload] };
    case 'OPEN_ACCOMMODATION_MODAL':
      return { ...state, isAccommodationModalOpen: true };
    case 'CLOSE_ACCOMMODATION_MODAL':
      return { ...state, isAccommodationModalOpen: false };
    case 'ADD_ITEM_TO_SCHEDULE':
      const { dayKey, timeSlotId, item: scheduleItem, startTime, endTime } = action.payload;
      const updatedDailySchedules = { ...state.dailySchedules };
      const targetDaySchedule = updatedDailySchedules[dayKey];
      if (targetDaySchedule) {
        // Remove any existing slot with the same ID
        targetDaySchedule.timeSlots = targetDaySchedule.timeSlots.filter(slot => slot.id !== timeSlotId);
        
        // Add new slot with proper type
        const slotType: TimeSlot['type'] = scheduleItem?.type === 'restaurant' ? 'meal' : 'activity';
        const newSlot: TimeSlot = {
          id: timeSlotId,
          startTime,
          endTime,
          type: slotType,
          item: scheduleItem,
          isEditable: true,
          duration: scheduleItem?.duration || 60
        };
        
        targetDaySchedule.timeSlots.push(newSlot);
        targetDaySchedule.timeSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
      }
      return { ...state, dailySchedules: updatedDailySchedules };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
