import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    number: "01",
    category: "AI DOCUMENT INTELLIGENCE",
    title: "Flint",
    description: "A full-stack AI document intelligence platform processing PDFs into multi-level summaries, semantic vector search, and spaced repetition quizzes using Google Gemini API with parallel async processing.",
    github: "https://github.com/shammichalas/Flint-UI",
    demo: "https://flintn.netlify.app",
    showcase: "/projects/flint_showcase.png",
    preview1: "/projects/flint_p1.png",
    preview2: "/projects/flint_p2.png"
  },
  {
    number: "02",
    category: "REAL-TIME MANAGEMENT",
    title: "CafeSphere",
    description: "A Clean Architecture real-time cafe management platform powering POS, Kitchen Display, Inventory, Reservations, and SignalR order pipeline behind JWT-secured APIs.",
    github: "https://github.com/shammichalas",
    demo: "https://cafespheree.netlify.app",
    showcase: "/projects/chatnest_showcase.png",
    preview1: "/projects/chatnest_p1.png",
    preview2: "/projects/chatnest_p2.png"
  },
  {
    number: "03",
    category: "HUMAN RESOURCE CORE",
    title: "HRMS Portal",
    description: "A modular HRMS covering employee lifecycle, attendance, leave, and payroll built with Spring Boot, React 19 + TypeScript, PostgreSQL, and role-based JWT auth.",
    github: "https://github.com/shammichalas",
    demo: "https://workforhub.netlify.app",
    showcase: "/projects/attendance_showcase.png",
    preview1: "/projects/attendance_p1.png",
    preview2: "/projects/attendance_p2.png"
  },
  {
    number: "04",
    category: "RECIPE SYSTEM",
    title: "Cookbook Studio",
    description: "A Django cookbook and recipe platform with chef profiles, comments, recommendations, and PDF cookbook generator utilizing ReportLab.",
    github: "https://github.com/shammichalas",
    demo: "https://github.com/shammichalas",
    showcase: "/projects/autism_showcase.png",
    preview1: "/projects/autism_p1.png",
    preview2: "/projects/autism_p2.png"
  }
];

const ProjectCard = ({ project, index, totalCards, scrollYProgress }) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  
  // Calculate specific scroll progress range for scaling down this card
  // totalCards = 4, so there are 3 transitions: 0 -> 0.33, 0.33 -> 0.66, 0.66 -> 1.0
  const step = 1 / (totalCards - 1);
  const start = index * step;
  const end = (index + 1) * step;

  // Animate card scale as it gets covered by the next scrolling card
  const scale = useTransform(
    scrollYProgress, 
    [start, index === totalCards - 1 ? start + 1 : end], 
    [1, targetScale],
    { clamp: true }
  );

  return (
    <div
      style={{
        position: 'sticky',
        top: `calc(var(--sticky-offset, 96px) + ${index * 28}px)`,
        zIndex: 10 + index,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center'
        }}
        className="project-card"
      >
        {/* Top Row: Number, Category, Title, and Live Project Button */}
        <div className="flex items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-4 sm:pb-5">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            {/* Outlined Huge Number */}
            <span className="project-number">
              {project.number}
            </span>
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/60 mb-0.5 truncate">
                {project.category}
              </span>
              <h3 className="font-display text-base sm:text-xl md:text-3xl font-extrabold text-white leading-tight truncate">
                {project.title}
              </h3>
            </div>
          </div>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-live-btn group"
          >
            <span>LIVE PROJECT</span>
            <ExternalLink className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Bottom Row: Two-Column Image Grid */}
        <div className="project-grid">
          {/* Left Column (40% width) - 2 Stacked Images */}
          <div className="project-grid-left">
            <div 
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="project-image-container group shrink-0"
            >
              <img
                src={project.preview1}
                alt={`${project.title} Preview 1`}
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div 
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="project-image-container group flex-grow"
            >
              <img
                src={project.preview2}
                alt={`${project.title} Preview 2`}
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Right Column (60% width) - 1 Tall Image */}
          <div className="project-grid-right">
            <div className="project-image-container group flex-grow h-full">
              <img
                src={project.showcase}
                alt={`${project.title} Showcase`}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProjectSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="projects" 
      className="project-section px-4 md:px-12 py-24 sm:py-28"
    >
      {/* Centered Large Header */}
      <h2 
        className="text-center font-display font-black leading-none tracking-tighter mb-20 md:mb-24 gradient-text-sunset uppercase"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 110px)' }}
      >
        Project
      </h2>

      {/* Cards Stack Wrapper */}
      <div 
        ref={containerRef}
        className="w-full max-w-7xl flex flex-col items-center relative gap-[50vh] pb-[30vh]"
      >
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.number} 
            project={project} 
            index={index} 
            totalCards={projects.length} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
