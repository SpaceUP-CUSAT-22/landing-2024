import React from 'react'
import { ReactTyped } from 'react-typed'

const Typer = () => {
  return (
    <div className='absolute z-[99] md:left-[30%] px-5 left-[10%] md:top-[470px] top-[430px]'>
      <ReactTyped className='text-white exo md:text-xl md:text-left text-center' strings={["Explore the Infinite: Your Journey Beyond the Stars Starts Here..."]} typeSpeed={40} />
    </div>
  )
}

export default Typer