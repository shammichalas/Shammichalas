/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, MessageSquare, Leaf, Cpu, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 'chatnest',
    title: "ChatNest",
    tag: "AI CONVERSATIONAL CORE",
    description: "An AI-powered messaging platform running WebSocket connections and context cache pipelines to deliver asynchronous language model interfaces.",
    tech: ["React.js", "FastAPI", "WebSockets", "OpenAI", "Redis"],
    github: "https://github.com/shammichalas",
    demo: "https://github.com/shammichalas",
    glow: 'rgba(56, 189, 248, 0.2)', // Sky blue
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex flex-col justify-end p-4 font-sans select-none">
        <div className="space-y-2 mb-2 w-full max-w-[85%]">
          {/* Animated conversation bubbles */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: [10, 0, -20] }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
            className="p-2.5 rounded-2xl rounded-bl-none bg-slate-900 border border-white/5 text-[9px] text-sky-400 font-medium"
          >
            System call: Synchronize models...
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: [10, 0, -25] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2.5, ease: "easeOut" }}
            className="p-2.5 rounded-2xl rounded-br-none bg-sky-500/10 border border-sky-500/20 text-[9px] text-sky-300 font-medium self-end"
          >
            Calibrating token caches. Done.
          </motion.div>
        </div>
        {/* Pulsing connection line */}
        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[8px] font-extrabold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-2.5 h-2.5 text-sky-400" />
            <span>SOCKET LINK: ACTIVE</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>
    )
  },
  {
    id: 'facerecog',
    title: "AI Facial Attendance",
    tag: "COMPUTER VISION INTEGRATION",
    description: "High-frequency neural face scanning mesh designed to cross-reference face landlines and securely automate check-in triggers.",
    tech: ["Python", "OpenCV", "FastAPI", "MongoDB", "Docker"],
    github: "https://github.com/shammichalas",
    demo: "https://github.com/shammichalas",
    glow: 'rgba(239, 68, 68, 0.2)', // Red
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex items-center justify-center overflow-hidden">
        {/* Futuristic wireframe camera grid mapping */}
        <svg className="absolute inset-0 w-full h-full opacity-10" stroke="currentColor" strokeWidth="0.5">
          <pattern id="grid-project" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-project)" />
        </svg>

        {/* Vector face mesh silhouette outline */}
        <svg className="w-24 h-24 text-rose-500/30" viewBox="0 0 100 100" fill="none">
          <path d="M50 15 C30 15 20 30 20 50 C20 70 30 85 50 85 C70 85 80 70 80 50 C80 30 70 15 50 15 Z" stroke="currentColor" strokeWidth="1" />
          {/* Eyes & Nose nodes */}
          <circle cx="38" cy="45" r="3" fill="#f43f5e" className="animate-pulse" />
          <circle cx="62" cy="45" r="3" fill="#f43f5e" className="animate-pulse" />
          <path d="M50 40 L50 60 L45 62" stroke="currentColor" strokeWidth="1" />
          <path d="M35 70 Q50 78 65 70" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Sweeping laser scanner grid line */}
        <motion.div 
          animate={{ y: [-70, 70] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444] z-10"
        />

        <div className="absolute bottom-2 left-3 text-[8px] font-extrabold tracking-widest text-red-500/80 uppercase">
          CAMERA ID: 01 // NEURAL MAPPING ACTIVE
        </div>
      </div>
    )
  },
  {
    id: 'ecowell',
    title: "Eco-Well System",
    tag: "SUSTAINABILITY & PATENTED TECH",
    description: "An advanced IoT patent prototype merging eco analytics and environmental sensors to dynamically track organic sustainability indexes.",
    tech: ["IoT Architecture", "FastAPI", "MongoDB", "Cloud Clusters", "AWS"],
    github: "https://github.com/shammichalas",
    demo: "https://github.com/shammichalas",
    glow: 'rgba(34, 197, 94, 0.2)', // Emerald green
    interactiveEl: (
      <div className="absolute inset-0 bg-[#03060c] flex items-center justify-between p-6 overflow-hidden">
        {/* Holographic eco leaf rotating floating inside diagram */}
        <div className="w-[45%] flex flex-col justify-center select-none relative z-10">
          <div className="flex items-center gap-2 mb-2 text-emerald-400 font-display text-[9px] font-bold tracking-widest">
            <Leaf className="animate-bounce" />
            <span>ECO METRIC ANALYZER</span>
          </div>
          <div className="text-xl font-display font-extrabold text-white mb-2">94.8<span className="text-xs text-emerald-500">%</span></div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              animate={{ width: ['70%', '95%', '70%'] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="h-full bg-emerald-500 rounded-full" 
            />
          </div>
          <span className="text-[8px] font-sans text-slate-500 font-bold uppercase mt-1.5">Sustainability Index Target</span>
        </div>

        {/* Floating eco-hologram leaf wireframe rendering */}
        <div className="w-[50%] flex items-center justify-center relative">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full border border-emerald-500/20 bg-emerald-500/[0.03] flex items-center justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          >
            {/* Animated SVG leaf blueprint drawing */}
            <svg className="w-14 h-14 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M2 22C2 22 8 20 12 16C16 12 20 8 22 2C22 2 16 4 12 8C8 12 6 16 2 22Z" />
              <path d="M12 16L12 22" />
              <path d="M9 13C9 13 12 12 14 10" />
              <path d="M6 17C6 17 8 16 10 14" />
            </svg>
            <div className="absolute inset-0 border border-dashed border-emerald-500/10 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 'lambdatest',
    title: "Lambda Test Pipelines",
    tag: "CLOUD AUTOMATION SYSTEMS",
    description: "CI/CD testing orchestrator built to coordinate multi-threaded repository hooks and automate high-speed serverless deployments.",
    tech: ["AWS Lambda", "GitHub Actions", "Docker", "Node.js"],
    github: "https://github.com/shammichalas",
    demo: "https://github.com/shammichalas",
    glow: 'rgba(139, 92, 246, 0.2)', // Violet
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex items-center justify-center p-4">
        {/* Horizontal deployment pipe logic */}
        <div className="flex items-center justify-between w-full max-w-[85%] relative z-10 select-none">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
              <GitBranch className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-[8px] font-sans font-bold text-slate-500 uppercase">Commit</span>
          </div>

          {/* Glowing connector tube path */}
          <div className="flex-grow mx-3 h-[2px] bg-slate-900 border border-white/5 relative">
            <motion.div 
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-400 blur-[3px]"
            />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
              <Cpu className="w-4 h-4 text-violet-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <span className="text-[8px] font-sans font-bold text-slate-500 uppercase">Deploy</span>
          </div>
        </div>
      </div>
    )
  }
];

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Responsive design width parameters
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic scrolling loop (stops on hover to permit sandbox trials)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const cardWidth = isMobile ? 310 : 480;
  const cardGap = isMobile ? 16 : 32;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handleCardClick = (idx) => {
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  };

  const activeProject = projects.at(activeIndex);

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-32 bg-[#04060d] flex flex-col justify-center overflow-hidden z-40 border-t border-white/5 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* 1. Transitional Neon Horizon & Aurora Divider between Sections */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none z-30">
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.45)]" />
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#02040a] via-orange-950/[0.04] to-transparent" />
      </div>

      {/* 2. Premium Parallax Cyber-Stellar Digital Wallpaper */}
      <div 
        style={{ 
          transform: `translateY(${(scrollY - 1500) * 0.12}px) scale(1.06)`,
          transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' 
        }}
        className="absolute inset-0 w-full h-[120%] pointer-events-none -z-20 overflow-hidden opacity-[0.26] select-none"
      >
        <img 
          src="stellar_blueprint_bg.png" 
          alt="Parallax Cyber-Stellar digital blueprint background" 
          className="w-full h-full object-cover"
        />
        {/* Soft dark-to-transparent overlays on all sides to blend seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04060d] via-transparent to-[#04060d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060d] via-transparent to-[#04060d]" />
      </div>

      {/* 3. Local Floating Cyber Sparks */}
      <div className="absolute inset-0 pointer-events-none -z-15 overflow-hidden opacity-[0.25]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8%" cy="75%" r="2" fill="#f97316" className="animate-pulse" style={{ animationDuration: '4.2s' }} />
          <circle cx="28%" cy="55%" r="1.5" fill="#38bdf8" className="animate-pulse" style={{ animationDuration: '5.8s' }} />
          <circle cx="48%" cy="85%" r="2.2" fill="#8b5cf6" className="animate-pulse" style={{ animationDuration: '4.8s' }} />
          <circle cx="68%" cy="35%" r="2.5" fill="#f43f5e" className="animate-pulse" style={{ animationDuration: '6.4s' }} />
          <circle cx="88%" cy="70%" r="1.5" fill="#10b981" className="animate-pulse" style={{ animationDuration: '3.4s' }} />
        </svg>
      </div>

      {/* Soft color spotlight background blending based on centered card */}
      <div 
        style={{ 
          backgroundColor: activeProject.glow.replace('0.2', '0.04'),
          transition: 'background-color 1s ease'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none -z-10" 
      />

      {/* Reactive cursor spotlight following the user's mouse */}
      <div 
        style={{ 
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          backgroundColor: activeProject.glow.replace('0.2', '0.035'),
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 1s ease'
        }}
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none -z-10" 
      />

      <div 
        className="scroll-section-reveal max-w-7xl mx-auto w-full relative z-10 px-6 md:px-12 flex flex-col"
      >
        
        {/* Header Section */}
        <div className="mb-16 max-w-2xl">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-orange-500 uppercase">
            SELECTED CREATIONS
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mt-3 mb-6 tracking-tight leading-tight">
            Cinematic Case Studies
          </h2>
          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Hover over the focused active system sandbox container to trial web sockets or computer vision mesh lines. Swipe or click side panels to center them.
          </p>
        </div>

        {/* Dynamic Coverflow Slider Layout Wrapper */}
        <div className="relative w-full flex items-center justify-center py-10 overflow-visible min-h-[460px] md:min-h-[580px]">
          
          {/* Slider track container translating smoothly inside frame */}
          <motion.div 
            animate={{ x: -(activeIndex * (cardWidth + cardGap) + cardWidth / 2) }}
            transition={{ type: "spring", stiffness: 100, damping: 22, mass: 1 }}
            className="flex items-center cursor-grab active:cursor-grabbing overflow-visible absolute"
            style={{ 
              left: '50%',
              gap: `${cardGap}px`,
              // This aligns the active card exactly in the center of the viewport
              width: `${projects.length * cardWidth + (projects.length - 1) * cardGap}px`
            }}
            drag="x"
            dragConstraints={{ 
              left: -(activeIndex * (cardWidth + cardGap) + cardWidth / 2), 
              right: -(activeIndex * (cardWidth + cardGap) + cardWidth / 2) 
            }}
            onDragEnd={(e, info) => {
              const threshold = 55; // Drag threshold in pixels
              if (info.offset.x < -threshold) {
                handleNext();
              } else if (info.offset.x > threshold) {
                handlePrev();
              }
            }}
          >
            {projects.map((proj, idx) => {
              const isActive = idx === activeIndex;
              const isFocused = idx === activeIndex;

              return (
                <motion.div
                  key={proj.id}
                  style={{
                    width: `${cardWidth}px`,
                    zIndex: isActive ? 20 : 10,
                    perspective: 1200
                  }}
                  animate={{
                    scale: isActive ? 1.08 : 0.85,
                    opacity: isActive ? 1.0 : 0.35,
                    y: isActive ? 0 : 12
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 24 }}
                  onClick={() => handleCardClick(idx)}
                  className={`glass-panel overflow-hidden rounded-3xl border transition-all duration-700 flex flex-col h-[410px] md:h-[500px] group bg-slate-950/65 ${
                    isActive 
                      ? 'border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.12)]' 
                      : 'border-white/5 hover:border-white/10 hover:opacity-50'
                  }`}
                >
                  
                  {/* Interactive miniature sandbox visual overlay */}
                  <div 
                    className={`w-full relative overflow-hidden border-b border-white/5 h-44 md:h-56 ${
                      isActive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    {proj.interactiveEl}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Glass panel meta details */}
                  <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-display text-[8px] tracking-widest font-extrabold text-orange-500 uppercase">
                          {proj.tag}
                        </span>
                      </div>

                      <h3 
                        className={`font-display text-lg md:text-xl font-extrabold mb-2 transition-colors duration-500 ${
                          isActive ? 'text-orange-400' : 'text-slate-200'
                        }`}
                      >
                        {proj.title}
                      </h3>

                      <p className="font-sans text-slate-400 text-[10px] md:text-xs leading-relaxed mb-4 font-medium line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1 md:gap-1.5">
                        {proj.tech.map((t) => (
                          <span 
                            key={t}
                            className="text-[8px] tracking-wider font-extrabold text-slate-400 px-2 py-1 rounded-lg bg-slate-900 border border-white/5 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Control source links */}
                      <div 
                        className={`flex items-center justify-between shrink-0 transition-opacity duration-300 ${
                          isActive ? 'opacity-100 pointer-events-auto' : 'opacity-20 pointer-events-none'
                        }`}
                      >
                        <a 
                          href={proj.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-slate-400 hover:text-orange-500 transition-colors duration-300 flex items-center gap-1 text-[10px] font-bold font-display tracking-widest uppercase cursor-pointer"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>SOURCE</span>
                        </a>
                        <a 
                          href={proj.demo} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="group/btn text-slate-200 hover:text-orange-500 transition-colors duration-300 flex items-center gap-1 text-[10px] font-bold font-display tracking-widest uppercase cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          <span>LIVE PREVIEW</span>
                        </a>
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </motion.div>

          {/* Frosted Glass Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none px-2 sm:px-8 z-30">
            <button
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/5 bg-slate-950/45 text-slate-400 hover:text-slate-100 hover:border-orange-500/20 backdrop-blur-md transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/5 bg-slate-950/45 text-slate-400 hover:text-slate-100 hover:border-orange-500/20 backdrop-blur-md transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8 z-20">
          {projects.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  boxShadow: isActive ? '0 0 10px rgba(249, 115, 22, 0.3)' : 'none'
                }}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? 'w-8 bg-gradient-to-r from-orange-500 to-rose-500' 
                    : 'w-2.5 bg-white/10 hover:bg-white/20'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
