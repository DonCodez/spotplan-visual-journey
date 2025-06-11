
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TripCreationProvider, useTripCreation } from '@/contexts/TripCreationContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DestinationHeader from '@/components/trip-creation/DestinationHeader';
import DestinationInputPanel from '@/components/trip-creation/DestinationInputPanel';
import DestinationMapPanel from '@/components/trip-creation/DestinationMapPanel';

const CreateTripDestinationContent = () => {
  const { state } = useTripCreation();
  const navigate = useNavigate();

  const canProceed = state.tripType && state.destinationType && (
    state.destinationType === 'domestic' || 
    (state.destinationType === 'international' && state.selectedCountry)
  );

  const handleNext = () => {
    if (canProceed) {
      // TODO: Navigate to schedule builder page
      console.log('Proceeding to schedule builder with state:', state);
      // navigate('/create-trip/schedule');
    }
  };

  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      <div className="h-full overflow-y-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <DestinationHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <DestinationInputPanel />
            <DestinationMapPanel />
          </div>

          {/* Sticky CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="fixed bottom-6 right-6 z-20"
          >
            <Button
              id="next-to-schedule-button"
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
              Next → Build Your Schedule
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CreateTripDestinationPage = () => {
  return (
    <TripCreationProvider>
      <div className={cn(
        "flex flex-col md:flex-row bg-gray-50 w-full flex-1 mx-auto border border-gray-200 overflow-hidden",
        "h-screen"
      )}>
        <DashboardSidebar />
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 w-full h-full">
            <DashboardNavbar />
            <CreateTripDestinationContent />
          </div>
        </div>
      </div>
    </TripCreationProvider>
  );
};

export default CreateTripDestinationPage;
