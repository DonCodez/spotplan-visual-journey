
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { cn } from '@/lib/utils';

const DayNavigation = () => {
  const { state, dispatch } = useTripCreation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  // Check scroll position to show/hide arrows
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  // Scroll left by showing 3-4 days
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust based on day card width
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll right by showing 3-4 days
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust based on day card width
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
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
      container.addEventListener('scroll', checkScrollPosition);
      
      // Initial check
      checkScrollPosition();
      
      return () => {
        container.removeEventListener('wheel', handleWheelScroll);
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [checkScrollPosition]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollLeft();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      <div className="relative mb-4">
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

      {/* Arrow Navigation Controls - Below the scroll container */}
      {state.tripDates.length > 4 && (
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full p-2 border border-gray-200">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                canScrollLeft
                  ? "bg-white text-spot-primary hover:bg-spot-primary/10 border border-gray-200 hover:border-spot-primary shadow-sm cursor-pointer"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <span className="text-xs text-gray-500 px-2">Navigate</span>
            
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                canScrollRight
                  ? "bg-white text-spot-primary hover:bg-spot-primary/10 border border-gray-200 hover:border-spot-primary shadow-sm cursor-pointer"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      {/* Scroll hint for users */}
      {state.tripDates.length > 7 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Scroll horizontally or use arrows to navigate
          </p>
          <p className="text-xs text-gray-400 hidden md:block">
            Use arrow keys for keyboard navigation
          </p>
        </div>
      )}
    </div>
  );
};

export default DayNavigation;
