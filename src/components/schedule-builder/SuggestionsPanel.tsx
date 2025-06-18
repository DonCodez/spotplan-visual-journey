
import React from 'react';
import { motion } from 'framer-motion';
import PlaceCard from './PlaceCard';
import { Button } from '@/components/ui/button';
import { Hotel } from 'lucide-react';

// Dummy data - To be connected to Google Places API later
const dummyPlaces = [
  {
    id: '1',
    title: 'Eiffel Tower',
    rating: 4.6,
    distance: '2.1 km',
    image: '/placeholder.svg',
    category: 'attraction' as const,
  },
  {
    id: '2',
    title: 'Louvre Museum',
    rating: 4.7,
    distance: '1.8 km',
    image: '/placeholder.svg',
    category: 'attraction' as const,
  },
  {
    id: '3',
    title: 'Le Comptoir du Relais',
    rating: 4.4,
    distance: '0.5 km',
    image: '/placeholder.svg',
    category: 'restaurant' as const,
    priceLevel: 2,
  },
  {
    id: '4',
    title: 'Notre-Dame Cathedral',
    rating: 4.5,
    distance: '3.2 km',
    image: '/placeholder.svg',
    category: 'attraction' as const,
  },
  {
    id: '5',
    title: 'Bistrot Paul Bert',
    rating: 4.3,
    distance: '1.2 km',
    image: '/placeholder.svg',
    category: 'restaurant' as const,
    priceLevel: 3,
  },
];

const SuggestionsPanel = () => {
  const handleAccommodationClick = () => {
    // To be implemented: Open hotel selection modal
    console.log('Opening accommodation modal');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-fit"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Suggested Places
      </h3>
      
      <div className="space-y-3 mb-6">
        {/* API hookup will go here for sorting logic based on:
            - Day selection
            - Proximity to map center or last selected item
            - Google rating
            For meal slots, filter to show only restaurants sorted by:
            - Proximity
            - Google Rating
            - Price Level
        */}
        {dummyPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      <Button
        id="open-hotel-popup-button"
        onClick={handleAccommodationClick}
        variant="outline"
        className="w-full border-[#317312] text-[#317312] hover:bg-[#317312] hover:text-white"
      >
        <Hotel className="mr-2 h-4 w-4" />
        + Add Accommodation
      </Button>
    </motion.div>
  );
};

export default SuggestionsPanel;
