import React from 'react'

const Hero = () => {
  React.useEffect(() => {
    // let mouse = {'x': 0, 'y': 0};
    // let homex = 0;
    // let homey = 0;
    // let forcex = 0;
    // let forcey = 0;
    // let magnet = 1200;
    // let wrapper = document.getElementById('wrapper');
    // let catchmeBtn = document.getElementById('catchmeBtn');
    // let catchmeBtnBounding = catchmeBtn.getBoundingClientRect();
    // let placeholder = document.createElement('div');

    // wrapper.addEventListener('mousemove', function(e) {
    //   mouse = {'x': e.pageX, 'y': e.pageY};
    // });
    // wrapper.addEventListener('mouseenter', function(e) {
    //   placeholder.style.display = 'inline-block';
    //   placeholder.style.width = '100' + 'px';
    //   placeholder.style.height = '100' + 'px';
    //   catchmeBtn.parentElement.insertBefore(placeholder, catchmeBtn);
      
    //   catchmeBtn.style.position = 'absolute';
    // });

    // homex = catchmeBtnBounding.left;
    // homey = catchmeBtnBounding.top;

    // setInterval(function () {
    //   let el = catchmeBtn;
    //   let position = el.getBoundingClientRect();
    //   let x0 = position.left + window.scrollX;
    //   let y0 = position.top + window.scrollY;
    //   let x1 = mouse.x;
    //   let y1 = mouse.y;
    //   let distancex = x1-x0;
    //   let distancey = y1-y0;

    //   let distance = Math.sqrt((distancex * distancex) + (distancey * distancey));

    //   let powerx = x0 - (distancex / distance) * magnet / distance;
    //   let powery = y0 - (distancey / distance) * magnet / distance;

    //   forcex = (forcex + (homex - x0) / 2) / 4;
    //   forcey = (forcey + (homey - y0) / 2) / 4;

    //   el.style.top = (powery + forcey) + 'px';
    //   el.style.left = (powerx + forcex) + 'px';
    // }, 15);
  }, [])
  return (
    <div className='z-[99] absolute block md:top-40 top-60 md:left-[30%] left-[5%] px-10'>
      <h1 className='orbitron text-center text-white text-6xl md:text-9xl'>Space Up</h1>
      <br />
      <div id="wrapper" className='w-[30rem]'>
        <button  data-cursor="pointer" id="catchmeBtn" className='cursor-pointer hover:bg-[#CC2B35] md:ml-64 ml-28 bg-[#A6232B] text-white exo text-center md:px-5 md:py-4 md:text-md text-md px-2 py-1'>BUY TICKETS</button>
      </div>
    </div>
  )
}

export default Hero