import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const metricsData = [
  { id: 'projects', label: 'Full Stack Creations', target: 4, suffix: '+', desc: 'Asynchronous full stack applications built with FastAPI, Node, and React.' },
  { id: 'patent', label: 'Published Patents', target: 1, suffix: ' (Eco-Well)', desc: 'Exclusive bio-telemetry design patent merging eco sensors and workspace interfaces.' },
  { id: 'frames', label: 'Cinematic Scroll Frames', target: 40, suffix: ' Frames', desc: 'Preloaded image sequence frames rendered dynamically on canvas scrub.' },
  { id: 'deploys', label: 'Serverless Functions', target: 10000, suffix: '+ Execs', desc: 'Asynchronous event triggers scaling automatically via AWS Lambda.' },
  { id: 'aisystems', label: 'AI Integrated Modules', target: 5, suffix: '+ Systems', desc: 'Model architectures supporting context cache mappings and prompt optimizations.' }
];

function CountUpItem({ target, suffix, label, desc }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // 1.8s count duration
    const end = parseInt(target);
    if (end === 0) return;

    // Linear speed throttle: smaller intervals for large numbers
    const increment = end > 500 ? Math.ceil(end / 40) : 1;
    const stepTime = Math.max(10, Math.floor(duration / (end / increment)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  // Format numbers for clean presentation (e.g. 10k instead of 10000 if preferred, or direct)
  const formatNum = (val) => {
    if (val >= 10000) {
      return (val / 1000).toFixed(0) + 'k';
    }
    return val;
  };

  return (
    <div 
      ref={ref}
      className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-orange-500/20 card-border-glow transition-all duration-500 bg-slate-950/45 flex flex-col justify-between h-full"
    >
      <div>
        <div className="font-display text-4xl md:text-5xl font-extrabold text-white mb-2 flex items-baseline gap-0.5 justify-center">
          <span>{formatNum(count)}</span>
          <span className="text-orange-500 text-2xl font-bold">{suffix}</span>
        </div>
        <h4 className="font-display text-[11px] tracking-wider text-slate-400 font-extrabold uppercase mb-4 text-center">
          {label}
        </h4>
      </div>
      <p className="font-sans text-slate-500 text-xs leading-relaxed text-center font-medium border-t border-white/5 pt-4">
        {desc}
      </p>
    </div>
  );
}

export default function AchievementMetrics() {
  return (
    <section 
      className="relative py-32 px-6 md:px-12 bg-[#02040a] z-40 border-t border-white/5 select-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-xl mx-auto">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-orange-500 uppercase">
            ENGINEERING METRICS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-6 tracking-tight leading-tight">
            System Telemetry
          </h2>
          <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed">
            Measuring the structural bandwidth of AI deployments, patents, graphics frames, and full-stack creations.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {metricsData.map((m) => (
            <CountUpItem
              key={m.id}
              target={m.target}
              suffix={m.suffix}
              label={m.label}
              desc={m.desc}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
