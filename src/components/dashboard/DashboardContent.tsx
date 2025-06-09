
import React from "react";
import { motion } from "framer-motion";
import { Plus, MapPin } from "lucide-react";
import { Tiles } from "@/components/ui/tiles";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TripCard from "@/components/dashboard/TripCard";
import dashboardData from "@/data/dashboard.json";

interface Trip {
  id: string;
  destination: string;
  dates: string;
  status: "Upcoming" | "In Progress" | "Completed";
  image: string;
  members: Array<{
    name: string;
    avatar: string;
    initials: string;
  }>;
}

const DashboardContent = () => {
  const { trips } = dashboardData;
  
  // Type assertion to ensure status values match the expected union type
  const typedTrips = trips as Trip[];

  return (
    <div className="flex-1 px-6 py-8 relative" id="dashboard-main-content">
      {/* Background Tiles */}
      <div className="absolute inset-0 overflow-hidden">
        <Tiles 
          rows={50} 
          cols={8}
          tileSize="md"
          className="opacity-30"
        />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        {/* Create New Trip Button - Top Right */}
        <div className="flex justify-end mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="h-16 w-16 rounded-full bg-lime-500 hover:bg-lime-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    id="create-trip-button"
                  >
                    <Plus className="h-7 w-7" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="px-3 py-2">
                  Create new trip
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>

        {/* Trips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Trips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {typedTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty state if no trips */}
        {typedTrips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-6">Start planning your first adventure!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
