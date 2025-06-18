
import React from 'react';
import { TripCreationProvider } from '@/contexts/TripCreationContext';
import ScheduleBuilderContent from '@/components/schedule-builder/ScheduleBuilderContent';

const CreateTripSchedulePage = () => {
  return (
    <TripCreationProvider>
      <ScheduleBuilderContent />
    </TripCreationProvider>
  );
};

export default CreateTripSchedulePage;
