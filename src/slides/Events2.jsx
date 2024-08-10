import React from 'react'
import './Events2.css'

const Events2 = () => {
  return (
    <>
        <section className="relative z-[101] game-section md:mt-0 mt-32">
            <h1 className='md:pt-10 md:pb-20 mb-10 orbitron text-center text-red-500 text-4xl md:text-8xl line-title'>Events & Workshops</h1>
            <div className="owl-carousel custom-carousel owl-theme">
                <div className="item active" style={{ backgroundImage: 'url(/event1.jpg)' }}>
                    <div className="item-desc">
                        <h3>JOURNEY TO ZERO GRAVITY AND EDGE OF SPACE - DR.T N SURESH KUMAR</h3>
                        <p>Discover the excitement of zero gravity and the mysteries of the final frontier. Seize this out-of-this-world opportunity.
                        </p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(/event2.jpg)' }}>
                    <div className="item-desc">
                        <h3>ALIEN HOAXES: FACT,FICTION, AND THE FINE LINE BETWEEN - PAULOSE THOMAS</h3>
                        <p>Have you ever considered the idea of humanity taking over an alien civilization? Discover more by joining our event.</p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(/event3.jpg)' }}>
                    <div className="item-desc">
                        <h3>AI POWERED SPACE EXPLORATION:UNCOVERING THE SECRETS OF LIFE IN THE UNIVERSE - MR.JITHINRAJ RS</h3>
                        <p>AI has made its mark everywhere—what if it starts influencing outer space as well? Learn more about this possibility at our upcoming event.
                        </p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(/event4.jpg)' }}>
                    <div className="item-desc">
                        <h3>ON THE CELESTIAL SHORES OF THE MILKY WAY - SURENDRAN PUNNASHERI  
                        </h3>
                        <p>Experience the chill of celestial realms through an exceptional session led by Surendran Punnasheri.
                        </p>
                    </div>
                </div>
                <div className="item" style={{ backgroundImage: 'url(/event5.jpg)' }}>
                    <div className="item-desc">
                        <h3>INSIGHTS FROM SPACE- VARUN
                        </h3>
                        <p>Explore the enigmatic space puzzle with insights from our outstanding speaker, Varun.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Events2