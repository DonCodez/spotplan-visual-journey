
import React, { useRef, useEffect } from "react";
import Moveable from "moveable";
import { Utensils, Coffee, Pizza, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Simplified for demo; later, loop from tripDates prop
const timeSlots = [
  { time: "8:00", label: "8:00 AM" },
  { time: "9:00", label: "9:00 AM" },
  { time: "10:00", label: "10:00 AM" },
  { time: "13:00", label: "1:00 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "17:00", label: "5:00 PM" },
  { time: "20:00", label: "8:00 PM" },
  { time: "21:00", label: "9:00 PM" },
];

const mealSlots = [
  { label: "Breakfast", icon: <Coffee />, slot: "8:00-9:00" },
  { label: "Lunch", icon: <Utensils />, slot: "13:00-14:00" },
  { label: "Dinner", icon: <Pizza />, slot: "20:00-21:00" },
];

const activities = [
  // Placeholder grid tile. In real app, these will map to dragged/scheduled items.
  {
    id: 1,
    title: "Joe's Diner",
    type: "meal",
    time: "13:00-14:00",
    position: { day: 1, slot: "13:00" },
  },
];

const ScheduleCanvas = ({ tripDates }: { tripDates: { id: number; label: string; date: string }[] }) => {
  // Ref for Moveable demo
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The Moveable setup here is to show where it should be connected after drag/drop setup
    // In a real implementation, you would connect this to scheduled items
    // and dynamically create Moveable instances for every draggable scheduled card
  }, []);

  return (
    <div id="canvas-grid" className="w-full h-full min-h-[440px] overflow-x-auto relative pb-16">
      <div className="flex space-x-3">
        {tripDates.map((day, dIdx) => (
          <div
            key={day.id}
            className="bg-white/95 rounded-lg shadow p-3 flex-1 min-w-[290px] day-column"
          >
            <div className="text-lg font-semibold mb-2 flex items-center gap-2 text-[#317312]">
              {day.label}
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex flex-col gap-3">
              {mealSlots.map((meal) => (
                <div
                  key={meal.label}
                  className="scheduled-item time-slot bg-[#f7f6f2] border-b border-[#ded6c9] py-3 px-4 rounded flex items-center gap-2 shadow group hover:border-[#24BAEC] relative"
                >
                  <div className="text-xl text-[#6EBB2D]">{meal.icon}</div>
                  <div>
                    <strong className="text-sm text-[#317312]">{meal.label}</strong>
                    <span className="block text-xs text-gray-500">
                      {meal.slot}
                    </span>
                  </div>
                  {/* Tooltip will show more info on hover */}
                  <motion.div
                    className="absolute top-full left-0 bg-black/70 text-white text-xs rounded shadow p-2 mt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition"
                  >
                    {meal.label} — {meal.slot}
                  </motion.div>
                </div>
              ))}
              {/* Empty place for further scheduled activities */}
              {activities.filter(a => a.position.day === day.id).map(activity => (
                <div
                  key={activity.id}
                  className="scheduled-item rounded bg-[#166EF3] text-white px-4 py-3 mt-2 shadow cursor-pointer"
                >
                  <span className="font-bold">{activity.title}</span>
                  <span className="block text-xs">({activity.time})</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* // Moveable integration for dragging, resizing, snapping will go here */}
      {/* // To be enhanced with full drag/drop logic */}
    </div>
  );
};

export default ScheduleCanvas;
