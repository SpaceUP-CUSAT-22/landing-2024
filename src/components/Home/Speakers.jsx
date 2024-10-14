import React, { useState } from "react";
import scientists from "../../constants/Scientists";

const ScientistCard = ({ scientist, setFeatured, isActive }) => {
  return (
    <div
      className={`flex cursor-pointer flex-col items-start rounded-lg p-4 transition-all duration-500 ease-in-out lg:flex-row lg:p-4 ${
        isActive
          ? "bg-white shadow-lg lg:scale-105"
          : "bg-[#9B3CCA40] hover:bg-white lg:hover:scale-105"
      }`}
      onMouseEnter={() => setFeatured(scientist)}
    >
      <div className="flex flex-row items-center gap-x-3">
        <img
          src={scientist.image}
          alt={scientist.name}
          className="aspect-square h-24 w-24 rounded-md object-cover"
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

      {/* Information for mobile view */}
      {isActive && (
        <div className="mt-4 flex justify-start lg:hidden">
          <p className="font-alternox-regular text-pretty text-sm text-black lg:hidden">
            {scientist.description}
          </p>
        </div>
      )}
    </div>
  );
};

const FeatureScientist = ({ scientist }) => (
  <div className="my-5 hidden flex-col items-center transition-all duration-500 ease-in-out md:items-start lg:flex">
    <img
      src={scientist.image}
      alt={scientist.name}
      className="h-72 w-72 rounded-none object-cover md:h-80 lg:size-[28rem] lg:h-[26rem]"
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
      className="absolute text-6xl text-transparent md:text-8xl lg:-rotate-90 lg:text-[120px]"
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
      className="absolute -translate-x-[6px] -translate-y-3 text-6xl text-transparent md:text-8xl lg:-translate-x-5 lg:translate-y-0 lg:-rotate-90 lg:text-[120px]"
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
      className="flex flex-col bg-black py-20 text-white md:pl-10 md:pr-10 lg:flex-row"
    >
      {/* Rotated Title */}
      <RotatedTitle />

      {/* Scientists list and feature */}
      <div className="mt-10 flex flex-col gap-8 p-8 lg:mt-0 lg:w-3/4 lg:flex-row">
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
