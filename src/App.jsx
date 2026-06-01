import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillsGalaxy from './components/SkillsGalaxy';
import ExperienceTimeline from './components/ExperienceTimeline';
import FeaturedProjects from './components/FeaturedProjects';
import TechMarquee from './components/TechMarquee';
import ContactTerminal from './components/ContactTerminal';
import BackgroundParticles from './components/BackgroundParticles';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [particleMode, setParticleMode] = useState('embers');

  // Initialize Lenis and set up background evolution bindings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const gsapTickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Call ScrollTrigger.refresh() immediately after Lenis is configured
    ScrollTrigger.refresh();

    // Dynamic Background & Particle Evolution System using ScrollTriggers
    // Monitors section bounds and transitions particle generator modes
    const triggerConfigs = [
      { id: 'home', mode: 'embers' },
      { id: 'skills', mode: 'stars' },
      { id: 'projects', mode: 'neural' },
      { id: 'experience', mode: 'stars' },
      { id: 'contact', mode: 'dust' }
    ];

    const triggers = triggerConfigs.map(config => {
      return ScrollTrigger.create({
        trigger: `#${config.id}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setParticleMode(config.mode),
        onEnterBack: () => setParticleMode(config.mode)
      });
    });

    // Centralized GSAP upward scroll-linked reveal motion for each section
    const reveals = gsap.utils.toArray('.scroll-section-reveal').map((el) => {
      return gsap.fromTo(el,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.97
        },
        {
          y: 0, 
          opacity: 1,
          scale: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 65%',
            scrub: 1.2, // buttery smooth scrub motion following the scroll velocity
          }
        }
      );
    });

    return () => {
      gsap.ticker.remove(gsapTickerCallback);
      lenis.destroy();
      triggers.forEach(t => t.kill());
      reveals.forEach(r => {
        if (r.scrollTrigger) r.scrollTrigger.kill();
        r.kill();
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-300">
      
      {/* Global Navbar */}
      <Navbar />

      {/* Dynamic Background Particle System changing modes on ScrollTrigger boundaries */}
      <BackgroundParticles mode={particleMode} />

      {/* 1. Cinematic Canvas Scrub Hero Section */}
      <HeroSection />

      {/* 1.5. Layout Overlap Spacer for Hero to Skills Transition */}
      <div className="h-screen w-full pointer-events-none bg-slate-950" />

      {/* 2. Concentric 3D Skills Galaxy Nodes */}
      <SkillsGalaxy />

      {/* 3. Large Project Miniature Sandbox Showcase */}
      <FeaturedProjects />

      {/* 4. Futuristic Scroll Timeline Experience */}
      <ExperienceTimeline />

      {/* 5. Double Lane Tech Stream Marquee */}
      <TechMarquee />

      {/* 6. CLI Command Contact Terminal */}
      <ContactTerminal />

      {/* 10. Minimal Cinematic Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#02040a] text-center text-xs text-slate-500 font-sans z-40 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© 2026 Sham Michalas. Co-creating the digital horizon.</p>
          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest font-bold">
            <span className="text-orange-500">React</span>
            <span className="text-violet-500">Tailwind</span>
            <span className="text-rose-500">GSAP</span>
            <span className="text-sky-500">Framer Motion</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
