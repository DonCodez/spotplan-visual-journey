
import { format, addMinutes, differenceInMinutes, startOfDay } from 'date-fns';

const isValidTime = (time: string): boolean => {
  if (!time || typeof time !== 'string') return false;
  const parts = time.split(':');
  if (parts.length !== 2) return false;
  
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  
  return !isNaN(hours) && !isNaN(minutes) && 
         hours >= 0 && hours <= 23 && 
         minutes >= 0 && minutes <= 59;
};

export const formatTimeAMPM = (time: string): string => {
  if (!isValidTime(time)) {
    console.warn('Invalid time format:', time);
    return '12:00 AM'; // Fallback
  }
  
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return format(date, 'h:mm a');
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    console.warn('Invalid time range:', { startTime, endTime });
    return '12:00 AM - 12:00 AM'; // Fallback
  }
  
  return `${formatTimeAMPM(startTime)} - ${formatTimeAMPM(endTime)}`;
};

export const generateTimeSlots = (startHour: number = 6, endHour: number = 23, intervalMinutes: number = 15) => {
  const slots = [];
  const startDate = startOfDay(new Date());
  startDate.setHours(startHour, 0, 0, 0);
  
  const totalMinutes = (endHour - startHour + 1) * 60;
  const totalSlots = totalMinutes / intervalMinutes;
  
  for (let i = 0; i < totalSlots; i++) {
    const slotStart = addMinutes(startDate, i * intervalMinutes);
    const slotEnd = addMinutes(slotStart, intervalMinutes);
    
    slots.push({
      startTime: format(slotStart, 'HH:mm'),
      endTime: format(slotEnd, 'HH:mm'),
      position: i * intervalMinutes,
    });
  }
  
  return slots;
};

export const timeToPosition = (time: string, startHour: number = 6, pixelsPerMinute: number = 2): number => {
  if (!isValidTime(time)) return 0;
  
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = (hours - startHour) * 60 + minutes;
  return Math.max(0, totalMinutes * pixelsPerMinute);
};

export const positionToTime = (position: number, startHour: number = 6, pixelsPerMinute: number = 2): string => {
  const totalMinutes = Math.round(position / pixelsPerMinute);
  const hours = Math.floor(totalMinutes / 60) + startHour;
  const minutes = totalMinutes % 60;
  
  // Ensure we don't go past 23:59 or below startHour:00
  const constrainedHours = Math.min(23, Math.max(startHour, hours));
  const constrainedMinutes = constrainedHours === 23 && minutes > 59 ? 59 : Math.max(0, minutes);
  
  return `${constrainedHours.toString().padStart(2, '0')}:${constrainedMinutes.toString().padStart(2, '0')}`;
};

export const snapToGrid = (position: number, gridSize: number = 30): number => {
  return Math.round(position / gridSize) * gridSize;
};

export const snapTimeToInterval = (time: string, intervalMinutes: number = 30): string => {
  if (!isValidTime(time)) return '06:00';
  
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const snappedMinutes = Math.round(totalMinutes / intervalMinutes) * intervalMinutes;
  
  const snappedHours = Math.floor(snappedMinutes / 60);
  const remainingMinutes = snappedMinutes % 60;
  
  // Ensure valid time range
  const constrainedHours = Math.min(23, Math.max(0, snappedHours));
  const constrainedMinutes = constrainedHours === 23 && remainingMinutes > 59 ? 59 : remainingMinutes;
  
  return `${constrainedHours.toString().padStart(2, '0')}:${constrainedMinutes.toString().padStart(2, '0')}`;
};

export const calculateDuration = (startTime: string, endTime: string): number => {
  if (!isValidTime(startTime) || !isValidTime(endTime)) return 0;
  
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const startDate = new Date();
  startDate.setHours(startHours, startMinutes, 0, 0);
  
  const endDate = new Date();
  endDate.setHours(endHours, endMinutes, 0, 0);
  
  // Handle case where end time is next day (past midnight)
  if (endDate <= startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }
  
  return differenceInMinutes(endDate, startDate);
};
