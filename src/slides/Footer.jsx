import React from 'react'

const Footer = () => {
  return (
    <div className='relative z-[101] bg-black px-20 py-20'>
      <div className='grid grid-cols-1 md:grid-cols-4 items-center'>
        <img src="/logo.png" className='md:w-[20rem] w-[10rem] m-auto md:m-0 mb-20' alt="logo" />
        <div className='cursor-pointer flex flex-col m-auto md:m-0 mb-20'>
          <p className='hover:text-red-500 text-white text-lg md:text-left text-center'>CUSAT</p>
          <p className='hover:text-red-500 text-white text-lg md:text-left text-center'>+91 9633276748</p>
          <p className='hover:text-red-500 text-white text-lg md:text-left text-center'>sedscusat@gmail.com</p>
        </div>
        <div className='flex flex-col m-auto md:m-0 '>
          <a href="#home" className='hover:text-red-500 text-white text-lg md:text-left text-center'>Home</a>
          <a href="#events" className='hover:text-red-500 text-white text-lg md:text-left text-center'>Events</a>
          <a href="#speakers" className='hover:text-red-500 text-white text-lg md:text-left text-center'>Speakers</a>
          <a href="#previmages" className='hover:text-red-500 text-white text-lg md:text-left text-center'>Images</a>
          <a href="#about" className='hover:text-red-500 text-white text-lg md:text-left text-center'>About</a>
        </div>
        <div className='flex flex-col m-auto md:m-0 '>
          <a className='cursor-pointer' href="https://www.instagram.com/ires_cusat/" target='_blank' ><i className='hover:text-red-500 cursor-pointer fab fa-instagram text-white text-2xl'></i></a>
          <a className='cursor-pointer' href="https://www.linkedin.com/company/sedscusat/" target='_blank' ><i className='hover:text-red-500 cursor-pointer fab fa-linkedin-in text-white text-2xl'></i></a>
        </div>
      </div>
      <p className='text-center text-white mt-40 cursor-pointer'>SpaceUp 2024 © All rights reserved.</p>
        {/* <div className='relative z-[101] flex justify-around mb-40'>
            <a className='cursor-pointer' href="https://www.instagram.com/ires_cusat/" target='_blank' ><i className='cursor-pointer fab fa-instagram text-white text-2xl'></i></a>
            <a className='cursor-pointer' href="https://www.linkedin.com/company/sedscusat/" target='_blank' ><i className='cursor-pointer fab fa-linkedin-in text-white text-2xl'></i></a>
        </div>
        <div className='flex justify-center'>
            <img src="/logo.png" className='w-[10rem]' alt="logo" />
        </div> */}
    </div>
  )
}

export default Footer