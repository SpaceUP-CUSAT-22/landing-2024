import React from 'react'
import Home from '../slides/Home'
import Events from '../slides/Events'
import Speaker from '../slides/Speaker'
import PrevImages from '../slides/PrevImages'
import TimeSchedule from '../slides/TimeSchedule'
import About from '../slides/About'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Main2 = () => {
  return (
    <>
        <div className="bg-yellow-500 h-[100vh]">
          <Home />
        </div>

        <div className='bg-[#050B17] py-10 md:h-[100vh]'>
          <About />
        </div>
    </>
  )
}

export default Main2