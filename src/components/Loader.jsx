/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loaderMessages = [
  { max: 20, text: "Magical roots spreading across screen nodes..." },
  { max: 45, text: "Assembling glowing organic trunks..." },
  { max: 70, text: "Budding cinematic branches and leaves..." },
  { max: 90, text: "Synthesizing starlight leaf embers..." },
  { max: 100, text: "Opening portal to Sham Michalas Portfolio..." }
];

const leavesData = [
  { cx: 55, cy: 125, r: 6, color: 'url(#leaf-glow)', delay: 0.1 },
  { cx: 51, cy: 128, r: 4, color: 'url(#leaf-glow-cyan)', delay: 0.3 },
  { cx: 145, cy: 120, r: 7, color: 'url(#leaf-glow-orange)', delay: 0.2 },
  { cx: 149, cy: 118, r: 5, color: 'url(#leaf-glow)', delay: 0.4 },
  { cx: 50, cy: 90, r: 7, color: 'url(#leaf-glow)', delay: 0.15 },
  { cx: 46, cy: 88, r: 5, color: 'url(#leaf-glow-cyan)', delay: 0.35 },
  { cx: 150, cy: 85, r: 7, color: 'url(#leaf-glow-orange)', delay: 0.25 },
  { cx: 154, cy: 87, r: 4, color: 'url(#leaf-glow)', delay: 0.45 },
  { cx: 60, cy: 68, r: 6, color: 'url(#leaf-glow-cyan)', delay: 0.2 },
  { cx: 57, cy: 65, r: 5, color: 'url(#leaf-glow)', delay: 0.5 },
  { cx: 140, cy: 65, r: 7, color: 'url(#leaf-glow-orange)', delay: 0.1 },
  { cx: 143, cy: 62, r: 4, color: 'url(#leaf-glow-cyan)', delay: 0.4 },
  { cx: 85, cy: 30, r: 8, color: 'url(#leaf-glow)', delay: 0.05 },
  { cx: 81, cy: 26, r: 6, color: 'url(#leaf-glow-cyan)', delay: 0.3 },
  { cx: 115, cy: 30, r: 8, color: 'url(#leaf-glow-orange)', delay: 0.15 },
  { cx: 119, cy: 26, r: 5, color: 'url(#leaf-glow)', delay: 0.4 }
];

export default function Loader({ progress, active }) {
  const [currentMessage, setCurrentMessage] = useState(loaderMessages[0].text);

  useEffect(() => {
    const msg = loaderMessages.find(m => progress <= m.max);
    if (msg) {
      setCurrentMessage(msg.text);
    }
  }, [progress]);

  // Scaled calculations for staggered path formation
  const getPathLength = (start, range) => {
    const val = (progress - start) / range;
    return Math.max(0, Math.min(1, val));
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 w-screen h-screen bg-[#02040a] z-[70] flex flex-col items-center justify-between select-none overflow-hidden py-12 md:py-20"
        >
          {/* Subtle Ambient Sunset Glows behind the loader */}
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-orange-600/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-800/10 blur-[140px] pointer-events-none" />

          {/* Top HUD Brand Frame */}
          <div className="relative z-10 text-center flex flex-col items-center px-6">
            <h2 className="font-display text-[9px] md:text-xs tracking-[0.35em] text-orange-500/70 font-bold uppercase mb-2">
              QUANTUM SYSTEM INITIALIZATION
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          </div>

          {/* Middle: Magical Tree growth SVG */}
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center pointer-events-none my-auto">
            <svg 
              className="w-full h-full max-h-[340px] md:max-h-[440px] overflow-visible mix-blend-screen"
              viewBox="0 0 200 200"
            >
              <defs>
                {/* Brand Gradients */}
                <linearGradient id="root-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ea580c" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#475569" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="branch-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="60%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
                <radialGradient id="leaf-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="1" />
                  <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="leaf-glow-cyan" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="leaf-glow-orange" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fde047" stopOpacity="1" />
                  <stop offset="40%" stopColor="#fb923c" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
                </radialGradient>

                {/* Glow Filter */}
                <filter id="glow-tree" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Magical roots spreading (0% to 35% progress bounds) */}
              <g stroke="url(#root-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8">
                <motion.path 
                  d="M 100 160 Q 80 170 50 185 T 15 190" 
                  style={{ pathLength: getPathLength(0, 30) }}
                />
                <motion.path 
                  d="M 80 170 Q 60 178 35 180" 
                  style={{ pathLength: getPathLength(5, 25) }}
                />
                <motion.path 
                  d="M 100 160 Q 120 170 150 185 T 185 190" 
                  style={{ pathLength: getPathLength(0, 30) }}
                />
                <motion.path 
                  d="M 120 170 Q 140 178 165 180" 
                  style={{ pathLength: getPathLength(5, 25) }}
                />
                <motion.path 
                  d="M 100 160 Q 100 180 98 198" 
                  style={{ pathLength: getPathLength(10, 20) }}
                />
              </g>

              {/* Magical Sprout-to-Tree organic growing group (scales elastically upwards from base 100, 160) */}
              <motion.g
                style={{ transformOrigin: "100px 160px" }}
                animate={{
                  scaleY: progress < 20 ? 0.12 : Math.min(1.0, 0.12 + (progress - 20) * 0.0135),
                  scaleX: progress < 20 ? 0.18 : Math.min(1.0, 0.18 + (progress - 20) * 0.0126),
                }}
                transition={{ type: "spring", stiffness: 45, damping: 14 }}
              >
                {/* 2. Trunk & Core Branches (20% to 70% progress bounds) */}
                <g stroke="url(#branch-grad)" fill="none" strokeLinecap="round" filter="url(#glow-tree)">
                  {/* Thick main trunk */}
                  <motion.path 
                    d="M 100 160 C 100 130 96 100 100 80" 
                    strokeWidth="6"
                    style={{ pathLength: getPathLength(20, 35) }}
                  />
                  
                  {/* Lower Left Branch */}
                  <motion.path 
                    d="M 98 120 Q 75 110 55 125" 
                    strokeWidth="3.2"
                    style={{ pathLength: getPathLength(35, 25) }}
                  />
                  {/* Lower Right Branch */}
                  <motion.path 
                    d="M 102 115 Q 125 105 145 120" 
                    strokeWidth="3.2"
                    style={{ pathLength: getPathLength(38, 25) }}
                  />

                  {/* Middle Left Branch */}
                  <motion.path 
                    d="M 99 95 Q 70 80 50 90" 
                    strokeWidth="2.5"
                    style={{ pathLength: getPathLength(42, 28) }}
                  />
                  {/* Middle Right Branch */}
                  <motion.path 
                    d="M 101 90 Q 130 75 150 85" 
                    strokeWidth="2.5"
                    style={{ pathLength: getPathLength(45, 28) }}
                  />

                  {/* Upper Left Branch */}
                  <motion.path 
                    d="M 100 80 Q 75 55 60 68" 
                    strokeWidth="2.0"
                    style={{ pathLength: getPathLength(50, 30) }}
                  />
                  {/* Upper Right Branch */}
                  <motion.path 
                    d="M 100 78 Q 125 52 140 65" 
                    strokeWidth="2.0"
                    style={{ pathLength: getPathLength(52, 30) }}
                  />

                  {/* Top Center Forks */}
                  <motion.path 
                    d="M 100 80 Q 95 45 85 30" 
                    strokeWidth="1.8"
                    style={{ pathLength: getPathLength(55, 35) }}
                  />
                  <motion.path 
                    d="M 100 80 Q 105 45 115 30" 
                    strokeWidth="1.8"
                    style={{ pathLength: getPathLength(57, 35) }}
                  />
                </g>

                {/* 3. Glowing Leaf Particles (70% to 100% progress bounds, drifting at 85%+) */}
                {progress >= 68 && leavesData.map((leaf, idx) => {
                  const triggerDrift = progress >= 85;

                  return (
                    <motion.circle
                      key={idx}
                      r={leaf.r}
                      fill={leaf.color}
                      initial={{ cx: leaf.cx, cy: leaf.cy, opacity: 0 }}
                      animate={{
                        cx: leaf.cx,
                        cy: triggerDrift ? [leaf.cy, leaf.cy - 35, leaf.cy - 90] : leaf.cy,
                        x: triggerDrift ? [0, idx % 2 === 0 ? 8 : -8, idx % 2 === 0 ? -4 : 4, 0] : 0,
                        opacity: triggerDrift ? [0.95, 0.95, 0] : 0.95,
                        scale: [1, 1.15, 1]
                      }}
                      transition={{
                        opacity: { duration: 0.8, delay: idx * 0.05 },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        cy: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: leaf.delay },
                        x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: leaf.delay }
                      }}
                      style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.15))" }}
                    />
                  );
                })}
              </motion.g>
            </svg>
          </div>

          {/* Bottom HUD: Progress Numeric Counters */}
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 gap-3">
            {/* Numerical counter */}
            <div className="font-display text-4xl md:text-5xl font-extrabold text-white select-none flex items-baseline gap-1">
              <span>{Math.round(progress)}</span>
              <span className="text-sm font-bold text-orange-500">%</span>
            </div>

            {/* Dynamic Status Log messaging */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-sans text-[10px] md:text-xs tracking-wider text-slate-400 font-bold uppercase h-4 text-center"
              >
                {currentMessage}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Ambient vignette */}
          <div className="absolute inset-0 bg-radial-gradient(circle, transparent 35%, rgba(2,4,10,0.85) 100%) pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
