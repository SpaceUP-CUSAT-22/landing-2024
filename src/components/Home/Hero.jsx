import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typer from './Typer';

const Hero = () => {
  const buttonRef = useRef(null);
  const originalPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;

    // Store the button's original position
    originalPositionRef.current = { x: button.offsetLeft, y: button.offsetTop };

    const handleMouseMove = (e) => {
      const { clientX: mouseX, clientY: mouseY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const buttonX = left + width / 2;
      const buttonY = top + height / 2;
      const deltaX = mouseX - buttonX;
      const deltaY = mouseY - buttonY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const maxDistance = 200; // Maximum distance the button will move

      // Calculate the position offset based on cursor distance
      const offsetX = (deltaX / distance) * maxDistance;
      const offsetY = (deltaY / distance) * maxDistance;

      // Animate the button position with GSAP
      gsap.to(button, {
        x: -offsetX,
        y: -offsetY,
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      // Animate the button back to its original position
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    const wrapper = document.getElementById('wrapper');

    // Add event listeners
    if(window.innerWidth > 758){
      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
    }

    // Clean up event listeners on component unmount
    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const redirect = () => {
    if(window.innerWidth > 758){
      window.open('https://youtu.be/dQw4w9WgXcQ?si=uXzFpENlYYz8ssFs', '_blank');
    }
  };

  return (
    <div className="absolute z-[101] left-1/2 md:mt-0 mt-10 transform -translate-x-1/2 w-full max-w-[30rem] px-4 text-center">
      <img 
        src="/logo.png" 
        className="w-full mb-8" 
        alt="logo" 
      />

      <div className='' id="wrapper">
        <button
          ref={buttonRef}
          data-cursor="pointer"
          id="catchmeBtn"
          onClick={redirect}
          className="cursor-pointer bg-[#A6232B] hover:bg-[#CC2B35] text-white exo text-center px-6 py-3 text-lg transition-colors duration-300"
        >
          BUY TICKETS
        </button>
      </div>

      <Typer />
    </div>
  );
}

export default Hero;
