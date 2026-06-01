/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, Users2 } from 'lucide-react';

export default function AboutPhilosophy() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let nodes = [];
    const maxNodes = window.innerWidth < 768 ? 12 : 25;

    const handleCanvasResize = () => {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = Math.max(300, rect.height);
    };
    handleCanvasResize();
    window.addEventListener('resize', handleCanvasResize);

    // Mouse positions
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    canvas.addEventListener('mouseleave', handleMouseLeave);

    class Node {
      constructor(id) {
        this.id = id;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.radius = Math.random() * 2 + 1.5;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.01 + 0.005;
        this.range = Math.random() * 8 + 4; // drift range
        this.hue = 265; // purple
        this.glow = 0;
        this.sparks = [];
      }

      update() {
        this.angle += this.speed;
        this.x = this.baseX + Math.cos(this.angle) * this.range;
        this.y = this.baseY + Math.sin(this.angle) * this.range;

        // Proximity to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          this.glow += (1 - this.glow) * 0.1; // quickly light up
          
          // Chance to trigger electrical spark along links
          if (Math.random() < 0.015 && this.sparks.length < 3) {
            const nearest = this.getNearestNodes();
            if (nearest.length > 0) {
              const target = nearest[Math.floor(Math.random() * nearest.length)];
              this.sparks.push({
                progress: 0,
                target: target,
                speed: 0.04 + Math.random() * 0.02
              });
            }
          }
        } else {
          this.glow += (0 - this.glow) * 0.05; // slowly dim
        }

        // Update active sparks
        this.sparks.forEach((spark, index) => {
          spark.progress += spark.speed;
          if (spark.progress >= 1) {
            this.sparks.splice(index, 1);
          }
        });
      }

      getNearestNodes() {
        return nodes
          .filter(n => n.id !== this.id)
          .map(n => {
            const dx = n.x - this.x;
            const dy = n.y - this.y;
            return { node: n, dist: Math.sqrt(dx * dx + dy * dy) };
          })
          .filter(item => item.dist < 160)
          .map(item => item.node);
      }

      draw() {
        // Draw connected lines first
        const nearest = this.getNearestNodes();
        nearest.forEach(target => {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(target.x, target.y);
          
          const maxGlow = Math.max(this.glow, target.glow);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.03 + maxGlow * 0.12})`;
          ctx.lineWidth = 0.5 + maxGlow * 0.8;
          ctx.stroke();
        });

        // Draw traveling sparks
        this.sparks.forEach(spark => {
          const sx = this.x + (spark.target.x - this.x) * spark.progress;
          const sy = this.y + (spark.target.y - this.y) * spark.progress;

          ctx.beginPath();
          ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#f97316'; // Orange spark dot
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow immediately
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + this.glow * 1.5, 0, Math.PI * 2);
        
        ctx.shadowColor = isMobile ? 'transparent' : '#8b5cf6';
        ctx.shadowBlur = this.glow * 12;
        ctx.fillStyle = this.glow > 0.3 
          ? `hsla(25, 95%, 60%, ${0.5 + this.glow * 0.5})` // glows orange when mouse close
          : `rgba(139, 92, 246, ${0.35 + this.glow * 0.45})`; // standard purple
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize nodes
    for (let i = 0; i < maxNodes; i++) {
      nodes.push(new Node(i));
    }

    // Loop
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 4, 10, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.update();
        n.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleCanvasResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-32 px-6 md:px-12 bg-[#02040a] flex flex-col justify-center overflow-hidden z-40 border-t border-white/5 select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Column: Storytelling narrative */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-10">
            <span className="font-display text-xs font-bold tracking-[0.25em] text-orange-500 uppercase">
              PHILOSOPHICAL ANCHOR
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-6 leading-tight">
              Why I Build
            </h2>
            <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-medium">
              Technology shouldn't feel like cold, mechanical calculations. I design intelligent web environments where biological human experience and robust neural code align seamlessly.
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase mb-1">Human-first Design</h4>
                <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed">
                  Websites are living portals. Every micro-animation and scroll physics transition is curated to respect cognitive boundaries and spark curiosity.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase mb-1">Clean System Performance</h4>
                <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed">
                  Handcrafting optimal code architectures. Bypassing heavy unnecessary templates to build high-performance canvas layers and asynchronous serverless APIs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                <Users2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase mb-1">Eco Sustainability</h4>
                <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed">
                  Engineering practical IoT eco grids. Pioneering systems like the patented Eco-Well proto to actively combine technology and organic well-being.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Neural Network Canvas */}
        <div className="w-full lg:w-1/2 min-h-[350px] sm:min-h-[420px] rounded-3xl border border-white/5 bg-slate-950/40 relative overflow-hidden flex items-stretch">
          <canvas
            ref={canvasRef}
            className="w-full flex-grow cursor-pointer"
          />
          {/* Subtle glowing panel indicator */}
          <div className="absolute top-4 right-4 text-[8px] font-mono text-slate-600 font-extrabold tracking-widest uppercase pointer-events-none">
            NEURAL ENGINE CONSOLE: RUNNING
          </div>
        </div>

      </div>
    </section>
  );
}
