import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Tech stack cards with matching coordinates from ConnectionLines
const cardsData = [
  { 
    id: 'react', 
    name: 'React.js', 
    x: '15%', 
    y: '22%', 
    depth: 0.15,
    glow: 'rgba(56, 189, 248, 0.15)', // sky-400
    icon: (
      <svg className="w-5 h-5 text-sky-400" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  { 
    id: 'next', 
    name: 'Next.js', 
    x: '12%', 
    y: '52%', 
    depth: 0.22,
    glow: 'rgba(255, 255, 255, 0.12)',
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="white"/>
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" r="90" fill="transparent" stroke="currentColor" strokeWidth="8"/>
          <path d="M140 150L95 90V140H80V50H95L132 100V50H145V150H140Z" fill="currentColor"/>
        </g>
      </svg>
    )
  },
  { 
    id: 'python', 
    name: 'Python', 
    x: '26%', 
    y: '72%', 
    depth: 0.1,
    glow: 'rgba(234, 179, 8, 0.15)', // yellow-500
    icon: (
      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0003 2C10.7417 2 9.53907 2.15556 8.52834 2.45109C5.39414 3.3674 5.37895 5.56844 5.37895 7.15217V8.58696H12.0872C13.5651 8.58696 14.7766 9.85109 14.7766 11.3391V14.6304H18.6214C20.6121 14.6304 22.0003 13.5855 22.0003 11.0543V7.6087C22.0003 4.2407 19.3496 2 12.0003 2ZM7.23439 4.3913C7.75549 4.3913 8.18222 4.81804 8.18222 5.33913C8.18222 5.86022 7.75549 6.28696 7.23439 6.28696C6.71329 6.28696 6.28656 5.86022 6.28656 5.33913C6.28656 4.81804 6.71329 4.3913 7.23439 4.3913ZM5.37895 9.36957C3.38827 9.36957 2.00007 10.4145 2.00007 12.9457V16.3913C2.00007 19.7593 4.65076 22 12.0003 22C13.2589 22 14.4615 21.8444 15.4723 21.5489C18.6065 20.6326 18.6217 18.4316 18.6217 16.8478V15.413H11.9133C10.4354 15.413 9.22396 14.1489 9.22396 12.6609V9.36957H5.37895ZM16.7662 17.7174C17.2873 17.7174 17.714 18.1441 17.714 18.6652C17.714 19.1863 17.2873 19.613 16.7662 19.613C16.2451 19.613 15.8184 19.1863 15.8184 18.6652C15.8184 18.1441 16.2451 17.7174 16.7662 17.7174Z"/>
      </svg>
    )
  },
  { 
    id: 'fastapi', 
    name: 'FastAPI', 
    x: '30%', 
    y: '18%', 
    depth: 0.18,
    glow: 'rgba(5, 150, 105, 0.15)', // emerald-600
    icon: (
      <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 9.429L12.56 16.48a1.2 1.2 0 0 1-1.745.183l-3.791-3.223a1.2 1.2 0 1 1 1.554-1.829l2.766 2.352 4.66-6.388a1.2 1.2 0 1 1 1.948 1.424z"/>
      </svg>
    )
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    x: '70%', 
    y: '16%', 
    depth: 0.14,
    glow: 'rgba(34, 197, 94, 0.15)', // green-500
    icon: (
      <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.15 11.23c-.76-2.58-2.61-4.9-4.52-6.52-.3-.25-.76-.25-1.06 0-2 1.7-3.8 4-4.55 6.57-.76 2.58-.33 5.4 1.25 7.6 1.15 1.6 3 2.65 4.73 3.03.35.08.7.08 1.05 0 1.73-.38 3.58-1.43 4.73-3.03 1.6-2.2 2-5 .25-7.65zM12 18.5a.75.75 0 0 1-.75-.75v-11.5a.75.75 0 0 1 1.5 0v11.5a.75.75 0 0 1-.75.75z"/>
      </svg>
    )
  },
  { 
    id: 'aws', 
    name: 'AWS', 
    x: '74%', 
    y: '72%', 
    depth: 0.16,
    glow: 'rgba(249, 115, 22, 0.15)', // orange-500
    icon: (
      <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 22l6.2-11.2L17.7 22h3.5L14 8.2l4.8-8.2h-3.5L10.3 8.8 7.2 3H3.7l4.8 8.8L3 22h3.3z" />
      </svg>
    )
  },
  { 
    id: 'docker', 
    name: 'Docker', 
    x: '88%', 
    y: '50%', 
    depth: 0.24,
    glow: 'rgba(14, 165, 233, 0.15)', // sky-500
    icon: (
      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 8.18h2.119v-2.12h-2.119zm-2.737 0h2.119v-2.12H11.246zm-2.737 0h2.12v-2.12h-2.12zm-2.737 0h2.119v-2.12H5.772zm2.737-2.738h2.12v-2.12h-2.12zm2.737 0h2.119v-2.12H11.246zm0-2.737h2.119v-2.119h-2.119zm5.474 5.475h2.118v-2.12H16.72zm-2.737-5.475h2.119v-2.119h-2.119zM1.123 9.948c.08.385.25.753.487 1.077.295.39.69.696 1.15.89 2.597 1.09 5.617.9 8.2-.18.73-.3 1.488-.5 2.268-.588.618-.07 1.245-.03 1.854.12 1.344.333 2.5.6 3.65.6.865 0 1.636-.26 2.3-.77.77-.594 1.35-1.5 1.7-2.67.245-.826.37-1.687.37-2.552 0-.256-.008-.51-.026-.763-.095-1.342-.71-2.548-1.68-3.4-.645-.568-1.46-.867-2.29-.844h-.132c-1.07.01-2.115.35-3 .986l-.42.3c-.312.227-.584.498-.81.804l-.24.323c-.347.464-.537 1.026-.54 1.602l.006.5a.65.65 0 0 1-.365.59c-.43.208-.89.344-1.36.4H5.973c-.5.06-1 .212-1.45.45l-.47.24c-.453.238-.838.583-1.12.996L2.31 9.2c-.363.473-.772.845-1.187.747z"/>
      </svg>
    )
  },
  { 
    id: 'openai', 
    name: 'OpenAI', 
    x: '85%', 
    y: '20%', 
    depth: 0.2,
    glow: 'rgba(16, 185, 129, 0.15)', // emerald-500
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7 10.3c.3-.5.4-1.2.2-1.8-.2-.6-.7-1.1-1.3-1.3l-1.8-.6c.2-.6.1-1.3-.2-1.9-.3-.5-.9-.9-1.5-1l-1.8-.1c-.1-.7-.6-1.2-1.2-1.5-.6-.3-1.3-.2-1.9.1l-1.6.9c-.5-.3-1.2-.4-1.8-.2-.6.2-1.1.7-1.3 1.3l-.6 1.8c-.6-.2-1.3-.1-1.9.2-.5.3-.9.9-1 1.5l-.1 1.8c-.7.1-1.2.6-1.5 1.2-.3.6-.2 1.3.1 1.9l.9 1.6c-.3.5-.4 1.2-.2 1.8.2.6.7 1.1 1.3 1.3l1.8.6c-.2.6-.1 1.3.2 1.9.3.5.9.9 1.5 1l1.8.1c.1.7.6 1.2 1.2 1.5.6.3 1.3.2 1.9-.1l1.6-.9c.5.3 1.2.4 1.8.2.6-.2 1.1-.7 1.3-1.3l.6-1.8c.6.2 1.3.1 1.9-.2.5-.3.9-.9 1-1.5l.1-1.8c.7-.1 1.2-.6 1.5-1.2.3-.6.2-1.3-.1-1.9l-.9-1.6zM12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    )
  }
];

export default function FloatingCards() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion spring setup for buttery physics
  const springConfig = { stiffness: 45, damping: 20, mass: 1 };
  const mouseXSpring = useSpring(useMotionValue(0), springConfig);
  const mouseYSpring = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768 || mediaQuery.matches) return;
      
      // Calculate normalized mouse positions (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      mouseXSpring.set(x);
      mouseYSpring.set(y);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseXSpring, mouseYSpring]);

  // Define 3D mouse parallax transforms unconditionally at the top level for all 8 cards to satisfy React Hook Rules
  const transforms = [
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[0].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[0].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[0].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[0].depth * 50),
    },
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[1].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[1].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[1].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[1].depth * 50),
    },
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[2].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[2].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[2].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[2].depth * 50),
    },
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[3].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[3].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[3].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[3].depth * 50),
    },
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[4].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[4].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[4].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[4].depth * 50),
    },
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[5].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[5].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[5].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[5].depth * 50),
    },
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[6].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[6].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[6].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[6].depth * 50),
    },
    {
      x: useTransform(mouseXSpring, (val) => val * cardsData[7].depth * 280),
      y: useTransform(mouseYSpring, (val) => val * cardsData[7].depth * 200),
      rx: useTransform(mouseYSpring, (val) => val * cardsData[7].depth * -50),
      ry: useTransform(mouseXSpring, (val) => val * cardsData[7].depth * 50),
    }
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[40] overflow-hidden">
      {!isMobile && cardsData.map((card, index) => {
        // Compute static coordinates matching nodes
        const leftVal = card.x;
        const topVal = card.y;

        // Custom slow float animation settings per card
        const floatDuration = 5 + (index % 3) * 2;
        const floatDelay = index * 0.4;
        
        // Performance Fallback: reduce float ranges if prefers reduced motion
        const floatAmplitude = prefersReducedMotion ? 0 : 8;

        const motionX = prefersReducedMotion ? 0 : transforms[index].x;
        const motionY = prefersReducedMotion ? 0 : transforms[index].y;
        const rotateX = prefersReducedMotion ? 0 : transforms[index].rx;
        const rotateY = prefersReducedMotion ? 0 : transforms[index].ry;

        return (
          <motion.div
            key={card.id}
            style={{
              position: 'absolute',
              left: leftVal,
              top: topVal,
              x: motionX,
              y: motionY,
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1000
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              // Slow floating oscillation overlay
              y: [0, -floatAmplitude, 0],
              rotate: [0, index % 2 === 0 ? 0.8 : -0.8, 0]
            }}
            transition={{
              // Intro animation details:
              opacity: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 + index * 0.15 },
              scale: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 + index * 0.15 },
              // Floating infinite loops:
              y: {
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay
              },
              rotate: {
                duration: floatDuration + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay
              }
            }}
            className={`pointer-events-auto cursor-pointer ${
              isMobile ? 'scale-75 origin-center' : ''
            }`}
          >
            {/* Elegant glassmorphic tech card body */}
            <div 
              style={{
                '--shadow-glow': card.glow,
                textShadow: '0 0 10px var(--shadow-glow)'
              }}
              className="glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 select-none card-border-glow group transition-all duration-700 bg-slate-950/65 backdrop-blur-md border border-white/5 shadow-2xl"
            >
              {/* Technology Icon Wrapper */}
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900/60 border border-white/5 group-hover:scale-105 group-hover:border-orange-500/30 group-hover:bg-slate-900 transition-all duration-500 shadow-inner"
              >
                {card.icon}
              </div>

              {/* Technology name */}
              <div className="flex flex-col">
                <span className="font-display text-[11px] tracking-wider text-slate-400 font-bold uppercase transition-colors duration-500 group-hover:text-slate-200">
                  TECH NODE
                </span>
                <span className="font-sans text-xs font-bold text-slate-100 group-hover:text-orange-400 transition-colors duration-500">
                  {card.name}
                </span>
              </div>

              {/* Subtle back-card spotlight circle */}
              <div 
                style={{ backgroundColor: card.glow }}
                className="absolute inset-0 -z-10 rounded-2xl blur-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
