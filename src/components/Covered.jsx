import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "../ScrollContext";

gsap.registerPlugin(ScrollTrigger);

const Covered = () => {
  const containerRef = useRef(null);
  const fillRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const scrollPosition = useScroll();

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    gsap.set(container, { x: -50, opacity: 0 });
    gsap.set([topText, bottomText], { opacity: 0, scale: 0.5 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    tl.to(container, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })
      .to([topText, bottomText], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
      .to(fill, {
        height: "100%",
        duration: 1,
        ease: "none",
      }, "<");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPosition / docHeight) * 100;
    gsap.to(fillRef.current, {
      height: `${Math.min(scrollPercent, 100)}%`,
      duration: 0.1,
      ease: "none",
    });
    gsap.to(topTextRef.current, {
      innerHTML: `${Math.round(scrollPercent)}%`,
      duration: 0.1,
      snap: { innerHTML: 1 },
    });
  }, [scrollPosition]);

  return (
    <div
      ref={containerRef}
      className="fixed top-20 left-5 md:left-20 z-50 flex h-[80%] w-2 flex-col items-center justify-between rounded-full bg-zinc-800/50 backdrop-blur-sm"
    >
      <div
        ref={fillRef}
        className="absolute top-0 w-full rounded-full bg-gradient-to-b from-purple-500 to-blue-500"
        style={{ height: "0%" }}
      />
      <div
        ref={topTextRef}
        className="z-10 mt-[-30px] text-sm font-bold text-white bg-zinc-800/70 rounded-full px-2 py-1"
      >
        0%
      </div>
      <div
        ref={bottomTextRef}
        className="z-10 mb-[-30px] text-sm font-bold text-white bg-zinc-800/70 rounded-full px-2 py-1"
      >
        100%
      </div>
    </div>
  );
};

export default Covered;
