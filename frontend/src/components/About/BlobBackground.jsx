import React from 'react';

const BlobBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <svg viewBox="0 0 800 800" className="w-full h-full opacity-20">
        <path
          fill="#10b981"
          d="M734.5 414Q665 828 349.5 769.5T34 414Q158 200 349.5 34T734.5 414Z"
          transform="rotate(10 400 400)"
        />
      </svg>
    </div>
  );
};

export default BlobBackground;