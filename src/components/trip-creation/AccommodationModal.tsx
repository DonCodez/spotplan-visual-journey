
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DateRange } from 'react-day-picker';
import HotelCard from './HotelCard';
import StayDetailsModal from './StayDetailsModal';

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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const handleVisitBookingPage = (hotel: Hotel) => {
    window.open(hotel.bookingUrl, '_blank');
    setVisitedBookingPages(prev => new Set([...prev, hotel.id]));
  };

  const handleAddToSchedule = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowStayDetailsModal(true);
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

  const handleStayDetailsSubmit = (stayDetails: StayDetails) => {
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
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isBookingPageVisited={visitedBookingPages.has(hotel.id)}
                onVisitBookingPage={handleVisitBookingPage}
                onAddToSchedule={handleAddToSchedule}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <StayDetailsModal
        isOpen={showStayDetailsModal}
        onClose={() => setShowStayDetailsModal(false)}
        selectedHotel={selectedHotel}
        onSubmit={handleStayDetailsSubmit}
      />

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
