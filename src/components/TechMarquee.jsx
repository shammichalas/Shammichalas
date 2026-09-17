/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React from 'react';
import { motion } from 'framer-motion';

const row1Tech = [
  { name: "JavaScript", icon: "js", glow: 'rgba(247, 223, 30, 0.25)' },
  { name: "TypeScript", icon: "ts", glow: 'rgba(49, 120, 198, 0.25)' },
  { name: "Python", icon: "python", glow: 'rgba(55, 118, 171, 0.25)' },
  { name: "Java", icon: "java", glow: 'rgba(234, 45, 46, 0.25)' },
  { name: "C#", icon: "cs", glow: 'rgba(155, 79, 150, 0.25)' },
  { name: "C", icon: "c", glow: 'rgba(0, 89, 156, 0.25)' },
  { name: "React", icon: "react", glow: 'rgba(97, 218, 251, 0.25)' },
  { name: "Next.js", icon: "nextjs", glow: 'rgba(255, 255, 255, 0.2)' },
  { name: "FastAPI", icon: "fastapi", glow: 'rgba(5, 150, 105, 0.25)' },
  { name: "Node.js", icon: "nodejs", glow: 'rgba(83, 158, 67, 0.25)' },
  { name: ".NET", icon: "dotnet", glow: 'rgba(81, 43, 212, 0.25)' },
  { name: "Spring", icon: "spring", glow: 'rgba(109, 179, 63, 0.25)' },
  { name: "Django", icon: "django", glow: 'rgba(9, 46, 32, 0.3)' },
  { name: "HTML5", icon: "html", glow: 'rgba(227, 76, 38, 0.25)' },
  { name: "CSS3", icon: "css", glow: 'rgba(21, 114, 182, 0.25)' }
];

const row2Tech = [
  { name: "MongoDB", icon: "mongodb", glow: 'rgba(71, 162, 72, 0.25)' },
  { name: "PostgreSQL", icon: "postgres", glow: 'rgba(51, 103, 145, 0.25)' },
  { name: "MySQL", icon: "mysql", glow: 'rgba(0, 117, 143, 0.25)' },
  { name: "Redis", icon: "redis", glow: 'rgba(220, 56, 45, 0.25)' },
  { name: "Supabase", icon: "supabase", glow: 'rgba(62, 207, 142, 0.25)' },
  { name: "Firebase", icon: "firebase", glow: 'rgba(255, 202, 40, 0.25)' },
  { name: "Docker", icon: "docker", glow: 'rgba(36, 150, 237, 0.25)' },
  { name: "AWS", icon: "aws", glow: 'rgba(255, 153, 0, 0.25)' },
  { name: "GitHub Actions", icon: "githubactions", glow: 'rgba(32, 136, 255, 0.25)' },
  { name: "Git", icon: "git", glow: 'rgba(240, 80, 50, 0.25)' },
  { name: "GitHub", icon: "github", glow: 'rgba(255, 255, 255, 0.2)' },
  { name: "Figma", icon: "figma", glow: 'rgba(242, 78, 30, 0.25)' },
  { name: "VS Code", icon: "vscode", glow: 'rgba(0, 122, 204, 0.25)' }
];

export default function TechMarquee() {
  return (
    <section 
      id="tech-stack"
      className="relative py-24 bg-[#04060d] border-t border-b border-white/5 overflow-hidden select-none z-40"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-10 relative"
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
            animation: marquee-left 35s linear infinite;
          }
          .animate-slide-left:hover, .animate-slide-right:hover {
            animation-play-state: paused;
          }
          .animate-slide-right {
            animation: marquee-right 35s linear infinite;
          }
          .marquee-perspective-row-1 {
            transform: rotateX(6deg) rotateY(-3deg) skewX(-1.5deg);
          }
          .marquee-perspective-row-2 {
            transform: rotateX(-6deg) rotateY(3deg) skewX(1.5deg);
          }
        `}</style>

        {/* Lane 1: Languages & Frameworks (Slides Leftward) */}
        <div className="w-full overflow-hidden flex mask-gradient-x marquee-perspective-row-1">
          <div className="flex gap-4 animate-slide-left whitespace-nowrap py-2">
            {[...row1Tech, ...row1Tech].map((tech, idx) => (
              <div
                key={idx}
                style={{ 
                  '--shadow-glow': tech.glow,
                }}
                className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl font-display text-xs font-bold tracking-wider text-slate-200 hover:text-white hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl group"
              >
                <img
                  src={`https://skillicons.dev/icons?i=${tech.icon}`}
                  alt={`${tech.name} icon`}
                  className="w-7 h-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                  loading="lazy"
                />
                <span className="font-mono text-sm tracking-wide">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lane 2: Databases, DevOps & Cloud (Slides Rightward) */}
        <div className="w-full overflow-hidden flex mask-gradient-x marquee-perspective-row-2">
          <div className="flex gap-4 animate-slide-right whitespace-nowrap py-2">
            {[...row2Tech, ...row2Tech].map((tech, idx) => (
              <div
                key={idx}
                style={{ 
                  '--shadow-glow': tech.glow,
                }}
                className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl font-display text-xs font-bold tracking-wider text-slate-200 hover:text-white hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl group"
              >
                <img
                  src={`https://skillicons.dev/icons?i=${tech.icon}`}
                  alt={`${tech.name} icon`}
                  className="w-7 h-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                  loading="lazy"
                />
                <span className="font-mono text-sm tracking-wide">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* High Quality Combined Skill Icons Strip Display */}
        <div className="mt-6 flex flex-col items-center gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl">
          <p className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">
            Complete Core Technology Matrix
          </p>
          <div className="flex flex-col items-center gap-4 w-full overflow-x-auto py-2 px-4 no-scrollbar">
            <img 
              src="https://skillicons.dev/icons?i=js,ts,python,java,cs,c,react,nextjs,fastapi,nodejs,dotnet,spring,django,html,css&perline=8" 
              alt="Core Languages & Frameworks Stack" 
              className="h-auto max-w-full rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
            />
            <img 
              src="https://skillicons.dev/icons?i=mongodb,postgres,mysql,redis,supabase,firebase,docker,aws,githubactions,git,github,figma,vscode&perline=8" 
              alt="Databases, Cloud & Tools Stack" 
              className="h-auto max-w-full rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>

      </motion.div>

      {/* Visual fading margins at left and right of marquee */}
      <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-[#04060d] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-[#04060d] to-transparent pointer-events-none z-10" />
    </section>
  );
}

