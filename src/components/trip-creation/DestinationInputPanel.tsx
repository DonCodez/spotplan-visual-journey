
import React from 'react';
import { motion } from 'framer-motion';
import TripTypeToggle from './TripTypeToggle';
import DestinationTypeToggle from './DestinationTypeToggle';
import CountrySelector from './CountrySelector';
import GroupSizeSelector from './GroupSizeSelector';
import FlightReminder from './FlightReminder';

const DestinationInputPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
    >
      <TripTypeToggle />
      <DestinationTypeToggle />
      <CountrySelector />
      <GroupSizeSelector />
      <FlightReminder />
    </motion.div>
  );
};

export default DestinationInputPanel;
