
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TripCreationCloseButton from '@/components/trip-creation/TripCreationCloseButton';
import ScheduleHeader from './ScheduleHeader';
import DaySelector from './DaySelector';
import SuggestionsPanel from './SuggestionsPanel';
import ScheduleGrid from './ScheduleGrid';

const ScheduleBuilderContent = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);

  const handleNext = () => {
    // Navigate to expense estimation page (placeholder for now)
    console.log('Proceeding to expense estimation');
    // navigate('/create-trip/expenses');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TripCreationCloseButton />
      
      <div className="container mx-auto px-6 py-8">
        <ScheduleHeader />
        
        <div className="mb-8">
          <DaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SuggestionsPanel selectedDay={selectedDay} />
          <ScheduleGrid selectedDay={selectedDay} />
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
            size="lg"
            className={cn(
              "h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
              "bg-spot-primary hover:bg-spot-primary/90 text-white"
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

export default ScheduleBuilderContent;
