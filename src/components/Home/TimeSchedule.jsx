import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/TimeSchedule.css';

const TimeSchedule = () => {
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 5}s`
    }));
  };

  const stars = generateStars(50); // Reduced star count for better performance
  const venueSchedules = [
    [
      { time: '07:00 - 08:00', activity: 'Spot Registration' },
      { time: '08:00 - 09:00', activity: 'Opening Ceremony' },
      { time: '09:00 - 10:30', activity: 'Keynote Speech' },
      { time: '10:30 - 11:30', activity: 'Panel Discussion' },
      { time: '11:30 - 12:30', activity: 'Workshop Session 1' },
      { time: '12:30 - 13:30', activity: 'Lunch Break' },
      { time: '13:30 - 15:00', activity: 'Technical Presentations' },
      { time: '15:00 - 16:30', activity: 'Interactive Demo' },
      { time: '16:30 - 17:30', activity: 'Closing Remarks' },
    ],
    [
      { time: '07:00 - 08:00', activity: 'Spot Registration' },
      { time: '08:00 - 09:00', activity: 'Opening Ceremony' },
      { time: '09:00 - 10:30', activity: 'Keynote Speech' },
      { time: '10:30 - 11:30', activity: 'Panel Discussion' },
      { time: '11:30 - 12:30', activity: 'Workshop Session 1' },
      { time: '12:30 - 13:30', activity: 'Lunch Break' },
      { time: '13:30 - 15:00', activity: 'Technical Presentations' },
      { time: '15:00 - 16:30', activity: 'Interactive Demo' },
      { time: '16:30 - 17:30', activity: 'Closing Remarks' },
    ],
    [
      { time: '07:00 - 08:00', activity: 'Spot Registration' },
      { time: '08:00 - 09:00', activity: 'Opening Ceremony' },
      { time: '09:00 - 10:30', activity: 'Keynote Speech' },
      { time: '10:30 - 11:30', activity: 'Panel Discussion' },
      { time: '11:30 - 12:30', activity: 'Workshop Session 1' },
      { time: '12:30 - 13:30', activity: 'Lunch Break' },
      { time: '13:30 - 15:00', activity: 'Technical Presentations' },
      { time: '15:00 - 16:30', activity: 'Interactive Demo' },
      { time: '16:30 - 17:30', activity: 'Closing Remarks' },
    ],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(venueSchedules[0][0].time);
  const [progress, setProgress] = useState(0);
  const [listPosition, setListPosition] = useState(0);

  const timeRef = useRef(null);
  const venueRefs = useRef([]);

  useEffect(() => {
    const duration = 0;
    const pauseDuration = 3;
    const lineHeight = 50;
    const totalItems = venueSchedules[0].length;
    const initialPosition = 200;

    // Set initial position to show the first item
    setListPosition(0);

    const timeTimeline = gsap.timeline({ repeat: -1 });
    const venueTimelines = venueSchedules.map(() => gsap.timeline({ repeat: -1 }));

    for (let i = 0; i < totalItems; i++) {
      const newPosition = -i * lineHeight;
      const newPosition2 = initialPosition - i * lineHeight;

      timeTimeline.to(timeRef.current, {
        y: newPosition,
        ease: "elastic.out(1, 0.4)",
        duration: duration,
        onStart: () => {
          setCurrentIndex(i);
          setCurrentTime(venueSchedules[0][i].time);
          setProgress((i / (totalItems - 1)) * 100);
          setListPosition(newPosition);
        },
      });

      timeTimeline.to({}, { duration: pauseDuration });

      venueTimelines.forEach((timeline, venueIndex) => {
        timeline.to(venueRefs.current[venueIndex], {
          y: newPosition2,
          ease: "elastic.out(1, 0.4)",
          duration: duration,
        });
        timeline.to({}, { duration: pauseDuration });
      });
    }

    timeTimeline.play();
    venueTimelines.forEach(timeline => timeline.play());

    return () => {
      timeTimeline.kill();
      venueTimelines.forEach(timeline => timeline.kill());
    };
  }, []);

  const calculateSunPosition = (progress) => {
    const angle = (progress / 100) * Math.PI;
    const x = 150 - Math.cos(angle) * 150;
    const y = 150 - Math.sin(angle) * 150;
    return { x, y };
  };

  const sunPosition = calculateSunPosition(progress);

  return (
    <div className='bg-black h-screen p-4 md:p-8'>
      <div className="time-schedule relative overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.animationDelay
            }}
          />
        ))}
        <div className="content flex flex-col">
          <div className="date-display font-alternox-regular text-white leading-tight mb-8 md:mb-12">
            <div className="text-lg md:text-xl">ON</div>
            <div className="text-3xl md:text-4xl">20 OCT 2024</div>
            <div className="text-lg md:text-xl">SUNDAY</div>
          </div>

          <div className="time-schedules-header font-alternox-regular text-white text-center mb-8">
            <h2 className="text-3xl md:text-4xl mb-2">TIME SCHEDULES</h2>
            <hr className="border-t border-white w-3/4 mx-auto mb-2" />
            <div className="time-slider" style={{ height: '50px', overflow: 'hidden' }}>
              <ul ref={timeRef} style={{ transform: `translateY(${listPosition}px)` }}>
                {venueSchedules[0].map((schedule, index) => (
                  <li key={index} className="text-xl md:text-2xl" style={{ height: '50px', lineHeight: '50px' }}>{schedule.time}</li>
                ))}
              </ul>
            </div>
            <hr className="border-t border-white w-3/4 mx-auto mt-2" />
          </div>
          
          <div className="venue-info flex flex-col m-auto w-full text-white font-alternox-regular">
            {['VENUE 1', 'VENUE 2', 'VENUE 3'].map((venue, venueIndex) => (
              <div key={venueIndex} className="venue-row flex flex-col md:flex-row items-stretch mb-4 relative">
                <div className="venue-label bg-[#3E1851] text-white px-3 py-2 md:px-5 md:py-5 rounded-md w-full md:w-32 text-center mb-2 md:mb-0">
                  {venue}
                </div>
                <hr className="hidden md:block absolute top-0 left-40 right-0 border-t border-white" />
                <div className="venue-details-container ml-0 md:ml-4 flex-1 flex items-stretch relative">
                  <div className="venue-details flex-1 flex items-center justify-center px-2 md:px-4 text-center overflow-hidden" style={{ height: '50px' }}>
                    <ul ref={el => venueRefs.current[venueIndex] = el} style={{ transform: `translateY(${listPosition}px)` }}>
                      {venueSchedules[venueIndex].map((schedule, index) => (
                        <li key={index} className="text-sm md:text-base" style={{ height: '50px', lineHeight: '50px' }}>{schedule.activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <hr className="hidden md:block absolute bottom-0 left-40 right-0 border-t border-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
