
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hotel, CalendarCheck2, ChevronLeft, ChevronRight, Star, MapPin, Plus } from "lucide-react";
import Moveable from "moveable";
import PlacesSuggestionPanel from "@/components/schedule-builder/PlacesSuggestionPanel";
import ScheduleCanvas from "@/components/schedule-builder/ScheduleCanvas";
import AccommodationModal from "@/components/schedule-builder/AccommodationModal";
import { cn } from "@/lib/utils";

const tripDates = [
  // Placeholder for Date logic
  { id: 1, label: "Day 1", date: "2025-08-01" },
  { id: 2, label: "Day 2", date: "2025-08-02" },
  { id: 3, label: "Day 3", date: "2025-08-03" },
];

const CreateTripSchedulePage = () => {
  const navigate = useNavigate();
  const [showHotelModal, setShowHotelModal] = useState(false);

  // Outline: Later put schedule state in context for API connection

  return (
    <div className="min-h-screen bg-[#DED6C9] flex flex-col relative">
      {/* Header Section */}
      <div className="py-6 px-8 border-b border-[#E5E1DA] bg-white/80 flex flex-col gap-1 z-10">
        <h1 className="text-3xl font-bold text-[#317312] flex items-center gap-4">
          <span>Schedule Builder</span>
          <CalendarCheck2 className="inline-block text-[#24BAEC]" />
        </h1>
        <span className="text-gray-700 mt-1 mb-2">
          Drag places from the left into your daily schedule
        </span>
      </div>
      {/* Main Grid */}
      <div className="flex-1 flex flex-col md:flex-row w-full h-full min-h-0 overflow-hidden">
        {/* Left Suggestions */}
        <div className="flex-shrink-0 w-full md:w-[350px] p-4 bg-white/90 border-r border-[#E5E1DA] overflow-y-auto">
          <PlacesSuggestionPanel />
        </div>
        {/* Right Canvas */}
        <div className="flex-1 px-2 py-4 overflow-auto relative">
          <ScheduleCanvas tripDates={tripDates} />
        </div>
      </div>
      {/* CTA Sticky Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-5 right-5 z-40"
      >
        <Button
          id="next-to-expense-button"
          size="lg"
          className="rounded-full shadow-xl px-8 text-white bg-[#317312] hover:bg-[#6EBB2D] transition"
          onClick={() => navigate("/dashboard")}
        >
          Next → Estimate Expenses
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
      {/* Accommodation Button & Modal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-24 right-5"
      >
        <Button
          id="open-hotel-popup-button"
          className="bg-[#24BAEC] hover:bg-[#166EF3] text-white font-semibold px-6 py-3 rounded-full"
          onClick={() => setShowHotelModal(true)}
        >
          <Hotel className="mr-2" /> + Add Accommodation
        </Button>
      </motion.div>
      <AccommodationModal open={showHotelModal} onOpenChange={setShowHotelModal} />
    </div>
  );
};

export default CreateTripSchedulePage;
