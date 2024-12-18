import React from "react";
import Hero from "../components/Home/Hero";
import Events from "../components/Home/Events";
import TimeSchedule from "../components/Home/TimeSchedule";
import Speakers from "../components/Home/Speakers";
import Covered from "../components/Covered";
import PrevImages from "../components/Home/PrevImages";
import { ScrollProvider } from "../ScrollContext";

const Main = () => {
  return (
    <ScrollProvider>
      <Covered />
      <Hero />
      {/* <About /> */}
      <Events />
      <Speakers />
      <TimeSchedule />
      <PrevImages />
    </ScrollProvider>
  );
};

export default Main;
