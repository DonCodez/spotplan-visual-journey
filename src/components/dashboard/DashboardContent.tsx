
import React from "react";
import { motion } from "framer-motion";
import { Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import TripCard from "@/components/dashboard/TripCard";
import dashboardData from "@/data/dashboard.json";

const DashboardContent = () => {
  const { trips } = dashboardData;

  return (
    <div className="flex-1 px-6 py-8" id="dashboard-main-content">
      {/* Create New Trip Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <Button
          className="h-14 px-8 text-lg font-semibold bg-spot-primary hover:bg-spot-primary/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          id="create-trip-button"
        >
          <Plus className="h-6 w-6 mr-3" />
          Create New Trip
        </Button>
      </motion.div>

      {/* Trips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Trips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
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
      {trips.length === 0 && (
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
  );
};

export default DashboardContent;
