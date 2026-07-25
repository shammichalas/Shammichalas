import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, FileText, Send, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactTerminal() {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const terminalRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const formWrapperRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'input', text: 'ssh guest@shammichalas.dev' },
    { type: 'system', text: 'Connecting to server nodes...' },
    { type: 'system', text: 'Connection Established. Session initiated.' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for scroll typing simulation
  const [cmd1, setCmd1] = useState("");
  const [cmd2, setCmd2] = useState("");
  const [showSystem1, setShowSystem1] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [activeCursor, setActiveCursor] = useState(1); // 1 = cmd1, 2 = cmd2, 3 = final blinks

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Scroll-linked typing timeline
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const terminal = terminalRef.current;
    const bgOverlay = bgOverlayRef.current;
    const formWrapper = formWrapperRef.current;

    // Set initial states
    gsap.set(terminal, { scale: 0.5, opacity: 0.7 });
    gsap.set(bgOverlay, { opacity: 0 });

    const typingState = { count1: 0, count2: 0 };
    const cmd1Text = "ssh guest@shammichalas.dev";
    const cmd2Text = "cat contact_details.txt";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Dynamically manage console states based on scrub progress
          if (progress < 0.25) {
            setActiveCursor(1);
            setShowSystem1(false);
            setShowFinal(false);
          } else if (progress >= 0.25 && progress < 0.45) {
            setActiveCursor(1);
            setShowSystem1(false);
            setShowFinal(false);
          } else if (progress >= 0.45 && progress < 0.65) {
            setActiveCursor(2);
            setShowSystem1(true);
            setShowFinal(false);
          } else {
            setActiveCursor(3);
            setShowSystem1(true);
            setShowFinal(true);
          }
        }
      }
    });

    // 1. Zoom terminal and darken background (first 30% of scroll)
    tl.to(bgOverlay, { opacity: 0.85, duration: 0.3 }, 0);
    tl.to(terminal, { scale: 1, opacity: 1, duration: 0.3 }, 0);

    // 2. Type command 1 character by character (30% to 50%)
    tl.to(typingState, {
      count1: cmd1Text.length,
      duration: 0.4,
      ease: "none",
      onUpdate: () => {
        setCmd1(cmd1Text.slice(0, Math.floor(typingState.count1)));
      }
    }, 0.3);

    // 3. Pause for system feedback simulation (50% to 60% of scroll)
    tl.to({}, { duration: 0.1 });

    // 4. Type command 2 character by character (60% to 80%)
    tl.to(typingState, {
      count2: cmd2Text.length,
      duration: 0.4,
      ease: "none",
      onUpdate: () => {
        setCmd2(cmd2Text.slice(0, Math.floor(typingState.count2)));
      }
    }, 0.8);

    // 5. Fade in form wrapper and final links (80% to 100%)
    tl.fromTo(formWrapper,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      1.2
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      // Reset scale and opacity on mobile viewports
      gsap.set(terminal, { clearProps: "transform,scale,opacity" });
      gsap.set(bgOverlay, { clearProps: "opacity" });
    };
  }, [isMobile]);

  // Mobile Auto-play typewriter fallback on mount
  useEffect(() => {
    if (!isMobile) return;

    // Instantly prepare layout and play a fast autoplay typewriter
    const cmd1Text = "ssh guest@shammichalas.dev";
    const cmd2Text = "cat contact_details.txt";

    let timeout1, timeout2, timeout3, timeout4;

    let i = 0;
    const type1 = () => {
      if (i <= cmd1Text.length) {
        setCmd1(cmd1Text.slice(0, i));
        i++;
        timeout1 = setTimeout(type1, 40);
      } else {
        setActiveCursor(2);
        setShowSystem1(true);
        timeout2 = setTimeout(() => {
          let j = 0;
          const type2 = () => {
            if (j <= cmd2Text.length) {
              setCmd2(cmd2Text.slice(0, j));
              j++;
              timeout3 = setTimeout(type2, 40);
            } else {
              setActiveCursor(3);
              setShowFinal(true);
            }
          };
          type2();
        }, 500);
      }
    };

    timeout4 = setTimeout(type1, 400);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, [isMobile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setConsoleLogs(prev => [
        ...prev,
        { type: 'input', text: 'sh send_message.sh' },
        { type: 'error', text: 'ERROR: All fields (Name, Email, Message) must be filled before transmitting.' }
      ]);
      return;
    }

    setIsSubmitting(true);
    setConsoleLogs(prev => [
      ...prev,
      { type: 'input', text: `sh send_message.sh --name "${formData.name}" --email "${formData.email}"` },
      { type: 'system', text: 'Packaging encrypted message data...' },
      { type: 'system', text: 'Transmitting through EmailJS gateway service...' }
    ]);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    )
    .then(
      () => {
        setIsSubmitting(false);
        setConsoleLogs(prev => [
          ...prev,
          { type: 'success', text: 'SUCCESS: Encrypted transmission completed successfully!' },
          { type: 'system', text: 'Server response code: 200 OK. Mail delivered to Sham Michalas.' }
        ]);
        setFormData({ name: '', email: '', message: '' });
      },
      (error) => {
        setIsSubmitting(false);
        setConsoleLogs(prev => [
          ...prev,
          { type: 'error', text: `FAILED: Transmission aborted. Gateway Error: ${error.text || error}` }
        ]);
      }
    );
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:pt-24 lg:pb-36 px-6 md:px-12 bg-[#04060d] flex flex-col justify-center overflow-hidden z-50 border-t border-white/5 select-none"
    >
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-cursor-indicator {
          animation: cursorBlink 1s step-end infinite;
        }
      `}</style>

      {/* Darkening background overlay for focus */}
      <div 
        ref={bgOverlayRef}
        className="absolute inset-0 bg-[#000000] pointer-events-none z-0"
        style={{ opacity: 0 }}
      />

      {/* Volumetric Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-600/[0.02] blur-[150px] pointer-events-none z-10 animate-pulse-slow" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Header (Fades out dynamically on desktop scroll via opacity, stays readable) */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="font-display text-[10px] font-bold tracking-[0.25em] text-orange-500 uppercase border border-orange-500/20 px-3.5 py-1 rounded-full inline-block backdrop-blur-md">
            COMMUNICATION INTERFACE
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-4 mb-4 tracking-tight leading-tight text-white uppercase">
            Connect Terminal
          </h2>
          <p className="font-sans text-slate-400 text-sm leading-relaxed">
            Initialize an authenticated session below to send encrypted messages or download engineering briefs.
          </p>
        </div>

        {/* Terminal Container */}
        <div 
          ref={terminalRef}
          style={isMobile ? {
            background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.12) 0%, rgba(15, 23, 42, 0.78) 100%)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85), inset 0 1.5px 2.5px rgba(255,255,255,0.15), inset 0 -1.5px 2.5px rgba(0,0,0,0.5)'
          } : {
            background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.12) 0%, rgba(15, 23, 42, 0.78) 100%)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85), inset 0 1.5px 2.5px rgba(255,255,255,0.15), inset 0 -1.5px 2.5px rgba(0,0,0,0.5)',
            transformOrigin: 'center center'
          }}
          className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl flex flex-col z-10 w-full"
        >
          {/* Background backlit glow passing through crystal terminal */}
          <div className="absolute inset-0 rounded-3xl blur-[40px] bg-orange-500/5 shadow-[0_0_80px_rgba(249,115,22,0.06)] -z-10 pointer-events-none" />

          {/* Micro-noise texture for sandblasted glass grain effect */}
          <div 
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
              opacity: 0.03
            }}
            className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay rounded-3xl"
          />

          {/* Soft top-left room light reflection */}
          <div 
            className="absolute inset-0 pointer-events-none z-0 rounded-3xl"
            style={{
              background: 'radial-gradient(circle at 6% 6%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)'
            }}
          />
          
          {/* Terminal Window Header Bar */}
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between relative z-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/35 border border-rose-500/20" />
              <div className="w-3 h-3 rounded-full bg-amber-500/35 border border-amber-500/20" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/35 border border-emerald-500/20" />
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] font-extrabold tracking-widest uppercase">
              <Terminal className="w-3.5 h-3.5 text-orange-500" />
              <span>guest@shammichalas.dev:~</span>
            </div>
            <div className="w-16" /> {/* Spacer */}
          </div>

          {/* Terminal Body Screen */}
          <div className="p-6 md:p-8 font-mono text-xs md:text-sm flex flex-col gap-4 flex-grow relative z-10 text-left">
            
            {/* Live output console log */}
            <div className="flex flex-col gap-2.5 text-slate-400">
              
              {/* Prompt line 1 */}
              <div className="leading-relaxed">
                <span className="text-orange-500 font-bold">shammichalas@dev:~ $ </span>
                <span className="text-slate-200">{cmd1}</span>
                {activeCursor === 1 && (
                  <span className="inline-block w-[7px] h-[14px] bg-orange-500 ml-1.5 align-middle terminal-cursor-indicator" />
                )}
              </div>

              {/* System Reply line 1 */}
              {showSystem1 && (
                <div className="leading-relaxed text-slate-500 font-semibold pl-4">
                  &gt; Connecting to server nodes...<br />
                  &gt; Connection Established. Session initiated.
                </div>
              )}

              {/* Prompt line 2 */}
              {showSystem1 && (
                <div className="leading-relaxed">
                  <span className="text-orange-500 font-bold">shammichalas@dev:~ $ </span>
                  <span className="text-slate-200">{cmd2}</span>
                  {activeCursor === 2 && (
                    <span className="inline-block w-[7px] h-[14px] bg-orange-500 ml-1.5 align-middle terminal-cursor-indicator" />
                  )}
                </div>
              )}
            </div>

            {/* Dynamic Reveal details & transmission forms */}
            <div 
              ref={formWrapperRef}
              className={`space-y-6 pt-4 border-t border-white/5 ${
                isMobile && !showFinal ? 'hidden' : 'block'
              } ${
                showFinal ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              style={{ opacity: isMobile ? 1 : 0 }}
            >
              {/* Direct formatted contact info */}
              <div className="text-[10px] md:text-xs text-slate-500 space-y-1 pl-4">
                <div>&gt; HOST DATA: SMTP ENCRYPTED TRANSMISSION READY</div>
                <div>&gt; TARGET DIRECTORY: shammichalas0007@gmail.com</div>
              </div>

              {/* Form submit logs output inside the container */}
              {consoleLogs.length > 3 && (
                <div className="flex flex-col gap-1 border-b border-white/5 pb-4 text-slate-400 pl-4">
                  {consoleLogs.slice(3).map((log, logIdx) => (
                    <div key={logIdx} className="leading-relaxed text-[11px]">
                      {log.type === 'input' && (
                        <span className="text-orange-500 font-bold">$ <span className="text-slate-300">{log.text}</span></span>
                      )}
                      {log.type === 'system' && <span className="text-slate-500 font-semibold">&gt; {log.text}</span>}
                      {log.type === 'error' && <span className="text-rose-400 font-bold">&gt;&gt; {log.text}</span>}
                      {log.type === 'success' && <span className="text-emerald-400 font-bold">&gt;&gt; {log.text}</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* Interactive Terminal Form inputs */}
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-[10px] tracking-wider text-slate-400 font-bold uppercase font-display">
                      <span className="text-orange-500 font-mono font-bold">$</span>
                      <span>Identity Name</span>
                    </div>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name..."
                      className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-orange-500/45 focus:bg-white/[0.05] transition-all duration-300 placeholder:text-slate-600 focus:shadow-[0_0_12px_rgba(249,115,22,0.08)] font-mono backdrop-blur-md"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-[10px] tracking-wider text-slate-400 font-bold uppercase font-display">
                      <span className="text-orange-500 font-mono font-bold">$</span>
                      <span>Identity Email</span>
                    </div>
                    <input
                      type="email"
                      name="user_email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address..."
                      className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-orange-500/45 focus:bg-white/[0.05] transition-all duration-300 placeholder:text-slate-600 focus:shadow-[0_0_12px_rgba(249,115,22,0.08)] font-mono backdrop-blur-md"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-[10px] tracking-wider text-slate-400 font-bold uppercase font-display">
                    <span className="text-orange-500 font-mono font-bold">$</span>
                    <span>Transmission Payload</span>
                  </div>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Type your message payload..."
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-orange-500/45 focus:bg-white/[0.05] transition-all duration-300 placeholder:text-slate-600 focus:shadow-[0_0_12px_rgba(249,115,22,0.08)] resize-none font-mono backdrop-blur-md"
                  />
                </div>

                {/* Action Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-center font-display text-xs font-bold tracking-widest text-white hover:shadow-glow-orange cursor-pointer transition-all duration-300 uppercase flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'TRANSMITTING ENCRYPTED...' : 'EXECUTE SEND_MESSAGE.SH'}</span>
                </button>
              </form>

              {/* Social credentials links */}
              <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] tracking-wider text-slate-500 uppercase font-extrabold">
                <span>authenticated node: secure link</span>
                
                <div className="flex items-center gap-5">
                  <a href="https://github.com/shammichalas" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a href="mailto:shammichalas0007@gmail.com" className="text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                  <a 
                    href="/Sham%20Michalas%20Resume.pdf" 
                    download="Sham_Michalas_Resume.pdf" 
                    className="text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Brief</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
