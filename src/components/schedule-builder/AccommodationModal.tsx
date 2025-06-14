
import React from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

// Dummy hotels
const hotels = [
  {
    id: 1,
    name: "Central Palace Hotel",
    rating: 4.6,
    img: "https://source.unsplash.com/160x110/?hotel",
    location: "Downtown Ave, 2.3 km",
    bookingUrl: "https://booking.com/",
  },
  {
    id: 2,
    name: "Cityview Suites",
    rating: 4.3,
    img: "https://source.unsplash.com/160x110/?hotel+room",
    location: "Eastside Rd, 1.8 km",
    bookingUrl: "https://booking.com/",
  },
];

// // To be connected to hotel booking API by Bolt

const AccommodationModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-[95vw] max-w-xl p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-[#317312]">Select Accommodation</span>
          </div>
          <div className="flex flex-col gap-4 mt-3">
            {hotels.map(hotel => (
              <div
                key={hotel.id}
                className="flex gap-3 items-center border rounded-lg px-3 py-2 hotel-card bg-[#f7f6f2] shadow hover:shadow-lg"
              >
                <img src={hotel.img} alt={hotel.name} className="w-20 h-[64px] object-cover rounded" />
                <div className="flex flex-col flex-1">
                  <span className="font-semibold text-[#24BAEC]">{hotel.name}</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">{hotel.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </div>
                </div>
                <div>
                  <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="mb-2">
                      Visit Booking Site
                    </Button>
                  </a>
                  <Button size="sm" className="bg-[#317312] text-white w-full">
                    Add to Schedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 
        // To be hooked up: After clicking Add to Schedule, show popup for:
        // Dates of stay
        // Check-in/out time
        // Free breakfast toggle
        // If breakfast -> set breakfast slots for days & times
      */}
    </Dialog>
  );
};

export default AccommodationModal;
