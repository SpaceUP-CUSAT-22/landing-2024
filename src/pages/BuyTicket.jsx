import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BuyTicket = () => {
  const spaceupRef = useRef(null);
  const cusatRef = useRef(null);
  const astronautRef = useRef(null);

  useEffect(() => {
    const spaceupText = spaceupRef.current;
    const cusatText = cusatRef.current;
    const astronaut = astronautRef.current;

    // Initial setup
    gsap.set(spaceupText, { fontSize: "clamp(3rem, 8vw, 6rem)" });
    gsap.set(cusatText, { opacity: 0, y: 20 });
    gsap.set(astronaut, { y: "-100%", opacity: 0 });

    // Animation
    const tl = gsap.timeline();

    tl.to(spaceupText, {
      fontSize: "clamp(2.5rem, 7vw, 5rem)",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(astronaut, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      onComplete: startFloatingAnimation
    }, "<")
    .to(cusatText, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "<+=0.5");

    function startFloatingAnimation() {
      gsap.to(astronaut, {
        y: "+=20",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <h1 className="text-xl p-6">Get Your Ticket Here</h1>
      
      <div className="flex-grow flex flex-col lg:flex-row justify-between items-start p-6 sm:px-12">
        {/* Form Column */}
        <div className="w-full lg:w-1/3 lg:pr-4 mb-6 lg:mb-0">
          <form className="flex flex-col space-y-3">
            <input type="text" placeholder="NAME" className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200" />
            <input type="email" placeholder="EMAIL" className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200" />
            <input type="tel" placeholder="PHONE" className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200" />
            <input type="text" placeholder="COLLEGE/SCHOOL" className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200" />
            <input type="text" placeholder="YEAR/CLASS" className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200" />
            <input type="text" placeholder="COUPON CODE (OPTIONAL)" className="w-full py-3 pl-3 bg-transparent border border-gray-600 rounded text-sm focus:border-purple-500 focus:outline-none transition-colors duration-200" />
            <button type="button" className="w-2/5 px-2 py-3 bg-transparent border border-purple-500 text-purple-500 rounded text-sm whitespace-nowrap transition-colors duration-200">
              ATTACH SCREENSHOT
            </button>
            <div className="h-6"></div> {/* Spacing */}
            <button type="submit" className="w-1/4 py-1.5 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors duration-200">
              SUBMIT
            </button>
          </form>
        </div>
        
        {/* Scan to Pay Column */}
        <div className="w-full lg:w-1/3 lg:px-4 mb-6 lg:mb-0 flex flex-col items-center">
          <h2 className="text-lg mb-3 font-alternox-regular">SCAN TO PAY</h2>
          <div className="bg-white p-2 rounded-lg">
            {/* Replace with an actual QR code image */}
            <img src="/ticketqrcode.png" alt="qrcode" />
          </div>
        </div>

        {/* SpaceUp and Astronaut Column */}
        <div className="w-full lg:w-1/3 lg:pl-4 flex flex-col items-center justify-center relative h-[60vh] lg:h-auto">
          <h1
            ref={spaceupRef}
            className="font-alternox-regular text-center font-bold tracking-wider text-white z-10 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              textShadow: "0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080",
            }}
          >
            SPACEUP
          </h1>
          <img
            ref={astronautRef}
            src="/Astronaut1.png"
            alt="Space"
            className="w-3/4 max-w-md z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <h2
            ref={cusatRef}
            className="font-alternox-regular text-center text-2xl font-semibold tracking-widest text-white z-30 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          >
            C U S A T
          </h2>
        </div>
      </div>
      
      <footer className="mt-auto p-4 text-center text-xs border-t border-gray-700 font-alternox-regular">
        copyright © 2024 | spaceupCUSAT
      </footer>
    </div>
  );
};

export default BuyTicket;
