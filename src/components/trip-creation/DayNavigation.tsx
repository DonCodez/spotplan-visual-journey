
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const DayNavigation = () => {
  const { state, dispatch } = useTripCreation();
  const [currentPage, setCurrentPage] = useState(0);
  const daysPerPage = 7; // Show 7 days at a time
  const totalPages = Math.ceil(state.tripDates.length / daysPerPage);

  const getCurrentPageDays = () => {
    const startIndex = currentPage * daysPerPage;
    const endIndex = Math.min(startIndex + daysPerPage, state.tripDates.length);
    return state.tripDates.slice(startIndex, endIndex);
  };

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

  if (state.tripDates.length === 0) {
    return null;
  }

  // If we have 7 or fewer days, show all days in a row
  if (state.tripDates.length <= 7) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Day</h3>
          <span className="text-sm text-gray-500">{state.tripDates.length} days total</span>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {state.tripDates.map((date, index) => {
            const dateKey = date.toISOString().split('T')[0];
            const isSelected = state.selectedDay === dateKey;
            return (
              <motion.button
                key={dateKey}
                onClick={() => handleDaySelect(date)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 min-w-[80px]",
                  isSelected
                    ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                )}
              >
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-medium">Day {index + 1}</span>
                <span className="text-xs">{formatDate(date)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // For more than 7 days, use pagination
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Day</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{state.tripDates.length} days total</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-auto">
        {getCurrentPageDays().map((date) => {
          const dateKey = date.toISOString().split('T')[0];
          const isSelected = state.selectedDay === dateKey;
          const dayNumber = getDayNumber(date);
          
          return (
            <motion.button
              key={dateKey}
              onClick={() => handleDaySelect(date)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 min-w-[80px]",
                isSelected
                  ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              )}
            >
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium">Day {dayNumber}</span>
              <span className="text-xs">{formatDate(date)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default DayNavigation;
