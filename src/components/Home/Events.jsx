import React, { useRef, useState, useEffect } from 'react';
import './css/Events.css';
import { gsap } from 'gsap';


const EventCard = ({ title, image, description, onClick }) => (
  <div 
    className="flex-shrink-0 h-full w-[80vw] sm:w-[45vw] lg:w-[30vw] mr-[4vw] last:mr-0 group hover:cursor-pointer select-none"
    onClick={onClick}
  >
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

const Modal = ({ event, onClose }) => {
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    const contentElement = modalContentRef.current;

    gsap.set(modalElement, { autoAlpha: 0 });
    gsap.set(contentElement, { scale: 0, opacity: 0 });

    const tl = gsap.timeline();

    tl.to(modalElement, { autoAlpha: 1, duration: 0.3 })
      .to(contentElement, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });

    return () => {
      tl.kill();
    };
  }, []);

  const handleClose = () => {
    const modalElement = modalRef.current;
    const contentElement = modalContentRef.current;

    const tl = gsap.timeline({
      onComplete: onClose
    });

    tl.to(contentElement, { scale: 0, opacity: 0, duration: 0.5, ease: "back.in(1.7)" })
      .to(modalElement, { autoAlpha: 0, duration: 0.3 }, "-=0.2");
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalContentRef}
        className="bg-[#4A4A4A] text-white rounded-lg w-[80vw] overflow-hidden relative font-alternox-medium shadow-foggy flex flex-col"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-3xl sm:text-4xl font-light w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="h-[200px] sm:h-[250px] relative flex-shrink-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <h2 className="absolute bottom-4 sm:bottom-6 left-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-alternox-bold leading-tight">
            {event.title.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index !== event.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
          <p className="text-base sm:text-lg font-alternox-extralight">{event.description}</p>
        </div>
      </div>
    </div>
  );
};





const Events = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const scrollContainerRef = useRef(null);

  

  const events = [
    { 
      title: "QUIZ", 
      image: "/img1.jpg",
      description: "A brainstorming aerospace quiz with twists and turns will be there, featuring an exciting prize pool of 50k."
    },
    { 
      title: "GAMES", 
      image: "/img2.jpg",
      description: "The session will feature an engaging gaming experience, complemented by insightful knowledge-sharing segments. Participants can also expect light-hearted interactions, creating a well-rounded event that balances both learning and entertainment."
    },
    { 
      title: "ASTROPHOTOGRAPHY", 
      image: "/img3.jpg",
      description: "Amal Sree Ajith is a passionate astrophotographer, a member of the director board at Shasthrasnehi, and a project assistant at C-SIS."
    },
    { 
      title: "Team \nMarutsakha", 
      image: "/img4.jpg",
      description: "Team Marutsaka is a group of enthusiastic engineering students with strong design skills. They will be conducting a design session during SpaceUp."
    },
    { 
      title: "Dr. Yedu \nKrishna", 
      image: "/speakers/speaker5.png",
      description: "Dr. Yedu Krishna is the founder of Specrule Scientific Pvt. Ltd., a researcher-turned-entrepreneur with expertise in laser applications and spectroscopic techniques for diagnosing high-speed flows and combustion. He holds a Doctor of Philosophy (Ph.D.) in Aerospace Engineering and a Master of Science (M.Sc) in Photonics, bringing a strong research background to his innovative work in these fields."
    },
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


  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalClosing(false);
  };

  return (
    <div className="bg-black text-white p-[4vh] sm:px-[5vw] md:pl-28 md:px-[8vw] lg:px-[10vw] font-alternox overflow-x-hidden mb-20 md:mb-0">
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
            <EventCard 
              key={index} 
              {...event} 
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>
        <CustomScrollbar scrollPercentage={scrollPercentage} />
      </div>
      {selectedEvent && (
        <Modal event={selectedEvent} onClose={handleCloseModal}  />
      )}
    </div>
  );
};

export default Events;
