
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TripCreationProvider, useTripCreation } from '@/contexts/TripCreationContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import ScheduleHeader from '@/components/trip-creation/ScheduleHeader';
import DragDropProvider from '@/components/trip-creation/DragDropProvider';
import DayNavigation from '@/components/trip-creation/DayNavigation';
import PlacesSuggestionPanel from '@/components/trip-creation/PlacesSuggestionPanel';
import ScheduleCanvas from '@/components/trip-creation/ScheduleCanvas';
import AccommodationModal from '@/components/trip-creation/AccommodationModal';

const CreateTripScheduleContent = () => {
  const { state, dispatch } = useTripCreation();
  const navigate = useNavigate();

  // Set the first day as selected when component mounts
  useEffect(() => {
    if (state.tripDates.length > 0 && !state.selectedDay) {
      const firstDayKey = state.tripDates[0].toISOString().split('T')[0];
      dispatch({ type: 'SET_SELECTED_DAY', payload: firstDayKey });
    }
  }, [state.tripDates, state.selectedDay, dispatch]);

  // Redirect to destination page if no dates are selected
  useEffect(() => {
    if (state.tripDates.length === 0) {
      navigate('/create-trip/destination');
    }
  }, [state.tripDates.length, navigate]);

  // Backend Integration: Validation logic for proceeding to next step
  const canProceed = state.tripDates.length > 0 && 
    Object.values(state.dailySchedules).some(schedule => 
      schedule?.timeSlots?.some(slot => slot.item)
    );

  const handleNext = async () => {
    if (canProceed) {
      // Backend Integration: Save schedule data before proceeding
      // try {
      //   await saveSchedule(); // This will call the API to save the schedule
      //   console.log('Schedule saved successfully');
      //   navigate('/create-trip/expenses');
      // } catch (error) {
      //   console.error('Failed to save schedule:', error);
      //   // Show error toast or message to user
      // }
      
      // For now, just proceed to next step (remove when backend is connected)
      console.log('Proceeding to expense estimator with schedule:', state.dailySchedules);
      // navigate('/create-trip/expenses');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TripCreationCloseButton />
      
      <div className="container mx-auto px-6 py-8">
        <ScheduleHeader />
        
        <DragDropProvider>
          <DayNavigation />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-4">
              <PlacesSuggestionPanel />
            </div>
            <div className="lg:col-span-8">
              <ScheduleCanvas />
            </div>
          </div>
        </DragDropProvider>

        <AccommodationModal />

        {/* Add Accommodation Button */}
        <div className="fixed bottom-6 left-6 z-20">
          <Button
            id="open-hotel-popup-button"
            onClick={() => dispatch({ type: 'OPEN_ACCOMMODATION_MODAL' })}
            variant="outline"
            size="lg"
            className="h-14 px-6 rounded-full shadow-lg bg-white hover:bg-gray-50 border-2 border-gray-200"
          >
            <span className="mr-2">🏨</span>
            + Add Accommodation
          </Button>
        </div>

        {/* Sticky CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="fixed bottom-6 right-6 z-20"
        >
          <Button
            id="next-to-expense-button"
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className={cn(
              "h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
              canProceed
                ? "bg-spot-primary hover:bg-spot-primary/90 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            Next → Estimate Expenses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const CreateTripSchedulePage = () => {
  return (
    <TripCreationProvider>
      <CreateTripScheduleContent />
    </TripCreationProvider>
  );
};

export default CreateTripSchedulePage;
