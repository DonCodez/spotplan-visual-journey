
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarDays } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

const TripDatesSelector = () => {
  const { state, dispatch } = useTripCreation();
  const [dateType, setDateType] = useState<'single' | 'range'>('range');
  const [singleDate, setSingleDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSingleDateSelect = (date: Date | undefined) => {
    setSingleDate(date);
    if (date) {
      dispatch({ type: 'SET_TRIP_DATES', payload: [date] });
    }
  };

  const handleRangeDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      const dates = [];
      const startDate = new Date(range.from);
      const endDate = new Date(range.to);
      
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
      }
      
      dispatch({ type: 'SET_TRIP_DATES', payload: dates });
    } else if (range?.from) {
      dispatch({ type: 'SET_TRIP_DATES', payload: [range.from] });
    }
  };

  const getDateDisplayText = () => {
    if (dateType === 'single') {
      return singleDate ? format(singleDate, 'MMM dd, yyyy') : 'Select date';
    } else {
      if (dateRange?.from) {
        if (dateRange.to) {
          return `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
        }
        return `${format(dateRange.from, 'MMM dd, yyyy')} - ?`;
      }
      return 'Select date range';
    }
  };

  const getDayCount = () => {
    if (state.tripDates.length > 1) {
      return `${state.tripDates.length} days`;
    } else if (state.tripDates.length === 1) {
      return '1 day';
    }
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Trip Dates</h3>
        <p className="text-sm text-gray-600 mb-4">When are you planning to travel?</p>
      </div>

      <div className="space-y-3">
        <RadioGroup
          value={dateType}
          onValueChange={(value: 'single' | 'range') => {
            setDateType(value);
            setSingleDate(undefined);
            setDateRange(undefined);
            dispatch({ type: 'SET_TRIP_DATES', payload: [] });
          }}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="single" />
            <Label htmlFor="single" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Single day
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="range" id="range" />
            <Label htmlFor="range" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Multi-day trip
            </Label>
          </div>
        </RadioGroup>

        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12 px-4",
                !singleDate && !dateRange?.from && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-3 h-4 w-4 text-spot-primary" />
              <div className="flex-1">
                {getDateDisplayText()}
                {getDayCount() && (
                  <span className="ml-2 text-xs text-gray-500">({getDayCount()})</span>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {dateType === 'single' ? (
              <CalendarComponent
                mode="single"
                selected={singleDate}
                onSelect={handleSingleDateSelect}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            ) : (
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={handleRangeDateSelect}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            )}
          </PopoverContent>
        </Popover>
      </div>

      {state.tripDates.length > 0 && (
        <div className="p-3 bg-spot-primary/10 rounded-lg border border-spot-primary/20">
          <p className="text-sm text-spot-primary font-medium">
            ✓ Trip dates selected: {getDayCount()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default TripDatesSelector;
