import React from 'react'
import { ReactTyped } from 'react-typed'

const Typer = () => {
  return (
    <div className='absolute z-[99] md:left-[30%] px-5 left-[15%] md:top-[450px] top-[500px]'>
        <ReactTyped className='text-white orbitron md:text-xl' strings={["Explore the Infinite: Your Journey Beyond the Stars Starts Here..."]} typeSpeed={40} />
    </div>
  )
}

export default Typer