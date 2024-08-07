import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Content2 = () => {
  const gridRef = useRef(null);
  const gridItems = [
    { image: '/speaker1.png', description: `Dr. Kumar is a multifaceted individual whose career transcends the boundaries of traditional space science. While he excelled as a space scientist with a 38-year career at the Indian Space Research Organization (ISRO), his passions extended far beyond the cosmos.
He's the first Indian to reach the stratosphere, experience zero gravity, and visit numerous extreme environments. Beyond his scientific career, he's also a seasoned traveler, having explored all seven continents and over 176 countries.He has traveled to nearly all the world’s wonders and scientific centers. 
` },
    { image: '/speaker2.png', description: `Paulose Thomas is a distinguished science communicator and the founder of SPT Online Classes, known for his dedication to sharing knowledge. He received the Chancellor Viswanathan Gold Medal for being the top outgoing student in his M.Tech program. Thomas has made significant contributions in various fields, including the development of a Railway Track Crack Detection system, which was recognized as one of the best by the NIT Technology Business Incubator in 2012. Additionally, he has been acknowledged for his work on Excel Macros at Tata Consultancy Services, showcasing his expertise and impact in both technology and education.` },
    { image: '/speaker3.png', description: `Jithinraj is a renowned science communicator and journalist, captivating over 320,000 subscribers on his YouTube channel, JR Studio Sci-Talk Malayalam. For six years, he has demystified complex science – from space to quantum physics – for the Indian public. Beyond his online platform, he actively teaches in Kerala colleges, driven by the belief in science's universal accessibility. Currently pursuing a postgraduate in journalism, Jithinraj uniquely blends academic rigor with practical experience. His mission is to inspire a new generation of science enthusiasts by bridging the gap between complex research and everyday understanding, fostering scientific literacy and curiosity.` },
    { image: '/speaker4.png', description: `Surendran Punnassery is a well-known space enthusiast and teacher from Kerala, celebrated for his prolific writings on space. He is a passionate amateur astronomer who also hosted the first space drama, "Mangalyaan," and is an enthusiastic astrophotographer. He has authored nearly 500 articles, gaining recognition for his detailed observations of even the smallest aspects of space. Additionally, he has presented around 50 programs on Akashvani and led numerous sky-watching sessions with children. His friendly demeanor has consistently endeared him to kids, sparking their interest in space.` },
    { image: '/speaker5.png', description: `Varun K is a dedicated space tech enthusiast and serves as the Team Lead at the UL Space Club,a registered space tutor of ISRO.He has conducted over 150 sessions at a young age, leading various projects. He also mentors students in space science and technology, coordinates science and technology programs, and engages with students across the nation. Additionally, he is the co-founder and CEO of Zeta Space, a startup focused on space research, and remains committed to continuous learning and innovation in emerging technologies.` },
  ];

  useEffect(() => {
    const grid = gridRef.current;
    const items = Array.from(grid.children);

    const addListeners = (item, index) => {
      // Create floating animation
      gsap.to(item, {
        y: index % 2 === 0 ? 50 : -50,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: grid,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
      item.addEventListener('click', toggleGrid);
    };

    const removeListeners = (item) => {
      item.removeEventListener('click', toggleGrid);
    };

    items.forEach((item, index) => addListeners(item, index));

    return () => {
      items.forEach(removeListeners);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const toggleGrid = (e) => {
    const item = e.currentTarget;
    const isExpanded = item.classList.contains('expanded');
    
    resetAllGridItems();

    if (!isExpanded) {
      gsap.to(item, { flex: '3', duration: 0.3, ease: 'power2.out' });
      gsap.to(item.querySelector('.description'), { opacity: 1, y: 0, duration: 0.3 });
      item.classList.add('expanded');
    }
  };

  const resetAllGridItems = () => {
    const items = Array.from(gridRef.current.children);
    items.forEach(item => {
      gsap.to(item, { flex: '1', duration: 0.3, ease: 'power2.out' });
      gsap.to(item.querySelector('.description'), { opacity: 0, y: 20, duration: 0.3 });
      item.classList.remove('expanded');
    });
  };

  return (
    <div ref={gridRef} className='cursor-pointer relative z-[102] grid grid-cols-1 md:flex w-screen min-h-screen'>
  {gridItems.map((item, i) => (
    <div 
      key={i}
      className={`relative overflow-hidden h-[60vh] sm:h-[50vh] md:h-screen md:flex-1`}
      style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='bg-red-500 bg-opacity-50 absolute inset-0'>
        <h1 className='orbitron text-white text-4xl'></h1>
      </div>
      <div className="description absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 opacity-0 transform translate-y-full">
        <p>{item.description}</p>
      </div>
    </div>
  ))}
</div>
  )
}

export default Content2;
