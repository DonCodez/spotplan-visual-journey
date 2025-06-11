
import { format, addMinutes, differenceInMinutes, startOfDay } from 'date-fns';

export const formatTimeAMPM = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return format(date, 'h:mm a');
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
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

export const timeToPosition = (time: string, startHour: number = 6): number => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = (hours - startHour) * 60 + minutes;
  return Math.max(0, totalMinutes);
};

export const positionToTime = (position: number, startHour: number = 6): string => {
  const totalMinutes = position;
  const hours = Math.floor(totalMinutes / 60) + startHour;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const snapToGrid = (position: number, gridSize: number = 15): number => {
  return Math.round(position / gridSize) * gridSize;
};

export const calculateDuration = (startTime: string, endTime: string): number => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const startDate = new Date();
  startDate.setHours(startHours, startMinutes, 0, 0);
  
  const endDate = new Date();
  endDate.setHours(endHours, endMinutes, 0, 0);
  
  return differenceInMinutes(endDate, startDate);
};
