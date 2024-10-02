import React from 'react';

const Hero = () => {
  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center relative">
      <h1
        className="text-9xl text-white text-center font-bold mb-4 tracking-wider"
        style={{ 
          textShadow: '0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080',
          transform: 'scaleX(1.2)' 
        }}
      >
        SPACEUP
      </h1>
      <h2
        className="text-5xl text-white text-center font-semibold tracking-widest"
      >
        C U S A T
      </h2>

      {/* Planet Image at the bottom */}
      <img
        src="/planet.png" // replace the actual image url
        alt="Planet"
        className="absolute bottom-0 left-0 w-full object-cover" // Full width and cover bottom part
        style={{ height: '40%' }} // Adjust height as needed
      />
    </div>
  );
};

export default Hero;