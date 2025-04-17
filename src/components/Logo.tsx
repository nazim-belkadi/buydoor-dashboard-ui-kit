
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold text-black dark:text-white">BUY</span>
      <span className="text-2xl font-bold text-purple-600 ml-1">DOOR</span>
    </div>
  );
};

export default Logo;
