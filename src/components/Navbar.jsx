import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, Code2, Layers, Briefcase, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Projects', href: '#projects', icon: Layers },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail }
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
    <motion.div
      variants={entryVariants}
      initial="hidden"
      animate={animationState}
      className="fixed bottom-[24px] left-1/2 z-[9999] flex items-center gap-[2px] sm:gap-[6px] px-[6px] sm:px-[10px] py-[6px] sm:py-[8px] rounded-3xl border border-white/10 bg-[rgba(20,20,20,0.65)] backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] select-none max-w-[95vw] sm:max-w-max"
      style={{
        x: "-50%"
      }}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.name;
        const Icon = item.icon;
        return (
          <motion.a
            key={item.name}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.name, item.href)}
            className="relative px-[12px] sm:px-[20px] py-[6px] sm:py-[10px] font-sans text-[10px] sm:text-[12px] tracking-normal font-medium cursor-pointer select-none transition-all duration-300 flex flex-col items-center justify-center gap-1 rounded-2xl text-slate-400"
            style={{
              color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
              fontWeight: isActive ? 600 : 500,
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
              zIndex: 10
            }}
            whileHover={!isActive ? { 
              y: -1, 
              scale: 1.02, 
              color: "rgba(255,255,255,0.8)",
              transition: { duration: 0.2 }
            } : { 
              scale: 1.04,
              transition: { duration: 0.2 }
            }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-20" />
            <span className="relative z-20 select-none">{item.name}</span>
            {isActive && (
              <motion.div
                layoutId="activeFloatingPill"
                className="absolute inset-0 rounded-2xl bg-white/[0.10] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.15),_inset_0_1px_0_rgba(255,255,255,0.15)] z-10"
                transition={{ 
                  type: 'spring', 
                  stiffness: 280, 
                  damping: 26, 
                  mass: 0.9 
                }}
              />
            )}
          </motion.a>
        );
      })}
    </motion.div>
  );
}
