import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hotel, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import PlacesSuggestionPanel from "@/components/schedule-builder/PlacesSuggestionPanel";
import ScheduleCanvas from "@/components/schedule-builder/ScheduleCanvas";
import AccommodationModal from "@/components/schedule-builder/AccommodationModal";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";

// Hardcoded for now, usually from user trip state
const tripDates = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  // Dummy date: start from 2025-06-16
  date: format(addDays(new Date(2025, 5, 16), i), "yyyy-MM-dd"),
  label: `Day ${i + 1}`,
}));

const getDayCard = (
  day: { id: number; label: string; date: string },
  selectedId: number,
  setSelected: (id: number) => void
) => {
  const dateObj = new Date(day.date);
  return (
    <button
      key={day.id}
      className={cn(
        "flex flex-col items-center justify-center px-4 py-2 rounded-lg border cursor-pointer bg-white shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#317312]",
        day.id === selectedId
          ? "ring-2 ring-[#317312] border-[#317312] bg-[#F3FCF2]"
          : "border-gray-200 hover:bg-gray-100"
      )}
      style={{ minWidth: 110 }}
      onClick={() => setSelected(day.id)}
    >
      <CalendarIcon className={cn("mb-1", day.id === selectedId ? "text-[#317312]" : "text-gray-400")} size={22} />
      <span
        className={cn(
          "font-semibold leading-tight",
          day.id === selectedId ? "text-[#317312]" : "text-gray-700"
        )}
      >
        {day.label}
      </span>
      <span className="text-xs text-gray-500">{format(dateObj, "EEE, MMM d")}</span>
    </button>
  );
};

const CreateTripSchedulePage = () => {
  const navigate = useNavigate();
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  // Left/right navigation arrow state for day selector
  const [scrollIdx, setScrollIdx] = useState(0);

  // Show up to 5 days at once in selector (responsive window)
  const windowSize = 5;
  const maxIdx = tripDates.length > windowSize ? tripDates.length - windowSize : 0;

  const visibleDays = tripDates.slice(
    scrollIdx,
    scrollIdx + windowSize > tripDates.length ? tripDates.length : scrollIdx + windowSize
  );

  const canGoLeft = scrollIdx > 0;
  const canGoRight = scrollIdx < maxIdx;

  const handleLeft = () => {
    if (canGoLeft) setScrollIdx((prev) => prev - 1);
  };
  const handleRight = () => {
    if (canGoRight) setScrollIdx((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col relative pb-10">
      {/* Select Day (moved higher, header removed) */}
      <div className="w-full flex justify-center mt-10 px-2 md:px-0 z-10">
        <div className="w-full max-w-5xl rounded-2xl bg-white shadow-lg flex flex-col border border-gray-200 py-5 px-4 gap-1">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-lg text-[#317312]">Select Day</label>
            <span className="text-gray-500 text-sm">{tripDates.length} days total</span>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2">
              {/* Left Arrow */}
              <button
                id="scroll-left"
                onClick={handleLeft}
                disabled={!canGoLeft}
                className={cn(
                  "p-2 rounded-full border border-gray-200 bg-white shadow-sm transition text-[#317312]",
                  !canGoLeft ? "opacity-20 cursor-default" : "hover:bg-[#F3FCF2] active:bg-[#e0f5d9]"
                )}
                aria-label="Scroll days left"
                tabIndex={0}
                type="button"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
                {visibleDays.map((day) =>
                  getDayCard(day, selectedDay, setSelectedDay)
                )}
              </div>
              {/* Right Arrow */}
              <button
                id="scroll-right"
                onClick={handleRight}
                disabled={!canGoRight}
                className={cn(
                  "p-2 rounded-full border border-gray-200 bg-white shadow-sm transition text-[#317312]",
                  !canGoRight ? "opacity-20 cursor-default" : "hover:bg-[#F3FCF2] active:bg-[#e0f5d9]"
                )}
                aria-label="Scroll days right"
                tabIndex={0}
                type="button"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2 flex items-center gap-4 justify-between">
              <span>Navigate with arrows</span>
              <span>Use keyboard arrows for fast access</span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Grid */}
      <div className="flex-1 flex flex-col md:flex-row w-full h-full min-h-0 overflow-hidden max-w-7xl mx-auto mt-8 gap-6 px-2 md:px-0">
        {/* Left Suggestions */}
        <div className="flex-shrink-0 w-full md:w-[370px]">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 h-full min-h-[400px]">
            <PlacesSuggestionPanel />
          </div>
        </div>
        {/* Right Canvas */}
        <div className="flex-1 min-w-0">
          <div className="h-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col">
            <ScheduleCanvas tripDates={tripDates} selectedDay={selectedDay} />
          </div>
        </div>
      </div>
      {/* CTA Sticky Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-5 right-5 z-50"
      >
        <Button
          id="next-to-expense-button"
          size="lg"
          className="rounded-full shadow-xl px-8 text-white bg-[#317312] hover:bg-[#6EBB2D] transition !py-6 !text-lg"
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
        className="fixed bottom-24 left-5 md:left-auto right-5"
      >
        <Button
          id="open-hotel-popup-button"
          className="bg-white border border-[#66bb44] text-[#317312] font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 hover:bg-[#eafbe6] hover:text-[#317312]"
          onClick={() => setShowHotelModal(true)}
        >
          <Hotel className="mr-1" />
          Add Accommodation
        </Button>
      </motion.div>
      <AccommodationModal open={showHotelModal} onOpenChange={setShowHotelModal} />
    </div>
  );
};

export default CreateTripSchedulePage;
