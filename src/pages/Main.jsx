import React from 'react'
import Hero from '../components/Home/Hero'
import Events from '../components/Home/Events'
import About from '../components/Home/About'
import TimeSchedule from '../components/Home/TimeSchedule'
import Speakers from '../components/Home/Speakers'
import Covered from '../components/Covered'
import PrevImages from '../components/Home/PrevImages'

const Main = () => {
  return (
    <>
      <Covered />
      <Hero />
      {/* <About />
      <Events />
      <TimeSchedule />
      <Speakers />
      <PrevImages /> */}
    </>
  )
}

export default Main
