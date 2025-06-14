
import React from 'react';
import { Star, MapPin, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

interface HotelCardProps {
  hotel: Hotel;
  isBookingPageVisited: boolean;
  onVisitBookingPage: (hotel: Hotel) => void;
  onAddToSchedule: (hotel: Hotel) => void;
}

const HotelCard = ({ hotel, isBookingPageVisited, onVisitBookingPage, onAddToSchedule }: HotelCardProps) => {
  const amenityIcons = {
    'Wifi': Wifi,
    'Parking': Car,
    'Breakfast': Coffee,
    'Restaurant': Utensils,
    'Pool': '🏊‍♀️',
    'Garden': '🌿'
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
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
            onClick={() => onVisitBookingPage(hotel)}
            className="w-full bg-spot-primary hover:bg-spot-primary/90 text-white"
          >
            Book Now
          </Button>
          
          <AnimatePresence>
            {isBookingPageVisited && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  id={`add-to-schedule-${hotel.id}`}
                  onClick={() => onAddToSchedule(hotel)}
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
  );
};

export default HotelCard;
