
import React from "react";
import { motion } from "framer-motion";
import dashboardData from "@/data/dashboard.json";

const DashboardHeader = () => {
  const { user, welcome } = dashboardData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="px-6 py-8 bg-white border-b border-gray-100"
      id="dashboard-header"
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {welcome.greeting}, {user.name}!
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {welcome.subtitle}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
