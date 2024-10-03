import React from "react";
import "../../fonts.css"

const About = () => {
  return (
      <div className="pl-10 pr-4 md:pl-40 md:pr-16 lg:pl-36 lg:pr-20 bg-black lg:h-screen text-white">
        <div className="flex flex-col lg:flex-row h-fit p-6 md:p-12 md:pb-0 pb-0 justify-between items-center lg:items-end  bg-[#9B3CCA] rounded-md bg-opacity-25">
          <div className="w-full flex flex-col pb-6 md:pb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-alternox-bold font-bold">
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
            <div className="my-8 md:my-12 bg-white h-[1px] w-full font-alternox-regular"></div>
            <p>
              SpaceUp isn't your typical conference; it's a global phenomenon
              that empowers you to shape the future of space networking. Since
              its groundbreaking debut in 2010, SpaceUp has transcended borders,
              becoming a worldwide sensation. Our mission? To revolutionize
              networking in the space industry. At SpaceUp, we believe that
              everyone with a space passion deserves a platform to shine. That's
              why we let YOU decide the agenda. No pre-set topics or schedules -
              you're in control! Picture this: Attendees collaboratively build
              the event in real-time. They propose topics, lead discussions, and
              form the audience on the spot. There are no spectators, only
              participants! SpaceUp is the ultimate melting pot, uniting diverse
              space communities, fostering careers, and sparking fresh ideas for
              space startups. Join us, and be part of the space revolution!
            </p>
          </div>
          <img src="/Astronaut.png" alt="astronaut image" className="aspect-square size-auto md:size-[80%] lg:size-auto"/>
        </div>
      </div>
  );
};

export default About;
