import React, { useEffect, useRef } from "react";
import "../../fonts.css";
import './css/About.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const planetRef = useRef(null);
  const sectionRef = useRef(null);

  // In About.jsx

  useEffect(() => {
    const planet = planetRef.current;
    const section = sectionRef.current;

    // Initial upward movement without rotation
    const tl = gsap.timeline({
      paused: true,
    });

    tl.fromTo(planet, 
      { y: window.innerHeight, rotation: 0 },
      {
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );

    // Listen for the custom event from Hero component
    const startInitialAnimation = () => {
      tl.play();
    };

    document.addEventListener('heroAnimationComplete', startInitialAnimation);

    // Rotation and further upward movement
    gsap.to(planet, {
      rotation: -90,
      y: -500,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: true,
      }
    });

    return () => {
      document.removeEventListener('heroAnimationComplete', startInitialAnimation);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);


  return (
    <div ref={sectionRef} className="pl-10 pr-4 md:pl-40 md:pr-16 lg:pl-36 lg:pr-20 text-white relative z-10 mb-60">
      <img 
        ref={planetRef}
        src="/planet.png" 
        alt="Planet Bottom" 
        className='absolute left-1/2 transform -translate-x-1/2 w-[1300px] z-0'
      />

      <div className="relative z-10 flex h-fit flex-col items-center justify-between rounded-md bg-[#9B3CCA] bg-opacity-[25%] p-6 pb-0 backdrop-blur-sm backdrop-filter md:p-12 md:pb-0 lg:flex-row lg:items-end">
        <div className="flex w-full flex-col pb-6 md:pb-12">
          <h2 className="font-alternox-bold text-4xl font-bold md:text-5xl lg:text-6xl">
            <span
              className="text-transparent"
              style={{
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "0.5px white",
              }}
            >
              ABOUT
            </span>{" "}
            <span className="text-white"> SPACEUP</span>
          </h2>
          <div className="font-alternox-regular my-8 h-[1px] w-full bg-white md:my-12"></div>
          <p>
            SpaceUp isn't your typical conference; it's a global phenomenon that
            empowers you to shape the future of space networking. Since its
            groundbreaking debut in 2010, SpaceUp has transcended borders,
            becoming a worldwide sensation. Our mission? To revolutionize
            networking in the space industry. At SpaceUp, we believe that
            everyone with a space passion deserves a platform to shine. That's
            why we let YOU decide the agenda. No pre-set topics or schedules -
            you're in control! Picture this: Attendees collaboratively build the
            event in real-time. They propose topics, lead discussions, and form
            the audience on the spot. There are no spectators, only
            participants! SpaceUp is the ultimate melting pot, uniting diverse
            space communities, fostering careers, and sparking fresh ideas for
            space startups. Join us, and be part of the space revolution!
          </p>
        </div>
        <img
          src="/Astronaut2.png"
          alt="astronaut image"
          className="aspect-square size-auto md:size-[80%] lg:size-auto"
        />
      </div>
    </div>
  );
};

export default About;
