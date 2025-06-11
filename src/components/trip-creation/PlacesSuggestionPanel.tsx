
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, UtensilsCrossed } from 'lucide-react';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { cn } from '@/lib/utils';
import PlaceCard from './PlaceCard';
import { Place, Restaurant } from '@/types/schedule';

const PlacesSuggestionPanel = () => {
  const { state, dispatch } = useTripCreation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'places' | 'restaurants'>('places');

  // Backend Integration: Mock data - replace with actual API calls
  const mockPlaces: Place[] = [
    {
      id: 'place-1',
      title: 'Central Park',
      type: 'place',
      rating: 4.6,
      thumbnail: '/placeholder.svg',
      distance: '2.1 km',
      category: 'Park',
      description: 'Beautiful city park with lakes and trails'
    },
    {
      id: 'place-2',
      title: 'Empire State Building',
      type: 'place',
      rating: 4.4,
      thumbnail: '/placeholder.svg',
      distance: '3.2 km',
      category: 'Landmark',
      description: 'Iconic Art Deco skyscraper'
    },
    {
      id: 'place-3',
      title: 'Times Square',
      type: 'place',
      rating: 4.2,
      thumbnail: '/placeholder.svg',
      distance: '1.8 km',
      category: 'Entertainment',
      description: 'Bustling commercial intersection'
    }
  ];

  const mockRestaurants: Restaurant[] = [
    {
      id: 'restaurant-1',
      title: 'The Plaza Restaurant',
      type: 'restaurant',
      rating: 4.5,
      thumbnail: '/placeholder.svg',
      distance: '1.2 km',
      cuisine: 'Fine Dining',
      priceLevel: 4,
      description: 'Elegant dining experience'
    },
    {
      id: 'restaurant-2',
      title: 'Joe\'s Pizza',
      type: 'restaurant',
      rating: 4.3,
      thumbnail: '/placeholder.svg',
      distance: '0.8 km',
      cuisine: 'Pizza',
      priceLevel: 1,
      description: 'Classic New York pizza'
    },
    {
      id: 'restaurant-3',
      title: 'Café Mogador',
      type: 'restaurant',
      rating: 4.4,
      thumbnail: '/placeholder.svg',
      distance: '1.5 km',
      cuisine: 'Moroccan',
      priceLevel: 2,
      description: 'Authentic Moroccan cuisine'
    }
  ];

  const currentData = activeTab === 'places' ? mockPlaces : mockRestaurants;

  const filteredData = currentData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm h-full"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions</h3>
        
        {/* Tab Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setActiveTab('places')}
            className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200",
              activeTab === 'places'
                ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            )}
          >
            <MapPin className="h-4 w-4" />
            <span className="font-medium">Places</span>
          </button>
          <button
            onClick={() => setActiveTab('restaurants')}
            className={cn(
              "flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200",
              activeTab === 'restaurants'
                ? "border-spot-primary bg-spot-primary/10 text-spot-primary"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            )}
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span className="font-medium">Restaurants</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spot-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Places List */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {filteredData.map((item) => (
          <PlaceCard
            key={item.id}
            item={item}
            className="place-suggestion"
          />
        ))}
        
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-2">No {activeTab} found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Backend Integration Note */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <p className="text-xs text-gray-500 text-center">
          🔄 Places will be auto-sorted by distance and rating when Google Places API is connected
        </p>
      </div>
    </motion.div>
  );
};

export default PlacesSuggestionPanel;
