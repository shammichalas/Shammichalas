import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ progress, active, onComplete }) {
  const [countDisplay, setCountDisplay] = useState("000");
  const containerRef = useRef(null);
  const welcomeRef = useRef(null);
  const titleLettersRef = useRef([]);
  const progressFillRef = useRef(null);
  const bottomTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  
  // Floating dots reference
  const dotsRef = useRef([]);
  const noiseRef = useRef(null);

  const titleText = "PORTFOLIO";
  const assetsLoadedRef = useRef(false);
  const timelineRef = useRef(null);

  // Sync assets loaded status
  useEffect(() => {
    if (progress >= 100) {
      assetsLoadedRef.current = true;
      // If the timeline reached the loading gate and is paused, resume it
      if (timelineRef.current && timelineRef.current.paused()) {
        timelineRef.current.play();
      }
    }
  }, [progress]);

  useEffect(() => {
    if (!active) return;

    // 1. Disable cursor
    document.body.style.cursor = 'none';

    const countObj = { value: 0 };
    
    // 2. Set up unified animation timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Set initial layout coordinates
    gsap.set(welcomeRef.current, { opacity: 0, y: 20 });
    gsap.set(titleLettersRef.current, { 
      y: "150%", 
      rotateX: 30, 
      filter: "blur(12px)", 
      opacity: 0 
    });
    gsap.set(progressFillRef.current, { width: "0%" });
    gsap.set([bottomTextRef.current, progressBarRef.current, counterRef.current], { opacity: 0 });

    // A. Welcome Text Anim (0.2s start, 0.8s duration)
    tl.to(welcomeRef.current, {
      opacity: 0.45,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 0.2);

    // B. Title Letters Anim (0.6s start, 1.4s duration, Expo.out, 0.06 stagger)
    tl.to(titleLettersRef.current, {
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      opacity: 1,
      duration: 1.4,
      stagger: 0.06,
      ease: "expo.out"
    }, 0.6);

    // C. Fade in HUD details
    tl.to([bottomTextRef.current, progressBarRef.current, counterRef.current], {
      opacity: 0.4,
      duration: 0.5,
      ease: "power1.out"
    }, 0.6);

    // D. Synchronized counter & progress fill (0.8s start, 2.4s duration, Power2.out ease)
    // Reaches 100% exactly at 3.2s
    tl.to(countObj, {
      value: 100,
      duration: 2.4,
      ease: "power2.out",
      onUpdate: () => {
        const currentVal = Math.floor(countObj.value);
        setCountDisplay(String(currentVal).padStart(3, "0"));
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${currentVal}%`;
        }
        
        // Micro-interaction: scale the last digit slightly on update
        if (counterRef.current) {
          gsap.fromTo(counterRef.current, 
            { scale: 1.04 }, 
            { scale: 1, duration: 0.15, ease: "power1.out" }
          );
        }
      }
    }, 0.8);

    // E. Emit progress bar glow while moving
    tl.fromTo(progressFillRef.current,
      { boxShadow: "0 0 0px rgba(255, 255, 255, 0)" },
      { boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)", duration: 2.4, ease: "power2.out" },
      0.8
    );

    // F. Loading Gate: At 3.2s, pause if assets are not loaded
    tl.add(() => {
      if (!assetsLoadedRef.current) {
        tl.pause();
      }
    }, 3.2);

    // G. Pause 300ms (exit starts at 3.5s)
    
    // H. Exit Animation (starts at 3.5s)
    tl.call(() => {
      document.body.style.cursor = 'auto';
      if (onComplete) onComplete();
    }, null, 3.5);

    // Progress bar, bottom status, and counter fade away
    tl.to([progressBarRef.current, bottomTextRef.current, counterRef.current, welcomeRef.current], {
      opacity: 0,
      y: -15,
      duration: 0.4,
      ease: "power2.in"
    }, 3.5);

    // PORTFOLIO scale sequence: 1 -> 1.08 -> 0.96 -> 1
    tl.to(titleLettersRef.current, {
      scale: 1.08,
      duration: 0.25,
      ease: "power2.out"
    }, 3.5)
    .to(titleLettersRef.current, {
      scale: 0.96,
      duration: 0.2,
      ease: "power2.inOut"
    }, 3.75)
    .to(titleLettersRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "power2.out"
    }, 3.95);

    // I. Letters fly up, background fades, trigger reveal callback (at 3.8s / 4.0s)
    tl.to(titleLettersRef.current, {
      y: "-180%",
      opacity: 0,
      filter: "blur(20px)",
      stagger: 0.03,
      duration: 0.8,
      ease: "power3.in"
    }, 4.0);

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    }, 4.0);

    // Soft moving noise background loop
    const noiseAnim = gsap.to(noiseRef.current, {
      backgroundPosition: "300px 300px",
      repeat: -1,
      duration: 10,
      ease: "none"
    });

    // Extremely slow blurred dots animation loop
    dotsRef.current.forEach((dot, idx) => {
      if (!dot) return;
      gsap.to(dot, {
        x: () => `${(idx % 2 === 0 ? 1 : -1) * (30 + Math.random() * 40)}px`,
        y: () => `${(idx % 3 === 0 ? 1 : -1) * (30 + Math.random() * 40)}px`,
        duration: 20 + Math.random() * 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      tl.kill();
      noiseAnim.kill();
      document.body.style.cursor = 'auto';
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen bg-[#0A0A0A] z-[70] flex flex-col items-center justify-between select-none overflow-hidden py-16 md:py-24"
      style={{ perspective: 1000 }}
    >
      {/* Soft moving noise texture */}
      <div 
        ref={noiseRef}
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Tiny blurred white dots moving extremely slowly */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          ref={el => dotsRef.current[i] = el}
          className="absolute rounded-full bg-white blur-[15px] opacity-[0.03] pointer-events-none z-0"
          style={{
            width: `${10 + i * 4}px`,
            height: `${10 + i * 4}px`,
            top: `${15 + Math.random() * 70}%`,
            left: `${15 + Math.random() * 70}%`,
          }}
        />
      ))}

      {/* Top spacer to align elements */}
      <div className="h-10" />

      {/* Main Center Box */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        {/* Welcome message */}
        <div 
          ref={welcomeRef}
          className="font-display font-medium text-[10px] md:text-xs tracking-[0.65em] text-white/45 uppercase mb-[70px] select-none text-center"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          WELCOME TO MY
        </div>

        {/* Main title "PORTFOLIO" */}
        <div className="flex select-none overflow-hidden pb-4">
          {titleText.split("").map((char, index) => (
            <span 
              key={index}
              className="inline-block overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span
                ref={el => titleLettersRef.current[index] = el}
                className="inline-block text-white font-display font-black leading-none tracking-tighter"
                style={{ 
                  fontSize: 'clamp(50px, 13vw, 220px)',
                  letterSpacing: '-0.06em',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                  fontFamily: "'Neue Montreal', 'General Sans', 'Clash Display', 'Outfit', sans-serif"
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom HUD bar */}
      <div className="w-full max-w-7xl px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Bottom Left: Loading Experience Label */}
        <div 
          ref={bottomTextRef}
          className="font-sans text-[10px] md:text-[11px] tracking-[0.35em] text-white/40 uppercase font-medium md:w-1/3 text-center md:text-left"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          LOADING EXPERIENCE
        </div>

        {/* Bottom Center: Progress Bar */}
        <div 
          ref={progressBarRef}
          className="w-[220px] h-[2px] bg-white/8 relative overflow-hidden"
        >
          <div 
            ref={progressFillRef}
            className="absolute left-0 top-0 h-full bg-white rounded-full"
            style={{ width: "0%" }}
          />
        </div>

        {/* Bottom Right: Smooth Counter */}
        <div 
          ref={counterRef}
          className="font-mono font-bold text-xl md:text-2xl text-white md:w-1/3 text-center md:text-right select-none"
          style={{ fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}
        >
          {countDisplay}
        </div>
      </div>
    </div>
  );
}
