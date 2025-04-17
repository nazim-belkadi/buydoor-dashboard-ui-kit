
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold text-black dark:text-white">BUY</span>
      <span 
        className="text-2xl font-bold ml-1"
        style={{
          background: 'linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%)',
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
