
import React from "react";
import { Star, MapPin } from "lucide-react";

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

const PlacesSuggestionPanel = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-5 text-[#317312]">Suggestions</h2>
      <div className="flex gap-2 mb-4">
        <button className="flex-1 py-2 rounded-lg border-2 border-[#317312] bg-[#F3FCF2] font-semibold text-[#317312] shadow-sm transition hover:bg-[#eafbe6]">
          Places
        </button>
        <button className="flex-1 py-2 rounded-lg border-2 border-transparent font-semibold text-gray-500 transition hover:bg-[#f7faf4]">
          Restaurants
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {/* SEARCH: */}
        <div>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#24BAEC]"
            placeholder="Search places..."
          />
        </div>
        {/* CARD SUGGESTIONS */}
        {suggestions.map((place) => (
          <div
            key={place.id}
            className="place-suggestion bg-[#fcfcfa] rounded-xl shadow flex gap-4 p-4 border border-gray-100 cursor-pointer transition hover:border-[#24BAEC] hover:scale-[1.02] group"
          >
            <div className="flex-shrink-0 w-14 h-14 bg-[#f1f8ec] rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={place.img}
                alt={place.title}
                className="rounded-md w-12 h-12 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 gap-0">
              <div className="font-bold text-base text-[#166EF3]">{place.title}</div>
              <div className="flex gap-2 text-xs items-center text-gray-600">
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
    </div>
  );
};

export default PlacesSuggestionPanel;
