import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimate } from 'framer-motion';

const MenuItems = [
  {
    href: '#home',
    name: 'Home'
  },
  {
    href: '#events',
    name: 'Events'
  },
  {
    href: '#speakers',
    name: 'Speakers'
  },
  {
    href: '#previmages',
    name: 'Previous Images'
  },
  {
    href: '#timeschedule',
    name: 'Timeschedule',
  },
  {
    href: '#about',
    name: 'About'
  }
]

const MenuCard = ({ href, name, handleMenuToggle, diva, texta, divanimate, textanimate }) => {

  React.useEffect(() => {
    divanimate(diva.current, {
      width: '100%',
      height: '100%',
      padding: '5rem',
      transformOrigin: 'top right',
      transition: { duration: 0.6 }
    })
    textanimate(texta.current, {
      fontSize: window.innerWidth < 768 ? '1.25rem' : '2.25rem',
      transition: { duration: 0.6 }
    })
  }, [])

  return(
    <motion.a 
      initial={{ width: 0, height: 0, transformOrigin: "top left", padding: 0 }}
      ref={diva}
      onClick={handleMenuToggle} 
      href={href} 
      className='rounded-[20px] flex justify-center cursor-pointer bg-red-500'
    >
      <motion.h1 
        initial={{ fontSize: 0 }}
        ref={texta}
        className='orbitron text-white text-2xl md:text-4xl font-bold my-auto'
      >{name}</motion.h1>
    </motion.a>
  )
}


const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState((false))

  const divAnimates = React.useRef(MenuItems.map(() => React.createRef()));
  const textAnimates = React.useRef(MenuItems.map(() => React.createRef()));

  const divAnimateControls = MenuItems.map(() => useAnimate());
  const textAnimateControls = MenuItems.map(() => useAnimate());

  const handleMenuToggle = () => {
    if (showMenu) {
      divAnimateControls.forEach(([_, animate], index) => {
        animate(divAnimates.current[index].current, {
          height: 0,
          width: 0,
          padding: 0,
          transformOrigin: 'bottom right',
          transition: { duration: 0.6 },
        });
      });

      textAnimateControls.forEach(([_, animate], index) => {
        animate(textAnimates.current[index].current, {
          fontSize: 0,
          transition: { duration: 0.6 },
        });
      });

      // setShowMenu(false);
      setTimeout(() => {
        setShowMenu(false);
      }, 500);
    } else {
      setShowMenu(true);
    }
  };
  return (
    <>
      <div className='absolute w-full z-[101]'>
        <div className='flex justify-between p-5 items-center'>
          <Link to='/' className=''>
            <img src="/logo.png" alt="logo" className='md:w-28 w-20' />
          </Link>
          <i onClick={handleMenuToggle} className={`fixed right-10 cursor-pointer fa-solid ${showMenu ? 'fa-x' : 'fa-bars'} text-[#A6232B] text-4xl`}></i>
        </div> 
        
      </div>
      {showMenu && (
        <div className='z-[100] fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent'>
          <div className='w-[90%] h-[90%] grid grid-cols-2 md:grid-cols-3 gap-8 '>
            {MenuItems.map((item, index) => (
              <MenuCard 
                key={index} 
                href={item.href} 
                name={item.name} 
                setShowMenu={setShowMenu} 
                diva={divAnimates.current[index]}
                texta={textAnimates.current[index]}
                divanimate={divAnimateControls[index][1]}
                textanimate={textAnimateControls[index][1]}
                handleMenuToggle={handleMenuToggle}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar