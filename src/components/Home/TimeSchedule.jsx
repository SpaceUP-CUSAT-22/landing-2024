import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./css/TimeSchedule.css";

const TimeSchedule = () => {
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 5}s`,
    }));
  };

  const stars = generateStars(50); // Reduced star count for better performance
  const venueSchedules = [
    [
      { time: "07:00 - 08:00", activity: "Spot Registration" },
      { time: "08:00 - 09:00", activity: "Opening Ceremony" },
      { time: "09:00 - 10:30", activity: "Keynote Speech" },
      { time: "10:30 - 11:30", activity: "Panel Discussion" },
      { time: "11:30 - 12:30", activity: "Workshop Session 1" },
      { time: "12:30 - 13:30", activity: "Lunch Break" },
      { time: "13:30 - 15:00", activity: "Technical Presentations" },
      { time: "15:00 - 16:30", activity: "Interactive Demo" },
      { time: "16:30 - 17:30", activity: "Closing Remarks" },
    ],
    [
      { time: "07:00 - 08:00", activity: "Spot Registration" },
      { time: "08:00 - 09:00", activity: "Opening Ceremony" },
      { time: "09:00 - 10:30", activity: "Keynote Speech" },
      { time: "10:30 - 11:30", activity: "Panel Discussion" },
      { time: "11:30 - 12:30", activity: "Workshop Session 1" },
      { time: "12:30 - 13:30", activity: "Lunch Break" },
      { time: "13:30 - 15:00", activity: "Technical Presentations" },
      { time: "15:00 - 16:30", activity: "Interactive Demo" },
      { time: "16:30 - 17:30", activity: "Closing Remarks" },
    ],
    [
      { time: "07:00 - 08:00", activity: "Spot Registration" },
      { time: "08:00 - 09:00", activity: "Opening Ceremony" },
      { time: "09:00 - 10:30", activity: "Keynote Speech" },
      { time: "10:30 - 11:30", activity: "Panel Discussion" },
      { time: "11:30 - 12:30", activity: "Workshop Session 1" },
      { time: "12:30 - 13:30", activity: "Lunch Break" },
      { time: "13:30 - 15:00", activity: "Technical Presentations" },
      { time: "15:00 - 16:30", activity: "Interactive Demo" },
      { time: "16:30 - 17:30", activity: "Closing Remarks" },
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
    const venueTimelines = venueSchedules.map(() =>
      gsap.timeline({ repeat: -1 }),
    );

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
    venueTimelines.forEach((timeline) => timeline.play());

    return () => {
      timeTimeline.kill();
      venueTimelines.forEach((timeline) => timeline.kill());
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
    <div className="bg-black p-4 md:p-8 md:pl-28 lg:h-screen">
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
              animationDelay: star.animationDelay,
            }}
          />
        ))}
        <div className="content flex flex-col">
          <div className="date-display font-alternox-regular mb-8 leading-tight text-white md:mb-12">
            <div className="text-lg md:text-xl">ON</div>
            <div className="text-3xl md:text-4xl">20 OCT 2024</div>
            <div className="text-lg md:text-xl">SUNDAY</div>
          </div>

          <div className="time-schedules-header font-alternox-regular text-white text-center mb-8 justfiy-center">
            <h2 className="text-3xl md:text-4xl mb-2 text-center">TIME SCHEDULES</h2>
            <hr className="border-t border-white w-3/4 mx-auto mb-2" />
            <div className="time-slider" style={{ height: '50px', overflow: 'hidden' }}>
              <ul ref={timeRef} style={{ transform: `translateY(${listPosition}px)` }}>
                {venueSchedules[0].map((schedule, index) => (
                  <li
                    key={index}
                    className="text-xl md:text-2xl"
                    style={{ height: "50px", lineHeight: "50px" }}
                  >
                    {schedule.time}
                  </li>
                ))}
              </ul>
            </div>
            <hr className="mx-auto mt-2 w-3/4 border-t border-white" />
          </div>

          <div className="venue-info font-alternox-regular m-auto flex w-full flex-col text-white">
            {["VENUE 1", "VENUE 2", "VENUE 3"].map((venue, venueIndex) => (
              <div
                key={venueIndex}
                className="venue-row relative mb-4 flex flex-col items-stretch md:flex-row"
              >
                <div className="venue-label mb-2 w-full rounded-md bg-[#3E1851] px-3 py-2 text-center text-white md:mb-0 md:w-32 md:px-5 md:py-5">
                  {venue}
                </div>
                <hr className="absolute left-40 right-0 top-0 hidden border-t border-white md:block" />
                <div className="venue-details-container relative ml-0 flex flex-1 items-stretch md:ml-4">
                  <div
                    className="venue-details flex flex-1 items-center justify-center overflow-hidden px-2 text-center md:px-4"
                    style={{ height: "50px" }}
                  >
                    <ul
                      ref={(el) => (venueRefs.current[venueIndex] = el)}
                      style={{ transform: `translateY(${listPosition}px)` }}
                    >
                      {venueSchedules[venueIndex].map((schedule, index) => (
                        <li
                          key={index}
                          className="text-sm md:text-base"
                          style={{ height: "50px", lineHeight: "50px" }}
                        >
                          {schedule.activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <hr className="absolute bottom-0 left-40 right-0 hidden border-t border-white md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
