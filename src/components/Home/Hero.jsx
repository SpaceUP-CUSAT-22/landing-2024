import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Typer from './Typer';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Hero = () => {
  const [toast, setToast] = React.useState(false)
  const buttonRef = useRef(null);
  const originalPositionRef = useRef({ x: 0, y: 0 });

  const notify = () => {
    setToast(true)
  }

  useEffect(() => {
    if (toast){
      setTimeout(() => {
        setToast(false)
      }, 5000)
    }
  }, [toast])

  useEffect(() => {
    const button = buttonRef.current;

    // Store the button's original position
    originalPositionRef.current = { x: button.offsetLeft, y: button.offsetTop };

    const handleMouseMove = (e) => {
      setToast(true)
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
      setToast(false)
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
    }else{
      notify()
    }
  };

  return (
    <> 
      <div className={`fixed z-[101] top-10 transition ease-in duration-300 left-1/2 -translate-x-1/2 ${toast ? 'opacity-100' : 'opacity-0'}`}>
        <div className='bg-white bg-opacity-50 px-10 py-5 rounded'>
          <p className='text-white exo text-center'>Coming soon!</p>
        </div>
      </div>
      
      <div className="absolute z-[101] left-1/2 md:mt-20 mt-20 transform -translate-x-1/2 w-full max-w-[30rem] px-4 text-center">
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
    </>
  );
}

export default Hero;
