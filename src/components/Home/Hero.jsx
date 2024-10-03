import React from 'react';
import './css/Hero.css';

const Hero = () => {
  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center overflow-hidden relative">
      <div className='relative z-10'>
        <h1
          className="text-9xl text-white text-center font-bold mb-4 tracking-wider font-alternox-regular"
          style={{ 
            textShadow: '0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080',
            transform: 'scaleX(1.2)' 
          }}
        >
          SPACEUP
        </h1>
      </div>
      
      <img 
        src="/astronaut.png" 
        alt="Space" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 max-w-md z-20 floating-astronaut"
      />

      <div className='relative z-30'>
        <h2
          className="text-5xl text-white text-center font-semibold tracking-widest font-alternox-regular"
        >
          C U S A T
        </h2>
    </div>

      {/* <img 
        src="/planet.png" 
        alt="Planet" 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-10"
      /> */}
    </div>
  );
};

export default Hero;
