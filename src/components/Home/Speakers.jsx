import React, { useState } from "react";
import scientists from "../../constants/Scientists";
import "../../fonts.css";

const ScientistCard = ({ scientist, setFeatured, isActive }) => {
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("featured");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`flex cursor-pointer flex-col items-center space-x-6 rounded-lg p-6 transition-all duration-500 ease-in-out lg:flex-row ${
        isActive
          ? "scale-105 bg-white shadow-lg"
          : "bg-[#9B3CCA40] hover:scale-105 hover:bg-white"
      }`}
      onMouseEnter={() => setFeatured(scientist)}
      onClick={() => {
        setFeatured(scientist);
        scrollToFeatured();
      }}
    >
      <img
        src={scientist.image}
        alt={scientist.name}
        className="my-3 aspect-square h-24 w-24 rounded-full object-cover"
      />
      <div className="text-start">
        <h3
          className={`font-alternox-bold font-bold transition-colors duration-300 ${
            isActive ? "text-purple-900" : "text-white hover:text-black"
          }`}
        >
          {scientist.name}
        </h3>
        <p
          className={`font-alternox-regular text-sm transition-colors duration-300 ${
            isActive ? "text-black" : "text-purple-300 hover:text-black"
          }`}
        >
          {scientist.title}
        </p>
        <p
          className={`font-alternox-regular text-xs transition-colors duration-300 ${
            isActive ? "text-black" : "text-purple-400 hover:text-black"
          }`}
        >
          {scientist.location}
        </p>
      </div>
    </div>
  );
};

const FeatureScientist = ({ scientist }) => (
  <div
    className="my-5 flex flex-col items-center transition-all duration-500 ease-in-out md:items-start"
  >
    <img
      src={scientist.image}
      alt={scientist.name}
      className="h-72 w-72 rounded-none object-cover md:h-80 lg:h-[26rem] lg:size-[28rem]"
    />
    <div className="rounded-b-lg bg-black bg-opacity-50 p-4">
      <h2 className="font-alternox-regular text-4xl font-bold text-[#9B3CCA]">
        {scientist.name}
      </h2>
      <p className="font-alternox-regular mt-2 text-xl text-white">
        {scientist.title}
      </p>
      <p className="font-alternox-regular text-lg text-white">
        {scientist.location}
      </p>
      <p className="font-alternox-regular mt-4 text-sm text-white">
        {scientist.description}
      </p>
    </div>
  </div>
);

const RotatedTitle = () => (
  <div className="relative flex items-center justify-center md:pl-10 lg:w-1/4">
  {/* Overlay Text (Purple) */}
    <h1
      className="absolute text-7xl text-transparent md:text-8xl lg:-rotate-90 lg:text-[120px]"
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 700,
      WebkitTextStroke: "0.7px #9B3CCA",
      }}
    >
      SPEAKERS
    </h1>

  {/* Primary Text (White) */}
    <h1
    className="absolute -translate-x-[6px] -translate-y-3 text-7xl text-transparent md:text-8xl lg:-translate-x-5 lg:translate-y-0 lg:-rotate-90 lg:text-[120px]"
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 700,
      WebkitTextStroke: "0.5px white",
      textShadow:
        "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black", // Outline effect
      }}
    >
      SPEAKERS
    </h1>
  </div>
);

const ScientistsDashboard = () => {
  const [featuredScientist, setFeaturedScientist] = useState(scientists[0]);

  return (
    <div
    id="featured"
     className="flex flex-col bg-black py-20 text-white md:pl-10 md:pr-10 lg:flex-row">
      {/* Rotated Title */}
      <RotatedTitle />

      {/* Scientists list and feature */}
      <div className="mt-10 flex flex-col gap-8 p-8 pl-10 lg:mt-0 lg:w-3/4 lg:flex-row">
        {/* Scientist Feature Section */}
        <div className="md:px-12 lg:w-2/3 lg:px-0">
          <FeatureScientist scientist={featuredScientist} />
        </div>

        {/* Scientist Cards */}
        <div className="space-y-4 md:px-12 lg:w-1/3 lg:px-0">
          {scientists.map((scientist, index) => (
            <ScientistCard
              key={index}
              scientist={scientist}
              setFeatured={setFeaturedScientist}
              isActive={scientist.name === featuredScientist.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScientistsDashboard;
