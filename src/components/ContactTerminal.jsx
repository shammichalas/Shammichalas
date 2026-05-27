import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Send, Terminal } from 'lucide-react';

export default function ContactTerminal() {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'input', text: 'ssh guest@shammichalas.dev' },
    { type: 'system', text: 'Connecting to server nodes...' },
    { type: 'system', text: 'Connection Established. Session initiated.' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      'service_bym1ezo',
      'template_noo0oss',
      formRef.current,
      { publicKey: 'kSsnF84_M1LHBzU0R' }
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
      className="relative min-h-screen py-32 px-6 md:px-12 bg-[#04060d] flex flex-col justify-center overflow-hidden z-40 border-t border-white/5 select-none"
    >
      {/* Night Sky Stars & Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-600/[0.02] blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />

      <div 
        className="scroll-section-reveal max-w-4xl mx-auto w-full relative z-10"
      >
        
        {/* Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-orange-500 uppercase">
            COMMUNICATION INTERFACE
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-3 mb-6 tracking-tight leading-tight">
            Connect Terminal
          </h2>
          <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed">
            Initialize an authenticated zsh session below to send encrypted messages or download engineering briefs.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="glass-panel-glow rounded-3xl overflow-hidden border border-orange-500/20 shadow-glow-orange bg-slate-950/80 backdrop-blur-xl flex flex-col">
          
          {/* Terminal Window Header Bar */}
          <div className="px-6 py-4 bg-slate-950 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500/35 border border-rose-500/20" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/35 border border-amber-500/20" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/35 border border-emerald-500/20" />
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] font-extrabold tracking-widest uppercase">
              <Terminal className="w-3.5 h-3.5 text-orange-500" />
              <span>guest@shammichalas.dev:~</span>
            </div>
            <div className="w-16" /> {/* Spacer to center title */}
          </div>

          {/* Terminal Body Screen */}
          <div className="p-6 md:p-8 font-mono text-xs md:text-sm flex flex-col gap-6 flex-grow">
            
            {/* Live output console log */}
            <div className="flex flex-col gap-2 border-b border-white/5 pb-6 text-slate-400">
              {consoleLogs.map((log, logIdx) => (
                <div key={logIdx} className="leading-relaxed">
                  {log.type === 'input' && (
                    <span className="text-orange-500 font-bold">shammichalas@dev:~ $ <span className="text-slate-200">{log.text}</span></span>
                  )}
                  {log.type === 'system' && (
                    <span className="text-slate-500 font-semibold">&gt; {log.text}</span>
                  )}
                  {log.type === 'error' && (
                    <span className="text-rose-400 font-bold">&gt;&gt; {log.text}</span>
                  )}
                  {log.type === 'success' && (
                    <span className="text-emerald-400 font-bold">&gt;&gt; {log.text}</span>
                  )}
                </div>
              ))}
            </div>

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
                    className="px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-slate-600 focus:shadow-[0_0_12px_rgba(249,115,22,0.05)] font-mono"
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
                    className="px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-slate-600 focus:shadow-[0_0_12px_rgba(249,115,22,0.05)] font-mono"
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
                  className="px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-slate-600 focus:shadow-[0_0_12px_rgba(249,115,22,0.05)] resize-none font-mono"
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
    </section>
  );
}
