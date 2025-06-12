
import React from 'react';
import { formatTimeRange } from '@/utils/timeUtils';

interface PreviewTooltipProps {
  isMoving: boolean;
  isResizing: boolean;
  previewEndTime: string | null;
  previewStartTime: string | null;
  displayStartTime: string;
  displayEndTime: string;
}

const PreviewTooltip = ({
  isMoving,
  isResizing,
  previewEndTime,
  previewStartTime,
  displayStartTime,
  displayEndTime
}: PreviewTooltipProps) => {
  if (!(isMoving || isResizing) || !(previewEndTime || previewStartTime)) {
    return null;
  }

  return (
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded shadow-lg z-50 whitespace-nowrap">
      {isMoving ? 'Moving to: ' : 'Resizing to: '}
      {formatTimeRange(displayStartTime, displayEndTime)}
    </div>
  );
};

export default PreviewTooltip;
