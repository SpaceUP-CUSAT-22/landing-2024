import React from 'react'

const Hero = () => {
  return (
    <div className='z-[99] absolute block md:top-40 top-60 md:left-[30%] left-[5%] px-10'>
      <h1 className='orbitron text-center text-white text-6xl md:text-9xl'>Space Up</h1>
      <br />
      <button className='cursor-pointer hover:bg-[#CC2B35] md:ml-64 ml-28 bg-[#A6232B] text-white exo text-center md:px-5 md:py-4 md:text-md text-md px-2 py-1'>BUY TICKETS</button>
    </div>
  )
}

export default Hero