
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripCreationProvider, useTripCreation } from '@/contexts/TripCreationContext';
import ScheduleBuilderContent from '@/components/schedule-builder/ScheduleBuilderContent';

const CreateTripScheduleContent = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has selected valid dates
    const hasValidDates = state.dateType && (
      (state.dateType === 'single' && state.startDate) ||
      (state.dateType === 'range' && state.dateRange?.from)
    );

    // Redirect back to destination page if no valid dates
    if (!hasValidDates) {
      console.log('No valid dates found, redirecting to destination page');
      navigate('/create-trip/destination');
    }
  }, [state.dateType, state.startDate, state.dateRange, navigate]);

  // Don't render if dates are invalid (will redirect)
  const hasValidDates = state.dateType && (
    (state.dateType === 'single' && state.startDate) ||
    (state.dateType === 'range' && state.dateRange?.from)
  );

  if (!hasValidDates) {
    return null;
  }

  return <ScheduleBuilderContent />;
};

const CreateTripSchedulePage = () => {
  return (
    <TripCreationProvider>
      <CreateTripScheduleContent />
    </TripCreationProvider>
  );
};

export default CreateTripSchedulePage;
