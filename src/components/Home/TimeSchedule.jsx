import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./css/TimeSchedule.css";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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

  const stars = generateStars(50);
  const venueSchedules = [
    [
      { time: "09:00 AM - 10:00 AM", activity: "Innauguration" },
      { time: "10:30 AM - 11:30 AM", activity: "Talk Session - Dr. Murthy Remilla" },
      { time: "12:00 PM - 01:00 PM", activity: "Talk Session - Dr. Satish R Thampi" },
      { time: "01:00 PM - 02:30 PM", activity: "Lunch Break" },
      { time: "02:30 PM - 03:30 PM", activity: "Workshop on Sunspotting by Astrokerala" },
      { time: "03:30 PM - 04:00 PM", activity: "Tea Break" },
      { time: "04:00 PM - 05:00 PM", activity: "Talk Session - Ms. Nikitha Chadde" },
      { time: "05:00 PM - 06:00 PM", activity: "Talk Session - Dr. Jagadeep" },
    ],
    [
      { time: "09:00 AM - 10:00 AM", activity: "" },
      { time: "10:30 AM - 11:30 AM", activity: "" },
      { time: "12:00 PM - 01:00 PM", activity: "" },
      { time: "01:00 PM - 02:30 PM", activity: "" },
      { time: "02:30 PM - 03:30 PM", activity: "Workshop - Team Marutsakha" },
      { time: "03:30 PM - 04:00 PM", activity: "Tea Break" },
      { time: "04:00 PM - 05:00 PM", activity: "" },
      { time: "05:00 PM - 06:00 PM", activity: "" },
    ],
    [
      { time: "09:00 AM - 10:00 AM", activity: "" },
      { time: "10:30 AM - 11:30 AM", activity: "" },
      { time: "12:00 PM - 01:00 PM", activity: "" },
      { time: "01:00 PM - 02:30 PM", activity: "" },
      { time: "02:30 PM - 03:30 PM", activity: "Workshop - Dr. Yadhu Krishna" },
      { time: "03:30 PM - 04:00 PM", activity: "Tea Break" },
      { time: "04:00 PM - 05:00 PM", activity: "" },
      { time: "05:00 PM - 06:00 PM", activity: "" },
    ]
  ];

  const sectionRef = useRef(null);
  const timeRef = useRef(null);
  const venueRefs = useRef([]);
  const progressRef = useRef(null);
  const sunRef = useRef(null);
  const semiCircleRef = useRef(null);


  useEffect(() => {
    const section = sectionRef.current;
    const timeElement = timeRef.current;
    const venueElements = venueRefs.current;
    const progressElement = progressRef.current;
    // const sunElement = sunRef.current;
    // const semiCircleElement = semiCircleRef.current;


    

    // const semiCircleRect = semiCircleElement.getBoundingClientRect();
    // const centerX = semiCircleRect.width / 2;
    // const radius = semiCircleRect.width / 2;


    // gsap.set(sunElement, { 
    //   x: centerX, 
    //   y: semiCircleRect.height,
    //   xPercent: -50, 
    //   yPercent: -50 
    // });

    const totalItems = venueSchedules[0].length;
    const lineHeight = 50;

    gsap.set(timeElement, { y: 0 });
    venueElements.forEach((el) => gsap.set(el, { y: 180 }));
    

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalItems * lineHeight * 4}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    for (let i = 0; i < totalItems; i++) {
      const progress = i / (totalItems - 1);
      tl.to(
        timeElement,
        {
          y: -i * lineHeight,
          duration: 2,
        },
        i * 2
      );

      venueElements.forEach((el) => {
        tl.to(
          el,
          {
            y: 180 - i * lineHeight,
            duration: 2,
          },
          i * 2
        );
      });

      tl.to(
        progressElement,
        {
          width: `${progress * 100}%`,
          duration: 2,
        },
        i * 2
      );

      // tl.to(
      //   sunElement,
      //   {
      //     motionPath: {
      //       path: [
      //         { x: centerX, y: semiCircleRect.height },
      //         { x: centerX + radius, y: semiCircleRect.height / 2 },
      //         { x: centerX + radius * 2, y: semiCircleRect.height }
      //       ],
      //       curviness: 1,
      //       type: "cubic"
      //     },
      //     duration: 2,
      //     onUpdate: () => console.log("Sun position:", sunElement.getBoundingClientRect()),
      //   },
      //   i * 2
      // );
  
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const calculateSunPosition = (progress) => {
    const angle = (progress / 100) * Math.PI;
    const x = 150 - Math.cos(angle) * 150;
    const y = 150 - Math.sin(angle) * 150;
    return { x, y };
  };

  return (
    <div ref={sectionRef} className="bg-black p-4 md:p-8 md:pl-28 h-screen">
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
        <div className="content flex flex-col mb-0">
          <div className="date-display font-alternox-regular mb-8 leading-tight text-white md:mb-12">
            <div className="text-lg md:text-xl">ON</div>
            <div className="text-3xl md:text-4xl">26 OCT 2024</div>
            <div className="text-lg md:text-xl">SUNDAY</div>
          </div>

          {/* <div className="semi-circle-container" style={{ width: '300px', height: '150px' }}>
            <div ref={semiCircleRef} className="semi-circle"></div>
            <div ref={sunRef} className="sun"></div>
          </div> */}



          <div className="time-schedules-header font-alternox-regular text-white text-center mb-8 justfiy-center">
            <h2 className="text-2xl md:text-4xl mb-2 text-center">TIME SCHEDULES</h2>
            <hr className="border-t border-white w-3/4 mx-auto mb-2" />
            <div className="time-slider" style={{ height: '50px', overflow: 'hidden' }}>
              <ul ref={timeRef}>
                {venueSchedules[0].map((schedule, index) => (
                  <li
                    key={index}
                    className="text-lg md:text-2xl"
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
            {["MAIN HALL", "SEMINAR HALL", "EXECUTIVE HALL"].map((venue, venueIndex) => (
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
                    <ul ref={(el) => (venueRefs.current[venueIndex] = el)}>
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

          <div className="progress-bar mt-8">
            <div className="bg-gray-700 h-2 rounded-full">
              <div
                ref={progressRef}
                className="bg-white h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;