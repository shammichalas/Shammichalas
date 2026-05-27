import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Defined card coordinates relative to viewport (%)
const connectionNodes = [
  { id: 'react', label: 'React.js', x: 15, y: 22, controlOffset: { x: 50, y: -20 } },
  { id: 'next', label: 'Next.js', x: 12, y: 52, controlOffset: { x: 40, y: 10 } },
  { id: 'python', label: 'Python', x: 26, y: 72, controlOffset: { x: 20, y: 10 } },
  { id: 'fastapi', label: 'FastAPI', x: 30, y: 18, controlOffset: { x: 10, y: -30 } },
  { id: 'mongodb', label: 'MongoDB', x: 70, y: 16, controlOffset: { x: -10, y: -30 } },
  { id: 'aws', label: 'AWS', x: 74, y: 72, controlOffset: { x: -20, y: 10 } },
  { id: 'docker', label: 'Docker', x: 88, y: 50, controlOffset: { x: -40, y: 10 } },
  { id: 'openai', label: 'OpenAI', x: 85, y: 20, controlOffset: { x: -50, y: -20 } }
];

export default function ConnectionLines() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null; // Performance Fallback: Hide connections on mobile to preserve layout sanity

  // Anchor is the central sitting silhouette character (bottom center)
  const anchorX = dimensions.width * 0.5;
  const anchorY = dimensions.height * 0.72;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[30] mix-blend-screen overflow-hidden"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      style={{ width: '100vw', height: '100vh' }}
    >
      <defs>
        {/* Glow Filters */}
        <filter id="glow-orange-svg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-purple-svg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Gradients */}
        <linearGradient id="grad-orange-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="grad-purple-orange" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Silhouette Central Glow Anchor node */}
      <circle
        cx={anchorX}
        cy={anchorY}
        r="6"
        fill="#f97316"
        className="animate-pulse"
        filter="url(#glow-orange-svg)"
        opacity="0.6"
      />
      <circle
        cx={anchorX}
        cy={anchorY}
        r="14"
        stroke="#8b5cf6"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        className="animate-ping"
        style={{ animationDuration: '3s' }}
      />

      {/* Curved Glowing Interconnection Lines */}
      {connectionNodes.map((node, index) => {
        const targetX = dimensions.width * (node.x / 100);
        const targetY = dimensions.height * (node.y / 100);

        // Control point calculation for smooth S-curves or Quadratic Bezier curves
        // Creating organic bezier shapes using the control offsets
        const ctrlX = anchorX + (targetX - anchorX) * 0.5 + node.controlOffset.x;
        const ctrlY = anchorY + (targetY - anchorY) * 0.5 + node.controlOffset.y;

        const pathData = `M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY} ${targetX} ${targetY}`;
        const gradientId = index % 2 === 0 ? 'grad-orange-purple' : 'grad-purple-orange';
        const filterId = index % 2 === 0 ? 'url(#glow-orange-svg)' : 'url(#glow-purple-svg)';

        return (
          <g key={node.id}>
            {/* The main static connector line with soft fade */}
            <path
              d={pathData}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="1.2"
              opacity="0.25"
            />

            {/* Glowing animated pulse traveling down the line */}
            <motion.path
              d={pathData}
              fill="none"
              stroke={index % 2 === 0 ? '#f97316' : '#a78bfa'}
              strokeWidth="2.5"
              filter={filterId}
              opacity="0.85"
              initial={{ pathLength: 0.1, pathOffset: 0 }}
              animate={{ 
                pathOffset: [0, 1.2],
                pathLength: [0.05, 0.15, 0.05]
              }}
              transition={{
                duration: 6 + index * 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Subtle joint marker glow near card */}
            <circle
              cx={targetX}
              cy={targetY}
              r="3"
              fill={index % 2 === 0 ? '#fbbf24' : '#c084fc'}
              opacity="0.8"
              filter={filterId}
            />
          </g>
        );
      })}
    </svg>
  );
}
