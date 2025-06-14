
import React, { useState } from 'react';
import { MapPin, Utensils, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlaceCard from './PlaceCard';

// Dummy data - To be connected to Google Places API by Bolt
const dummyPlaces = [
  {
    id: '1',
    title: 'Central Park',
    rating: 4.6,
    distance: '2.1 km',
    thumbnail: '/placeholder.svg',
    type: 'attraction'
  },
  {
    id: '2',
    title: 'Empire State Building',
    rating: 4.5,
    distance: '1.8 km',
    thumbnail: '/placeholder.svg',
    type: 'attraction'
  },
  {
    id: '3',
    title: 'Times Square',
    rating: 4.3,
    distance: '0.5 km',
    thumbnail: '/placeholder.svg',
    type: 'attraction'
  }
];

const dummyRestaurants = [
  {
    id: '4',
    title: 'Joe\'s Pizza',
    rating: 4.4,
    distance: '0.3 km',
    thumbnail: '/placeholder.svg',
    type: 'restaurant',
    priceLevel: '$'
  },
  {
    id: '5',
    title: 'The Plaza Hotel Restaurant',
    rating: 4.7,
    distance: '1.2 km',
    thumbnail: '/placeholder.svg',
    type: 'restaurant',
    priceLevel: '$$$'
  }
];

const SuggestionsPanel = () => {
  const [activeTab, setActiveTab] = useState<'places' | 'restaurants'>('places');
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Add sorting logic based on day selection, proximity, and ratings
  // TODO: Connect to Google Places API for real data

  const currentData = activeTab === 'places' ? dummyPlaces : dummyRestaurants;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Suggestions</h2>
        
        {/* Tab Buttons */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === 'places' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('places')}
            className={activeTab === 'places' ? 'bg-[#6EBB2D] hover:bg-[#6EBB2D]/90' : ''}
          >
            <MapPin className="w-4 h-4 mr-1" />
            Places
          </Button>
          <Button
            variant={activeTab === 'restaurants' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('restaurants')}
            className={activeTab === 'restaurants' ? 'bg-[#6EBB2D] hover:bg-[#6EBB2D]/90' : ''}
          >
            <Utensils className="w-4 h-4 mr-1" />
            Restaurants
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Places List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {currentData.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            className="place-suggestion"
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPanel;
