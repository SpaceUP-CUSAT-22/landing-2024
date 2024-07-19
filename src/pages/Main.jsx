import React from 'react'
import Home from '../slides/Home'
import Events from '../slides/Events'
import Speaker from '../slides/Speaker'
import PrevImages from '../slides/PrevImages'
import TimeSchedule from '../slides/TimeSchedule'
import About from '../slides/About'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import './style.css'

gsap.registerPlugin(ScrollTrigger);


const Main = () => {
  const component = React.useRef();
  const slider1 = React.useRef();
  const slider2 = React.useRef();
  const slider3 = React.useRef();

  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels1 = gsap.utils.toArray(".panel1");
      let pauseRatio = 0.1;
      let t1 = gsap.timeline({
        scrollTrigger: {
          trigger: slider1.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels1.length - 1),
          end: () => "+=" + slider1.current.offsetWidth,
          markers: false
        }
      });
      t1.to(
        panels1,
        {
          xPercent: -100 * (panels1.length - 1),
          duration: 1,
          ease: "none"
        },
        pauseRatio
      );
      t1.to({}, { duration: pauseRatio });
      
      let panels2 = gsap.utils.toArray(".panel2");
      
      let t2 = gsap.timeline({
        scrollTrigger: {
          trigger: slider2.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels2.length - 1),
          end: () => "+=" + slider2.current.offsetWidth,
          markers: false
        }
      });
      t2.to(
        panels2,
        {
          xPercent: -100 * (panels2.length - 1),
          duration: 1,
          ease: "none"
        },
        pauseRatio
      );  
      t2.to({}, { duration: pauseRatio });

      let panels3 = gsap.utils.toArray(".panel3");
      
      let t3 = gsap.timeline({
        scrollTrigger: {
          trigger: slider3.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels3.length - 1),
          end: () => "+=" + slider3.current.offsetWidth,
          markers: false
        }
      });
      t3.to(
        panels3,
        {
          xPercent: -100 * (panels3.length - 1),
          duration: 1,
          ease: "none"
        },
        pauseRatio
      );
      t3.to({}, { duration: pauseRatio });
    }, component);
    return () => ctx.revert();
  });
  return (
    <>
      <div ref={component}>
        <div className="bg-[#050B17] h-[100vh]">
          <Home />
        </div>

        
        <div ref={slider1} className="w-[600vw] h-screen flex flex-wrap">
          <Events />
        </div>


        <div ref={slider2} className="w-[600vw] h-screen flex flex-wrap">
          <Speaker name={"Dr. Tessy Thomas1"} para1={"Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023."} para2={"We are honored to announce Dr. Tessy Thomas as the Chief Guest and our First Keynote Speaker for SpaceUp CUSAT 2023. Known as the 'Missile Woman of India,' Dr. Tessy Thomas has made an indelible mark in the field of aerospace and defense. As the former Director of the Advanced Systems Laboratory (ASL) and Project Director for Agni-IV, she played a pivotal role in India's strategic missile program. "} designation={"Director General of Aeronautical Systems Missile woman of India"}  />
          <Speaker name={"Dr. Tessy Thomas2"} para1={"Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023."} para2={"We are honored to announce Dr. Tessy Thomas as the Chief Guest and our First Keynote Speaker for SpaceUp CUSAT 2023. Known as the 'Missile Woman of India,' Dr. Tessy Thomas has made an indelible mark in the field of aerospace and defense. As the former Director of the Advanced Systems Laboratory (ASL) and Project Director for Agni-IV, she played a pivotal role in India's strategic missile program. "}  />
          <Speaker name={"Dr. Tessy Thomas3"} para1={"Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023."} para2={"We are honored to announce Dr. Tessy Thomas as the Chief Guest and our First Keynote Speaker for SpaceUp CUSAT 2023. Known as the 'Missile Woman of India,' Dr. Tessy Thomas has made an indelible mark in the field of aerospace and defense. As the former Director of the Advanced Systems Laboratory (ASL) and Project Director for Agni-IV, she played a pivotal role in India's strategic missile program. "}  />
          <Speaker name={"Dr. Tessy Thomas4"} para1={"Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023."} para2={"We are honored to announce Dr. Tessy Thomas as the Chief Guest and our First Keynote Speaker for SpaceUp CUSAT 2023. Known as the 'Missile Woman of India,' Dr. Tessy Thomas has made an indelible mark in the field of aerospace and defense. As the former Director of the Advanced Systems Laboratory (ASL) and Project Director for Agni-IV, she played a pivotal role in India's strategic missile program. "}  />
        </div>


        <div className='bg-green-500 flex h-[100vh]'>
          <TimeSchedule />
        </div>


        <div ref={slider3} className="bg-[#050B17] w-[600vw] md:h-screen flex flex-wrap">
          <PrevImages />
        </div>


        <div className='bg-black py-10 md:h-[100vh]'>
          <About />
        </div>


      </div>
    </>
  )
}

export default Main