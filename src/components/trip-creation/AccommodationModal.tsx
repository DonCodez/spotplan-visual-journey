
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hotel, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel as HotelType } from '@/types/schedule';
import { useTripCreation } from '@/contexts/TripCreationContext';

const AccommodationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useTripCreation();

  // Backend Integration: Mock hotel data - replace with actual API
  const mockHotels: HotelType[] = [
    {
      id: 'hotel-1',
      title: 'The Plaza Hotel',
      type: 'hotel',
      rating: 4.5,
      stars: 5,
      thumbnail: '/placeholder.svg',
      location: 'Central Park South',
      description: 'Luxury hotel overlooking Central Park'
    },
    {
      id: 'hotel-2',
      title: 'Pod Hotel Brooklyn',
      type: 'hotel',
      rating: 4.2,
      stars: 3,
      thumbnail: '/placeholder.svg',
      location: 'Williamsburg',
      description: 'Modern boutique hotel in trendy neighborhood'
    },
    {
      id: 'hotel-3',
      title: 'The High Line Hotel',
      type: 'hotel',
      rating: 4.3,
      stars: 4,
      thumbnail: '/placeholder.svg',
      location: 'Chelsea',
      description: 'Historic hotel near the High Line park'
    }
  ];

  const handleAddHotel = (hotel: HotelType) => {
    dispatch({ type: 'ADD_ACCOMMODATION', payload: hotel });
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="fixed bottom-6 left-6 z-20">
        <Button
          id="open-hotel-popup-button"
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="lg"
          className="h-14 px-6 rounded-full shadow-lg bg-white hover:bg-gray-50 border-2 border-gray-200"
        >
          <Hotel className="mr-2 h-5 w-5" />
          + Add Accommodation
        </Button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hotel className="h-6 w-6 text-spot-primary" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Select Accommodation
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Choose a hotel for your trip
                </p>
              </div>

              {/* Hotel List */}
              <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                {mockHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-spot-primary/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Hotel Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={hotel.thumbnail || '/placeholder.svg'}
                            alt={hotel.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Hotel Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {hotel.title}
                          </h3>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: hotel.stars }, (_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-orange-400 fill-current" />
                            <span className="text-sm text-gray-600">{hotel.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{hotel.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-3">
                          {hotel.description}
                        </p>
                        
                        <Button
                          onClick={() => handleAddHotel(hotel)}
                          size="sm"
                          className="bg-spot-primary hover:bg-spot-primary/90"
                        >
                          Add to Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Backend Integration Note */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-500 text-center">
                  🔄 Hotel data will be fetched from booking APIs when backend is connected
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccommodationModal;
