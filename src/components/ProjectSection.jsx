import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    number: "01",
    category: "AI ENGINE",
    title: "Flint Engine UI & API",
    description: "A live, hardened, and deployed AI thought-compression engine combining a Next.js console with a FastAPI Python pipeline.",
    github: "https://github.com/shammichalas/Flint-UI",
    demo: "https://github.com/shammichalas/Flint-UI",
    showcase: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    preview1: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    preview2: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
  },
  {
    number: "02",
    category: "ASSISTIVE TECH",
    title: "Autism Gesture Monitor",
    description: "A differentiated healthcare platform utilizing gesture and emotion recognition via webcam APIs and neural networks.",
    github: "https://github.com/shammichalas/Emotion-and-Gesture-Monitoring-System-for-Autism-Disorder",
    demo: "https://github.com/shammichalas/Emotion-and-Gesture-Monitoring-System-for-Autism-Disorder",
    showcase: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    preview1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    preview2: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80"
  },
  {
    number: "03",
    category: "COMPUTER VISION",
    title: "Neural Face Attendance",
    description: "A heavyweight computer vision system demonstrating applied machine learning and facial landmarks tracking.",
    github: "https://github.com/shammichalas/Face_attendance-using-ML",
    demo: "https://github.com/shammichalas/Face_attendance-using-ML",
    showcase: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    preview1: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
    preview2: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
  },
  {
    number: "04",
    category: "CONVERSATIONAL AI",
    title: "ChatNest Messaging Core",
    description: "An AI-powered messaging platform running WebSocket connections and context cache pipelines.",
    github: "https://github.com/shammichalas/chatnest",
    demo: "https://github.com/shammichalas/chatnest",
    showcase: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80",
    preview1: "https://images.unsplash.com/photo-1557203567-e852a82c6f71?auto=format&fit=crop&w=600&q=80",
    preview2: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80"
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
