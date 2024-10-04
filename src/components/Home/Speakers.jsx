import React, { useState } from 'react';

const ScientistCard = ({ scientist, setFeatured, isActive }) => (
  <div 
    className={`rounded-lg p-12 flex items-center space-x-6 cursor-pointer 
      transition-all duration-500 ease-in-out 
      ${isActive ? 'scale-105 shadow-lg bg-white' : 'bg-[#9B3CCA40] hover:bg-white hover:scale-105'}`} 
    onMouseEnter={() => setFeatured(scientist)}
  >
    <img src={scientist.image} alt={scientist.name} className="object-cover w-16 h-16 rounded-full" />
    <div>
      <h3 className={`font-bold transition-colors duration-300 ${isActive ? 'text-purple-900' : 'text-white hover:text-black'}`}>
        {scientist.name}
      </h3>
      <p className={`text-sm transition-colors duration-300 ${isActive ? 'text-black' : 'text-purple-300 hover:text-black'}`}>
        {scientist.title}
      </p>
      <p className={`text-xs transition-colors duration-300 ${isActive ? 'text-black' : 'text-purple-400 hover:text-black'}`}>
        {scientist.location}
      </p>
    </div>
  </div>
);

const FeatureScientist = ({ scientist }) => (
  <div className="flex flex-col transition-all duration-500 ease-in-out">
    <img src={scientist.image} alt={scientist.name} className="object-cover w-full h-64 rounded-t-lg" />
    <div className="p-4 bg-black bg-opacity-50 rounded-b-lg">
      <h2 className="text-2xl font-bold text-white">{scientist.name}</h2>
      <p className="text-purple-300">{scientist.title}</p>
      <p className="text-sm text-purple-400">{scientist.location}</p>
      <p className="mt-2 text-sm text-white">{scientist.description}</p>
    </div>
  </div>
);

const ScientistsDashboard = () => {
  const scientists = [
    {
      name: "Tessy Thomas",
      title: "Director General, Aeronautical Systems, DRDO",
      location: "Kerala, India",
      image: "image path",
      description: "Tessy Thomas, known as the 'Missile Woman of India,' heads the Aeronautical Systems at DRDO. Her contributions, though primarily focused on missile technology, have been pivotal in advancing India's defense capabilities. As one of India's leading women scientists, she is a role model for aspiring engineers and has made significant strides in research and development."
    },
    {
      name: "Dr. S. Somnath",
      title: "Chairman, ISRO",
      location: "Kerala, India",
      image: "image path",
      description: "Dr. S. Somnath is the current Chairman of the Indian Space Research Organisation (ISRO). He has played a crucial role in the development of India's space launch vehicles and has contributed significantly to various ISRO missions."
    },
    {
      name: "Dr. K. Sivan",
      title: "Former Chairman, ISRO",
      location: "Tamil Nadu, India",
      image: "image path",
      description: "Dr. K. Sivan served as the Chairman of ISRO and Secretary of the Department of Space from 2018 to 2022. He was instrumental in several successful space missions, including Chandrayaan-2, India's second lunar exploration mission."
    },
    {
      name: "Ritu Karidhal",
      title: "Senior Scientist, ISRO",
      location: "Uttar Pradesh, India",
      image: "image path",
      description: "Ritu Karidhal, often referred to as the 'Rocket Woman of India,' played a significant role in ISRO's Mars Orbiter Mission. She has been a key figure in mission planning and operations for various Indian space projects."
    }
  ];

  const [featuredScientist, setFeaturedScientist] = useState(scientists[0]);

  return (
    <div className="flex min-h-screen text-white bg-black">
      <div className="flex items-center justify-center pl-10 md:w-72 sm:w-56 xs:w-40">
        <h1
          className="transform -rotate-90 whitespace-nowrap"
          style={{
            fontFamily: "'Roboto', sans-serif", 
            fontSize: "125px",
            fontWeight: 700,
            lineHeight: "179.67px",
            textAlign: "left",
            color: "transparent",
            WebkitTextStroke: "0.5px white", 
            textShadow: "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black" // Outline effect
          }}
        >
          SPEAKERS
        </h1>
      
        <h1
          className="absolute transform -rotate-90 whitespace-nowrap"
          style={{
            fontFamily: "'Roboto', sans-serif", 
            rotate: "-90deg",
            fontSize: "125px",
            fontWeight: 700,
            lineHeight: "179.67px",
            textAlign: "left",
            color: "transparent",
            WebkitTextStroke: "0.7px #9B3CCA", 
            transform: "translateY(20px)" 
          }}
        >
          SPEAKERS
        </h1>
      </div>

      <div className="grid flex-grow grid-cols-3 gap-8 p-8">
        {/*scientist info in the center */}
        <div className="col-span-2">
          <FeatureScientist scientist={featuredScientist} />
        </div>
        
        {/* list of scientists on the right */}
        <div className="space-y-4">
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