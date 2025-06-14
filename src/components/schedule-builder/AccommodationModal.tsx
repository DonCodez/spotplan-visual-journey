
import React, { useState } from 'react';
import { X, Star, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccommodationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dummy hotel data - To be connected to hotel booking API by Bolt
const dummyHotels = [
  {
    id: '1',
    name: 'The Plaza Hotel',
    rating: 4.5,
    location: 'Midtown Manhattan',
    thumbnail: '/placeholder.svg',
    bookingUrl: 'https://example.com'
  },
  {
    id: '2',
    name: 'The High Line Hotel',
    rating: 4.3,
    location: 'Chelsea',
    thumbnail: '/placeholder.svg',
    bookingUrl: 'https://example.com'
  }
];

const AccommodationModal = ({ isOpen, onClose }: AccommodationModalProps) => {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);

  if (!isOpen) return null;

  const handleVisitBookingSite = (hotelId: string, url: string) => {
    setSelectedHotel(hotelId);
    window.open(url, '_blank');
  };

  const handleAddToSchedule = () => {
    setShowScheduleOptions(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Accommodation</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {!showScheduleOptions ? (
            <div className="space-y-4">
              {dummyHotels.map((hotel) => (
                <div key={hotel.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <img 
                        src={hotel.thumbnail} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{hotel.name}</h3>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{hotel.rating}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{hotel.location}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVisitBookingSite(hotel.id, hotel.bookingUrl)}
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Visit Booking Site
                        </Button>
                        
                        {selectedHotel === hotel.id && (
                          <Button
                            size="sm"
                            onClick={handleAddToSchedule}
                            className="bg-[#317312] hover:bg-[#317312]/90"
                          >
                            Add to Schedule
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Schedule Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dates of stay
                </label>
                <input
                  type="text"
                  placeholder="Select check-in and check-out dates"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in time
                  </label>
                  <input
                    type="time"
                    defaultValue="15:00"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out time
                  </label>
                  <input
                    type="time"
                    defaultValue="11:00"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="free-breakfast"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="free-breakfast" className="text-sm text-gray-700">
                  Free breakfast included
                </label>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowScheduleOptions(false)}
                >
                  Back
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-[#317312] hover:bg-[#317312]/90"
                >
                  Add to Schedule
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccommodationModal;
