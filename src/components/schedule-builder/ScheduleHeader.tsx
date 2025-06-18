
import React from 'react';
import { motion } from 'framer-motion';

const ScheduleHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Schedule Builder
      </h1>
      <p className="text-lg text-gray-600">
        Drag places from the left into your daily schedule
      </p>
    </motion.div>
  );
};

export default ScheduleHeader;
