import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    number: "01",
    company: "Team InfoSoft",
    role: "Full Stack Developer Intern",
    period: "Jun 2024 — Jul 2024",
    description: "Redesigned the company's production website with a modern user interface and improved visual consistency. Developed interactive business dashboards using React.js while delivering production-ready frontend components focused on performance, usability, and responsive design."
  },
  {
    number: "02",
    company: "Skill Software INC",
    role: "Software Engineer Intern",
    period: "Aug 2025 — Sep 2025",
    description: "Optimized backend performance by improving API response times using MongoDB indexing and Redis caching, achieving up to 40% lower latency. Built AI-powered automation workflows, contributed to FastAPI services, and collaborated on scalable serverless cloud infrastructure."
  }
];

const ScrollCharacter = ({ char, index, total, progress }) => {
  const start = index / total;
  // This controls the stagger speed. A span of 0.15 makes characters fade in smoothly in groups
  const end = Math.min(1, start + 0.15);

  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const blurVal = useTransform(progress, [start, end], [2, 0]);
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);
  const y = useTransform(progress, [start, end], [6, 0]);

  return (
    <motion.span 
      style={{ opacity, filter, y }} 
      className="inline-block"
    >
      {char}
    </motion.span>
  );
};

const ScrollParagraph = ({ text }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });

  // Calculate words and split them into character components
  let charCounter = 0;
  const words = text.split(" ").map((word) => {
    const startIndex = charCounter;
    charCounter += word.length + 1; // plus space
    return { word, startIndex };
  });
  const totalChars = charCounter - 1;

  return (
    <p 
      ref={ref}
      className="font-light text-[#0c0c0ced] leading-relaxed max-w-2xl flex flex-wrap"
      style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
    >
      {words.map(({ word, startIndex }, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIdx) => {
            const globalIndex = startIndex + charIdx;
            return (
              <ScrollCharacter
                key={globalIndex}
                char={char}
                index={globalIndex}
                total={totalChars}
                progress={scrollYProgress}
              />
            );
          })}
          {/* Spacing gap between words */}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </p>
  );
};

export default function ExperienceTimeline() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="experience"
      className="relative z-[60] bg-white text-[#0C0C0C] border-t border-black/5 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <h2 
          className="text-center font-display font-black uppercase text-[#0C0C0C] leading-none mb-16 sm:mb-20 md:mb-28 tracking-tighter"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>

        {/* List of items */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full flex flex-col"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.number}
              variants={itemVariants}
              whileHover={{ x: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="group flex flex-col md:flex-row items-start gap-6 md:gap-16 py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 last:border-b-0 transition-colors duration-300 hover:border-[#0C0C0C]/40"
            >
              {/* Left Side: Huge Number */}
              <motion.span 
                variants={numberVariants}
                className="font-display font-black text-[#0C0C0C] leading-none select-none tracking-tighter shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {exp.number}
              </motion.span>

              {/* Right Side: Details */}
              <div className="flex-grow space-y-4 md:space-y-6">
                <div>
                  <h3 
                    className="font-display font-medium text-[#0C0C0C] uppercase leading-tight tracking-tight"
                    style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
                  >
                    {exp.company}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mt-1 sm:mt-2 text-sm">
                    <span className="font-semibold text-[#555555]">
                      {exp.role}
                    </span>
                    <span className="hidden sm:inline text-black/20">•</span>
                    <span className="font-light text-black/60">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Description - Character Scroll-Driven Reveal */}
                <ScrollParagraph text={exp.description} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
