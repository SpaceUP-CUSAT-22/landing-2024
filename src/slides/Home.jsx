import React from 'react'
import Particles from '../components/Home/Particles'
import Sphere from '../components/Home/Sphere'
import Navbar from '../components/Home/Navbar'
import Hero from '../components/Home/Hero'
import Typer from '../components/Home/Typer'

const Home = () => {
  
  return (
    <div className=''>
      <Navbar />
      <div className='md:px-0 px-20'>
        <Hero />
      </div>
      {/* <Typer /> */}
      <div>
        <Particles />
        <Sphere />      
      </div>

    </div>
  )
}

export default Home