import React from 'react';
import './css/Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center overflow-hidden relative">
      <Link to="/buymerch" className="merch-banner">
        <div className="merch-banner-content">
          <span className="merch-icon">🚀</span>
          <span className="merch-text">Get Your SpaceUp Merch Now!</span>
          <span className="merch-cta">Shop Now</span>
        </div>
      </Link>
      <div className='relative z-10 px-4'>
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white text-center font-bold mb-4 tracking-wider font-alternox-regular"
          style={{ 
            textShadow: '0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080',
            transform: 'scaleX(1.2)' 
          }}
        >
          SPACEUP
        </h1>
      </div>
      
      <img 
        src="/Astronaut1.png" 
        alt="Space" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-2/3 md:w-1/2 max-w-md z-20 floating-astronaut"
      />

      <div className='relative z-30 mt-4 sm:mt-8'>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-white text-center font-semibold tracking-widest font-alternox-regular"
        >
          C U S A T
        </h2>
      </div>
    </div>
  );
};

export default Hero;
