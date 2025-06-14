
import React from "react";
import { Utensils, Coffee, Pizza, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

// Dummy slots and activities
const mealSlots = [
  { label: "Breakfast", icon: <Coffee />, slot: "8:00-9:00" },
  { label: "Lunch", icon: <Utensils />, slot: "13:00-14:00" },
  { label: "Dinner", icon: <Pizza />, slot: "20:00-21:00" },
];

const activities = [
  {
    id: 1,
    title: "Joe's Diner",
    type: "meal",
    time: "13:00-14:00",
    position: { day: 1, slot: "13:00" },
  },
];

const ScheduleCanvas = ({
  tripDates,
  selectedDay,
}: {
  tripDates: { id: number; label: string; date: string }[];
  selectedDay: number;
}) => {
  const day = tripDates.find((d) => d.id === selectedDay);

  return (
    <div className="w-full h-full min-h-[440px]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#317312] flex items-center gap-3">
          <Clock className="w-6 h-6 text-[#24BAEC]" />
          Daily Schedule - {day ? day.label : ""}
        </h2>
        <span className="text-gray-600 text-base">
          {day ? format(new Date(day.date), "EEEE, MMMM d, yyyy") : ""}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {mealSlots.map((meal) => (
          <div
            key={meal.label}
            className="scheduled-item time-slot bg-[#f7f6f2] border-2 border-[#e7ecd1] py-4 px-6 rounded-xl flex items-center gap-3 shadow-sm group hover:border-[#24BAEC] relative"
          >
            <span className="text-2xl text-[#6EBB2D]">{meal.icon}</span>
            <div>
              <span className="font-bold text-[#317312] block text-lg">{meal.label}</span>
              <span className="block text-xs text-gray-500 font-medium">{meal.slot}</span>
            </div>
            <motion.div
              className="absolute top-full left-0 mt-2 bg-black/80 text-white text-xs rounded shadow p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition"
            >
              {meal.label} — {meal.slot}
            </motion.div>
          </div>
        ))}
        {/* Example activity */}
        {activities.filter((a) => a.position.day === selectedDay).map((activity) => (
          <div
            key={activity.id}
            className="scheduled-item rounded-xl bg-[#24BAEC] text-white px-6 py-4 mt-2 shadow-md flex flex-col"
          >
            <span className="font-bold text-lg">{activity.title}</span>
            <span className="block text-xs font-medium">({activity.time})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCanvas;
