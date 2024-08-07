import React, { useEffect, useRef } from 'react';
import Typer from './Typer';
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <> 
      
      <div className="absolute z-[101] left-1/2 md:mt-20 mt-20 transform -translate-x-1/2 w-full max-w-[30rem] px-4 text-center">
        <img 
          src="/logo.png" 
          className="w-full mb-8" 
          alt="logo" 
        />

        <Link to='/register' className='' id="wrapper">
          <button
            data-cursor="pointer"
            id="catchmeBtn"
            className="cursor-pointer bg-[#A6232B] hover:bg-[#CC2B35] text-white exo text-center px-6 py-3 text-lg transition-colors duration-300"
          >
            BUY TICKETS
          </button>
        </Link>

        <Typer />
      </div>
    </>
  );
}

export default Hero;
