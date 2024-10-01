import React from 'react'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'
import Events from '../components/Home/Events'
import About from '../components/Home/About'
import TimeSchedule from '../components/Home/TimeSchedule'
import Speakers from '../components/Home/Speakers'

const Main = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <About />
      <Events />
      <TimeSchedule />
      <Speakers />
    </>
  )
}

export default Main
