import React, { useEffect, useState } from 'react'
import './Preloader.css'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

//   if (!isVisible) return null;

  return (
    <div className='w-screen h-screen bg-[#050B17] absolute transition-opacity duration-1000 ease-out' style={{ opacity: isVisible ? 1 : 0, zIndex: isVisible ? 100000 : 0 }}>
      <div className="circ">
        <div className="mini-circ">
          <div className="mini-circ">
            <div className="mini-circ">
              <div className="mini-circ">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader