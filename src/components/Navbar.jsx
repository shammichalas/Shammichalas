import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';


const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollCenter = window.innerHeight * 0.5;

      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= scrollCenter && rect.bottom >= scrollCenter) {
            setActiveSection(item.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to initialize highlight
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e, name, href) => {
    e.preventDefault();
    setActiveSection(name);
    setMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      // Lenis smooth scroll will catch this or we scroll smoothly
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#home"
          onClick={(e) => handleNavClick(e, 'Home', '#home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center shadow-glow-orange group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-display font-extrabold text-sm tracking-widest">S</span>
          </div>
          <span className="font-display font-bold tracking-widest text-sm bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-orange-200 transition-all duration-300 uppercase">
            Sham Michalas
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-slate-950/40 backdrop-blur-xl shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.name, item.href)}
                className={`relative px-4 py-2 font-sans text-xs tracking-wider font-semibold uppercase transition-colors duration-300 ${
                  isActive ? 'text-orange-500' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute inset-0 rounded-full bg-orange-500/[0.08] border border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.1)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full glow-active-line" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </nav>

        {/* Let's Connect CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'Contact', '#contact')}
            className="group relative px-6 py-2.5 rounded-full overflow-hidden flex items-center gap-1.5 border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/40 font-display text-xs font-bold tracking-widest text-slate-100 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.02)] hover:shadow-glow-orange cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600/10 to-rose-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">LET'S CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 relative z-10 text-orange-400 group-hover:text-orange-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-950/60 border border-white/5 text-slate-400 hover:text-slate-100 backdrop-blur-md transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden w-full absolute top-[70px] left-0 bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.name, item.href)}
              className={`py-2 border-b border-white/5 font-display text-sm tracking-wider uppercase font-semibold transition-colors ${
                activeSection === item.name ? 'text-orange-500' : 'text-slate-400'
              }`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'Contact', '#contact')}
            className="mt-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-center font-display text-xs font-bold tracking-widest text-white shadow-glow-orange cursor-pointer"
          >
            LET'S CONNECT
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
