/* eslint-disable react/jsx-no-literals, react-i18next/no-literal-string, security/detect-object-injection */
import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles({ mode = 'embers' }) {
  const canvasRef = useRef(null);
  const modeRef = useRef(mode);

  // Sync mode to ref so canvas loop reads current value instantly without restarting useEffect
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive particle count bounds based on current mode
    const getParticleCount = (currentMode) => {
      if (prefersReducedMotion) return 10;
      const counts = {
        embers: isMobile ? 35 : 100,
        stars: isMobile ? 50 : 150,
        neural: isMobile ? 25 : 60,
        dust: isMobile ? 30 : 80
      };
      return counts[currentMode] || 80;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse coordinate tracking
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        const currentMode = modeRef.current;
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : (currentMode === 'embers' ? canvas.height + 20 : Math.random() * canvas.height);
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.01 + 0.005;

        // Customise parameters based on active environment mode
        if (currentMode === 'embers') {
          // Drifting orange fire embers
          this.size = Math.random() * 1.8 + 0.8;
          this.speedY = -(Math.random() * 0.4 + 0.2);
          this.speedX = (Math.random() * 0.3 - 0.15);
          const hues = [18, 32, 45, 12];
          this.hue = hues[Math.floor(Math.random() * hues.length)];
          this.opacity = Math.random() * 0.5 + 0.1;
          this.fadeSpeed = 0.001 + Math.random() * 0.002;
        } else if (currentMode === 'stars') {
          // Twinkling white & cyan celestial stars
          this.size = Math.random() * 1.2 + 0.4;
          this.speedY = (Math.random() * 0.06 - 0.03);
          this.speedX = (Math.random() * 0.08 - 0.04);
          this.hue = Math.random() > 0.7 ? 190 : 220; // light blue or soft white
          this.opacity = Math.random() * 0.6 + 0.1;
          this.fadeSpeed = 0.004 + Math.random() * 0.004; // twinkling speed
          this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
        } else if (currentMode === 'neural') {
          // Faint cyan network points
          this.size = Math.random() * 1.5 + 0.8;
          this.speedY = (Math.random() * 0.15 - 0.075);
          this.speedX = (Math.random() * 0.15 - 0.075);
          this.hue = 265; // elegant purple
          this.opacity = Math.random() * 0.4 + 0.15;
          this.fadeSpeed = 0.001;
        } else {
          // Horizontal space dust
          this.size = Math.random() * 1.4 + 0.6;
          this.speedY = (Math.random() * 0.04 - 0.02);
          this.speedX = -(Math.random() * 0.15 + 0.05); // slow leftward drift
          this.hue = 30; // neutral golden-grey
          this.opacity = Math.random() * 0.3 + 0.05;
          this.fadeSpeed = 0.001;
        }
      }

      update() {
        const currentMode = modeRef.current;
        this.y += this.speedY;
        this.x += this.speedX;

        // Apply mode-specific motion rules
        if (currentMode === 'embers') {
          this.x += Math.sin(this.wobble) * 0.12;
          this.wobble += this.wobbleSpeed;

          // Drag embers away from mouse
          if (mouse.x > 0 && mouse.y > 0) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const force = (180 - dist) / 180;
              this.x += (dx / dist) * force * 0.5;
              this.y += (dy / dist) * force * 0.2;
            }
          }

          if (this.y < 100) this.opacity -= this.fadeSpeed * 2;
        } else if (currentMode === 'stars') {
          // Twinkle effect (sine-like pulsing opacity)
          this.opacity += this.fadeSpeed * this.twinkleDirection;
          if (this.opacity >= 0.8) {
            this.opacity = 0.8;
            this.twinkleDirection = -1;
          } else if (this.opacity <= 0.05) {
            this.opacity = 0.05;
            this.twinkleDirection = 1;
          }
        } else if (currentMode === 'neural') {
          // Gentle attraction to mouse
          if (mouse.x > 0 && mouse.y > 0) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const force = (220 - dist) / 220;
              this.x += (dx / dist) * force * 0.2;
              this.y += (dy / dist) * force * 0.2;
            }
          }
        }

        // Out of bounds reset rules
        const margin = 30;
        if (
          this.y < -margin ||
          this.y > canvas.height + margin ||
          this.x < -margin ||
          this.x > canvas.width + margin ||
          (currentMode === 'embers' && this.opacity <= 0)
        ) {
          this.reset(false);
        }
      }

      draw() {
        const currentMode = modeRef.current;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (currentMode === 'embers') {
          const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3.5);
          glow.addColorStop(0, `hsla(${this.hue}, 95%, 60%, ${this.opacity})`);
          glow.addColorStop(0.3, `hsla(${this.hue}, 95%, 55%, ${this.opacity * 0.5})`);
          glow.addColorStop(1, `hsla(${this.hue}, 95%, 50%, 0)`);
          ctx.fillStyle = glow;
        } else if (currentMode === 'stars') {
          ctx.fillStyle = `hsla(${this.hue}, 80%, 95%, ${this.opacity})`;
        } else if (currentMode === 'neural') {
          ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.opacity})`;
        } else {
          ctx.fillStyle = `hsla(${this.hue}, 30%, 80%, ${this.opacity})`;
        }

        ctx.fill();
      }
    }

    // Initialize particle pool based on current mode
    const initPool = () => {
      particles = [];
      const count = getParticleCount(modeRef.current);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    initPool();

    // Monitor mode changes in ref to rebuild pool when mode switches
    let activeMode = modeRef.current;

    // Loop
    const animate = () => {
      // Re-pool particles if mode changes
      if (activeMode !== modeRef.current) {
        activeMode = modeRef.current;
        initPool();
      }

      // High-performance canvas clear
      if (activeMode === 'neural') {
        // Slightly higher retention trail for neural vectors
        ctx.fillStyle = 'rgba(2, 4, 10, 0.25)';
      } else {
        ctx.fillStyle = 'rgba(2, 4, 10, 0.15)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse coordinates tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw connections in neural mode
      if (activeMode === 'neural' && !isMobile && !prefersReducedMotion) {
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.06)'; // faint purple connectors
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[20] mix-blend-screen"
    />
  );
}
