
import React from 'react';

const ResizeHandle = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-3 cursor-ns-resize bg-gradient-to-t from-spot-primary/30 to-transparent hover:from-spot-primary/50 transition-colors rounded-b-lg flex items-center justify-center group/resize">
      <div className="w-8 h-1 bg-spot-primary rounded-full opacity-70 group-hover/resize:opacity-100 transition-opacity" />
    </div>
  );
};

export default ResizeHandle;
