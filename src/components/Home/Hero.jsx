import React, { useEffect, useRef, useState } from "react";
import "./css/Hero.css";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [showArrow, setShowArrow] = useState(true);
  const sectionRef = useRef(null);
  const spaceupRef = useRef(null);
  const cusatRef = useRef(null);
  const merchBannerRef = useRef(null);
  const astronautRef = useRef(null);
  const planetRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const handleAutoScroll = () => {
      setShowArrow(false);
      const duration = 3000; // Duration of the scroll animation in milliseconds
      const start = window.pageYOffset;
      const end = window.innerHeight * 2; // Scroll distance (adjust as needed)
      const startTime = performance.now();

      function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        window.scrollTo(0, start + progress * (end - start));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    };

    const arrowElement = document.getElementById("scroll-arrow");
    if (arrowElement) {
      arrowElement.addEventListener("click", handleAutoScroll);
    }

    const section = sectionRef.current;
    const spaceupText = spaceupRef.current;
    const cusatText = cusatRef.current;
    const merchBanner = merchBannerRef.current;
    const astronaut = astronautRef.current;
    const planet = planetRef.current;
  
    // Initial setup
    if(window.innerWidth >= 768){

      gsap.set(spaceupText, { fontSize: "clamp(5rem, 15vw, 10rem)" });
      gsap.set(cusatText, { opacity: 0, y: 20 });
      gsap.set(merchBanner, { opacity: 0, y: -20 });
      gsap.set(astronaut, { y: "-100%", opacity: 0 });
      gsap.set(planet, { y: "120vh", rotation: 0 });
      // Timeline 1
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
        },
      });
    
      tl1.to(spaceupText, {
        fontSize: "clamp(4rem, 12vw, 8rem)",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(astronaut, {
        y: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        onComplete: startFloatingAnimation
      }, "<+=1")
      .to(planet, {
        y: "60vh", // Animate to midpoint
        duration: 1,
        ease: "power2.in",
      }, "<")
      .to(cusatText, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "<+=0.5")
      .to(merchBanner, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      }, "<");
    
      // Timeline 2 for planet rotation
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "+=200%", // Extend this to allow for more rotation
          scrub: 1,
        },
      });
    
      tl2.to(planet, {
        rotation: -120,
        y: "0vh",
        duration: 1.5,
        ease: "power1.inOut",
      });
    
      function startFloatingAnimation() {
        const floatTimeline = gsap.timeline({
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      
        floatTimeline
          .to(astronaut, {
            y: "+=20",
            duration: 2
          })
          .to(astronaut, {
            y: "-=20",
            duration: 2
          });
      }
    }else{
      gsap.set(spaceupText, { fontSize: "clamp(3rem, 15vw, 5rem)" });
      gsap.set(cusatText, { opacity: 1, y: 20 });
      gsap.set(merchBanner, { opacity: 1, y: 10 });
      gsap.set(astronaut, { y: "35%", opacity: 1 });
      gsap.set(planet, { y: "50vh", rotation: 1 });

      startFloatingAnimation()
    
      // Timeline 2 for planet rotation
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "+=200%", // Extend this to allow for more rotation
          scrub: 1,
        },
      });
    
      tl2.to(planet, {
        rotation: -120,
        y: "0vh",
        duration: 1.5,
        ease: "power1.inOut",
      });
    
      function startFloatingAnimation() {
        const floatTimeline = gsap.timeline({
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      
        floatTimeline
          .to(astronaut, {
            y: "+=20",
            duration: 2
          })
          .to(astronaut, {
            y: "-=20",
            duration: 2
          });
      }
    }
  
    
  
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (arrowElement) {
        arrowElement.removeEventListener("click", handleAutoScroll);
      }
    };
  }, []);
  
  

  return (
    <>
      <section ref={sectionRef} className="hero-section h-screen bg-black">
        <div className="relative flex h-full flex-col items-center justify-center">
          <Link
            to="/buymerch"
            className="merch-banner absolute top-0 md:top-5 w-11/12 sm:w-auto"
            ref={merchBannerRef}
          >
            <div className="merch-banner-content">
              <span className="merch-icon">🚀</span>
              <span className="merch-text">Get Your SpaceUp Merch Now!</span>
              <span className="merch-cta">Shop Now</span>
            </div>
          </Link>
          <h1
            ref={spaceupRef}
            className="font-alternox-regular mb-4 text-center font-bold tracking-wider text-white z-10"
            style={{
              fontSize: "clamp(5rem, 15vw, 10rem)",
              textShadow: "0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080",
            }}
          >
            SPACEUP
          </h1>
          <img
            ref={astronautRef}
            src="/Astronaut1.png"
            alt="Space"
            className="absolute left-1/2 z-20 w-3/4 max-w-md -translate-x-1/2 transform sm:w-2/3 md:w-1/2"
          />
          <h2
            ref={cusatRef}
            className="font-alternox-regular text-center text-2xl md:text-3xl font-semibold tracking-widest text-white sm:text-4xl md:text-5xl z-30 mt-4 sm:mt-8"
          >
            C U S A T
          </h2>
          <img 
            ref={planetRef}
            src="/planet.png" 
            alt="Planet Bottom" 
            className='absolute left-1/2 -translate-x-1/2 w-[1300px] z-0'
          />
        </div>
      </section>

      <div ref={aboutSectionRef} className="pl-3 pr-4 md:pl-40 md:pr-16 lg:pl-36 lg:pr-20 text-white relative z-10 mb-20 md:mb-40">
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
            <p className="md:text-md text-sm">
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
      {/* {showArrow && (
        <div
          id="scroll-arrow"
          className="absolute top-20 left-1/2 transform -translate-x-1/2 cursor-pointer text-white animate-bounce"
          style={{ zIndex: 1000 }}
        >
          <FaChevronDown size={32} />
        </div>
      )} */}
    </>
  );
};

export default Hero;
