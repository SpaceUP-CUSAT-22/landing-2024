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


const MenuCard2 = ({ showMenu, href, name, handleMenuToggle, diva, texta, divanimate, textanimate, delay }) => {
  React.useEffect(() => {

    const animateDiv = async() => {
      if(showMenu){
        await Promise.all([
          divanimate(diva.current, { width: '0%', opacity: 0, zIndex: 100 }, { duration: 0 }),
          textanimate(texta.current, { opacity: 0 }, { duration: 0 })
        ]);
        
        await Promise.all([
          divanimate(
            diva.current,
            { width: '100%', opacity: 1, zIndex: 102 },
            { duration: 0.6, delay }
          ),
          textanimate(
            texta.current,
            { opacity: 1 },
            { duration: 0.6, delay }
          )
        ]);
      }else{
        await Promise.all([
          divanimate(diva.current, { width: '0%', opacity: 0, zIndex: 100 }, { duration: 0.6, delay }),
          textanimate(texta.current, { opacity: 0 }, { duration: 0.6, delay })
        ]);
      }
    }

    animateDiv()

  }, [showMenu])

  return (
    <a 
      onClick={handleMenuToggle}
      href={href}
    >
      <div
        ref={diva}
        className='w-0 bg-black hover:bg-red-500 transition ease-in-out duration-500 p-20'
      >
        <h1
        ref={texta}
        className='orbitron text-white font-bold text-2xl md:text-7xl'>
          {name}
        </h1>
      </div>
    </a>
  )
}



const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState((false))

  const [divAnimateRef1, divAnimateControl1] = useAnimate();
  const [divAnimateRef2, divAnimateControl2] = useAnimate();
  const [divAnimateRef3, divAnimateControl3] = useAnimate();
  const [divAnimateRef4, divAnimateControl4] = useAnimate();
  const [divAnimateRef5, divAnimateControl5] = useAnimate();

  const [textAnimateRef1, textAnimateControl1] = useAnimate();
  const [textAnimateRef2, textAnimateControl2] = useAnimate();
  const [textAnimateRef3, textAnimateControl3] = useAnimate();
  const [textAnimateRef4, textAnimateControl4] = useAnimate();
  const [textAnimateRef5, textAnimateControl5] = useAnimate();

  const handleMenuToggle = async () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className='absolute w-full'>
        <div className='flex justify-between p-5 items-center'>
          <Link to='/' className=''>
            <img src="/logo.png" alt="logo" className='md:w-28 w-20 opacity-0' />
          </Link>
          <i onClick={handleMenuToggle} className={`fixed z-[103] right-10 cursor-pointer fa-solid ${showMenu ? 'fa-x' : 'fa-bars'} text-[#A6232B] text-4xl`}></i>
        </div> 
      </div>
      
      <div 
        className={`fixed overflow-y-auto top-0 w-screen h-screen max-w-screen max-h-screen transition-all duration-600 ${
          showMenu ? 'z-[102]' : 'z-[100]'
        }`}
      >
        <MenuCard2 showMenu={showMenu} name={"Home"} href={'#home'} handleMenuToggle={handleMenuToggle} diva={divAnimateRef1} texta={textAnimateRef1} divanimate={divAnimateControl1} textanimate={textAnimateControl1} delay={0} />
        <MenuCard2 showMenu={showMenu} name={"Events"} href={'#events'} handleMenuToggle={handleMenuToggle} diva={divAnimateRef2} texta={textAnimateRef2} divanimate={divAnimateControl2} textanimate={textAnimateControl2} delay={0.1} />
        <MenuCard2 showMenu={showMenu} name={"Speakers"} href={'#speakers'} handleMenuToggle={handleMenuToggle} diva={divAnimateRef3} texta={textAnimateRef3} divanimate={divAnimateControl3} textanimate={textAnimateControl3} delay={0.2} />
        <MenuCard2 showMenu={showMenu} name={"Previous Images"} href={'#previmages'} handleMenuToggle={handleMenuToggle} diva={divAnimateRef4} texta={textAnimateRef4} divanimate={divAnimateControl4} textanimate={textAnimateControl4} delay={0.3} />
        <MenuCard2 showMenu={showMenu} name={"About"} href={'#about'} handleMenuToggle={handleMenuToggle} diva={divAnimateRef5} texta={textAnimateRef5} divanimate={divAnimateControl5} textanimate={textAnimateControl5} delay={0.4} />
      </div>
    </>
  )
}

export default Navbar