
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <span 
        className="text-2xl font-bold" 
        style={{ 
          background: 'linear-gradient(to right, #D6BCFA, oklch(47.22% 0.1834 290.74))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        BUYDOOR
      </span>
    </div>
  );
};

export default Logo;
