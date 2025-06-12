
import React from 'react';
import Moveable from 'react-moveable';
import { ScheduleItem } from '@/types/schedule';
import { cn } from '@/lib/utils';
import { useResizableActivity } from './hooks/useResizableActivity';
import ActivityCard from './components/ActivityCard';
import ResizeHandle from './components/ResizeHandle';
import PreviewTooltip from './components/PreviewTooltip';

interface ResizableActivityBlockProps {
  item: ScheduleItem;
  startTime: string;
  endTime: string;
  date: string;
  slotId: string;
  onResize: (newStartTime: string, newEndTime: string) => void;
  onRemove: () => void;
  onDrag?: (newStartTime: string) => void;
}

const PIXELS_PER_MINUTE = 2;
const SNAP_INTERVAL_MINUTES = 30;
const SNAP_INTERVAL_PIXELS = SNAP_INTERVAL_MINUTES * PIXELS_PER_MINUTE;
const MIN_DURATION_MINUTES = 30;

const ResizableActivityBlock = ({
  item,
  startTime,
  endTime,
  date,
  slotId,
  onResize,
  onRemove,
  onDrag,
}: ResizableActivityBlockProps) => {
  const {
    targetRef,
    isMoving,
    isResizing,
    previewEndTime,
    previewStartTime,
    height,
    displayStartTime,
    displayEndTime,
    setIsMoving,
    setIsResizing,
    handleDrag,
    handleDragEnd,
    handleResize,
    handleResizeEnd
  } = useResizableActivity(startTime, endTime, onResize, onDrag);

  return (
    <div className="relative">
      <div
        ref={targetRef}
        className={cn(
          "relative bg-white rounded-lg border-2 transition-all duration-200 group",
          (isMoving || isResizing) ? "border-spot-primary/60 shadow-lg opacity-80" : "border-spot-primary shadow-sm hover:shadow-md",
        )}
        style={{ 
          height: `${height}px`,
          minHeight: `${MIN_DURATION_MINUTES * PIXELS_PER_MINUTE}px`,
        }}
      >
        <ActivityCard
          item={item}
          startTime={displayStartTime}
          endTime={displayEndTime}
          isMoving={isMoving}
          isResizing={isResizing}
          height={height}
          onRemove={onRemove}
        />

        <ResizeHandle />
      </div>

      <Moveable
        target={targetRef}
        draggable={true}
        resizable={true}
        keepRatio={false}
        throttleDrag={0}
        throttleResize={0}
        origin={false}
        edge={false}
        zoom={1}
        bounds={{ left: 0, top: 0, right: 0, bottom: 2000 }}
        snappable={true}
        snapThreshold={5}
        snapGridWidth={SNAP_INTERVAL_PIXELS}
        snapGridHeight={SNAP_INTERVAL_PIXELS}
        renderDirections={['s']}
        resizeFormat={(size: number[]) => size}
        dragArea={true}
        onDragStart={() => setIsMoving(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onResizeStart={() => setIsResizing(true)}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
      />
      
      <PreviewTooltip
        isMoving={isMoving}
        isResizing={isResizing}
        previewEndTime={previewEndTime}
        previewStartTime={previewStartTime}
        displayStartTime={displayStartTime}
        displayEndTime={displayEndTime}
      />
    </div>
  );
};

export default ResizableActivityBlock;
