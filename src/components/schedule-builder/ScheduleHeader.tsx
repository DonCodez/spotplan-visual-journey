
import React from 'react';
import { Calendar } from 'lucide-react';

const ScheduleHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
          <Calendar className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Schedule Builder</h1>
          <p className="text-sm text-gray-600">Drag places from the left into your daily schedule</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHeader;
