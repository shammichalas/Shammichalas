import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: "01",
    company: "Team InfoSoft",
    role: "Full Stack Developer Intern",
    period: "Jun 2024 — Jul 2024",
    highlights: [
      "Redesigned production website for modern branding and visual consistency",
      "Built interactive analytics dashboards to track key company business operations",
      "Delivered production-ready features using React.js and semantic HTML structure"
    ],
    tech: ["React.js", "HTML", "Excel Analytics", "UI/UX Design"],
    color: '#a855f7', // Purple
    glow: 'rgba(168, 85, 247, 0.4)'
  },
  {
    number: "02",
    company: "Skill Software INC",
    role: "Software Engineer Intern",
    period: "Aug 2025 — Sep 2025",
    highlights: [
      "+40% latency improvement optimized using MongoDB indexing and Redis caching",
      "Redis caching layered on high-load FastAPI endpoints to bypass db roundtrips",
      "AI-powered automation scripts built with prompt engineering to reduce manual workflows",
      "Cross-functional collaboration across deployment groups delivering serverless infrastructure"
    ],
    tech: ["React.js", "FastAPI", "AWS Lambda", "Docker", "MongoDB", "Redis", "Celery"],
    color: '#f97316', // Orange
    glow: 'rgba(249, 115, 22, 0.4)'
  }
];

export default function ExperienceTimeline() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const numberRefs = useRef([]);
  const headerRefs = useRef([]);
  const bulletsRefs = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    const slides = slideRefs.current;

    // Slide 2 initially offscreen
    gsap.set(slides[1], { xPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`, // Pinned scroll duration
        invalidateOnRefresh: true,
      }
    });

    // 1. Reveal first slide elements on entrance
    tl.fromTo(numberRefs.current[0], { opacity: 0, scale: 0.8 }, { opacity: 0.05, scale: 1, duration: 0.3 }, 0);
    tl.fromTo(headerRefs.current[0], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.1);
    
    // Stagger bullet points for Exp 01
    if (bulletsRefs.current[0]) {
      const bullets1 = bulletsRefs.current[0].children;
      tl.fromTo(bullets1, 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.15 },
        0.2
      );
    }

    // 2. Animate vertical timeline growing line
    tl.fromTo(lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, ease: "none", duration: 1.0 },
      0.3
    );

    // 3. Transition from Exp 01 to Exp 02
    const transitionLabel = "slideTransition";

    tl.to(slides[0], {
      xPercent: -100,
      opacity: 0,
      ease: "power2.inOut",
      duration: 1.0
    }, transitionLabel);

    tl.fromTo(slides[1],
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, ease: "power2.inOut", duration: 1.0 },
      transitionLabel
    );

    // 4. Reveal second slide elements
    tl.fromTo(numberRefs.current[1], { opacity: 0, scale: 0.8 }, { opacity: 0.05, scale: 1, duration: 0.3 }, `${transitionLabel}+=0.4`);
    tl.fromTo(headerRefs.current[1], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, `${transitionLabel}+=0.5`);

    if (bulletsRefs.current[1]) {
      const bullets2 = bulletsRefs.current[1].children;
      tl.fromTo(bullets2, 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.15 },
        `${transitionLabel}+=0.6`
      );
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [isMobile]);

  // Mobile Render (Vertical linear list)
  if (isMobile) {
    return (
      <section 
        id="experience" 
        className="relative w-full py-24 px-6 bg-[#02040a] border-t border-white/5 select-none"
      >
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-left">
            <span className="font-display text-[10px] font-bold tracking-[0.25em] text-orange-400 uppercase border border-orange-500/20 px-3 py-1 rounded-full inline-block">
              PROFESSIONAL HISTORY
            </span>
            <h2 className="font-display text-3xl font-extrabold mt-4 text-white uppercase tracking-tight">
              Experience
            </h2>
            <p className="font-sans text-slate-400 text-sm mt-2 leading-relaxed">
              Building real-world software products.
            </p>
          </div>

          {/* List items */}
          <div className="space-y-12 relative pl-6 border-l border-white/10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative space-y-4">
                {/* Glow node dot */}
                <div 
                  className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border border-white/20 bg-slate-950 flex items-center justify-center"
                  style={{ boxShadow: `0 0 10px ${exp.glow}` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 font-display text-[10px] font-bold tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    {exp.company}
                  </h3>
                  <p className="font-sans text-xs text-orange-400 font-extrabold uppercase tracking-widest">
                    {exp.role}
                  </p>
                </div>

                <ul className="space-y-2.5 pl-1">
                  {exp.highlights.map((hl, hlIdx) => (
                    <li key={hlIdx} className="flex items-start gap-2 text-xs text-slate-300 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Continue the Journey... visual element at the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
            className="mt-16 flex flex-col items-center justify-center text-center"
          >
            {/* Pulsing down ring */}
            <div className="w-8 h-8 rounded-full border border-orange-500/25 bg-orange-500/5 flex items-center justify-center mb-4 relative">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping shadow-glow-orange absolute" />
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 relative" />
            </div>
            
            <h3 className="font-display text-base font-bold tracking-widest text-slate-200 uppercase mb-1">
              Continue the Journey
            </h3>
            <p className="font-sans text-[10px] text-slate-500 font-semibold uppercase tracking-wider max-w-xs">
              Scroll down to explore the tech marquee and connect.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Desktop Render (Sticky Split Screen)
  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#02040a] z-40 border-t border-white/5 select-none flex items-center justify-center"
    >
      {/* Grid Pattern Background Layer */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl w-full px-12 grid grid-cols-12 gap-8 items-stretch h-full relative z-10 py-16">
        
        {/* Left Side (Pinned Content) */}
        <div className="col-span-6 flex flex-col justify-center text-left self-center relative h-fit pr-12">
          <span className="font-display text-[10px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 uppercase border border-orange-500/20 px-3.5 py-1 rounded-full inline-block w-fit mb-8">
            PROFESSIONAL HISTORY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[75px] xl:text-[95px] 2xl:text-[115px] font-black tracking-tighter text-white leading-[0.85] mb-8 uppercase select-none">
            EXPERIENCE
          </h2>
          <p className="font-sans text-slate-400 text-sm lg:text-base leading-relaxed mb-6 max-w-xs">
            Building real-world software products.
          </p>
          <span className="font-mono text-xs lg:text-sm font-bold text-slate-500 tracking-widest uppercase mb-12">
            2024 → 2025
          </span>

          {/* Continue the Journey... visual element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.5 }}
            className="mt-8 flex flex-col items-start text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-orange-500/25 bg-orange-500/5 flex items-center justify-center relative">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping shadow-glow-orange absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 relative" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase">
                  Continue the Journey
                </h3>
                <p className="font-sans text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                  Scroll down to explore
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Column (Timeline progress line indicator) */}
        <div className="col-span-1 flex flex-col items-center justify-center relative self-stretch py-24">
          {/* Top Node dot */}
          <div className="w-4 h-4 rounded-full border border-purple-500/30 bg-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </div>

          {/* Timeline background track */}
          <div className="w-[2px] flex-grow bg-white/[0.03] relative">
            {/* Timeline growing line */}
            <div 
              ref={lineRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500 to-orange-500 rounded-full origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Bottom Node dot */}
          <div className="w-4 h-4 rounded-full border border-orange-500/30 bg-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)] z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          </div>
        </div>

        {/* Right Side (Scrolling content cards container) */}
        <div className="col-span-5 relative h-full flex items-center overflow-hidden">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={el => slideRefs.current[index] = el}
              className="absolute inset-0 w-full h-full flex flex-col justify-center bg-[#02040a]/90 pl-8"
            >
              <div className="relative w-full max-w-xl">
                {/* Giant Faded Background Number */}
                <div 
                  ref={el => numberRefs.current[index] = el}
                  className="absolute -top-12 -left-12 font-display font-black text-[15rem] leading-none opacity-[0.03] select-none pointer-events-none tracking-tighter"
                  style={{ 
                    color: exp.color,
                    textShadow: `0 0 40px ${exp.glow}`
                  }}
                >
                  {exp.number}
                </div>

                <div 
                  ref={el => headerRefs.current[index] = el}
                  className="space-y-2 relative z-10 mb-8"
                >
                  <div className="flex items-center gap-2 text-slate-500 font-display text-[10px] lg:text-xs font-bold tracking-widest uppercase">
                    <Calendar className="w-4 h-4 text-orange-400/80" />
                    <span>{exp.period}</span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-black text-white leading-tight">
                    {exp.company}
                  </h3>
                  <p className="font-sans text-xs lg:text-sm text-orange-400 font-bold uppercase tracking-widest">
                    {exp.role}
                  </p>
                </div>

                <ul 
                  ref={el => bulletsRefs.current[index] = el}
                  className="space-y-4 relative z-10 pl-1"
                >
                  {exp.highlights.map((hl, hlIdx) => (
                    <li key={hlIdx} className="flex items-start gap-3 text-xs lg:text-sm text-slate-300 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
