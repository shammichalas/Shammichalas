import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Mail, ArrowDown } from 'lucide-react';
import Loader from './Loader';
import FloatingCards from './FloatingCards';
import ConnectionLines from './ConnectionLines';

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

const mobileTechData = [
  {
    id: 'react',
    name: 'React.js',
    icon: (
      <svg className="w-4 h-4 text-sky-400" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="0.8" fill="none">
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
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="transparent" stroke="currentColor" strokeWidth="12"/>
        <path d="M140 150L95 90V140H80V50H95L132 100V50H145V150H140Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    icon: (
      <svg className="w-4 h-4 text-[#059669]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 9.429L12.56 16.48a1.2 1.2 0 0 1-1.745.183l-3.791-3.223a1.2 1.2 0 1 1 1.554-1.829l2.766 2.352 4.66-6.388a1.2 1.2 0 1 1 1.948 1.424z"/>
      </svg>
    )
  },
  {
    id: 'aws',
    name: 'AWS Lambda',
    icon: (
      <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 22l6.2-11.2L17.7 22h3.5L14 8.2l4.8-8.2h-3.5L10.3 8.8 7.2 3H3.7l4.8 8.8L3 22h3.3z" />
      </svg>
    )
  },
  {
    id: 'openai',
    name: 'OpenAI GPT',
    icon: (
      <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7 10.3c.3-.5.4-1.2.2-1.8-.2-.6-.7-1.1-1.3-1.3l-1.8-.6c.2-.6.1-1.3-.2-1.9-.3-.5-.9-.9-1.5-1l-1.8-.1c-.1-.7-.6-1.2-1.2-1.5-.6-.3-1.3-.2-1.9.1l-1.6.9c-.5-.3-1.2-.4-1.8-.2-.6.2-1.1.7-1.3 1.3l-.6 1.8c-.6-.2-1.3-.1-1.9.2-.5.3-.9.9-1 1.5l-.1 1.8c-.7.1-1.2.6-1.5 1.2-.3.6-.2 1.3.1 1.9l.9 1.6c-.3.5-.4 1.2-.2 1.8.2.6.7 1.1 1.3 1.3l1.8.6c-.2.6-.1 1.3.2 1.9.3.5.9.9 1.5 1l1.8.1c.1.7.6 1.2 1.2 1.5.6.3 1.3.2 1.9-.1l1.6-.9c.5.3 1.2.4 1.8.2.6-.2 1.1-.7 1.3-1.3l.6-1.8c.6.2 1.3.1 1.9-.2.5-.3.9-.9 1-1.5l.1-1.8c.7-.1 1.2-.6 1.5-1.2.3-.6.2-1.3-.1-1.9l-.9-1.6zM12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    )
  },
  {
    id: 'python',
    name: 'Python',
    icon: (
      <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0003 2C10.7417 2 9.53907 2.15556 8.52834 2.45109C5.39414 3.3674 5.37895 5.56844 5.37895 7.15217V8.58696H12.0872C13.5651 8.58696 14.7766 9.85109 14.7766 11.3391V14.6304H18.6214C20.6121 14.6304 22.0003 13.5855 22.0003 11.0543V7.6087C22.0003 4.2407 19.3496 2 12.0003 2ZM7.23439 4.3913C7.75549 4.3913 8.18222 4.81804 8.18222 5.33913C8.18222 5.86022 7.75549 6.28696 7.23439 6.28696C6.71329 6.28696 6.28656 5.86022 6.28656 5.33913C6.28656 4.81804 6.71329 4.3913 7.23439 4.3913ZM5.37895 9.36957C3.38827 9.36957 2.00007 10.4145 2.00007 12.9457V16.3913C2.00007 19.7593 4.65076 22 12.0003 22C13.2589 22 14.4615 21.8444 15.4723 21.5489C18.6065 20.6326 18.6217 18.4316 18.6217 16.8478V15.413H11.9133C10.4354 15.413 9.22396 14.1489 9.22396 12.6609V9.36957H5.37895ZM16.7662 17.7174C17.2873 17.7174 17.714 18.1441 17.714 18.6652C17.714 19.1863 17.2873 19.613 16.7662 19.613C16.2451 19.613 15.8184 19.1863 15.8184 18.6652C15.8184 18.1441 16.2451 17.7174 16.7662 17.7174Z"/>
      </svg>
    )
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: (
      <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.15 11.23c-.76-2.58-2.61-4.9-4.52-6.52-.3-.25-.76-.25-1.06 0-2 1.7-3.8 4-4.55 6.57-.76 2.58-.33 5.4 1.25 7.6 1.15 1.6 3 2.65 4.73 3.03.35.08.7.08 1.05 0 1.73-.38 3.58-1.43 4.73-3.03 1.6-2.2 2-5 .25-7.65zM12 18.5a.75.75 0 0 1-.75-.75v-11.5a.75.75 0 0 1 1.5 0v11.5a.75.75 0 0 1-.75.75z"/>
      </svg>
    )
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: (
      <svg className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 8.18h2.119v-2.12h-2.119zm-2.737 0h2.119v-2.12H11.246zm-2.737 0h2.12v-2.12h-2.12zm-2.737 0h2.119v-2.12H5.772zm2.737-2.738h2.12v-2.12h-2.12zm2.737 0h2.119v-2.12H11.246zm0-2.737h2.119v-2.119h-2.119zm5.474 5.475h2.118v-2.12H16.72zm-2.737-5.475h2.119v-2.119h-2.119zM1.123 9.948c.08.385.25.753.487 1.077.295.39.69.696 1.15.89 2.597 1.09 5.617.9 8.2-.18.73-.3 1.488-.5 2.268-.588.618-.07 1.245-.03 1.854.12 1.344.333 2.5.6 3.65.6.865 0 1.636-.26 2.3-.77.77-.594 1.35-1.5 1.7-2.67.245-.826.37-1.687.37-2.552 0-.256-.008-.51-.026-.763-.095-1.342-.71-2.548-1.68-3.4-.645-.568-1.46-.867-2.29-.844h-.132c-1.07.01-2.115.35-3 .986l-.42.3c-.312.227-.584.498-.81.804l-.24.323c-.347.464-.537 1.026-.54 1.602l.006.5a.65.65 0 0 1-.365.59c-.43.208-.89.344-1.36.4H5.973c-.5.06-1 .212-1.45.45l-.47.24c-.453.238-.838.583-1.12.996L2.31 9.2c-.363.473-.772.845-1.187.747z"/>
      </svg>
    )
  }
];

export default function HeroSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];
    let isMounted = true;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    const activeFrameCount = isMobile ? 1 : 40;
    const activeFrames = Array.from(
      { length: activeFrameCount },
      (_, i) => `/hero-section/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
    );

    // Safety timeout: auto-resolve loading state after 5 seconds if stuck
    const safetyTimeout = setTimeout(() => {
      if (isMounted && loadedCount < activeFrameCount) {
        console.warn("Preloader safety timeout triggered. Proceeding with partially loaded assets.");
        // Fill in missing frames with a fallback SVG placeholder to keep sequence intact
        for (let idx = 0; idx < activeFrameCount; idx++) {
          if (!loadedImages[idx]) {
            const fallbackImg = new Image();
            fallbackImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%2302040a"/><text x="50%" y="50%" fill="%23f97316" font-size="24" text-anchor="middle">Loading...</text></svg>';
            loadedImages[idx] = fallbackImg;
          }
        }
        setImages(loadedImages);

        // Fast-forward preloadProgress smoothly to 100%
        let currentProgress = (loadedCount / activeFrameCount) * 100;
        const interval = setInterval(() => {
          currentProgress += 5;
          if (currentProgress >= 100) {
            setPreloadProgress(100);
            clearInterval(interval);
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            setPreloadProgress(currentProgress);
          }
        }, 25);
      }
    }, 5000);

    activeFrames.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        loadedImages[idx] = img;
        setPreloadProgress((loadedCount / activeFrameCount) * 100);

        if (loadedCount === activeFrameCount) {
          clearTimeout(safetyTimeout);
          setImages(loadedImages);
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        // Fallback placeholder to prevent lockups on error
        const fallbackImg = new Image();
        fallbackImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%2302040a"/><text x="50%" y="50%" fill="%23f97316" font-size="24" text-anchor="middle">Loading Frame...</text></svg>';
        loadedImages[idx] = fallbackImg;
        setPreloadProgress((loadedCount / activeFrameCount) * 100);

        if (loadedCount === activeFrameCount) {
          clearTimeout(safetyTimeout);
          setImages(loadedImages);
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        }
      };
    });

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // GSAP Canvas Sequence & Text Animations
  useEffect(() => {
    const activeFrameCount = isMobile ? 1 : 40;
    if (isLoading || images.length !== activeFrameCount) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Render helper with Cover (center crop) scaling math
    const renderFrame = (index) => {
      const img = images[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const x = (canvasWidth - img.width * scale) / 2;
      const y = (canvasHeight - img.height * scale) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Draw first frame immediately
    renderFrame(0);

    // Frame sequence tracking object
    const sequenceObj = { frame: 0 };

    // 1. Staggered Entrance Animation (Runs once when loaded)
    const entryTl = gsap.timeline({ delay: 0.3 });
    
    // Smoothly initialize coordinates below view limits
    gsap.set('.hero-small-tag', { opacity: 0, y: 25 });
    gsap.set('.hero-heading', { opacity: 0, y: 35 });
    gsap.set('.hero-desc', { opacity: 0, y: 25 });
    gsap.set('.hero-mobile-tech', { opacity: 0, y: 20 });
    gsap.set('.hero-buttons', { opacity: 0, y: 20 });
    gsap.set('.hero-socials', { opacity: 0, y: 15 });

    entryTl.to('.hero-small-tag', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
           .to('.hero-heading', { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }, '-=0.9')
           .to('.hero-desc', { opacity: 0.85, y: 0, duration: 1.4, ease: 'power3.out' }, '-=1.0')
           .to('.hero-mobile-tech', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=1.1')
           .to('.hero-buttons', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=1.1')
           .to('.hero-socials', { opacity: 0.75, y: 0, duration: 1.2, ease: 'power3.out' }, '-=1.1');

    // 2. Continuous Canvas Sequence (Scrubbed over the entire pinned area)
    const canvasTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Scrolls 2x viewport height for ample scrub space
        scrub: isMobile ? 0.5 : 1.0, // Buttery soft scrub or snappy on mobile
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Subtly scale the canvas up to mimic cinematic camera zooming (reduced on mobile for performance)
          const baseScale = 1 + progress * (isMobile ? 0.02 : 0.06);
          canvas.style.transform = `scale(${baseScale})`;
        }
      }
    });

    // Animate image sequence frames over entire timeline duration
    canvasTl.to(sequenceObj, {
      frame: activeFrameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 10,
      onUpdate: () => {
        requestAnimationFrame(() => {
          renderFrame(Math.floor(sequenceObj.frame));
        });
      }
    });

    // 3. Scroll-bound Text Fadeout (Fades out elements one-by-one as user scrolls down)
    const textFadeTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 0.8
      }
    });

    textFadeTl.to('.hero-small-tag', { opacity: 0, y: -25, ease: 'power2.inOut', duration: 2 })
              .to('.hero-heading', { opacity: 0, y: -35, ease: 'power2.inOut', duration: 2 }, '+=0.2')
              .to('.hero-desc', { opacity: 0, y: -25, ease: 'power2.inOut', duration: 2 }, '+=0.2')
              .to('.hero-mobile-tech', { opacity: 0, y: -20, ease: 'power2.inOut', duration: 1.5 }, '+=0.1')
              .to('.hero-buttons', { opacity: 0, y: -20, ease: 'power2.inOut', duration: 1.5 }, '+=0.1')
              .to('.hero-socials', { opacity: 0, y: -15, ease: 'power2.inOut', duration: 1.5 }, '+=0.1');

    // Active Resize Handling (ignores vertical height shifts on mobile to prevent address bar flicker)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (isMobile && window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.floor(sequenceObj.frame));
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      entryTl.kill();
      canvasTl.kill();
      textFadeTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading, images, isMobile]);

  // Mouse Reactive Glow spotlight variables tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Cinematic Loader screen */}
      <Loader progress={preloadProgress} active={isLoading} />

      {/* Main trigger container for pinning */}
      <div 
        ref={containerRef} 
        id="home"
        className="relative w-full min-h-screen flex items-center justify-center bg-slate-950 select-none py-20 md:py-0 overflow-hidden"
      >
        
        {/* Layer 0: Canvas image sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-75 ease-out origin-center z-0"
        />

        {/* Layer 10: Dark-to-warm gradient overlay & Vignette */}
        <div className="cinematic-overlay" />
        <div className="cinematic-vignette" />
        
        {/* Layer 11: Soft water reflection overlay at bottom viewport */}
        <div className="water-reflection-overlay" />

        {/* Layer 10 overlay: Reactive Mouse Spotlight */}
        <div className="mouse-glow-overlay" />

        {/* Layer 30 & 40: Glowing connection lines and 3D Floating Tech stack cards */}
        {!isLoading && (
          <>
            <ConnectionLines />
            <FloatingCards />
          </>
        )}

        {/* Layer 50: Hero Text content in relative flow for perfect mobile responsiveness */}
        <div 
          ref={contentRef}
          className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center z-[50] pointer-events-auto mt-16 md:mt-0 w-full"
        >
            {/* Small tag */}
            <div
              className="hero-small-tag opacity-0 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 font-display text-[9px] md:text-xs font-extrabold tracking-[0.25em] mb-4 md:mb-6 uppercase shadow-[0_0_15px_rgba(249,115,22,0.05)]"
            >
              SOFTWARE ENGINEER • AI DEVELOPER
            </div>

            {/* Main Heading */}
            <h1
              className="hero-heading opacity-0 font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.1] mb-4 md:mb-6"
            >
              Building Intelligent<br />
              <span className="gradient-text-sunset">Digital Experiences</span>
            </h1>

            {/* Description */}
            <p
              className="hero-desc opacity-0 max-w-md md:max-w-2xl font-sans text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-medium mb-6 md:mb-10 text-center"
            >
              Full-stack developer focused on AI applications, cloud systems, and immersive web experiences.
            </p>

            {/* Mobile Tech Badges cloud (Only renders on mobile screens) */}
            {isMobile && (
              <div className="hero-mobile-tech opacity-0 flex flex-wrap justify-center gap-2 mb-8 max-w-sm">
                {mobileTechData.map((tech) => (
                  <div 
                    key={tech.id}
                    className="glass-panel px-3 py-2 rounded-xl flex items-center gap-2 bg-slate-950/65 backdrop-blur-md border border-white/5 shadow-lg select-none"
                  >
                    <div className="w-5.5 h-5.5 rounded-lg flex items-center justify-center bg-slate-900 border border-white/5 shrink-0">
                      {tech.icon}
                    </div>
                    <span className="font-sans text-[10px] font-bold text-slate-200 tracking-wider uppercase leading-none">{tech.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div
              className="hero-buttons opacity-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full mb-8 md:mb-16"
            >
              <a
                href="#projects"
                className="group w-[220px] sm:w-auto relative px-6 py-3.5 md:px-8 md:py-3.5 rounded-full overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 font-display text-[10px] md:text-xs font-extrabold tracking-widest text-white transition-all duration-500 shadow-glow-orange cursor-pointer hover:scale-[1.02]"
              >
                VIEW PROJECTS
              </a>
              <a
                href="/Sham%20Michalas%20Resume.pdf"
                download="Sham_Michalas_Resume.pdf"
                className="w-[220px] sm:w-auto px-6 py-3.5 md:px-8 md:py-3.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 font-display text-[10px] md:text-xs font-extrabold tracking-widest text-slate-300 hover:text-slate-100 transition-all duration-500 backdrop-blur-md cursor-pointer flex items-center justify-center"
              >
                DOWNLOAD RESUME
              </a>
            </div>

            {/* Social Icons */}
            <div
              className="hero-socials opacity-0 flex items-center gap-6"
            >
              <a href="https://github.com/shammichalas" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:shammichalas0007@gmail.com" className="text-slate-400 hover:text-orange-500 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                <Mail className="w-5 h-5" />
              </a>
            </div>
        </div>

        {/* Layer 50: Floating Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center gap-2 text-slate-500 animate-bounce pointer-events-none opacity-60">
          <span className="font-display text-[9px] tracking-[0.25em] uppercase font-bold">Scroll Down</span>
          <ArrowDown className="w-4 h-4" />
        </div>

      </div>
    </>
  );
}
