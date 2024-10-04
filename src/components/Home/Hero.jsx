import React from "react";
import "./css/Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <Link to="/buymerch" className="merch-banner">
        <div className="merch-banner-content">
          <span className="merch-icon">🚀</span>
          <span className="merch-text">Get Your SpaceUp Merch Now!</span>
          <span className="merch-cta">Shop Now</span>
        </div>
      </Link>
      <div className="relative z-10 px-4">
        <h1
          className="font-alternox-regular mb-4 text-center text-5xl font-bold tracking-wider text-white sm:text-7xl md:text-8xl lg:text-9xl"
          style={{
            textShadow: "0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080",
            transform: "scaleX(1.2)",
          }}
        >
          SPACEUP
        </h1>
      </div>

      <img
        src="/Astronaut1.png"
        alt="Space"
        className="floating-astronaut absolute left-1/2 top-1/2 z-20 w-3/4 max-w-md -translate-x-1/2 -translate-y-1/2 transform sm:w-2/3 md:w-1/2"
      />

      <div className="relative z-30 mt-4 sm:mt-8">
        <h2 className="font-alternox-regular text-center text-3xl font-semibold tracking-widest text-white sm:text-4xl md:text-5xl">
          C U S A T
        </h2>
      </div>
    </div>
  );
};

export default Hero;
