import React from 'react';
import { motion } from 'framer-motion';

const row1Tech = [
  { name: "React.js", glow: 'rgba(56, 189, 248, 0.2)' },
  { name: "Next.js", glow: 'rgba(255, 255, 255, 0.15)' },
  { name: "Python", glow: 'rgba(234, 179, 8, 0.2)' },
  { name: "FastAPI", glow: 'rgba(5, 150, 105, 0.2)' },
  { name: "MongoDB", glow: 'rgba(34, 197, 94, 0.2)' },
  { name: "Docker", glow: 'rgba(14, 165, 233, 0.2)' },
  { name: "AWS Lambda", glow: 'rgba(249, 115, 22, 0.2)' },
  { name: "OpenAI", glow: 'rgba(16, 185, 129, 0.2)' }
];

const row2Tech = [
  { name: "Redis", glow: 'rgba(239, 68, 68, 0.2)' },
  { name: "Celery", glow: 'rgba(167, 139, 250, 0.2)' },
  { name: "Firebase", glow: 'rgba(245, 158, 11, 0.2)' },
  { name: "Node.js", glow: 'rgba(132, 204, 22, 0.2)' },
  { name: "GitHub Actions", glow: 'rgba(255, 255, 255, 0.15)' },
  { name: "IoT Systems", glow: 'rgba(34, 197, 94, 0.2)' },
  { name: "Computer Vision", glow: 'rgba(244, 63, 94, 0.2)' },
  { name: "TailwindCSS", glow: 'rgba(56, 189, 248, 0.2)' }
];

const getMarqueeIcon = (name) => {
  const icons = {
    "React.js": (
      <svg className="w-3.5 h-3.5 text-sky-400" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="0.8" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    "Next.js": (
      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="transparent" stroke="currentColor" strokeWidth="12"/>
        <path d="M140 150L95 90V140H80V50H95L132 100V50H145V150H140Z" fill="currentColor"/>
      </svg>
    ),
    "Python": (
      <svg className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0003 2C10.7417 2 9.53907 2.15556 8.52834 2.45109C5.39414 3.3674 5.37895 5.56844 5.37895 7.15217V8.58696H12.0872C13.5651 8.58696 14.7766 9.85109 14.7766 11.3391V14.6304H18.6214C20.6121 14.6304 22.0003 13.5855 22.0003 11.0543V7.6087C22.0003 4.2407 19.3496 2 12.0003 2ZM7.23439 4.3913C7.75549 4.3913 8.18222 4.81804 8.18222 5.33913C8.18222 5.86022 7.75549 6.28696 7.23439 6.28696C6.71329 6.28696 6.28656 5.86022 6.28656 5.33913C6.28656 4.81804 6.71329 4.3913 7.23439 4.3913ZM5.37895 9.36957C3.38827 9.36957 2.00007 10.4145 2.00007 12.9457V16.3913C2.00007 19.7593 4.65076 22 12.0003 22C13.2589 22 14.4615 21.8444 15.4723 21.5489C18.6065 20.6326 18.6217 18.4316 18.6217 16.8478V15.413H11.9133C10.4354 15.413 9.22396 14.1489 9.22396 12.6609V9.36957H5.37895ZM16.7662 17.7174C17.2873 17.7174 17.714 18.1441 17.714 18.6652C17.714 19.1863 17.2873 19.613 16.7662 19.613C16.2451 19.613 15.8184 19.1863 15.8184 18.6652C15.8184 18.1441 16.2451 17.7174 16.7662 17.7174Z"/>
      </svg>
    ),
    "FastAPI": (
      <svg className="w-3.5 h-3.5 text-[#059669]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 9.429L12.56 16.48a1.2 1.2 0 0 1-1.745.183l-3.791-3.223a1.2 1.2 0 1 1 1.554-1.829l2.766 2.352 4.66-6.388a1.2 1.2 0 1 1 1.948 1.424z"/>
      </svg>
    ),
    "MongoDB": (
      <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.15 11.23c-.76-2.58-2.61-4.9-4.52-6.52-.3-.25-.76-.25-1.06 0-2 1.7-3.8 4-4.55 6.57-.76 2.58-.33 5.4 1.25 7.6 1.15 1.6 3 2.65 4.73 3.03.35.08.7.08 1.05 0 1.73-.38 3.58-1.43 4.73-3.03 1.6-2.2 2-5 .25-7.65zM12 18.5a.75.75 0 0 1-.75-.75v-11.5a.75.75 0 0 1 1.5 0v11.5a.75.75 0 0 1-.75.75z"/>
      </svg>
    ),
    "Docker": (
      <svg className="w-3.5 h-3.5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.983 8.18h2.119v-2.12h-2.119zm-2.737 0h2.119v-2.12H11.246zm-2.737 0h2.12v-2.12h-2.12zm-2.737 0h2.119v-2.12H5.772zm2.737-2.738h2.12v-2.12h-2.12zm2.737 0h2.119v-2.12H11.246zm0-2.737h2.119v-2.119h-2.119zm5.474 5.475h2.118v-2.12H16.72zm-2.737-5.475h2.119v-2.119h-2.119zM1.123 9.948c.08.385.25.753.487 1.077.295.39.69.696 1.15.89 2.597 1.09 5.617.9 8.2-.18.73-.3 1.488-.5 2.268-.588.618-.07 1.245-.03 1.854.12 1.344.333 2.5.6 3.65.6.865 0 1.636-.26 2.3-.77.77-.594 1.35-1.5 1.7-2.67.245-.826.37-1.687.37-2.552 0-.256-.008-.51-.026-.763-.095-1.342-.71-2.548-1.68-3.4-.645-.568-1.46-.867-2.29-.844h-.132c-1.07.01-2.115.35-3 .986l-.42.3c-.312.227-.584.498-.81.804l-.24.323c-.347.464-.537 1.026-.54 1.602l.006.5a.65.65 0 0 1-.365.59c-.43.208-.89.344-1.36.4H5.973c-.5.06-1 .212-1.45.45l-.47.24c-.453.238-.838.583-1.12.996L2.31 9.2c-.363.473-.772.845-1.187.747z"/>
      </svg>
    ),
    "AWS Lambda": (
      <svg className="w-3.5 h-3.5 text-orange-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3 22l6.2-11.2L17.7 22h3.5L14 8.2l4.8-8.2h-3.5L10.3 8.8 7.2 3H3.7l4.8 8.8L3 22h3.3z" />
      </svg>
    ),
    "OpenAI": (
      <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.7 10.3c.3-.5.4-1.2.2-1.8-.2-.6-.7-1.1-1.3-1.3l-1.8-.6c.2-.6.1-1.3-.2-1.9-.3-.5-.9-.9-1.5-1l-1.8-.1c-.1-.7-.6-1.2-1.2-1.5-.6-.3-1.3-.2-1.9.1l-1.6.9c-.5-.3-1.2-.4-1.8-.2-.6.2-1.1.7-1.3 1.3l-.6 1.8c-.6-.2-1.3-.1-1.9.2-.5.3-.9.9-1 1.5l-.1 1.8c-.7.1-1.2.6-1.5 1.2-.3.6-.2 1.3.1 1.9l.9 1.6c-.3.5-.4 1.2-.2 1.8.2.6.7 1.1 1.3 1.3l1.8.6c-.2.6-.1 1.3.2 1.9.3.5.9.9 1.5 1l1.8.1c.1.7.6 1.2 1.2 1.5.6.3 1.3.2 1.9-.1l1.6-.9c.5.3 1.2.4 1.8.2.6-.2 1.1-.7 1.3-1.3l.6-1.8c.6.2 1.3.1 1.9-.2.5-.3.9-.9 1-1.5l.1-1.8c.7-.1 1.2-.6 1.5-1.2.3-.6.2-1.3-.1-1.9l-.9-1.6zM12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    ),
    "Redis": (
      <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
      </svg>
    ),
    "Celery": (
      <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
    ),
    "Firebase": (
      <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm6.7 14.1L12 20l-6.7-3.9V7.9L12 4l6.7 3.9v8.2z"/>
      </svg>
    ),
    "Node.js": (
      <svg className="w-3.5 h-3.5 text-lime-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2zm6.7 14.1L12 20l-6.7-3.9V7.9L12 4l6.7 3.9v8.2z"/>
      </svg>
    ),
    "GitHub Actions": (
      <svg className="w-3.5 h-3.5 text-slate-100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
      </svg>
    ),
    "IoT Systems": (
      <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
    "Computer Vision": (
      <svg className="w-3.5 h-3.5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" />
        <path d="M3 12c4 1.5 6 3 9 3s5-1.5 9-3c-4-1.5-6-3-9-3s-5 1.5-9 3z" />
      </svg>
    ),
    "TailwindCSS": (
      <svg className="w-3.5 h-3.5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
      </svg>
    )
  };
  return icons[name] || null;
};

export default function TechMarquee() {
  return (
    <section 
      className="relative py-24 bg-[#04060d] border-t border-b border-white/5 overflow-hidden select-none z-40"
    >
      {/* 3D cylindrical container styling */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-6 relative"
        style={{
          perspective: 1200,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* Custom CSS for infinite sliding loops */}
        <style>{`
          @keyframes marquee-left {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes marquee-right {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .animate-slide-left {
            animation: marquee-left 25s linear infinite;
          }
          .animate-slide-right {
            animation: marquee-right 25s linear infinite;
          }
          .marquee-perspective-row-1 {
            transform: rotateX(8deg) rotateY(-4deg) skewX(-2deg);
          }
          .marquee-perspective-row-2 {
            transform: rotateX(-8deg) rotateY(4deg) skewX(2deg);
          }
        `}</style>

        {/* Lane 1: Slides Leftward */}
        <div className="w-full overflow-hidden flex mask-gradient-x marquee-perspective-row-1">
          <div className="flex gap-4 animate-slide-left whitespace-nowrap py-2">
            
            {/* Double list to create infinite seamless wrap */}
            {[...row1Tech, ...row1Tech].map((tech, idx) => (
              <div
                key={idx}
                style={{ 
                  '--shadow-glow': tech.glow,
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/5 bg-slate-950/75 backdrop-blur-md font-display text-xs font-extrabold tracking-widest text-slate-300 hover:text-slate-100 hover:border-orange-500/20 card-border-glow transition-all duration-500 cursor-pointer uppercase shadow-2xl"
              >
                <span className="shrink-0 flex items-center justify-center">{getMarqueeIcon(tech.name)}</span>
                <span>{tech.name}</span>
              </div>
            ))}

          </div>
        </div>

        {/* Lane 2: Slides Rightward */}
        <div className="w-full overflow-hidden flex mask-gradient-x marquee-perspective-row-2">
          <div className="flex gap-4 animate-slide-right whitespace-nowrap py-2">
            
            {[...row2Tech, ...row2Tech].map((tech, idx) => (
              <div
                key={idx}
                style={{ 
                  '--shadow-glow': tech.glow,
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/5 bg-slate-950/75 backdrop-blur-md font-display text-xs font-extrabold tracking-widest text-slate-300 hover:text-slate-100 hover:border-orange-500/20 card-border-glow transition-all duration-500 cursor-pointer uppercase shadow-2xl"
              >
                <span className="shrink-0 flex items-center justify-center">{getMarqueeIcon(tech.name)}</span>
                <span>{tech.name}</span>
              </div>
            ))}

          </div>
        </div>

      </motion.div>

      {/* Visual fading margins at left and right of marquee */}
      <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-[#04060d] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-[#04060d] to-transparent pointer-events-none z-10" />
    </section>
  );
}
