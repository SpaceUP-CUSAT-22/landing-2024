import React from 'react'
import './style.css'

const Content = ({ para1, name, designation, para2, picture, bg }) => {
  return (
    // <div className={`flex items-center justify-center w-[100vw] h-[100vh] bg-[${bg}] text-white overflow-hidden relative`}>
    <div className="panel2 flex items-center justify-center w-[100vw] h-[100vh] text-white overflow-hidden relative px-20">
        <div className="grid md:grid-cols-3 grid-cols-1 items-center justify-center w-[100vw] h-[100vh] box-border">
          <div className="flex-1 p-5 box-border font-exo text-xl">
            <p>{para1}</p>
          </div>
          <div className="flex-2 flex flex-col items-center justify-center text-center box-border">
          <img src='jane.jpg' alt={name} className="w-3/5 h-auto object-cover rounded mb-5" />
            <h2 className='exo text-white '>{name}</h2>
            <h3 className='exo text-white mt-5'>{designation}</h3>
          </div>
          <div className="flex-1 p-5 box-border font-exo text-xl">
            <p>{para2}</p>
          </div>
        </div>
    </div>
  )
}

export default Content