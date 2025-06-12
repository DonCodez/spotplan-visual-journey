
import { useState, useRef, useCallback } from 'react';
import { calculateDuration } from '@/utils/timeUtils';

const PIXELS_PER_MINUTE = 2;
const SNAP_INTERVAL_MINUTES = 30;
const SNAP_INTERVAL_PIXELS = SNAP_INTERVAL_MINUTES * PIXELS_PER_MINUTE;
const MIN_DURATION_MINUTES = 30;
const MAX_DURATION_MINUTES = 480;

export const useResizableActivity = (
  startTime: string,
  endTime: string,
  onResize: (newStartTime: string, newEndTime: string) => void,
  onDrag?: (newStartTime: string) => void
) => {
  const [isMoving, setIsMoving] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [previewEndTime, setPreviewEndTime] = useState<string | null>(null);
  const [previewStartTime, setPreviewStartTime] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const duration = calculateDuration(startTime, endTime);
  const height = Math.max(MIN_DURATION_MINUTES * PIXELS_PER_MINUTE, duration * PIXELS_PER_MINUTE);

  const calculateNewEndTime = useCallback((newHeight: number): string => {
    const constrainedHeight = Math.max(
      MIN_DURATION_MINUTES * PIXELS_PER_MINUTE,
      Math.min(MAX_DURATION_MINUTES * PIXELS_PER_MINUTE, newHeight)
    );
    
    const newDurationMinutes = constrainedHeight / PIXELS_PER_MINUTE;
    const [hours, minutes] = startTime.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      console.warn('Invalid startTime:', startTime);
      return '23:59';
    }
    
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + newDurationMinutes;
    
    const newEndHours = Math.floor(endMinutes / 60);
    const newEndMins = Math.round(endMinutes % 60);
    
    if (newEndHours >= 24) {
      return '23:59';
    }
    
    const constrainedHours = Math.min(23, Math.max(0, newEndHours));
    const constrainedMinutes = Math.min(59, Math.max(0, newEndMins));
    
    return `${constrainedHours.toString().padStart(2, '0')}:${constrainedMinutes.toString().padStart(2, '0')}`;
  }, [startTime]);

  const calculateNewStartTime = useCallback((yPosition: number): string => {
    const startHour = 6;
    const totalMinutes = Math.max(0, Math.round(yPosition / PIXELS_PER_MINUTE));
    const hours = Math.floor(totalMinutes / 60) + startHour;
    const minutes = totalMinutes % 60;
    
    const constrainedHours = Math.min(23, Math.max(startHour, hours));
    const constrainedMinutes = constrainedHours === 23 && minutes > 59 ? 59 : Math.max(0, Math.round(minutes));
    
    return `${constrainedHours.toString().padStart(2, '0')}:${constrainedMinutes.toString().padStart(2, '0')}`;
  }, []);

  const handleDrag = useCallback(({ transform }: any) => {
    const yPosition = Math.max(0, transform[1]);
    const snappedY = Math.round(yPosition / SNAP_INTERVAL_PIXELS) * SNAP_INTERVAL_PIXELS;
    const newStartTime = calculateNewStartTime(snappedY);
    setPreviewStartTime(newStartTime);
    
    if (targetRef.current) {
      targetRef.current.style.transform = `translateY(${snappedY}px)`;
    }
  }, [calculateNewStartTime]);

  const handleDragEnd = useCallback(() => {
    setIsMoving(false);
    if (previewStartTime && onDrag) {
      onDrag(previewStartTime);
    }
    setPreviewStartTime(null);
    
    if (targetRef.current) {
      targetRef.current.style.transform = '';
    }
  }, [previewStartTime, onDrag]);

  const handleResize = useCallback(({ width, height: newHeight }: any) => {
    const snappedHeight = Math.round(newHeight / SNAP_INTERVAL_PIXELS) * SNAP_INTERVAL_PIXELS;
    const newEndTime = calculateNewEndTime(snappedHeight);
    setPreviewEndTime(newEndTime);
    
    if (targetRef.current) {
      targetRef.current.style.height = `${snappedHeight}px`;
    }
  }, [calculateNewEndTime]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    if (previewEndTime) {
      onResize(startTime, previewEndTime);
    }
    setPreviewEndTime(null);
    
    if (targetRef.current) {
      targetRef.current.style.height = '';
    }
  }, [previewEndTime, startTime, onResize]);

  const displayEndTime = previewEndTime && previewEndTime !== 'Invalid Date' ? previewEndTime : endTime;
  const displayStartTime = previewStartTime && previewStartTime !== 'Invalid Date' ? previewStartTime : startTime;

  return {
    targetRef,
    isMoving,
    isResizing,
    previewEndTime,
    previewStartTime,
    height,
    displayStartTime,
    displayEndTime,
    setIsMoving,
    setIsResizing,
    handleDrag,
    handleDragEnd,
    handleResize,
    handleResizeEnd
  };
};
