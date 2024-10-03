import React, { useState, useEffect } from 'react';

const Covered = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPercentage(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-20 left-5 md:left-20 w-1 h-[80%] bg-zinc-800 rounded-[50px] flex flex-col justify-between items-center z-50">
      <div 
        className="w-full bg-white rounded-[50px] absolute top-0"
        style={{ height: `${scrollPercentage}%` }}
      />
      <div className="text-xs font-bold text-white z-10 mt-[-25px]">
        {Math.round(scrollPercentage)}%
      </div>
      <div className="text-xs font-bold text-white z-10 mb-[-25px]">
        100%
      </div>
    </div>
  );
};

export default Covered;
