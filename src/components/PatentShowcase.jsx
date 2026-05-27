import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, ShieldCheck, HelpCircle, Activity } from 'lucide-react';

export default function PatentShowcase() {
  const [isMobile, setIsMobile] = useState(false);

  // Springs for 3D tilt interaction
  const rotateX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      const el = document.getElementById('blueprint-chamber');
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      
      // Calculate angles (-12 to 12 degrees)
      const rX = -(mouseY / height) * 24;
      const rY = (mouseX / width) * 24;
      
      rotateX.set(rX);
      rotateY.set(rY);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    const container = document.getElementById('blueprint-chamber');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [rotateX, rotateY]);

  return (
    <section 
      id="patent-chamber" 
      className="relative min-h-screen py-32 px-6 md:px-12 bg-[#04060d] flex flex-col justify-center overflow-hidden z-40 border-t border-white/5 select-none"
    >
      {/* Background eco aura glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-600/5 blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: 3D Holographic Chamber */}
        <div 
          id="blueprint-chamber"
          className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px] sm:min-h-[460px] relative perspective-1000"
        >
          {/* Animated 3D Blueprint glass Card */}
          <motion.div
            style={{
              rotateX: isMobile ? 5 : rotateX,
              rotateY: isMobile ? 12 : rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="w-full max-w-sm aspect-[3/4] rounded-3xl border border-emerald-500/15 bg-slate-950/75 p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.06)] relative overflow-hidden backdrop-blur-md cursor-grab active:cursor-grabbing"
          >
            {/* Blueprint Grid Lines Pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg className="w-full h-full" stroke="#10b981" strokeWidth="0.5">
                <pattern id="bp-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#bp-grid)" />
              </svg>
            </div>

            {/* Glowing Government Seal Effect Background Stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dashed border-emerald-500/15 flex items-center justify-center opacity-40 pointer-events-none animate-spin" style={{ animationDuration: '40s' }}>
              <div className="w-40 h-40 rounded-full border border-dashed border-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-emerald-500/25" />
              </div>
            </div>

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="font-display text-[9px] tracking-widest font-extrabold text-emerald-400 uppercase">
                  OFFICIAL PATENT BLUEPRINT
                </span>
              </div>
              <span className="text-[8px] font-sans text-emerald-500/60 font-extrabold">ECO-WELL: V.10</span>
            </div>

            {/* Blueprint Schema Drawings */}
            <div className="flex-grow flex items-center justify-center my-6 relative z-10">
              <svg className="w-44 h-44 text-emerald-400/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                {/* Tech Blueprint circles and leaf lines */}
                <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="30" />
                <path d="M50 8 L50 92" strokeDasharray="2 2" />
                <path d="M8 50 L92 50" strokeDasharray="2 2" />
                
                {/* Organic Leaf Vector Schematic */}
                <path d="M50 80 Q25 60 50 20 Q75 60 50 80" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <path d="M50 20 L50 80" strokeWidth="1.2" />
                <path d="M50 40 Q40 45 35 42" />
                <path d="M50 40 Q60 45 65 42" />
                <path d="M50 55 Q40 60 32 55" />
                <path d="M50 55 Q60 60 68 55" />
              </svg>
            </div>

            {/* Card Footer credentials */}
            <div className="border-t border-emerald-500/20 pt-4 flex items-center justify-between relative z-10 text-[8px] font-mono text-slate-500">
              <span>APP REG ID: #202541041540 A</span>
              <span className="text-emerald-500/80">AUTHENTICATED STATE</span>
            </div>
            
            {/* Hologram visual edge glow lights */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
          </motion.div>
        </div>

        {/* Right Side: Patent Credentials & Narrative */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-8">
            <span className="font-display text-xs font-bold tracking-[0.25em] text-emerald-400 uppercase">
              EXCLUSIVE COGNITIVE ASSETS
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-6 leading-tight">
              Holographic<br />
              <span className="text-emerald-400">Patent Chamber</span>
            </h2>
            <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed">
              This portfolio highlights an exclusive, official sustainability design patent merging biological telemetry feedback loops and smart workspace environment controllers.
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4 bg-slate-950/50 hover:border-emerald-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">ECO-WELL INVENTION</h4>
                <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                  <strong>Core concept:</strong> Food & Medicine Management System: Combining Sustainability and Well-being, utilizing organic sensors and distribution monitors to track freshness and curb organic resource waste.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex gap-4 bg-slate-950/50 hover:border-emerald-500/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-slate-200 uppercase tracking-wider mb-1">SUSTAINABILITY IMPACT</h4>
                <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
                  <strong>Verified metrics:</strong> Promotes botanical carbon capture and workspace bio-sanitization, reducing local toxic particulates by up to 45% inside modular environments.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-slate-950/40 text-center">
                <span className="text-[9px] font-sans text-slate-500 font-extrabold uppercase">Application No.</span>
                <div className="font-display text-xs md:text-sm font-bold text-slate-200 mt-1 uppercase">202541041540 A</div>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/5 bg-slate-950/40 text-center">
                <span className="text-[9px] font-sans text-slate-500 font-extrabold uppercase">Published Date</span>
                <div className="font-display text-xs md:text-sm font-bold text-slate-200 mt-1">30 MAY 2025</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
