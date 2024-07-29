import React from 'react'

const BgLines = () => {
  return (
    <div className='md:block hidden z-[101] absolute'>
        <div class="z-1 vertical-line w-[1px] h-screen bg-[#A6232B] left-[250px] absolute top-0"></div>
        <div class="z-1 vertical-line w-[1px] h-screen bg-[#A6232B] left-[750px] absolute top-0"></div>
        <div class="z-1 vertical-line w-[1px] h-screen bg-[#A6232B] left-[1200px] absolute top-0"></div>
        <div class="z-1 vertical-line w-[1px] h-screen bg-[#A6232B] left-[1700px] absolute top-0"></div>
    </div>
  )
}

export default BgLines