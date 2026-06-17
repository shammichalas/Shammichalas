import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  ExternalLink, 
  Cpu, 
  Server, 
  Activity, 
  Smile, 
  Shield, 
  Heart,
  Eye
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    id: 'flint-engine',
    title: "Flint Engine (UI + API)",
    tag: "Chapter 01 // CORE AI & COMPRESSION ENGINE",
    description: "A live, hardened, and deployed AI thought-compression engine. Combines a TypeScript Next.js console with a high-performance Python FastAPI pipeline, optimized with cold-start mitigations, secure credentials, and efficient caching.",
    tech: ["Next.js", "FastAPI", "TypeScript", "Python", "Redis", "Cron Jobs"],
    github: "https://github.com/shammichalas/Flint-UI",
    demo: "https://github.com/shammichalas/Flint-UI",
    color: '#c084fc', // Purple
    glow: 'rgba(168, 85, 247, 0.4)',
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex flex-col justify-between p-4 font-sans select-none overflow-hidden h-full">
        {/* Mock Browser Console Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[8px] font-extrabold text-slate-500 tracking-wider">
          <span>CONSOLE // FLINT_ECOSYSTEM</span>
          <span className="text-purple-400 animate-pulse">● LIVE_STREAM</span>
        </div>
        
        {/* Core dynamic graph */}
        <div className="flex items-end justify-between h-20 lg:h-28 gap-1 px-2">
          {[40, 75, 55, 90, 60, 85, 45, 95, 70, 80, 50, 100].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
              transition={{ duration: 2.5 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t-sm"
            />
          ))}
        </div>

        {/* Console footer */}
        <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-2 border-t border-white/5">
          <span>FPS: 60.00</span>
          <span className="text-cyan-400 font-bold">OPTIMIZED (0.04ms)</span>
        </div>
      </div>
    )
  },
  {
    number: "02",
    id: 'autism-monitor',
    title: "Autism Emotion & Gesture Monitor",
    tag: "Chapter 02 // ASSISTIVE HEALTHCARE TECH",
    description: "A differentiated healthcare platform utilizing gesture and emotion recognition. Employs on-device computer vision and webcam APIs to create non-trivial interactive neural feedback loops for student therapy.",
    tech: ["React.js", "TensorFlow.js", "JavaScript", "Webcam API", "Tailwind CSS"],
    github: "https://github.com/shammichalas/Emotion-and-Gesture-Monitoring-System-for-Autism-Disorder",
    demo: "https://github.com/shammichalas/Emotion-and-Gesture-Monitoring-System-for-Autism-Disorder",
    color: '#38bdf8', // Sky Blue
    glow: 'rgba(56, 189, 248, 0.4)',
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex items-center justify-between p-4 overflow-hidden select-none h-full">
        {/* Left Stats Info */}
        <div className="w-[50%] flex flex-col justify-center">
          <div className="flex items-center gap-1.5 text-sky-400 text-[8px] font-bold tracking-widest uppercase mb-1">
            <Activity className="w-3 h-3 text-sky-400" />
            <span>LEARNING ENGINE</span>
          </div>
          <span className="text-white text-xs font-extrabold">EMOTION: HAPPY</span>
          <span className="text-[8px] font-mono text-sky-300 font-extrabold uppercase mt-1">CONFIDENCE: 98.4%</span>
        </div>

        {/* Right Camera tracking frame with facial emoji */}
        <div className="w-[45%] h-full flex items-center justify-center relative">
          <div className="w-16 h-16 rounded-lg border border-white/5 bg-slate-950 relative flex items-center justify-center">
            {/* Tracking brackets */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-sky-500" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-sky-500" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-sky-500" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-sky-500" />
            
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Smile className="w-7 h-7 text-sky-400" />
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    number: "03",
    id: 'face-attendance',
    title: "Neural Face Attendance System",
    tag: "Chapter 03 // APPLIED COMPUTER VISION",
    description: "A heavyweight computer vision system demonstrating applied machine learning across practical use cases. Automates check-in triggers by scanning landmarks and face coordinates via Python and OpenCV.",
    tech: ["Python", "OpenCV", "FastAPI", "MongoDB", "Docker"],
    github: "https://github.com/shammichalas/Face_attendance-using-ML",
    demo: "https://github.com/shammichalas/Face_attendance-using-ML",
    color: '#f87171', // Red
    glow: 'rgba(239, 68, 68, 0.4)',
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex items-center justify-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" stroke="currentColor" strokeWidth="0.5">
          <pattern id="grid-project-story" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-project-story)" />
        </svg>

        <svg className="w-20 h-20 text-rose-500/30" viewBox="0 0 100 100" fill="none">
          <path d="M50 15 C30 15 20 30 20 50 C20 70 30 85 50 85 C70 85 80 70 80 50 C80 30 70 15 50 15 Z" stroke="currentColor" strokeWidth="1" />
          <circle cx="38" cy="45" r="3" fill="#f43f5e" className="animate-pulse" />
          <circle cx="62" cy="45" r="3" fill="#f43f5e" className="animate-pulse" />
          <path d="M50 40 L50 60 L45 62" stroke="currentColor" strokeWidth="1" />
          <path d="M35 70 Q50 78 65 70" stroke="currentColor" strokeWidth="1" />
        </svg>

        <motion.div 
          animate={{ y: [-50, 50] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444] z-10"
        />

        <div className="absolute bottom-2 left-3 text-[7px] font-extrabold tracking-widest text-red-500/80 uppercase">
          CAMERA: ACTIVE // FACE SCAN
        </div>
      </div>
    )
  },
  {
    number: "04",
    id: 'chatnest',
    title: "ChatNest AI",
    tag: "Chapter 04 // AI CONVERSATIONAL PLATFORM",
    description: "An AI-powered real-time messaging application running WebSocket connections and context caches. Integrated with language models to deliver low-latency conversational interfaces.",
    tech: ["React.js", "FastAPI", "WebSockets", "OpenAI", "Redis"],
    github: "https://github.com/shammichalas/chatnest",
    demo: "https://github.com/shammichalas/chatnest",
    color: '#34d399', // Emerald
    glow: 'rgba(16, 185, 129, 0.4)',
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex flex-col justify-end p-4 font-sans select-none h-full">
        <div className="space-y-2 mb-2 w-full max-w-[85%]">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: [10, 0, -20] }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
            className="p-2.5 rounded-2xl rounded-bl-none bg-slate-900 border border-white/5 text-[9px] text-emerald-400 font-medium"
          >
            AI: Processing message socket stream...
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.8, 0.8, 0], y: [10, 0, -25] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2.5, ease: "easeOut" }}
            className="p-2.5 rounded-2xl rounded-br-none bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-300 font-medium self-end"
          >
            Client: Sync OK. Loading cached vectors.
          </motion.div>
        </div>
        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[8px] font-extrabold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Server className="w-2.5 h-2.5 text-emerald-400" />
            <span>SOCKET LINK: ACTIVE</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>
    )
  },
  {
    number: "05",
    id: 'erp-system',
    title: "Enterprise ERP Console",
    tag: "Chapter 05 // BUSINESS LOGIC & SYSTEMS",
    description: "A full-scale corporate enterprise resource planning system managing inventory, payroll, and workflows. Proves mastery of complex database schemas, role-based auth, and multi-entity CRUD systems.",
    tech: ["JavaScript", "Node.js", "Express", "MongoDB", "React.js"],
    github: "https://github.com/shammichalas/ERP-SYSTEM-FOR-COMPANY",
    demo: "https://github.com/shammichalas/ERP-SYSTEM-FOR-COMPANY",
    color: '#fbbf24', // Amber
    glow: 'rgba(245, 158, 11, 0.4)',
    interactiveEl: (
      <div className="absolute inset-0 bg-[#03050a] flex flex-col justify-between p-4 select-none h-full">
        {/* Header */}
        <div className="flex justify-between items-center text-[8px] font-bold text-slate-500 border-b border-white/5 pb-2 uppercase tracking-widest">
          <span>DEPARTMENTS // DATA_STREAM</span>
          <span className="text-amber-500">SYSTEM RUNNING</span>
        </div>

        {/* Main Grid Metrics */}
        <div className="grid grid-cols-2 gap-2 text-white font-display">
          <div className="bg-slate-900/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[7px] text-slate-500 block">TOTAL OPERATIONS</span>
            <span className="text-xs font-extrabold text-amber-400">142,500 Nodes</span>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[7px] text-slate-500 block">PIPELINE THRU</span>
            <span className="text-xs font-extrabold text-blue-400">98.6 GB/s</span>
          </div>
        </div>

        {/* Small Progress Line */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[7px] text-slate-500 uppercase tracking-widest font-bold">
            <span>Synchronization</span>
            <span>98.6%</span>
          </div>
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              animate={{ width: ['80%', '98.6%', '80%'] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-full bg-amber-500"
            />
          </div>
        </div>
      </div>
    )
  }
];

export default function StoryProjects() {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const numberRefs = useRef([]);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);
  const visualRefs = useRef([]);
  const buttonsRefs = useRef([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const slides = slideRefs.current;

    // Set initial position of all slides except the first
    gsap.set(slides.slice(1), { xPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${window.innerHeight * (slides.length - 0.2)}`,
        invalidateOnRefresh: true,
      }
    });

    // Slide 0 entrance animation as soon as projects pinning starts
    tl.fromTo(numberRefs.current[0], { opacity: 0, scale: 0.8 }, { opacity: 0.08, scale: 1, duration: 0.4 }, 0);
    tl.fromTo(titleRefs.current[0], { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);
    tl.fromTo(descRefs.current[0], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2);
    tl.fromTo(visualRefs.current[0], { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 0.1);
    tl.fromTo(buttonsRefs.current[0], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.3);

    // Choreograph each horizontal slide transition and sub-element reveal
    slides.forEach((slide, index) => {
      if (index === slides.length - 1) return;

      const nextIndex = index + 1;
      const label = `slide-transition-${index}`;

      // 1. Current slide slides left, next slide slides in from right
      tl.to(slide, {
        xPercent: -100,
        ease: "power2.inOut",
        duration: 1.2
      }, label);

      tl.fromTo(slides[nextIndex], 
        { xPercent: 100 },
        { xPercent: 0, ease: "power2.inOut", duration: 1.2 },
        label
      );

      // 2. Animate global overlay spotlight color to match the next slide
      tl.to(overlayRef.current, {
        backgroundColor: projects[nextIndex].glow.replace('0.4', '0.07'),
        duration: 1.2,
        ease: "power2.inOut"
      }, label);

      // 3. Staggered reveals for next slide inner items
      tl.fromTo(numberRefs.current[nextIndex],
        { opacity: 0, scale: 0.8 },
        { opacity: 0.08, scale: 1, duration: 0.5, ease: "power2.out" },
        `${label}+=0.5`
      );

      tl.fromTo(visualRefs.current[nextIndex],
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
        `${label}+=0.5`
      );

      tl.fromTo(titleRefs.current[nextIndex],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        `${label}+=0.7`
      );

      tl.fromTo(descRefs.current[nextIndex],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        `${label}+=0.8`
      );

      tl.fromTo(buttonsRefs.current[nextIndex],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        `${label}+=0.9`
      );
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#02040a] z-40 border-t border-white/5 select-none"
    >
      {/* Volumetric ambient spotlight reflecting active slide color */}
      <div 
        ref={overlayRef}
        style={{ backgroundColor: 'rgba(168, 85, 247, 0.07)' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-10 transition-all duration-1000" 
      />

      {/* Grid Pattern Background Layer */}
      <div 
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header static guide to show Section title at the very top center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <span className="font-display text-[9px] md:text-xs font-bold tracking-[0.25em] text-orange-500/80 border border-orange-500/20 px-3.5 py-1 rounded-full uppercase tracking-widest">
          PROJECTS STORY
        </span>
      </div>

      {/* Slides Container */}
      <div className="w-full h-full relative overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => slideRefs.current[index] = el}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#02040a]/90"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 max-w-7xl w-full px-6 md:px-12 items-center">
              
              {/* Left Column (Big Number & Interactive Sandbox) */}
              <div className="lg:col-span-5 relative w-full h-[240px] sm:h-[300px] lg:h-[460px] flex items-center justify-center overflow-visible">
                {/* Huge Faded Background Number */}
                <div 
                  ref={el => numberRefs.current[index] = el}
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none font-display font-black text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[26rem] leading-none opacity-5 tracking-tighter"
                  style={{ 
                    color: project.color,
                    textShadow: `0 0 40px ${project.glow.replace('0.4', '0.1')}`
                  }}
                >
                  {project.number}
                </div>

                {/* Floating Interactive Glass Console */}
                <div 
                  ref={el => visualRefs.current[index] = el}
                  className="relative z-10 w-full max-w-[380px] h-[200px] sm:h-[260px] lg:h-[340px] rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md overflow-hidden flex flex-col group transition-all duration-700 shadow-2xl"
                  style={{
                    boxShadow: `0 0 30px ${project.glow.replace('0.4', '0.04')}`,
                    borderColor: project.glow.replace('0.4', '0.15'),
                  }}
                >
                  {/* Mock Browser Header */}
                  <div className="flex justify-between items-center border-b border-white/5 px-4 py-2 text-[8px] font-extrabold text-slate-500 tracking-wider bg-slate-950/80">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    </div>
                    <span>CONSOLE // PORTFOLIO_WORKSPACE</span>
                    <span className="animate-pulse" style={{ color: project.color }}>● CONNECTED</span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-grow relative overflow-hidden">
                    {project.interactiveEl}
                  </div>
                </div>
              </div>

              {/* Right Column (Chapter details) */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4 lg:space-y-6 text-left">
                <div className="space-y-1">
                  <span 
                    className="font-mono text-[9px] md:text-xs tracking-[0.2em] font-extrabold uppercase"
                    style={{ color: project.color }}
                  >
                    {project.tag}
                  </span>
                  <h3 
                    ref={el => titleRefs.current[index] = el}
                    className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
                  >
                    {project.title}
                  </h3>
                </div>

                <p 
                  ref={el => descRefs.current[index] = el}
                  className="font-sans text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl"
                >
                  {project.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span 
                      key={t}
                      className="text-[8px] md:text-[9px] tracking-wider font-extrabold px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 uppercase text-slate-300 hover:border-white/10 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action triggers */}
                <div 
                  ref={el => buttonsRefs.current[index] = el}
                  className="flex items-center gap-4 pt-2"
                >
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-1.5 text-[9px] md:text-xs font-bold font-display tracking-widest uppercase cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>CODE</span>
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-white bg-white/[0.04] border border-white/10 hover:border-white/30 px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 text-[9px] md:text-xs font-bold font-display tracking-widest uppercase cursor-pointer shadow-lg hover:bg-white/[0.08]"
                    style={{
                      borderColor: project.glow.replace('0.4', '0.2'),
                      boxShadow: `0 0 20px ${project.glow.replace('0.4', '0.05')}`,
                    }}
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Global Bottom scroll helper indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none flex flex-col items-center gap-1">
        <div className="w-4 h-7 rounded-full border border-white/20 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-orange-500"
          />
        </div>
        <span className="text-[8px] font-bold font-sans tracking-[0.2em] uppercase text-slate-500">
          Scroll to read chapters
        </span>
      </div>
    </section>
  );
}
