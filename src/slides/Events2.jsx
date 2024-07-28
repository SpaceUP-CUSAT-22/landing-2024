import React from 'react'
import './Events2.css'

const Events2 = () => {
  return (
    <>
        <section className="game-section md:mt-0 mt-32">
        <h1 className='md:pt-10 md:pb-20 orbitron text-center text-red-500 text-5xl md:text-8xl line-title'>Events</h1>
            <div className="owl-carousel custom-carousel owl-theme">
                <div className="item active" style={{ backgroundImage: 'url(https://www.yudiz.com/codepen/expandable-animated-card-slider/dota-2.jpg)' }}>
                    <div className="item-desc">
                        <h3>Event 1</h3>
                        <p>Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum </p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg)' }}>
                    <div className="item-desc">
                        <h3>Event 1</h3>
                        <p>Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum </p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg)' }}>
                    <div className="item-desc">
                        <h3>Event 1</h3>
                        <p>Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum </p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg)' }}>
                    <div className="item-desc">
                        <h3>Event 1</h3>
                        <p>Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum </p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(https://www.yudiz.com/codepen/expandable-animated-card-slider/fortnite.jpg)' }}>
                    <div className="item-desc">
                        <h3>Event 1</h3>
                        <p>Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum </p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Events2