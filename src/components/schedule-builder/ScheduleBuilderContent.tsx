
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTripCreation } from '@/contexts/TripCreationContext';
import SuggestionsPanel from './SuggestionsPanel';
import ScheduleCanvas from './ScheduleCanvas';
import AccommodationModal from './AccommodationModal';

const ScheduleBuilderContent = () => {
  const navigate = useNavigate();
  const { state } = useTripCreation();
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    // Navigate to expense estimation page
    console.log('Proceeding to expense estimation...');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 left-4 z-50 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Left Panel - Suggestions */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <SuggestionsPanel />
          
          {/* Add Accommodation Button */}
          <div className="p-4 border-t border-gray-100">
            <Button
              id="open-hotel-popup-button"
              onClick={() => setIsAccommodationModalOpen(true)}
              variant="outline"
              className="w-full flex items-center gap-2 text-green-700 border-green-200 hover:bg-green-50"
            >
              <Plus className="w-4 h-4" />
              Add Accommodation
            </Button>
          </div>
        </div>

        {/* Right Panel - Schedule Canvas */}
        <div className="flex-1 relative">
          <ScheduleCanvas />
        </div>
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
    </div>
  );
};

export default ScheduleBuilderContent;
