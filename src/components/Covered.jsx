import React, { useState, useEffect } from "react";

const Covered = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPercentage(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-5 top-20 z-50 flex h-[80%] w-1 flex-col items-center justify-between rounded-[50px] bg-zinc-800 md:left-20">
      <div
        className="absolute top-0 w-full rounded-[50px] bg-white"
        style={{ height: `${scrollPercentage}%` }}
      />
      <div className="z-10 mt-[-25px] text-xs font-bold text-white">
        {Math.round(scrollPercentage)}%
      </div>
      <div className="z-10 mb-[-25px] text-xs font-bold text-white">100%</div>
    </div>
  );
};

export default Covered;
