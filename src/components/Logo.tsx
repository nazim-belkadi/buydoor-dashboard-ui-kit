
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold text-black dark:text-white">BUY</span>
      <span 
        className="text-2xl font-bold ml-1"
        style={{
          background: 'linear-gradient(to right, #D6BCFA, #6E59A5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        DOOR
      </span>
    </div>
  );
};

export default Logo;
