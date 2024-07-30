import React from 'react'
import { ReactTyped } from 'react-typed'

const Typer = () => {
  return (
    <div className='absolute z-[99] left-1/2 transform -translate-x-1/2 mt-10 w-full md:px-0 px-9 max-w-[100%] md:max-w-[80%]'>
      <ReactTyped 
        className='text-white exo md:text-xl text-center block'
        strings={["Explore the Infinite: Your Journey Beyond the Stars Starts Here..."]} 
        typeSpeed={40} 
      />
    </div>
  )
}

export default Typer