import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  MessageSquare, 
  Leaf, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Cpu,
  Server,
  Shield,
  Shirt,
  Sparkles,
  Activity,
  Heart,
  Smile
} from 'lucide-react';

// Helper to compute wrapping index difference continuously
const wrapDiff = (diff, length) => {
  let w = diff;
  const half = length / 2;
  while (w > half) w -= length;
  while (w < -half) w += length;
  return w;
};

// Signature creations (portfolio-worthy)
const projects = [
  {
    id: 'flint-ui',
    title: "Flint UI",
    tag: "FRONTEND CORE ENGINE",
    description: "TypeScript-based Next.js frontend console for the Thought Compression Engine, optimized for real-time visualization and low-latency interaction.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
    github: "https://github.com/shammichalas/Flint-UI",
    demo: "https://github.com/shammichalas/Flint-UI",
    glow: 'rgba(168, 85, 247, 0.4)', // Purple
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex flex-col justify-between p-4 font-sans select-none overflow-hidden">
        {/* Mock Browser Console Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[8px] font-extrabold text-slate-500 tracking-wider">
          <span>CONSOLE // ENGINE_VISUALIZER</span>
          <span className="text-purple-400 animate-pulse">● LIVE_STREAM</span>
        </div>
        
        {/* Core dynamic graph */}
        <div className="flex items-end justify-between h-20 gap-1 px-2">
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
    id: 'flint-api',
    title: "Flint API",
    tag: "BACKEND PIPELINE ENGINE",
    description: "Python-based FastAPI backend engine driving high-performance Thought Compression algorithms, content parsing, and token optimization pipelines.",
    tech: ["FastAPI", "Python", "Pydantic", "Redis", "Uvicorn"],
    github: "https://github.com/shammichalas/Flint-API",
    demo: "https://github.com/shammichalas/Flint-API",
    glow: 'rgba(16, 185, 129, 0.4)', // Emerald
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex flex-col p-4 font-sans select-none overflow-hidden">
        {/* Server log window header */}
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 text-[8px] font-extrabold text-slate-500 uppercase tracking-widest">
          <Server className="w-3 h-3 text-emerald-400" />
          <span>FASTAPI // COMPRESSION_LOGS</span>
        </div>

        {/* Scrolling logs console */}
        <div className="flex-grow flex flex-col justify-end space-y-1.5 font-mono text-[8px] text-emerald-400/80 mt-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-slate-500">[11:03:01]</span>
            <span className="text-cyan-400">GET</span>
            <span>/v1/health_check</span>
            <span className="text-emerald-500">200 OK</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-slate-500">[11:03:02]</span>
            <span className="text-violet-400">POST</span>
            <span>/v1/compress</span>
            <span className="text-emerald-500">200 OK</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.4 }}
            className="flex items-center gap-2"
          >
            <span className="text-slate-500">[11:03:04]</span>
            <span className="text-yellow-400">POST</span>
            <span>/v1/tokenize</span>
            <span className="text-emerald-500">201 Created</span>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 'chatnest',
    title: "ChatNest",
    tag: "AI CONVERSATIONAL CORE",
    description: "An AI-powered messaging platform running WebSocket connections and context cache pipelines to deliver asynchronous language model interfaces.",
    tech: ["React.js", "FastAPI", "WebSockets", "OpenAI", "Redis"],
    github: "https://github.com/shammichalas/chatnest",
    demo: "https://github.com/shammichalas/chatnest",
    glow: 'rgba(56, 189, 248, 0.4)', // Sky blue
    icon: <MessageSquare className="w-5 h-5 text-sky-400" />,
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex flex-col justify-end p-4 font-sans select-none">
        <div className="space-y-2 mb-2 w-full max-w-[85%]">
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
    github: "https://github.com/shammichalas/Face_attendance-using-ML",
    demo: "https://github.com/shammichalas/Face_attendance-using-ML",
    glow: 'rgba(239, 68, 68, 0.4)', // Red
    icon: <Eye className="w-5 h-5 text-rose-500" />,
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex items-center justify-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" stroke="currentColor" strokeWidth="0.5">
          <pattern id="grid-project-arc" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-project-arc)" />
        </svg>

        <svg className="w-24 h-24 text-rose-500/30" viewBox="0 0 100 100" fill="none">
          <path d="M50 15 C30 15 20 30 20 50 C20 70 30 85 50 85 C70 85 80 70 80 50 C80 30 70 15 50 15 Z" stroke="currentColor" strokeWidth="1" />
          <circle cx="38" cy="45" r="3" fill="#f43f5e" className="animate-pulse" />
          <circle cx="62" cy="45" r="3" fill="#f43f5e" className="animate-pulse" />
          <path d="M50 40 L50 60 L45 62" stroke="currentColor" strokeWidth="1" />
          <path d="M35 70 Q50 78 65 70" stroke="currentColor" strokeWidth="1" />
        </svg>

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
    id: 'erp-system',
    title: "ERP System",
    tag: "ENTERPRISE UTILITY CONSOLE",
    description: "Full-scale corporate enterprise resource planning system managing inventory, payroll, and department workflows with secure role-based access.",
    tech: ["JavaScript", "Node.js", "Express", "MongoDB", "React.js"],
    github: "https://github.com/shammichalas/ERP-SYSTEM-FOR-COMPANY",
    demo: "https://github.com/shammichalas/ERP-SYSTEM-FOR-COMPANY",
    glow: 'rgba(245, 158, 11, 0.4)', // Amber
    icon: <Shield className="w-5 h-5 text-amber-400" />,
    interactiveEl: (
      <div className="absolute inset-0 bg-[#03050a] flex flex-col justify-between p-4 select-none">
        {/* Header */}
        <div className="flex justify-between items-center text-[8px] font-bold text-slate-500 border-b border-white/5 pb-2 uppercase tracking-widest">
          <span>DEPARTMENTS // WORKFLOW_DASHBOARD</span>
          <span className="text-emerald-500">SYSTEM READY</span>
        </div>

        {/* Main Grid Metrics */}
        <div className="grid grid-cols-2 gap-2 text-white font-display">
          <div className="bg-slate-900/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[7px] text-slate-500 block">TOTAL REVENUE</span>
            <span className="text-sm font-extrabold text-amber-400">$142,500</span>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-2 rounded-xl">
            <span className="text-[7px] text-slate-500 block">ACTIVE CONTRACTS</span>
            <span className="text-sm font-extrabold text-blue-400">24 Nodes</span>
          </div>
        </div>

        {/* Small Progress Line */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[7px] text-slate-500 uppercase tracking-widest font-bold">
            <span>Database Synchronization</span>
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
  },
  {
    id: 'style-lab',
    title: "Virtual Style Lab",
    tag: "INTERACTIVE E-COMMERCE",
    description: "TypeScript-powered virtual try-on dressing room experience letting users overlay, scale, and preview clothing items dynamically.",
    tech: ["TypeScript", "React.js", "Tailwind CSS", "Framer Motion", "Canvas"],
    github: "https://github.com/shammichalas/virtual-style-lab",
    demo: "https://github.com/shammichalas/virtual-style-lab",
    glow: 'rgba(236, 72, 153, 0.4)', // Pink
    icon: <Shirt className="w-5 h-5 text-pink-400" />,
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex items-center justify-between p-5 overflow-hidden select-none">
        {/* Fitting outline of t-shirt */}
        <div className="w-[45%] flex flex-col justify-center">
          <div className="flex items-center gap-1.5 text-pink-400 text-[8px] font-bold tracking-widest uppercase mb-1">
            <Sparkles className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '3s' }} />
            <span>TRY-ON SCANNER</span>
          </div>
          <span className="text-white font-extrabold text-xs">MODEL // SCALE</span>
          <span className="text-[7px] font-mono text-slate-500 mt-1 uppercase">GRID AUTO-CALIBRATE</span>
        </div>

        {/* Animated Model Mesh Frame */}
        <div className="relative w-[50%] h-full flex items-center justify-center">
          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95],
              rotate: [0, 4, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full border border-pink-500/20 bg-pink-500/[0.02] flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.05)]"
          >
            <Shirt className="w-10 h-10 text-pink-400/80" />
            
            {/* Holographic dotted bounding box */}
            <div className="absolute inset-0 border border-dashed border-pink-500/20 animate-spin" style={{ animationDuration: '15s' }} />
          </motion.div>
        </div>
      </div>
    )
  },
  {
    id: 'autism-monitor',
    title: "Autism Emotion Monitor",
    tag: "AI HEALTH MONITORING",
    description: "An assistive AI health monitoring interface tracking facial expressions and gestures in real-time to assist autism therapy and patient support.",
    tech: ["JavaScript", "TensorFlow.js", "React.js", "Webcam API", "Tailwind CSS"],
    github: "https://github.com/shammichalas/Emotion-and-Gesture-Monitoring-System-for-Autism-Disorder",
    demo: "https://github.com/shammichalas/Emotion-and-Gesture-Monitoring-System-for-Autism-Disorder",
    glow: 'rgba(99, 102, 241, 0.4)', // Indigo
    icon: <Heart className="w-5 h-5 text-indigo-400" />,
    interactiveEl: (
      <div className="absolute inset-0 bg-[#04060d] flex items-center justify-between p-4 overflow-hidden select-none">
        {/* Left Stats Info */}
        <div className="w-[50%] flex flex-col justify-center">
          <div className="flex items-center gap-1.5 text-indigo-400 text-[8px] font-bold tracking-widest uppercase mb-1">
            <Activity className="w-3 h-3 text-indigo-400" />
            <span>THERAPY ENGINE</span>
          </div>
          <span className="text-white text-xs font-extrabold">EMOTION: HAPPY</span>
          <span className="text-[8px] font-mono text-indigo-300 font-extrabold uppercase mt-1">CONFIDENCE: 98.4%</span>
        </div>

        {/* Right Camera tracking frame with facial emoji */}
        <div className="w-[45%] h-full flex items-center justify-center relative">
          <div className="w-16 h-16 rounded-lg border border-white/5 bg-slate-950 relative flex items-center justify-center">
            {/* Tracking brackets */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-indigo-500" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-indigo-500" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-indigo-500" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-indigo-500" />
            
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Smile className="w-7 h-7 text-indigo-400" />
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
];

// Carousel Card Subcomponent - extracts hook execution from map loop
function CarouselCard({ proj, idx, activeIndex, indexSpring, N, isMobile, setVirtualIndex }) {
  const isActive = idx === activeIndex;


  // Compute continuous diff in range [-N/2, N/2]
  const diff = useTransform(indexSpring, (val) => {
    const rawDiff = idx - val;
    return wrapDiff(rawDiff, N);
  });

  // Map diff to X position
  const x = useTransform(diff, (d) => {
    const xSpacing1 = isMobile ? 220 : 340;
    const xSpacing2 = isMobile ? 400 : 640;
    if (d >= 0) {
      if (d <= 1) return d * xSpacing1;
      return xSpacing1 + (d - 1) * (xSpacing2 - xSpacing1);
    } else {
      if (d >= -1) return d * xSpacing1;
      return -xSpacing1 + (d + 1) * (xSpacing2 - xSpacing1);
    }
  });

  // Map diff to Y parabolic arc coordinate
  const y = useTransform(diff, (d) => {
    const absDiff = Math.abs(d);
    if (absDiff <= 1) return absDiff * 28;
    return 28 + (absDiff - 1) * 52;
  });

  // Map diff to scaling
  const scale = useTransform(diff, (d) => {
    const absDiff = Math.abs(d);
    if (absDiff <= 1) return 1 - absDiff * 0.1;
    return 0.9 - (absDiff - 1) * 0.15;
  });

  // Map diff to rotation angle (center = 0, near = ±10, far = ±20)
  const rotate = useTransform(diff, (d) => d * 10);

  // 3D perspective rotation around Y-axis
  const rotateY = useTransform(diff, (d) => d * -12);

  // Fade out completely near the wrap-around boundary (absDiff >= 1.6) to hide jumps
  const opacity = useTransform(diff, (d) => {
    const absDiff = Math.abs(d);
    if (absDiff <= 0.8) {
      return 1 - absDiff * 0.125;
    } else if (absDiff <= 1.2) {
      return 0.9 - (absDiff - 0.8) * 0.5;
    } else if (absDiff <= 1.6) {
      return 0.7 - (absDiff - 1.2) * 1.5;
    } else {
      return 0;
    }
  });

  // Dynamically sort Z-Index to avoid overlap layering issues
  const zIndex = useTransform(diff, (d) => {
    return Math.round(100 - Math.abs(d) * 30);
  });

  // Determine whether to allow sub-element mouse events
  const pointerEvents = isActive ? 'auto' : 'none';

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        rotateY,
        opacity,
        zIndex,
        pointerEvents,
        width: isMobile ? '290px' : '400px',
      }}
      className="absolute origin-center overflow-visible"
    >
      {/* Floating container & visual glow frame */}
      <motion.div
        animate={isActive ? { y: [0, -6, 0] } : { y: 0 }}
        transition={isActive ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
        onClick={() => {
          if (!isActive) {
            const targetDiff = wrapDiff(idx - activeIndex, N);
            setVirtualIndex((prev) => prev + targetDiff);
          }
        }}
        style={{
          borderColor: isActive ? proj.glow : 'rgba(255, 255, 255, 0.05)',
          boxShadow: isActive ? `0 0 30px ${proj.glow.replace('0.4', '0.15')}` : 'none',
        }}
        className={`relative w-full h-[430px] md:h-[510px] rounded-t-[140px] rounded-b-[24px] overflow-hidden border backdrop-blur-md transition-all duration-700 flex flex-col group bg-slate-950/70 cursor-pointer`}
      >
        {/* Mock Browser Title Bar */}
        <div className="absolute top-4 left-6 flex gap-1.5 z-20 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>

        {/* Featured / Active State Pill Badge at Center Top */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, y: -10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -10, x: '-50%' }}
              className="absolute top-4 left-1/2 bg-[#04060d]/90 border border-purple-500/40 text-purple-300 font-display text-[9px] font-extrabold uppercase px-3 py-1 rounded-full z-30 shadow-[0_0_15px_rgba(168,85,247,0.3)] tracking-wider"
            >
              ★ Featured
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circle Icon Badge for Inactive Card (Top Left) */}
        <AnimatePresence>
          {!isActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ borderColor: proj.glow }}
              className="absolute top-10 left-6 w-11 h-11 rounded-full border bg-slate-950/90 flex items-center justify-center z-30 shadow-lg"
            >
              {proj.icon}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screenshot Preview / Active Sandbox Panel */}
        <div className="w-full relative overflow-hidden border-b border-white/5 h-44 md:h-56">
          {proj.interactiveEl}
          {/* Gradient overlay blending bottom of the sandbox */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Glass Card Details Section */}
        <div className="p-5 md:p-6 flex-grow flex flex-col justify-between z-10 relative">
          <div>
            <span className="font-mono text-[9px] tracking-[0.2em] text-purple-400 font-extrabold uppercase mb-1 block">
              {proj.tag}
            </span>

            <h3 className={`font-display text-lg md:text-xl font-bold mb-2 transition-colors duration-500 ${
              isActive ? 'text-white' : 'text-slate-300'
            }`}>
              {proj.title}
            </h3>

            <p className="font-sans text-slate-400 text-[10px] md:text-xs leading-relaxed line-clamp-3 mb-4">
              {proj.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {proj.tech.map((t) => (
                <span 
                  key={t}
                  className="text-[8px] tracking-wider font-extrabold text-purple-300/80 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/15 uppercase"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Interactive Project Links */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3 h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div 
                    key="active-actions"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex items-center justify-between w-full"
                  >
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-slate-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1.5 text-[9px] font-bold font-display tracking-widest uppercase cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </a>
                    <a 
                      href={proj.demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-slate-200 hover:text-purple-400 bg-purple-600/20 border border-purple-500/35 px-4 py-1.5 rounded-full transition-colors duration-300 flex items-center gap-1 text-[9px] font-bold font-display tracking-widest uppercase cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="inactive-actions"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex items-center justify-end w-full"
                  >
                    <div 
                      style={{ borderColor: proj.glow }}
                      className="w-8 h-8 rounded-full border bg-slate-950 flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-300 shadow-lg"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectArcCarousel() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const wheelTimeoutRef = useRef(null);

  // Framer Motion continuous index tracking
  const indexMV = useMotionValue(0);
  const indexSpring = useSpring(indexMV, { stiffness: 140, damping: 24, mass: 0.8 });

  // Sync virtual index updates to the MotionValue target
  useEffect(() => {
    indexMV.set(virtualIndex);
  }, [virtualIndex, indexMV]);

  // Handle scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor screen width for responsive layout spacings
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const N = projects.length;
  const activeIndex = ((virtualIndex % N) + N) % N;
  const activeProject = projects[activeIndex];

  const handleNext = () => {
    setVirtualIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setVirtualIndex((prev) => prev - 1);
  };

  const handleDotClick = (targetIdx) => {
    const diff = wrapDiff(targetIdx - activeIndex, N);
    setVirtualIndex((prev) => prev + diff);
  };

  // Throttled mouse wheel handler
  const handleWheel = (e) => {
    if (wheelTimeoutRef.current) return;

    if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      // Cool down to prevent rapid spin
      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 550);
    }
  };

  // Clean up wheel timeout on unmount
  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  // Curved indicator calculations (quadratic bezier path)
  // t is mapped between 0 and 1 using indexSpring modulo
  const indicatorT = useTransform(indexSpring, (val) => {
    const p = ((val % N) + N) % N;
    return p / (N - 1 || 1);
  });

  const dotX = useTransform(indicatorT, (t) => {
    const p0_x = 50;
    const p1_x = 300;
    const p2_x = 550;
    return (1 - t) * (1 - t) * p0_x + 2 * (1 - t) * t * p1_x + t * t * p2_x;
  });

  const dotY = useTransform(indicatorT, (t) => {
    const p0_y = 10;
    const p1_y = 35;
    const p2_y = 10;
    return (1 - t) * (1 - t) * p0_y + 2 * (1 - t) * t * p1_y + t * t * p2_y;
  });



  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative min-h-screen py-32 bg-[#04060d] flex flex-col justify-center overflow-hidden z-40 border-t border-white/5 select-none"
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      {/* 1. Transitional Neon Horizon & Aurora Divider between Sections */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none z-30">
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.45)]" />
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#02040a] via-purple-950/[0.04] to-transparent" />
      </div>

      {/* 2. Immersive Spatial Ambient Background Layer */}
      <div 
        style={{ 
          transform: `translateY(${(scrollY - 1500) * 0.08}px)`,
          transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' 
        }}
        className="absolute inset-0 w-full h-[110%] pointer-events-none -z-20 overflow-hidden select-none"
      >
        {/* Subtle dot matrix grid */}
        <div 
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient floating volumetric lights */}
        {!isMobile && (
          <>
            <motion.div 
              animate={{ 
                x: [-50, 50, -50],
                y: [-30, 30, -30]
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-900/6 blur-[120px]"
            />
            <motion.div 
              animate={{ 
                x: [60, -60, 60],
                y: [40, -40, 40]
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-[20%] right-[15%] w-[550px] h-[550px] rounded-full bg-purple-900/8 blur-[110px]"
            />
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[#04060d] via-transparent to-[#04060d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060d] via-transparent to-[#04060d]" />
      </div>

      {/* 3. Local Floating Cyber Sparks */}
      <div className="absolute inset-0 pointer-events-none -z-15 overflow-hidden opacity-[0.25]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8%" cy="75%" r="2" fill="#8b5cf6" className="animate-pulse" style={{ animationDuration: '4.2s' }} />
          <circle cx="28%" cy="55%" r="1.5" fill="#38bdf8" className="animate-pulse" style={{ animationDuration: '5.8s' }} />
          <circle cx="48%" cy="85%" r="2.2" fill="#8b5cf6" className="animate-pulse" style={{ animationDuration: '4.8s' }} />
          <circle cx="68%" cy="35%" r="2.5" fill="#ec4899" className="animate-pulse" style={{ animationDuration: '6.4s' }} />
          <circle cx="88%" cy="70%" r="1.5" fill="#10b981" className="animate-pulse" style={{ animationDuration: '3.4s' }} />
        </svg>
      </div>

      {/* Soft color spotlight background blending based on centered card */}
      <div 
        style={{ 
          backgroundColor: activeProject.glow.replace('0.4', '0.08'),
          transition: 'background-color 1s ease'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none -z-10" 
      />

      {/* Reactive cursor spotlight following the user's mouse with matching purple glow */}
      <div 
        style={{ 
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          backgroundColor: 'rgba(139, 92, 246, 0.04)',
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none -z-10" 
      />

      <div className="scroll-section-reveal max-w-7xl mx-auto w-full relative z-10 px-6 md:px-12 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="mb-12 text-center max-w-2xl">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-purple-400 border border-purple-500/30 px-3.5 py-1 rounded-full uppercase tracking-widest font-extrabold mb-4 inline-block">
            MY WORK
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mt-3 mb-4 tracking-tight leading-tight text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Projects</span>
          </h2>
          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            A selection of things I've built with passion and curiosity.
          </p>
        </div>

        {/* Dynamic Arc Carousel Wrapper */}
        <div 
          className="relative w-full flex items-center justify-center py-10 overflow-visible min-h-[500px] md:min-h-[640px]"
          style={{ perspective: 1200 }}
        >
          {/* Transparent gesture receiver that handles global dragging across the layout */}
          <motion.div
            className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDrag={(event, info) => {
              // Map drag distance in pixels to carousel index rotation
              const deltaIndex = -info.delta.x / (isMobile ? 320 : 560);
              indexMV.set(indexMV.get() + deltaIndex);
            }}
            onDragEnd={(event, info) => {
              // Snap logic with velocity-based flick gesture support
              const currentVal = indexMV.get();
              const velocityBias = Math.abs(info.velocity.x) > 300 
                ? -Math.sign(info.velocity.x) * 0.6
                : 0;
              const target = Math.round(currentVal + velocityBias);
              
              setVirtualIndex(target);
              indexMV.set(target);
            }}
          />

          {/* Rendering the Carousel Cards */}
          <div className="relative w-full h-[460px] md:h-[540px] flex items-center justify-center overflow-visible">
            {projects.map((proj, idx) => (
              <CarouselCard
                key={proj.id}
                proj={proj}
                idx={idx}
                activeIndex={activeIndex}
                indexSpring={indexSpring}
                N={N}
                isMobile={isMobile}
                setVirtualIndex={setVirtualIndex}
              />
            ))}
          </div>

          {/* Frosted Glass Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none px-2 sm:px-8 z-30">
            <button
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/5 bg-slate-950/65 text-slate-400 hover:text-slate-100 hover:border-purple-500/30 backdrop-blur-md transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/5 bg-slate-950/65 text-slate-400 hover:text-slate-100 hover:border-purple-500/30 backdrop-blur-md transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Curved Progress Bar & Indicators */}
        <div className="mt-4 flex flex-col items-center justify-center z-20 w-full">
          <svg 
            width="100%" 
            height="40" 
            viewBox="0 0 600 40" 
            fill="none" 
            className="mx-auto max-w-[450px] overflow-visible"
          >
            {/* The Curved Arc Path */}
            <path
              d="M 50 10 Q 300 35 550 10"
              stroke="rgba(168, 85, 247, 0.12)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Static dot markers for each project along the path */}
            {projects.map((_, idx) => {
              const t = idx / (N - 1 || 1);
              const p0_x = 50;
              const p1_x = 300;
              const p2_x = 550;
              const x = (1 - t) * (1 - t) * p0_x + 2 * (1 - t) * t * p1_x + t * t * p2_x;

              const p0_y = 10;
              const p1_y = 35;
              const p2_y = 10;
              const y = (1 - t) * (1 - t) * p0_y + 2 * (1 - t) * t * p1_y + t * t * p2_y;

              const isActive = idx === activeIndex;

              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r={isActive ? "4" : "3"}
                  fill={isActive ? "#c084fc" : "rgba(255, 255, 255, 0.2)"}
                  className="transition-all duration-300 cursor-pointer pointer-events-auto"
                  onClick={() => handleDotClick(idx)}
                />
              );
            })}

            {/* Glowing Active Dot sliding smoothly on the bezier curve */}
            <motion.circle
              cx={dotX}
              cy={dotY}
              r="6.5"
              fill="#a855f7"
              className="pointer-events-none drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
            />
          </svg>

          {/* Mouse scroll/drag indicator at the bottom */}
          <div className="flex flex-col items-center gap-2 mt-4 text-slate-500 hover:text-purple-400 transition-colors duration-300">
            <div className="w-5 h-8 rounded-full border border-current flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-current"
              />
            </div>
            <span className="text-[10px] font-bold font-sans tracking-[0.25em] uppercase text-slate-400">
              Scroll or drag to explore
            </span>
          </div>
        </div>

      </div>



    </section>
  );
}
