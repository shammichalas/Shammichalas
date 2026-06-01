/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded skill nodes with deep technical descriptions, ratings, and custom inline SVG icons
const skillsData = [
  { 
    id: 'react', 
    name: 'React.js', 
    category: 'Frontend', 
    desc: 'Virtual DOM calibration, custom Hooks, fiber architecture, and state optimization pipelines.', 
    ring: 0, 
    angle: 0, 
    glow: 'rgba(56, 189, 248, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-sky-400" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    category: 'Frontend', 
    desc: 'Server-side rendering (SSR), static site generation, React Server Components (RSC), and edge routing.', 
    ring: 0, 
    angle: 90, 
    glow: 'rgba(255, 255, 255, 0.3)',
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="next-mask-galaxy" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="white"/>
        </mask>
        <g mask="url(#next-mask-galaxy)">
          <circle cx="90" cy="90" r="90" fill="transparent" stroke="currentColor" strokeWidth="10"/>
          <path d="M140 150L95 90V140H80V50H95L132 100V50H145V150H140Z" fill="currentColor"/>
        </g>
      </svg>
    )
  },
  { 
    id: 'openai', 
    name: 'OpenAI API', 
    category: 'AI / ML', 
    desc: 'Fine-tuning LLM pipelines, RAG integrations, semantic search matrices, and token budget management.', 
    ring: 0, 
    angle: 180, 
    glow: 'rgba(16, 185, 129, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7 10.3c.3-.5.4-1.2.2-1.8-.2-.6-.7-1.1-1.3-1.3l-1.8-.6c.2-.6.1-1.3-.2-1.9-.3-.5-.9-.9-1.5-1l-1.8-.1c-.1-.7-.6-1.2-1.2-1.5-.6-.3-1.3-.2-1.9.1l-1.6.9c-.5-.3-1.2-.4-1.8-.2-.6.2-1.1.7-1.3 1.3l-.6 1.8c-.6-.2-1.3-.1-1.9.2-.5.3-.9.9-1 1.5l-.1 1.8c-.7.1-1.2.6-1.5 1.2-.3.6-.2 1.3.1 1.9l.9 1.6c-.3.5-.4 1.2-.2 1.8.2.6.7 1.1 1.3 1.3l1.8.6c-.2.6-.1 1.3.2 1.9.3.5.9.9 1.5 1l1.8.1c.1.7.6 1.2 1.2 1.5.6.3 1.3.2 1.9-.1l1.6-.9c.5.3 1.2.4 1.8.2.6-.2 1.1-.7 1.3-1.3l.6-1.8c.6.2 1.3.1 1.9-.2.5-.3.9-.9 1-1.5l.1-1.8c.7-.1 1.2-.6 1.5-1.2.3-.6.2-1.3-.1-1.9l-.9-1.6zM12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    )
  },
  { 
    id: 'python', 
    name: 'Python', 
    category: 'AI / ML', 
    desc: 'Multi-threaded background compute, mathematical data modeling, and asynchronous task management.', 
    ring: 0, 
    angle: 270, 
    glow: 'rgba(234, 179, 8, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0003 2C10.7417 2 9.53907 2.15556 8.52834 2.45109C5.39414 3.3674 5.37895 5.56844 5.37895 7.15217V8.58696H12.0872C13.5651 8.58696 14.7766 9.85109 14.7766 11.3391V14.6304H18.6214C20.6121 14.6304 22.0003 13.5855 22.0003 11.0543V7.6087C22.0003 4.2407 19.3496 2 12.0003 2ZM7.23439 4.3913C7.75549 4.3913 8.18222 4.81804 8.18222 5.33913C8.18222 5.86022 7.75549 6.28696 7.23439 6.28696C6.71329 6.28696 6.28656 5.86022 6.28656 5.33913C6.28656 4.81804 6.71329 4.3913 7.23439 4.3913ZM5.37895 9.36957C3.38827 9.36957 2.00007 10.4145 2.00007 12.9457V16.3913C2.00007 19.7593 4.65076 22 12.0003 22C13.2589 22 14.4615 21.8444 15.4723 21.5489C18.6065 20.6326 18.6217 18.4316 18.6217 16.8478V15.413H11.9133C10.4354 15.413 9.22396 14.1489 9.22396 12.6609V9.36957H5.37895ZM16.7662 17.7174C17.2873 17.7174 17.714 18.1441 17.714 18.6652C17.714 19.1863 17.2873 19.613 16.7662 19.613C16.2451 19.613 15.8184 19.1863 15.8184 18.6652C15.8184 18.1441 16.2451 17.7174 16.7662 17.7174Z"/>
      </svg>
    )
  },
  { 
    id: 'fastapi', 
    name: 'FastAPI', 
    category: 'Backend', 
    desc: 'High-frequency asynchronous APIs, strict Pydantic data sanitization, and high-concurrency loops.', 
    ring: 1, 
    angle: 45, 
    glow: 'rgba(5, 150, 105, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-[#059669]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 9.429L12.56 16.48a1.2 1.2 0 0 1-1.745.183l-3.791-3.223a1.2 1.2 0 1 1 1.554-1.829l2.766 2.352 4.66-6.388a1.2 1.2 0 1 1 1.948 1.424z"/>
      </svg>
    )
  },
  { 
    id: 'node', 
    name: 'Node.js', 
    category: 'Backend', 
    desc: 'Non-blocking I/O event loops, stream-based file structures, and custom Express middleware frameworks.', 
    ring: 1, 
    angle: 135, 
    glow: 'rgba(132, 204, 22, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-lime-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm6.7 14.1L12 20l-6.7-3.9V7.9L12 4l6.7 3.9v8.2z"/>
      </svg>
    )
  },
  { 
    id: 'redis', 
    name: 'Redis', 
    category: 'Backend', 
    desc: 'In-memory caching pools, pub/sub socket brokers, and temporary key TTL session states.', 
    ring: 1, 
    angle: 225, 
    glow: 'rgba(239, 68, 68, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
      </svg>
    )
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    category: 'Backend', 
    desc: 'NoSQL aggregate processing, index optimizations, and high-frequency document writes.', 
    ring: 1, 
    angle: 315, 
    glow: 'rgba(34, 197, 94, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.15 11.23c-.76-2.58-2.61-4.9-4.52-6.52-.3-.25-.76-.25-1.06 0-2 1.7-3.8 4-4.55 6.57-.76 2.58-.33 5.4 1.25 7.6 1.15 1.6 3 2.65 4.73 3.03.35.08.7.08 1.05 0 1.73-.38 3.58-1.43 4.73-3.03 1.6-2.2 2-5 .25-7.65zM12 18.5a.75.75 0 0 1-.75-.75v-11.5a.75.75 0 0 1 1.5 0v11.5a.75.75 0 0 1-.75.75z"/>
      </svg>
    )
  },
  { 
    id: 'docker', 
    name: 'Docker', 
    category: 'Cloud & DevOps', 
    desc: 'Multi-stage container layering, volume mounts, isolated microservice clusters, and minimal images.', 
    ring: 2, 
    angle: 15, 
    glow: 'rgba(14, 165, 233, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 8.18h2.119v-2.12h-2.119zm-2.737 0h2.119v-2.12H11.246zm-2.737 0h2.12v-2.12h-2.12zm-2.737 0h2.119v-2.12H5.772zm2.737-2.738h2.12v-2.12h-2.12zm2.737 0h2.119v-2.12H11.246zm0-2.737h2.119v-2.119h-2.119zm5.474 5.475h2.118v-2.12H16.72zm-2.737-5.475h2.119v-2.119h-2.119zM1.123 9.948c.08.385.25.753.487 1.077.295.39.69.696 1.15.89 2.597 1.09 5.617.9 8.2-.18.73-.3 1.488-.5 2.268-.588.618-.07 1.245-.03 1.854.12 1.344.333 2.5.6 3.65.6.865 0 1.636-.26 2.3-.77.77-.594 1.35-1.5 1.7-2.67.245-.826.37-1.687.37-2.552 0-.256-.008-.51-.026-.763-.095-1.342-.71-2.548-1.68-3.4-.645-.568-1.46-.867-2.29-.844h-.132c-1.07.01-2.115.35-3 .986l-.42.3c-.312.227-.584.498-.81.804l-.24.323c-.347.464-.537 1.026-.54 1.602l.006.5a.65.65 0 0 1-.365.59c-.43.208-.89.344-1.36.4H5.973c-.5.06-1 .212-1.45.45l-.47.24c-.453.238-.838.583-1.12.996L2.31 9.2c-.363.473-.772.845-1.187.747z"/>
      </svg>
    )
  },
  { 
    id: 'aws', 
    name: 'AWS Lambda', 
    category: 'Cloud & DevOps', 
    desc: 'Serverless function scheduling, cold-start mitigation, API Gateway mapping, and event-driven queues.', 
    ring: 2, 
    angle: 105, 
    glow: 'rgba(249, 115, 22, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 22l6.2-11.2L17.7 22h3.5L14 8.2l4.8-8.2h-3.5L10.3 8.8 7.2 3H3.7l4.8 8.8L3 22h3.3z" />
      </svg>
    )
  },
  { 
    id: 'celery', 
    name: 'Celery', 
    category: 'AI / ML', 
    desc: 'Distributed background queue worker, AMQP/RabbitMQ integration, task result cachers, and rate-limiting.', 
    ring: 2, 
    angle: 195, 
    glow: 'rgba(167, 139, 250, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
    )
  },
  { 
    id: 'firebase', 
    name: 'Firebase', 
    category: 'Cloud & DevOps', 
    desc: 'Realtime database synchronization, OAuth authentication keys, and serverless hosting triggers.', 
    ring: 2, 
    angle: 285, 
    glow: 'rgba(245, 158, 11, 0.4)',
    icon: (
      <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm6.7 14.1L12 20l-6.7-3.9V7.9L12 4l6.7 3.9v8.2z"/>
      </svg>
    )
  }
];

export default function SkillsGalaxy() {
  const [hoveredSkill, setHoveredSkill] = useState(skillsData[0]); // Default details display
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Slow continuous rotation of the galaxy
  useEffect(() => {
    let frameId;
    const animateRotation = () => {
      setRotation(prev => (prev + 0.08) % 360);
      frameId = requestAnimationFrame(animateRotation);
    };
    animateRotation();
    return () => cancelAnimationFrame(frameId);
  }, []);



  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // max shift 20px
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Compute ring dimensions based on screen bounds
  // eslint-disable-next-line
  const getRingRadius = (ringIdx) => {
    if (isMobile) return [50, 95, 140][ringIdx];
    return [90, 160, 230][ringIdx];
  };

  return (
    <section 
      id="skills" 
      className="relative min-h-screen py-32 px-6 md:px-12 bg-[#02040a] flex flex-col justify-center overflow-hidden z-40 border-t border-white/5 select-none"
    >
      {/* Cinematic Cosmic Nebula Background Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-20 overflow-hidden opacity-[0.25] select-none">
        <img 
          src="/skills_galaxy_bg.png" 
          alt="Cosmic Space Nebula" 
          className="w-full h-full object-cover scale-[1.05] animate-pulse"
          style={{ animationDuration: '12s' }}
        />
        {/* Soft dark-to-transparent overlays on all sides to blend seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-transparent to-[#02040a]" />
      </div>

      {/* Dynamic atmospheric radial background glow specific to the active hovered skill */}
      <div 
        style={{ 
          backgroundColor: hoveredSkill ? hoveredSkill.glow.replace('0.4', '0.04') : 'rgba(249, 115, 22, 0.02)',
          transition: 'background-color 1s ease'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none -z-10" 
      />

      <div 
        className="scroll-section-reveal max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 relative z-10"
      >
        
        {/* Left Side: Header & Interactive Dashboard Display Panel */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center">
          <div className="mb-8">
            <span className="font-display text-xs font-bold tracking-[0.25em] text-orange-500 uppercase">
              COGNITIVE ECOSYSTEM
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-6 leading-tight">
              Skills Galaxy
            </h2>
            <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed">
              Hover over the rotating stars within the tech universe to read specialized proficiencies. Bright glowing pathways actively stream to related nodes.
            </p>
          </div>

          {/* Interactive details console panel */}
          <div className="glass-panel-glow p-8 rounded-3xl min-h-[220px] flex flex-col justify-between relative overflow-hidden bg-slate-950/70 border border-orange-500/20 shadow-glow-orange">
            <AnimatePresence mode="wait">
              {hoveredSkill && (
                <motion.div
                  key={hoveredSkill.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      style={{ backgroundColor: hoveredSkill.glow }}
                      className="w-3.5 h-3.5 rounded-full blur-[2px] animate-pulse" 
                    />
                    <span className="font-display text-[10px] tracking-widest font-extrabold text-orange-500 uppercase">
                      {hoveredSkill.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-slate-100 mb-3">
                    {hoveredSkill.name}
                  </h3>

                  <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                    {hoveredSkill.desc}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] tracking-wider font-extrabold text-slate-500 uppercase">
                    <span>COGNITIVE MATRIX</span>
                    <span className="text-orange-400">STATUS: CALIBRATED</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Rotating 3D Galaxy Map */}
        {/* Right Side: Rotating 3D Galaxy Map on desktop, tactile grid on mobile */}
        {isMobile ? (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
            {skillsData.map((skill) => {
              const isSelected = hoveredSkill?.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setHoveredSkill(skill)}
                  className={`glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center border transition-all duration-300 pointer-events-auto cursor-pointer ${
                    isSelected 
                      ? 'border-orange-500 bg-orange-500/10 shadow-glow-orange scale-[1.03]' 
                      : 'border-white/5 bg-slate-950/45 hover:border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-slate-900 border border-white/5 transition-transform duration-300 ${
                    isSelected ? 'scale-105 border-orange-500/30' : ''
                  }`}>
                    {skill.icon}
                  </div>
                  <span className="font-sans text-[10px] font-bold text-slate-200 uppercase tracking-widest leading-none">{skill.name}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div 
            className="w-full lg:w-[58%] flex items-center justify-center relative min-h-[380px] md:min-h-[500px]"
            style={{
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {/* Constellation Ring outlines */}
            {[0, 1, 2].map((ringIdx) => (
              <div
                key={ringIdx}
                style={{
                  width: `${getRingRadius(ringIdx) * 2}px`,
                  height: `${getRingRadius(ringIdx) * 2}px`,
                  border: '1.2px dashed rgba(255,255,255,0.03)',
                  boxShadow: hoveredSkill?.ring === ringIdx ? '0 0 25px rgba(249, 115, 22, 0.015)' : 'none',
                  transition: 'box-shadow 0.6s'
                }}
                className="absolute rounded-full pointer-events-none"
              />
            ))}

            {/* Galaxy Interactive Node Container */}
            <div 
              style={{ 
                transform: `rotate(${isMobile ? 0 : rotation}deg)`,
                width: isMobile ? '320px' : '500px',
                height: isMobile ? '320px' : '500px'
              }}
              className="relative flex items-center justify-center transition-transform duration-75"
            >
              {/* SVG Connecting lines overlaid from active hovered node */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible mix-blend-screen">
                {hoveredSkill && skillsData.map((node) => {
                  // Only draw links to other nodes in the SAME category (creating active category-related streams)
                  if (node.id === hoveredSkill.id || node.category !== hoveredSkill.category) return null;

                  const center = isMobile ? 160 : 250;
                  
                  // Coords of active hovered node
                  const radiusA = getRingRadius(hoveredSkill.ring);
                  const angleA = ((hoveredSkill.angle + (isMobile ? 0 : rotation)) * Math.PI) / 180;
                  const ax = center + radiusA * Math.cos(angleA);
                  const ay = center + radiusA * Math.sin(angleA);

                  // Coords of target connected node
                  const radiusB = getRingRadius(node.ring);
                  const angleB = ((node.angle + (isMobile ? 0 : rotation)) * Math.PI) / 180;
                  const bx = center + radiusB * Math.cos(angleB);
                  const by = center + radiusB * Math.sin(angleB);

                  // Curve controls
                  const cx1 = ax + (bx - ax) * 0.25;
                  const cy1 = ay + (by - ay) * 0.75;

                  return (
                    <g key={node.id}>
                      {/* Underlying faint background connector path */}
                      <path
                        d={`M ${ax} ${ay} Q ${cx1} ${cy1} ${bx} ${by}`}
                        fill="none"
                        stroke={hoveredSkill.glow}
                        strokeWidth="1.2"
                        opacity="0.12"
                      />
                      
                      {/* Travelling Bright Laser Spark (Direct pulsing flow arrow going only to target nodes!) */}
                      <motion.path
                        d={`M ${ax} ${ay} Q ${cx1} ${cy1} ${bx} ${by}`}
                        fill="none"
                        stroke={hoveredSkill.glow.replace('0.4', '0.9')}
                        strokeWidth="2.5"
                        opacity="0.95"
                        initial={{ pathLength: 0.15, pathOffset: 0 }}
                        animate={{ pathOffset: [0, 1.05] }}
                        transition={{ 
                          duration: 2.2, 
                          repeat: Infinity, 
                          ease: "linear"
                        }}
                        style={{ 
                          filter: `drop-shadow(0 0 5px ${hoveredSkill.glow.replace('0.4', '0.8')})` 
                        }}
                      />

                      {/* Small glowing joint receiver point */}
                      <circle 
                        cx={bx} 
                        cy={by} 
                        r="3" 
                        fill="#f97316" 
                        opacity="0.8" 
                        style={{ filter: 'drop-shadow(0 0 3px #f97316)' }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Render nodes */}
              {skillsData.map((skill) => {
                const radius = getRingRadius(skill.ring);
                const angleRad = ((skill.angle + (isMobile ? 0 : rotation)) * Math.PI) / 180;
                const nodeX = radius * Math.cos(angleRad);
                const nodeY = radius * Math.sin(angleRad);
                
                const isHovered = hoveredSkill?.id === skill.id;

                return (
                  <div
                    key={skill.id}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${nodeX}px)`,
                      top: `calc(50% + ${nodeY}px)`,
                      transform: `translate(-50%, -50%) rotate(${isMobile ? 0 : -rotation}deg) scale(${isHovered ? 1.25 : 1})`,
                      transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                      zIndex: isHovered ? 30 : 10
                    }}
                    className="cursor-pointer group pointer-events-auto"
                    onMouseEnter={() => setHoveredSkill(skill)}
                  >
                    {/* Glowing Node Circle housing the high-fidelity SVG icon instead of letters */}
                    <div 
                      style={{
                        boxShadow: isHovered ? `0 0 25px ${skill.glow}` : '0 0 5px rgba(255,255,255,0.03)'
                      }}
                      className={`w-9 h-9 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-500 bg-slate-950 ${
                        isHovered 
                          ? 'border-orange-500 text-orange-400' 
                          : 'border-white/5 text-slate-400 group-hover:border-white/20'
                      }`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center scale-90 md:scale-100 transition-transform duration-300 group-hover:scale-105">
                        {skill.icon}
                      </div>
                    </div>

                    {/* Node label */}
                    <div className={`absolute left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-md border bg-slate-950/90 text-[9px] font-sans font-extrabold tracking-widest uppercase transition-all duration-300 pointer-events-none whitespace-nowrap ${
                      isHovered 
                        ? 'opacity-100 border-orange-500/30 text-orange-400' 
                        : 'opacity-0 group-hover:opacity-90 border-white/5 text-slate-400'
                    }`}>
                      {skill.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
