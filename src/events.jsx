import React, { useRef } from "react";
import "./events.css";

const events = [
  { title: "SPACE ON\nWHEELS", image: "path/to/space-on-wheels.jpg" },
  { title: "CANSAT\nWORKSHOP", image: "path/to/cansat-workshop.jpg" },
  { title: "HORIZON", image: "path/to/horizon.jpg" },
  { title: "WESAT", image: "path/to/wesat.jpg" },
  { title: "ASTRO\nCHALLENGE", image: "path/to/astro-challenge.jpg" },
  { title: "POPSICLE BRIDGE\nCHALLENGE", image: "path/to/popsicle-bridge.jpg" },
];

const EventCard = ({ title, image }) => (
  <div className="event-card" style={{ backgroundImage: `url(${image})` }}>
    <h3>{title}</h3>
  </div>
);

const Events = () => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <section className="events-section">
      <div className="events-container">
        <h2>
          <span className="spaceup">SPACEUP</span>{" "}
          <span className="events">EVENTS</span>
        </h2>
        <div className="events-title-line"></div>
        <div className="events-scroll-container">
          <button className="scroll-button left" onClick={() => scroll(-300)}>
            &#8249;
          </button>
          <div className="events-scroll" ref={scrollRef}>
            {events.map((event, index) => (
              <EventCard key={index} title={event.title} image={event.image} />
            ))}
          </div>
          <button className="scroll-button right" onClick={() => scroll(300)}>
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;
