
import React from 'react';

const ResizeHandle = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize bg-gradient-to-t from-spot-primary/20 to-transparent hover:from-spot-primary/40 transition-colors rounded-b-lg flex items-center justify-center group/resize">
      <div className="w-8 h-0.5 bg-spot-primary rounded-full opacity-60 group-hover/resize:opacity-100 transition-opacity" />
    </div>
  );
};

export default ResizeHandle;
