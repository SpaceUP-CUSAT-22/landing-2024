import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

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

    const wrapper = document.getElementById('wrapper')

    // Add mousemove event listener
    wrapper.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const redirect = () => {
    window.open('https://youtu.be/dQw4w9WgXcQ?si=uXzFpENlYYz8ssFs', '_blank');
  }

  return (
    <div className='z-[99] absolute block md:top-40 top-60 md:left-[30%] left-[5%] px-10'>
      <h1 className='orbitron text-center text-white text-6xl md:text-9xl'>Space Up</h1>
      <br />
      <div id="wrapper" className='w-[30rem]'>
        <button
          ref={buttonRef}
          data-cursor="pointer"
          id="catchmeBtn"
          onClick={redirect}
          className='cursor-pointer hover:bg-[#CC2B35] md:ml-64 ml-28 bg-[#A6232B] text-white exo text-center md:px-5 md:py-4 md:text-md text-md px-2 py-1'
        >
          BUY TICKETS
        </button>
      </div>
    </div>
  );
}

export default Hero;
