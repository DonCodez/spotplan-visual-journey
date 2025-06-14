
import React from "react";
import { Star, MapPin, Utensils } from "lucide-react";

// Dummy data
const suggestions = [
  {
    id: 1,
    title: "Central Park",
    rating: 4.7,
    img: "https://source.unsplash.com/160x110/?park",
    distance: "0.4km",
    type: "attraction",
  },
  {
    id: 2,
    title: "Joe's Diner",
    rating: 4.4,
    img: "https://source.unsplash.com/160x110/?restaurant",
    distance: "1.1km",
    type: "restaurant",
  },
  {
    id: 3,
    title: "Met Art Museum",
    rating: 4.8,
    img: "https://source.unsplash.com/160x110/?museum",
    distance: "1.6km",
    type: "attraction",
  },
];

// To be connected to Google Places API by Bolt

const PlacesSuggestionPanel = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-[#317312]">Suggestions</h2>
      <div className="flex flex-col gap-4">
        {/* Sorting: Day/Proximity/Rating */}
        {/* // Inline comment for future API sorting connection */}
        {suggestions.map((place) => (
          <div
            key={place.id}
            className="place-suggestion bg-white rounded-lg shadow flex gap-3 p-3 cursor-pointer transition hover:ring-2 hover:ring-[#24BAEC] hover:scale-[1.02] group"
          >
            <img
              src={place.img}
              alt={place.title}
              className="rounded-md w-20 h-[68px] object-cover"
            />
            <div className="flex flex-col justify-between flex-1">
              <div className="font-bold text-lg text-[#166EF3]">{place.title}</div>
              <div className="flex gap-2 text-sm items-center text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 inline-block" />
                {place.rating}
              </div>
              <div className="flex gap-1 text-xs items-center text-[#317312]">
                <MapPin className="w-4 h-4 inline-block" />
                {place.distance} away
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* // To be connected to Google Places API by Bolt */}
    </div>
  );
};

export default PlacesSuggestionPanel;
