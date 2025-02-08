import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;