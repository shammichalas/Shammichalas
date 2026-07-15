import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('Home');
  const [animationState, setAnimationState] = useState('hidden');
  const lastScrollY = useRef(0);

  // Trigger entry reveal matching loader timing (3.8s delay)
  useEffect(() => {
    setAnimationState('visible');
  }, []);

  // Intersection Observer for scroll tracking (45% viewport center trigger)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // 1. Hide/Show dock based on scroll direction & speed
      if (delta > 15 && currentScrollY > 200) {
        setAnimationState('scrolledDown');
      } else if (delta < -10) {
        setAnimationState('scrolledUp');
      }

      lastScrollY.current = currentScrollY;

      // 2. Section detection at 45% viewport center
      const scrollTriggerCenter = window.innerHeight * 0.45;

      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= scrollTriggerCenter && rect.bottom >= scrollTriggerCenter) {
            setActiveSection(item.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e, name, href) => {
    e.preventDefault();
    setActiveSection(name);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const entryVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.92,
      x: "-50%"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      x: "-50%",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // Expo.Out
        delay: 3.8
      }
    },
    scrolledDown: {
      y: "120%",
      opacity: 0,
      scale: 0.95,
      x: "-50%",
      filter: "blur(4px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 0.61, 0.36, 1]
      }
    },
    scrolledUp: {
      y: 0,
      opacity: 1,
      scale: 1,
      x: "-50%",
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 0.61, 0.36, 1]
      }
    }
  };

  return (
    <>
      {/* Fixed Top Header (Logo + Let's Connect CTA) */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 3.8 }}
        className="fixed top-0 left-0 w-full z-[60] py-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, 'Home', '#home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center shadow-glow-orange group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-display font-extrabold text-sm tracking-widest">S</span>
            </div>
            <span className="font-display font-bold tracking-widest text-sm bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-orange-200 transition-all duration-300 uppercase">
              Sham Michalas
            </span>
          </a>

          {/* Let's Connect CTA (Desktop only) */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'Contact', '#contact')}
              className="group relative px-6 py-2.5 rounded-full overflow-hidden flex items-center gap-1.5 border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/40 font-display text-xs font-bold tracking-widest text-slate-100 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.02)] hover:shadow-glow-orange cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600/10 to-rose-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">LET'S CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 text-orange-400 group-hover:text-orange-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Floating Bottom Nav Container */}
      <motion.div
        variants={entryVariants}
        initial="hidden"
        animate={animationState}
        className="fixed bottom-[28px] left-1/2 z-[9999] flex items-center gap-[4px] sm:gap-[6px] px-[8px] sm:px-[12px] py-[8px] sm:py-[10px] rounded-full border border-white/8 bg-[#0A0A0A]/82 backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] select-none max-w-[92vw] sm:max-w-max"
        style={{
          x: "-50%"
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.name, item.href)}
              className="relative px-[12px] sm:px-[18px] py-[8px] sm:py-[12px] font-sans text-[11px] sm:text-[14px] tracking-[0.02em] font-semibold uppercase cursor-pointer select-none transition-all duration-300 flex items-center justify-center rounded-full text-slate-400"
              style={{
                color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                fontWeight: isActive ? 700 : 600,
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                zIndex: 10
              }}
              whileHover={!isActive ? { 
                y: -2, 
                scale: 1.03, 
                color: "rgba(255,255,255,0.9)",
                transition: { duration: 0.25 }
              } : { 
                scale: 1.07,
                transition: { duration: 0.25 }
              }}
            >
              <span className="relative z-20 select-none">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeFloatingPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FF7A00] to-[#FFB347] shadow-[0_0_25px_rgba(255,122,0,0.35)] z-10"
                  transition={{ 
                    type: 'spring', 
                    stiffness: 280, 
                    damping: 24, 
                    mass: 0.8 
                  }}
                />
              )}
            </a>
          );
        })}
      </motion.div>
    </>
  );
}
