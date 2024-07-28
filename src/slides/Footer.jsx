import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black px-20 py-20'>
        {/* <div className='grid grid-cols-3'>
            <img src="/logo.png" className='w-[10rem] ml-16' alt="logo" />
            <div>

            </div>
        </div> */}
        <div className='relative z-[101] flex justify-around mb-40'>
            {/* <a href="#" target='_blank' ><i className='fab fa-facebook-f text-white text-2xl'></i></a>
            <a href="#" target='_blank' ><i className='fab fa-twitter text-white text-2xl'></i></a> */}
            <a className='cursor-pointer' href="https://www.instagram.com/ires_cusat/" target='_blank' ><i className='cursor-pointer fab fa-instagram text-white text-2xl'></i></a>
            <a className='cursor-pointer' href="https://www.linkedin.com/company/sedscusat/" target='_blank' ><i className='cursor-pointer fab fa-linkedin-in text-white text-2xl'></i></a>
        </div>
        <div className='flex justify-center'>
            <img src="/logo.png" className='w-[10rem]' alt="logo" />
        </div>
    </div>
  )
}

export default Footer