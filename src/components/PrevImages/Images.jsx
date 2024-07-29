import React from "react";
import { useState, useEffect, useRef } from "react";

const images = [
  "/previmages/DSC_0012.JPG",
  "/previmages/DSC_0045.JPG",
  "/previmages/DSC_0061.JPG",
  "/previmages/DSC_0100.JPG",
  "/previmages/DSC_0108.JPG",
  "/previmages/DSC_0152.JPG",
  "/previmages/insta_kids_2.png",
  "/previmages/insta_kids_1_1.png",
];

const useInView = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
};

const TopImage = ({ image }) => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`flex justify-center items-center md:items-start h-full transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img src={image} alt="Top" className="w-auto max-h-96" />
    </div>
  );
};

const BottomImage = ({ image }) => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`flex items-center justify-center h-full mt-0 md:items-end transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } `}
    >
      <img src={image} alt="Bottom" className="w-auto max-h-96" />
    </div>
  );
};

const Images = () => {
  return (
    <>
      {images.map((image, index) => (
        <div
          className="relative z-[101] mr-10 panel3 md:w-[25vw] w-[100vw] h-[100vh] "
          key={index}
        >
          {index % 2 === 0 ? (
            <BottomImage image={image} />
          ) : (
            <TopImage image={image} />
          )}
        </div>
      ))}
    </>
  );
};

export default Images;
