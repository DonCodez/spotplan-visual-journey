
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const ScheduleHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Calendar className="h-8 w-8 text-spot-primary" />
        <h1 className="text-3xl font-bold text-gray-900">
          Schedule Builder
        </h1>
      </div>
      <p className="text-lg text-gray-600">
        Drag places from the left into your daily schedule
      </p>
    </motion.div>
  );
};

export default ScheduleHeader;
