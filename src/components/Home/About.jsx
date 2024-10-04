import React, { useState, useEffect } from "react";
import "../../fonts.css"

const About = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const calculateRotation = () => {
    const startScroll = 300;
    const endScroll = 1000;
    const maxRotation = -90; // Reduced maximum rotation to 90 degrees

    if (scrollPosition < startScroll) return 0;
    if (scrollPosition > endScroll) return maxRotation;

    const scrollRange = endScroll - startScroll;
    const scrollProgress = (scrollPosition - startScroll) / scrollRange;
    return maxRotation * scrollProgress;
  };

  const calculateTranslateY = () => {
    const startScroll = 300;
    const endScroll = 1000;
    const maxTranslate = -500; // Increased upward movement to 200 pixels

    if (scrollPosition < startScroll) return 0;
    if (scrollPosition > endScroll) return maxTranslate;

    const scrollRange = endScroll - startScroll;
    const scrollProgress = (scrollPosition - startScroll) / scrollRange;
    return maxTranslate * scrollProgress;
  };

  const planetStyle = {
    transform: `translate(-50%, calc(-50% + ${calculateTranslateY()}px)) rotate(${calculateRotation()}deg)`,
    transformOrigin: 'center center',
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div className="pl-10 pr-4 md:pl-40 md:pr-16 lg:pl-36 lg:pr-20 text-white relative z-10 mb-20">
      <img 
        src="/planet.png" 
        alt="Planet Bottom" 
        className="absolute top-[10%] md:top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1300px] z-0 transition-transform duration-300 ease-out"
        style={planetStyle}
      />

      <div className="flex flex-col lg:flex-row h-fit p-6 md:p-12 md:pb-0 pb-0 justify-between items-center lg:items-end bg-[#9B3CCA] rounded-md bg-opacity-[25%] backdrop-filter backdrop-blur-sm relative z-10">
          <div className="w-full flex flex-col pb-6 md:pb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-alternox-bold font-bold">
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
            <div className="my-8 md:my-12 bg-white h-[1px] w-full font-alternox-regular"></div>
            <p>
              SpaceUp isn't your typical conference; it's a global phenomenon
              that empowers you to shape the future of space networking. Since
              its groundbreaking debut in 2010, SpaceUp has transcended borders,
              becoming a worldwide sensation. Our mission? To revolutionize
              networking in the space industry. At SpaceUp, we believe that
              everyone with a space passion deserves a platform to shine. That's
              why we let YOU decide the agenda. No pre-set topics or schedules -
              you're in control! Picture this: Attendees collaboratively build
              the event in real-time. They propose topics, lead discussions, and
              form the audience on the spot. There are no spectators, only
              participants! SpaceUp is the ultimate melting pot, uniting diverse
              space communities, fostering careers, and sparking fresh ideas for
              space startups. Join us, and be part of the space revolution!
            </p>
          </div>
          <img src="/Astronaut2.png" alt="astronaut image" className="aspect-square size-auto md:size-[80%] lg:size-auto"/>
        </div>
      </div>
  );
};

export default About;
