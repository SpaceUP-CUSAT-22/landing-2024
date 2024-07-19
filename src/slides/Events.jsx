import React from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Events.css'

gsap.registerPlugin(ScrollTrigger)

const Card = ({ num }) => {
  return(
    <div className='card px-20 mt-20'>
      <div className='border-2 border-[#A6232B] bg-black px-20 py-20 rounded-[15px]'>
        <div className='flex flex-col'>
          <h2 className='exo text-[#A6232B] text-2xl md:text-3xl'>Event {num}</h2>
          <p className='exo text-white text-lg md:text-xl'>SpaceUp is a space unconference, where participants decide the topics, schedule, and structure of the event. Unconferences have been held about technology, science, transit, and even cupcakes, but this is the first one focused on space exploration!</p>
          <button className='bg-[#A6232B] text-white mt-20 py-3'>More details</button>
        </div>
      </div>
    </div>
  )
}

const Events = () => {
  React.useEffect(() => {

    const cards = gsap.utils.toArray(".card");
    console.log(cards)
    const spacer = 20;

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: `top+=0`,
        endTrigger: ".panel1",
        end: `bottom top+=${200-cards.length * spacer}`,
        pin: true,
        pinSpacing: false,
        markers: false,
        id: "card-pin",
        invalidateOnRefresh: true
      });
    });

    // ScrollTrigger.create({
    //   trigger: ".heading",
    //   start: "top 10",
    //   end: (self) => self.previous().end,
    //   pin: true,
    //   markers: false
    // });


  }, [])
  return (
    <div className='panel1 w-[100vw] py-20'>
      <h1 className='orbitron text-center text-[#A6232B] text-5xl md:text-8xl'>Events</h1>
      <div className='cards'>
        <Card key={0} num={1} />
        <Card key={1} num={2} />
        <Card key={2} num={3} />
      </div>
    </div>
  )
}

export default Events