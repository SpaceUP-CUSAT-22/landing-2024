import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "../ScrollContext";

gsap.registerPlugin(ScrollTrigger);

const Covered = () => {
  const containerRef = useRef(null);
  const fillRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const scrollPosition = useScroll();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    gsap.set(container, { x: -50, opacity: 0 });
    gsap.set([bottomText], { opacity: 0, scale: 0.5 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    scrollTriggerRef.current = tl.scrollTrigger;

    tl.to(container, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(bottomText, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });

    const updateScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const newPercentage = Math.round((scrollPosition / docHeight) * 100);
      setPercentage(newPercentage);
    };

    const tickerCallback = () => {
      updateScroll();
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      gsap.ticker.remove(tickerCallback);
    };
  }, [scrollPosition]);

  useEffect(() => {
    gsap.to(fillRef.current, {
      height: `${Math.min(percentage, 100)}%`,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [percentage]);

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
        {percentage}%
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
