import React, { useState } from 'react';
import { X, Star, MapPin, Wifi, Car, Coffee, Utensils, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const AccommodationModal = () => {
  const { state, dispatch } = useTripCreation();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [visitedBookingPages, setVisitedBookingPages] = useState<Set<string>>(new Set());
  const [showStayDetailsModal, setShowStayDetailsModal] = useState(false);
  const [stayDetails, setStayDetails] = useState<StayDetails>({
    hotelId: '',
    hotelDateRange: undefined,
    checkinTime: '15:00',
    checkoutTime: '11:00',
    hasBreakfast: false,
    breakfastTimeStart: '08:00',
    breakfastTimeEnd: '09:00'
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Mock hotel data with booking URLs
  const mockHotels: Hotel[] = [
    {
      id: 'hotel-1',
      name: 'Grand Plaza Hotel',
      rating: 4.5,
      location: 'City Center',
      pricePerNight: 180,
      amenities: ['Wifi', 'Parking', 'Breakfast', 'Pool'],
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'],
      description: 'Luxury hotel in the heart of the city with modern amenities.',
      bookingUrl: 'https://booking.com/hotel/grand-plaza'
    },
    {
      id: 'hotel-2',
      name: 'Boutique Garden Inn',
      rating: 4.2,
      location: 'Historic District',
      pricePerNight: 150,
      amenities: ['Wifi', 'Restaurant', 'Garden'],
      images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80'],
      description: 'Charming boutique hotel with beautiful garden views.',
      bookingUrl: 'https://booking.com/hotel/boutique-garden'
    }
  ];

  const hotels = mockHotels;

  const amenityIcons = {
    'Wifi': Wifi,
    'Parking': Car,
    'Breakfast': Coffee,
    'Restaurant': Utensils,
    'Pool': '🏊‍♀️',
    'Garden': '🌿'
  };

  const handleVisitBookingPage = (hotel: Hotel) => {
    window.open(hotel.bookingUrl, '_blank');
    setVisitedBookingPages(prev => new Set([...prev, hotel.id]));
  };

  const handleAddToSchedule = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setStayDetails(prev => ({ ...prev, hotelId: hotel.id, hotelDateRange: undefined }));
    setShowStayDetailsModal(true);
  };

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

  // Convert date range to individual day keys for schedule processing
  const convertDateRangeToSelectedDays = (dateRange: DateRange | undefined): string[] => {
    if (!dateRange?.from || !dateRange?.to) return [];
    
    const dates = [];
    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
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

  const handleStayDetailsSubmit = () => {
    if (!selectedHotel || !stayDetails.hotelDateRange?.from || !stayDetails.hotelDateRange?.to) return;

    const selectedDays = convertDateRangeToSelectedDays(stayDetails.hotelDateRange);

    // Add accommodation to schedule for selected days
    const accommodationItem = {
      id: `accommodation-${selectedHotel.id}-${Date.now()}`,
      title: selectedHotel.name,
      type: 'hotel' as const,
      rating: selectedHotel.rating,
      thumbnail: selectedHotel.images[0],
      description: selectedHotel.description,
      location: selectedHotel.location,
      stars: Math.floor(selectedHotel.rating),
    };

    selectedDays.forEach(dayKey => {
      const isFirstDay = dayKey === selectedDays[0];
      const isLastDay = dayKey === selectedDays[selectedDays.length - 1];

      const timeSlots = [];

      if (isFirstDay) {
        timeSlots.push({
          id: `checkin-${selectedHotel.id}-${dayKey}`,
          startTime: stayDetails.checkinTime,
          endTime: stayDetails.checkinTime,
          type: 'accommodation' as const,
          item: {
            ...accommodationItem,
            id: `checkin-${selectedHotel.id}-${dayKey}`,
            title: `Check-in: ${selectedHotel.name}`,
          },
          isEditable: true,
        });
      }

      if (isLastDay) {
        timeSlots.push({
          id: `checkout-${selectedHotel.id}-${dayKey}`,
          startTime: stayDetails.checkoutTime,
          endTime: stayDetails.checkoutTime,
          type: 'accommodation' as const,
          item: {
            ...accommodationItem,
            id: `checkout-${selectedHotel.id}-${dayKey}`,
            title: `Check-out: ${selectedHotel.name}`,
          },
          isEditable: true,
        });
      }

      if (stayDetails.hasBreakfast) {
        timeSlots.push({
          id: `breakfast-${selectedHotel.id}-${dayKey}`,
          startTime: stayDetails.breakfastTimeStart,
          endTime: stayDetails.breakfastTimeEnd,
          type: 'meal' as const,
          item: {
            id: `breakfast-${selectedHotel.id}-${dayKey}`,
            title: `Breakfast at ${selectedHotel.name}`,
            type: 'restaurant' as const,
            rating: selectedHotel.rating,
            thumbnail: selectedHotel.images[0],
            cuisine: 'Hotel Breakfast',
            priceLevel: 1,
          },
          isEditable: true,
        });
      }

      timeSlots.forEach(slot => {
        dispatch({
          type: 'ADD_ITEM_TO_SCHEDULE',
          payload: {
            dayKey,
            timeSlotId: slot.id,
            item: slot.item!,
            startTime: slot.startTime,
            endTime: slot.endTime,
          },
        });
      });
    });

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);

    setShowStayDetailsModal(false);
    dispatch({ type: 'CLOSE_ACCOMMODATION_MODAL' });
  };

  if (!state.isAccommodationModalOpen) return null;

  return (
    <>
      <Dialog open={state.isAccommodationModalOpen} onOpenChange={() => dispatch({ type: 'CLOSE_ACCOMMODATION_MODAL' })}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Choose Your Accommodation</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{hotel.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{hotel.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hotel.amenities.map((amenity) => {
                      const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
                      return (
                        <div key={amenity} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                          {typeof IconComponent === 'string' ? (
                            <span>{IconComponent}</span>
                          ) : IconComponent ? (
                            <IconComponent className="h-3 w-3" />
                          ) : null}
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">${hotel.pricePerNight}/night</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      id={`visit-booking-${hotel.id}`}
                      onClick={() => handleVisitBookingPage(hotel)}
                      className="w-full bg-spot-primary hover:bg-spot-primary/90 text-white"
                    >
                      Book Now
                    </Button>
                    
                    <AnimatePresence>
                      {visitedBookingPages.has(hotel.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            id={`add-to-schedule-${hotel.id}`}
                            onClick={() => handleAddToSchedule(hotel)}
                            variant="outline"
                            className="w-full border-spot-primary text-spot-primary hover:bg-spot-primary/10"
                          >
                            Add to Schedule
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Stay Details Modal (Nested) */}
      <Dialog open={showStayDetailsModal} onOpenChange={setShowStayDetailsModal}>
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
                onClick={() => setShowStayDetailsModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleStayDetailsSubmit}
                disabled={!stayDetails.hotelDateRange?.from || !stayDetails.hotelDateRange?.to}
                className="bg-spot-primary hover:bg-spot-primary/90 text-white"
              >
                Add to Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <span>🏨</span>
            <span>Added to Schedule</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccommodationModal;
