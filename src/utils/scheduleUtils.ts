
import { TimeSlot } from '@/types/schedule';

export const generateTimeSlots = (): TimeSlot[] => {
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
      duration: 60, // 1 hour default
    });
  }
  
  return slots;
};
