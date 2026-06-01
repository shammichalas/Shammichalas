/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Software Engineer Intern",
    company: "Skill Software INC | Delaware, USA",
    period: "AUG 2025 - SEP 2025",
    description: "Built full-stack features, optimized high-load backend pipelines, and integrated AI-driven workflows.",
    highlights: [
      "Built full-stack features with React.js, Next.js, and FastAPI, deploying scalable services via AWS Lambda and Docker.",
      "Optimized backend performance using MongoDB, Redis, and Celery, improving response times for high-load endpoints.",
      "Integrated AI-driven features through prompt engineering, reducing manual processing time significantly.",
      "Collaborated with cross-functional teams to deliver application requirements aligned with business goals."
    ],
    tech: ["React.js", "Next.js", "FastAPI", "AWS Lambda", "Docker", "MongoDB", "Redis", "Celery"],
    glow: 'rgba(249, 115, 22, 0.2)' // Orange glow
  },
  {
    id: 2,
    role: "Full Stack Developer Intern",
    company: "Team InfoSoft | Tirunelveli",
    period: "JUN 2024 - JUL 2024",
    description: "Re-engineered company layouts and dashboard assets, improving consistency and corporate business analytics.",
    highlights: [
      "Redesigned the company home page using React.js and HTML, improving user experience and visual consistency.",
      "Developed interactive Excel dashboards and performed data analysis to extract insights supporting business decisions."
    ],
    tech: ["React.js", "HTML", "Excel Analytics", "UI/UX Design"],
    glow: 'rgba(139, 92, 246, 0.2)' // Purple glow
  }
];

// High-fidelity skill icon mapper for experience cards
const getSkillIcon = (techName) => {
  const icons = {
    "React.js": (
      <svg className="w-3 h-3 text-sky-400" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="0.8" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    "Next.js": (
      <svg className="w-3 h-3 text-white" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="next-mask-timeline" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="white"/>
        </mask>
        <g mask="url(#next-mask-timeline)">
          <circle cx="90" cy="90" r="90" fill="transparent" stroke="currentColor" strokeWidth="12"/>
          <path d="M140 150L95 90V140H80V50H95L132 100V50H145V150H140Z" fill="currentColor"/>
        </g>
      </svg>
    ),
    "FastAPI": (
      <svg className="w-3 h-3 text-[#059669]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 9.429L12.56 16.48a1.2 1.2 0 0 1-1.745.183l-3.791-3.223a1.2 1.2 0 1 1 1.554-1.829l2.766 2.352 4.66-6.388a1.2 1.2 0 1 1 1.948 1.424z"/>
      </svg>
    ),
    "AWS Lambda": (
      <svg className="w-3 h-3 text-orange-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 22l6.2-11.2L17.7 22h3.5L14 8.2l4.8-8.2h-3.5L10.3 8.8 7.2 3H3.7l4.8 8.8L3 22h3.3z" />
      </svg>
    ),
    "Docker": (
      <svg className="w-3 h-3 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 8.18h2.119v-2.12h-2.119zm-2.737 0h2.119v-2.12H11.246zm-2.737 0h2.12v-2.12h-2.12zm-2.737 0h2.119v-2.12H5.772zm2.737-2.738h2.12v-2.12h-2.12zm2.737 0h2.119v-2.12H11.246zm0-2.737h2.119v-2.119h-2.119zm5.474 5.475h2.118v-2.12H16.72zm-2.737-5.475h2.119v-2.119h-2.119zM1.123 9.948c.08.385.25.753.487 1.077.295.39.69.696 1.15.89 2.597 1.09 5.617.9 8.2-.18.73-.3 1.488-.5 2.268-.588.618-.07 1.245-.03 1.854.12 1.344.333 2.5.6 3.65.6.865 0 1.636-.26 2.3-.77.77-.594 1.35-1.5 1.7-2.67.245-.826.37-1.687.37-2.552 0-.256-.008-.51-.026-.763-.095-1.342-.71-2.548-1.68-3.4-.645-.568-1.46-.867-2.29-.844h-.132c-1.07.01-2.115.35-3 .986l-.42.3c-.312.227-.584.498-.81.804l-.24.323c-.347.464-.537 1.026-.54 1.602l.006.5a.65.65 0 0 1-.365.59c-.43.208-.89.344-1.36.4H5.973c-.5.06-1 .212-1.45.45l-.47.24c-.453.238-.838.583-1.12.996L2.31 9.2c-.363.473-.772.845-1.187.747z"/>
      </svg>
    ),
    "MongoDB": (
      <svg className="w-3 h-3 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.15 11.23c-.76-2.58-2.61-4.9-4.52-6.52-.3-.25-.76-.25-1.06 0-2 1.7-3.8 4-4.55 6.57-.76 2.58-.33 5.4 1.25 7.6 1.15 1.6 3 2.65 4.73 3.03.35.08.7.08 1.05 0 1.73-.38 3.58-1.43 4.73-3.03 1.6-2.2 2-5 .25-7.65zM12 18.5a.75.75 0 0 1-.75-.75v-11.5a.75.75 0 0 1 1.5 0v11.5a.75.75 0 0 1-.75.75z"/>
      </svg>
    ),
    "Redis": (
      <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
      </svg>
    ),
    "Celery": (
      <svg className="w-3 h-3 text-violet-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
    ),
    "HTML": (
      <svg className="w-3 h-3 text-orange-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22l10-3 10 3L12 2zm0 3.3l5.8 11.5-5.8-1.7-5.8 1.7L12 5.3z"/>
      </svg>
    ),
    "Excel Analytics": (
      <svg className="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>
    ),
    "UI/UX Design": (
      <svg className="w-3 h-3 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 2 12 22Z" />
        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" />
      </svg>
    )
  };
  return icons[techName] || (
    <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
};

export default function ExperienceTimeline() {

  return (
    <section 
      id="experience" 
      className="relative min-h-screen py-32 px-6 md:px-12 bg-[#02040a] flex flex-col justify-center overflow-hidden z-40 border-t border-white/5 select-none"
    >
      {/* Background fog blurs */}
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[350px] h-[350px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none -z-10" />

      <div 
        className="scroll-section-reveal max-w-5xl mx-auto w-full relative z-10"
      >
        
        {/* Header */}
        <div className="text-center mb-24 max-w-xl mx-auto">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-orange-500 uppercase">
            PROFESSIONAL HISTORY
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-6 tracking-tight leading-tight">
            Engineering Timeline
          </h2>
          <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed">
            Scroll down to trace serverless scaling achievements and high-performance frontend engineering milestones.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative">
          
          {/* Central Glowing Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-900 -translate-x-[1px]">
            {/* The animated growing line inside the timeline */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-orange-500 via-violet-500 to-rose-500 rounded-full origin-top shadow-[0_0_12px_rgba(249,115,22,0.3)]"
            />
          </div>

          <div className="space-y-20">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={exp.id} 
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-slate-950 border-2 border-slate-900 z-20">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="w-3 h-3 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 animate-pulse shadow-glow-orange"
                    />
                  </div>

                  {/* Empty space for grid on opposite side */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Card Content container */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-12%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    {/* Glass Experience Card */}
                    <div 
                      style={{ '--shadow-color': exp.glow }}
                      className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-orange-500/15 card-border-glow transition-all duration-500 relative overflow-hidden bg-slate-950/60 shadow-2xl"
                    >
                      {/* Meta header */}
                      <div className={`flex flex-col sm:flex-row sm:items-center gap-3 mb-4 ${
                        isEven ? 'md:justify-end' : ''
                      }`}>
                        <div className="flex items-center gap-2 text-orange-500 font-display text-xs font-extrabold tracking-widest">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                        <span className="hidden sm:inline text-slate-700">•</span>
                        <span className="font-display text-[10px] tracking-wider text-slate-400 font-bold uppercase">
                          {exp.company}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl font-extrabold text-slate-100 mb-2">
                        {exp.role}
                      </h3>
                      
                      <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                        {exp.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className={`space-y-3 mb-8 ${isEven ? 'md:items-end' : ''} flex flex-col`}>
                        {exp.highlights.map((hl, hlIdx) => (
                          <li 
                            key={hlIdx} 
                            className="flex items-start gap-2.5 text-xs text-slate-300 font-sans leading-relaxed text-left"
                          >
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack pills WITH matching inline SVG icons! */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        {exp.tech.map((t) => (
                          <span 
                            key={t}
                            className="inline-flex items-center gap-1.5 text-[9px] tracking-wider font-extrabold text-slate-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 uppercase transition-colors duration-300 hover:border-orange-500/20"
                          >
                            <span className="w-3.5 h-3.5 flex items-center justify-center scale-90 shrink-0">{getSkillIcon(t)}</span>
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>

                      {/* Subtle floating glow in background */}
                      <div 
                        style={{ backgroundColor: exp.glow }}
                        className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full blur-[25px] opacity-10 pointer-events-none -z-10" 
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Continue the Journey... visual element at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          className="mt-28 flex flex-col items-center justify-center text-center"
        >
          {/* Pulsing down ring */}
          <div className="w-10 h-10 rounded-full border border-orange-500/25 bg-orange-500/5 flex items-center justify-center mb-6 relative">
            <div className="w-3.5 h-3.5 rounded-full bg-orange-500 animate-ping shadow-glow-orange absolute" />
            <div className="w-3.5 h-3.5 rounded-full bg-orange-500 relative" />
          </div>
          
          <h3 className="font-display text-lg font-bold tracking-widest text-slate-200 uppercase mb-2">
            Continue the Journey
          </h3>
          <p className="font-sans text-xs text-slate-500 font-semibold uppercase tracking-wider max-w-xs">
            Scroll down to explore the tech marquee and connect .
          </p>
        </motion.div>

      </div>
    </section>
  );
}
