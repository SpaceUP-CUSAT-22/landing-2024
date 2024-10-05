import React, { useEffect, useRef } from "react";
import "./css/Hero.css";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const spaceupRef = useRef(null);
  const cusatRef = useRef(null);
  const merchBannerRef = useRef(null);
  const astronautRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spaceupText = spaceupRef.current;
    const cusatText = cusatRef.current;
    const merchBanner = merchBannerRef.current;
    const astronaut = astronautRef.current;

    // Initial setup
    gsap.set(spaceupText, { fontSize: "clamp(5rem, 15vw, 10rem)" });
    gsap.set(cusatText, { opacity: 0, y: 20 });
    gsap.set(merchBanner, { opacity: 0, y: -20 });
    gsap.set(astronaut, { y: "-100%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      },
    });

    tl.to(spaceupText, {
      fontSize: "clamp(4rem, 12vw, 8rem)",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        document.dispatchEvent(new CustomEvent('heroAnimationComplete'));
      }
    })
    .to(astronaut, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      onComplete: startFloatingAnimation
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
      ease: "power2.inOut"
    }, "<");

    function startFloatingAnimation() {
      gsap.to(astronaut, {
        y: "+=20",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section h-screen bg-black">
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden">
      <Link
          to="/buymerch"
          className="merch-banner absolute top-5 w-11/12 sm:w-auto"
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
          className="font-alternox-regular text-center text-3xl font-semibold tracking-widest text-white sm:text-4xl md:text-5xl z-30 mt-4 sm:mt-8"
        >
          C U S A T
        </h2>
      </div>
    </section>
  );
};

export default Hero;
