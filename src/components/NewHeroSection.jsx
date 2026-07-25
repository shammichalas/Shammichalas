/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Component
const MagneticButton = ({ children, className, href, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance < 120) {
      // Attract the button towards the cursor (max 14px)
      setPosition({ x: dx * 0.22, y: dy * 0.22 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.1 }}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export default function NewHeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // States
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const activeFrameCount = 51;

  // Preload Image Sequence (51 Frames)
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];
    let isMounted = true;
    const baseUrl = import.meta.env.BASE_URL || '/';

    const activeFrames = Array.from(
      { length: activeFrameCount },
      (_, i) => {
        const frameNum = String(i + 1).padStart(3, "0");
        const relativePath = `new hero section/ezgif-frame-${frameNum}.jpg`;
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        return `${cleanBaseUrl}${relativePath}`;
      }
    );

    activeFrames.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        loadedImages[idx] = img;
        if (loadedCount === activeFrameCount) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        const fallback = new Image();
        fallback.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23ffffff"/></svg>';
        loadedImages[idx] = fallback;
        if (loadedCount === activeFrameCount) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP ScrollTrigger Sequence & Text Animations
  useEffect(() => {
    if (isLoading || images.length !== activeFrameCount) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // Render helper with Cover (center crop) scaling math
    const renderFrame = (index) => {
      const img = images.at(index);
      if (!img) return;

      const canvasWidth = canvas.width / dpr;
      const canvasHeight = canvas.height / dpr;

      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const x = (canvasWidth - img.width * scale) / 2;
      const y = (canvasHeight - img.height * scale) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Set initial size
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentNode) return;
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      renderFrame(sequenceObj.frame);
    };

    window.addEventListener('resize', resizeCanvas);

    // Frame sequence tracking object
    const sequenceObj = { frame: 0 };
    resizeCanvas();

    // 1. Continuous Canvas Sequence (Scrubbed over the entire pinned area)
    const canvasTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=110%', // Tighter scroll range for quicker frame transitions
        scrub: 2.2,    // Premium visual inertia lag
        pin: true,
        pinSpacing: false, // Let the skills page overlap it
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Scale canvas subtly
          const baseScale = 1.02 + progress * 0.03;
          canvas.style.transform = `scale(${baseScale})`;
        }
      }
    });

    // Animate image sequence frames over first part of the scroll timeline
    canvasTl.to(sequenceObj, {
      frame: activeFrameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 7, // Passes through images quicker
      onUpdate: () => {
        requestAnimationFrame(() => {
          renderFrame(Math.floor(sequenceObj.frame));
        });
      }
    });
    // Pinned idle phase: Hero canvas stays fixed on last frame while next section overlaps
    canvasTl.to({}, { duration: 6 });

    // 2. Scroll-bound Text Fadeout (Fades out left column as user scrolls down)
    const textFadeTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=80%',
        scrub: 0.8
      }
    });

    textFadeTl.to('.hero-text-content', {
      opacity: 0,
      y: -80,
      ease: 'power2.inOut',
      duration: 3
    });

    // 3. Background glow shift on scroll
    const bgTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=110%',
        scrub: 1.0
      }
    });

    bgTl.to(containerRef.current, {
      background: 'radial-gradient(circle at 35% 50%, #ffffff 55%, #f1f5f9 100%)',
      ease: 'none',
      duration: 10
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvasTl.scrollTrigger.kill();
      canvasTl.kill();
      textFadeTl.scrollTrigger.kill();
      textFadeTl.kill();
      bgTl.scrollTrigger.kill();
      bgTl.kill();
    };
  }, [isLoading, images]);

  const headlineLines = [
    "THE FUTURE",
    "STARTS",
    "WITH",
    "ONE LINE",
    "OF CODE"
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      style={{ background: 'radial-gradient(circle at 35% 50%, #ffffff 30%, #e2e8f0 100%)' }}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center select-none bg-white"
    >
      {/* Artwork Canvas Background (Full Screen on all viewports) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center z-0">
        {isLoading && (
          <div className="absolute inset-0 bg-white flex items-center justify-center text-sm font-semibold text-slate-400 z-20">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
          </div>
        )}

        <div className="w-full h-full relative">
          {/* Gentle Floating Wrapper */}
          <motion.div
            className="w-full h-full origin-center"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover pointer-events-none origin-center"
            />
          </motion.div>
        </div>
      </div>

      {/* Content Overlay (Centered on all viewports) */}
      <div
        className="hero-text-content absolute inset-0 w-full h-full flex flex-col justify-center items-center text-center px-6 z-10"
      >
        {/* Headline lines reveals */}
        <div className="flex flex-col gap-1 md:gap-1.5 mb-6 md:mb-8 items-center">
          {headlineLines.map((line, idx) => (
            <div key={idx} className="overflow-hidden flex items-center h-[38px] sm:h-[62px] md:h-[84px] lg:h-[105px] xl:h-[125px]">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.12 + 0.15
                }}
                className="font-black leading-[0.82] tracking-[-1.2px] sm:tracking-[-2px] lg:tracking-[-3px] text-[#111111] text-[8.5vw] sm:text-[7.5vw] md:text-[6vw] lg:text-[100px] xl:text-[120px]"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="text-[14px] sm:text-[17px] md:text-[18px] text-[#666666] leading-relaxed max-w-[340px] sm:max-w-[450px] md:max-w-[550px] font-normal mb-8 md:mb-10 tracking-tight px-2 sm:px-0 text-center"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Designing, building, and deploying scalable digital products that transform ambitious ideas into exceptional user experiences.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <MagneticButton
            href="#projects"
            className="flex items-center justify-center bg-black hover:bg-[#111111] text-white font-semibold rounded-full h-[48px] sm:h-[56px] text-[11px] sm:text-sm px-6 sm:px-8 transition-colors duration-300 select-none cursor-pointer shadow-lg hover:shadow-black/5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore My Work
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="flex items-center justify-center bg-transparent hover:bg-black text-black hover:text-white font-semibold border border-black rounded-full h-[48px] sm:h-[56px] text-[11px] sm:text-sm px-6 sm:px-8 transition-all duration-300 select-none cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Let's Build Together
          </MagneticButton>
        </motion.div>
      </div>

    </section>
  );
}
