
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { cn } from '@/lib/utils';

const DayNavigation = () => {
  const { state, dispatch } = useTripCreation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDayNumber = (date: Date) => {
    return state.tripDates.findIndex(d => 
      d.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    ) + 1;
  };

  const handleDaySelect = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    dispatch({ type: 'SET_SELECTED_DAY', payload: dateKey });
  };

  // Auto-scroll to selected day when it changes
  useEffect(() => {
    if (state.selectedDay && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(`[data-date="${state.selectedDay}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [state.selectedDay]);

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheelScroll = (e: WheelEvent) => {
      if (scrollContainerRef.current && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheelScroll, { passive: false });
      return () => container.removeEventListener('wheel', handleWheelScroll);
    }
  }, []);

  if (state.tripDates.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Day</h3>
        <span className="text-sm text-gray-500">{state.tripDates.length} days total</span>
      </div>
      
      {/* Horizontal scroll container with gradient shadows */}
      <div className="relative">
        {/* Left gradient shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        
        {/* Right gradient shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {state.tripDates.map((date) => {
            const dateKey = date.toISOString().split('T')[0];
            const isSelected = state.selectedDay === dateKey;
            const dayNumber = getDayNumber(date);
            
            return (
              <motion.button
                key={dateKey}
                data-date={dateKey}
                onClick={() => handleDaySelect(date)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 flex-shrink-0",
                  "min-w-[85px] hover:shadow-md",
                  isSelected
                    ? "border-spot-primary bg-spot-primary/10 text-spot-primary shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-medium">Day {dayNumber}</span>
                <span className="text-xs text-center leading-tight">{formatDate(date)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Scroll hint for users */}
      {state.tripDates.length > 7 && (
        <p className="text-xs text-gray-400 text-center mt-2">
          Scroll horizontally to see all days
        </p>
      )}
    </div>
  );
};

export default DayNavigation;
