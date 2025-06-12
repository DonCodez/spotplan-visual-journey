
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface Hotel {
  id: string;
  name: string;
  rating: number;
  location: string;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  description: string;
  bookingUrl: string;
}

interface StayDetails {
  hotelId: string;
  hotelDateRange: DateRange | undefined;
  checkinTime: string;
  checkoutTime: string;
  hasBreakfast: boolean;
  breakfastTimeStart: string;
  breakfastTimeEnd: string;
}

interface StayDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHotel: Hotel | null;
  onSubmit: (stayDetails: StayDetails) => void;
}

const StayDetailsModal = ({ isOpen, onClose, selectedHotel, onSubmit }: StayDetailsModalProps) => {
  const { state } = useTripCreation();
  const [stayDetails, setStayDetails] = useState<StayDetails>({
    hotelId: selectedHotel?.id || '',
    hotelDateRange: undefined,
    checkinTime: '15:00',
    checkoutTime: '11:00',
    hasBreakfast: false,
    breakfastTimeStart: '08:00',
    breakfastTimeEnd: '09:00'
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Get trip date range for calendar restrictions
  const getTripDateRange = () => {
    if (state.tripDates.length === 0) return { from: undefined, to: undefined };
    
    const sortedDates = [...state.tripDates].sort((a, b) => a.getTime() - b.getTime());
    return {
      from: sortedDates[0],
      to: sortedDates[sortedDates.length - 1]
    };
  };

  const tripDateRange = getTripDateRange();

  // Check if date is within trip dates
  const isDateWithinTrip = (date: Date) => {
    if (!tripDateRange.from || !tripDateRange.to) return false;
    return date >= tripDateRange.from && date <= tripDateRange.to;
  };

  const getDateDisplayText = () => {
    if (stayDetails.hotelDateRange?.from) {
      if (stayDetails.hotelDateRange.to) {
        const nightCount = Math.ceil((stayDetails.hotelDateRange.to.getTime() - stayDetails.hotelDateRange.from.getTime()) / (1000 * 60 * 60 * 24));
        return `${format(stayDetails.hotelDateRange.from, 'MMM dd')} - ${format(stayDetails.hotelDateRange.to, 'MMM dd, yyyy')} (${nightCount} night${nightCount > 1 ? 's' : ''})`;
      }
      return `${format(stayDetails.hotelDateRange.from, 'MMM dd, yyyy')} - ?`;
    }
    return 'Select hotel stay dates';
  };

  const handleSubmit = () => {
    if (!selectedHotel || !stayDetails.hotelDateRange?.from || !stayDetails.hotelDateRange?.to) return;
    onSubmit(stayDetails);
  };

  // Reset state when modal opens with new hotel
  React.useEffect(() => {
    if (selectedHotel && isOpen) {
      setStayDetails(prev => ({ 
        ...prev, 
        hotelId: selectedHotel.id, 
        hotelDateRange: undefined 
      }));
    }
  }, [selectedHotel, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add {selectedHotel?.name} to Schedule
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Hotel Stay Dates Selector with Calendar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Hotel Stay Dates
            </label>
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 px-4",
                    !stayDetails.hotelDateRange?.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-3 h-4 w-4 text-spot-primary" />
                  <div className="flex-1">
                    {getDateDisplayText()}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={stayDetails.hotelDateRange}
                  onSelect={(dateRange) => setStayDetails(prev => ({ ...prev, hotelDateRange: dateRange }))}
                  disabled={(date) => !isDateWithinTrip(date) || date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
                {tripDateRange.from && tripDateRange.to && (
                  <div className="p-3 border-t bg-gray-50 text-xs text-gray-600">
                    Trip dates: {format(tripDateRange.from, 'MMM dd')} - {format(tripDateRange.to, 'MMM dd, yyyy')}
                  </div>
                )}
              </PopoverContent>
            </Popover>
            {!stayDetails.hotelDateRange?.from && (
              <p className="text-xs text-gray-500 mt-1">
                Select dates within your trip duration ({tripDateRange.from && tripDateRange.to ? 
                  `${format(tripDateRange.from, 'MMM dd')} - ${format(tripDateRange.to, 'MMM dd, yyyy')}` : 
                  'No trip dates selected'
                })
              </p>
            )}
          </div>

          {/* Check-in/Check-out Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Time
              </label>
              <input
                id="checkin-time-input"
                type="time"
                value={stayDetails.checkinTime}
                onChange={(e) => setStayDetails(prev => ({ ...prev, checkinTime: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spot-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Time
              </label>
              <input
                id="checkout-time-input"
                type="time"
                value={stayDetails.checkoutTime}
                onChange={(e) => setStayDetails(prev => ({ ...prev, checkoutTime: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spot-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Free Breakfast Toggle */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={stayDetails.hasBreakfast}
                onCheckedChange={(checked) => setStayDetails(prev => ({ ...prev, hasBreakfast: !!checked }))}
              />
              <label className="text-sm font-medium text-gray-700">
                Does this hotel offer free breakfast?
              </label>
            </div>

            <AnimatePresence>
              {stayDetails.hasBreakfast && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4 pl-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Breakfast Start
                    </label>
                    <input
                      id="breakfast-time-range"
                      type="time"
                      value={stayDetails.breakfastTimeStart}
                      onChange={(e) => setStayDetails(prev => ({ ...prev, breakfastTimeStart: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spot-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Breakfast End
                    </label>
                    <input
                      type="time"
                      value={stayDetails.breakfastTimeEnd}
                      onChange={(e) => setStayDetails(prev => ({ ...prev, breakfastTimeEnd: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spot-primary focus:border-transparent"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!stayDetails.hotelDateRange?.from || !stayDetails.hotelDateRange?.to}
              className="bg-spot-primary hover:bg-spot-primary/90 text-white"
            >
              Add to Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StayDetailsModal;
