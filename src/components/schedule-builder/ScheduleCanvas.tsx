
import React from 'react';
import { format } from 'date-fns';
import DayColumn from './DayColumn';

interface ScheduleCanvasProps {
  selectedDay: number;
  date: Date;
}

const ScheduleCanvas = ({ selectedDay, date }: ScheduleCanvasProps) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Schedule Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h4 className="font-medium text-gray-900">
              Daily Schedule - Day {selectedDay + 1}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {format(date, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          
          <div id="canvas-grid" className="p-4">
            <DayColumn dayIndex={selectedDay} date={date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCanvas;
