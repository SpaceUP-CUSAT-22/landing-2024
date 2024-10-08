import React, { useRef, useState, useEffect } from 'react';
import './css/Events.css';

const EventCard = ({ title, image }) => (
  <div className="flex-shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw] mr-[4vw] last:mr-0 group">
    <div className="relative aspect-video rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-105">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <h3 className="absolute bottom-[2vh] left-[2vh] text-lg sm:text-xl md:text-2xl lg:text-3xl font-alternox-bold leading-tight">
        {title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index !== title.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>
    </div>
  </div>
);

const CustomScrollbar = ({ scrollPercentage }) => {
  return (
    <div className="w-full h-[0.2vh] bg-white/30 relative mt-[2vh]">
      <div
        className="absolute h-[1.5vh] bg-white rounded-full -top-[0.5vh]"
        style={{
          width: '15vw',
          left: `${scrollPercentage}%`,
        }}
      />
    </div>
  );
};

const Events = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const scrollContainerRef = useRef(null);

  const events = [
    { title: "SPACE ON\nWHEELS", image: "/img1.jpg" },
    { title: "CANSAT\nWORKSHOP", image: "/img2.jpg" },
    { title: "HORIZON", image: "/img3.jpg" },
    { title: "WESAT", image: "/img4.jpg" },
    { title: "ASTRO\nCHALLENGE", image: "/img5.jpg" },
    { title: "POPSICLE BRIDGE\nCHALLENGE", image: "/img6.jpg" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const scrollEnd = maxScroll > 0 ? (scrollLeft / maxScroll) * 85 : 0;
        setScrollPercentage(scrollEnd);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white p-[4vh] sm:px-[5vw] md:pl-28 md:px-[8vw] lg:px-[10vw] font-alternox overflow-x-hidden">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-[2vh] font-alternox-bold">
        <span className="text-white">SPACEUP</span>
        <span 
          className="ml-[1vw] text-transparent bg-clip-text"
          style={{ WebkitTextStroke: '0.5px white' }}
        >
          EVENTS
        </span>
      </h2>
      <div className="w-full h-[0.1vh] bg-white mb-[4vh]"></div>
      <div className="relative">
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto pb-[2vh] scrollbar-hide scroll-smooth"
        >
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        <CustomScrollbar scrollPercentage={scrollPercentage} />
      </div>
    </div>
  );
};

export default Events;
