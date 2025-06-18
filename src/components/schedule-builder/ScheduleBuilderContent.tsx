
import React from 'react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { DragDropProvider } from '@/contexts/DragDropContext';
import ScheduleHeader from './ScheduleHeader';
import SuggestionsPanel from './SuggestionsPanel';
import ScheduleCanvas from './ScheduleCanvas';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ScheduleBuilderContent = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to expense estimation page (to be created later)
    console.log('Proceeding to expense estimation');
  };

  return (
    <DragDropProvider>
      <div className="min-h-screen bg-gray-50">
        <TripCreationCloseButton />
        
        <div className="container mx-auto px-6 py-8">
          <ScheduleHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 mb-8">
            <SuggestionsPanel />
            <ScheduleCanvas />
          </div>

          {/* Sticky CTA Button */}
          <Button
            id="next-to-expense-button"
            onClick={handleNext}
            size="lg"
            className="fixed bottom-6 right-6 z-20 h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-spot-primary hover:bg-spot-primary/90 text-white"
          >
            Next → Estimate Expenses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </DragDropProvider>
  );
};

export default ScheduleBuilderContent;
