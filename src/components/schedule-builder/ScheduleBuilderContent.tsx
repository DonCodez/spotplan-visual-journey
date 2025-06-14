import React, { useState, useRef } from 'react';
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { DragDropProvider } from '@/contexts/DragDropContext';
import { format, addDays } from 'date-fns';
import SuggestionsPanel from './SuggestionsPanel';
import ScheduleCanvas from './ScheduleCanvas';
import AccommodationModal from './AccommodationModal';

const ScheduleBuilderContent = () => {
  const navigate = useNavigate();
  const { state } = useTripCreation();
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate days from trip dates
  const generateDays = () => {
    if (state.dateType === 'single' && state.startDate) {
      return [state.startDate];
    } else if (state.dateType === 'range' && state.dateRange?.from) {
      const days = [];
      const start = state.dateRange.from;
      const end = state.dateRange.to || start;
      
      let current = start;
      while (current <= end) {
        days.push(current);
        current = addDays(current, 1);
      }
      return days;
    }
    
    return [new Date()];
  };

  const days = generateDays();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -140, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 140, behavior: 'smooth' });
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    console.log('Proceeding to expense estimation...');
  };

  return (
    <DragDropProvider>
      <div className="min-h-screen bg-gray-50 relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-50 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header with Title */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">📅 Schedule Builder</h1>
            <p className="text-gray-600">Drag places from the left into your daily schedule</p>
          </div>
        </div>

        {/* Day Selector */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Select Day</h3>
            <span className="text-sm text-gray-500">{days.length} days total</span>
          </div>
          
          <div className="relative flex items-center">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 w-8 h-8 rounded-full bg-green-100 border border-green-200 flex items-center justify-center hover:bg-green-200 transition-all duration-200 opacity-70 hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4 text-green-700" />
            </button>

            {/* Scrollable Day Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto mx-10 scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
            >
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`flex-shrink-0 px-4 py-3 rounded-lg border text-center min-w-[120px] transition-colors ${
                    selectedDay === index
                      ? 'bg-[#6EBB2D] border-[#6EBB2D] text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-medium">Day {index + 1}</div>
                  <div className="text-xs mt-1">
                    {format(day, 'EEE, MMM d')}
                  </div>
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 w-8 h-8 rounded-full bg-green-100 border border-green-200 flex items-center justify-center hover:bg-green-200 transition-all duration-200 opacity-70 hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4 text-green-700" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Scroll horizontally or use arrows to navigate
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Suggestions */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <SuggestionsPanel />
          </div>

          {/* Right Panel - Schedule Canvas */}
          <div className="flex-1 relative overflow-hidden">
            <ScheduleCanvas selectedDay={selectedDay} date={days[selectedDay]} />
          </div>
        </div>

        {/* Floating Add Accommodation Button */}
        <div className="fixed bottom-6 left-6 z-20">
          <Button
            id="open-hotel-popup-button"
            onClick={() => setIsAccommodationModalOpen(true)}
            size="lg"
            className="h-14 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Hotel
          </Button>
        </div>

        {/* Sticky CTA Button */}
        <div className="fixed bottom-6 right-6 z-20">
          <Button
            id="next-to-expense-button"
            onClick={handleNext}
            size="lg"
            className="h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#317312] hover:bg-[#317312]/90 text-white"
          >
            Next → Estimate Expenses
          </Button>
        </div>

        {/* Accommodation Modal */}
        {isAccommodationModalOpen && (
          <AccommodationModal 
            isOpen={isAccommodationModalOpen}
            onClose={() => setIsAccommodationModalOpen(false)}
          />
        )}

        <style>
          {`.scrollbar-hide::-webkit-scrollbar { display: none; }`}
        </style>
      </div>
    </DragDropProvider>
  );
};

export default ScheduleBuilderContent;
