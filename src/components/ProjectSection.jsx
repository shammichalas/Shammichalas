import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Github, 
  FileText, 
  Search, 
  Sparkles, 
  Check, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Clock, 
  BookOpen 
} from 'lucide-react';

const projects = [
  {
    number: "01",
    category: "AI DOCUMENT INTELLIGENCE",
    title: "Flint",
    description: "A full-stack AI document intelligence platform processing PDFs into multi-level summaries, semantic vector search, and spaced repetition quizzes using Google Gemini API with parallel async processing.",
    github: "https://github.com/shammichalas/Flint-UI",
    demo: "https://flintn.netlify.app",
    tags: ["REACT", "GEMINI API", "VECTOR SEARCH", "AI"],
    sideText: ["PDF", "TO", "POSSIBILITIES"],
    theme: "light" // Light card background
  },
  {
    number: "02",
    category: "REAL-TIME MANAGEMENT",
    title: "CafeSphere",
    description: "A Clean Architecture real-time cafe management platform powering POS, Kitchen Display, Inventory, Reservations, and SignalR order pipeline behind JWT-secured APIs.",
    github: "https://github.com/shammichalas",
    demo: "https://cafespheree.netlify.app",
    tags: ["REACT", "SIGNALR", "CLEAN ARCHITECTURE", "JWT"],
    sideText: ["GOOD", "FOOD", "BETTER", "SYSTEMS"],
    theme: "dark" // Dark card background
  },
  {
    number: "03",
    category: "HUMAN RESOURCE CORE",
    title: "HRMS Portal",
    description: "A modular HRMS covering employee lifecycle, attendance, leave, and payroll built with Spring Boot, React 19 + TypeScript, PostgreSQL, and role-based JWT auth.",
    github: "https://github.com/shammichalas",
    demo: "https://workforhub.netlify.app",
    tags: ["REACT", "SPRING BOOT", "POSTGRESQL", "TYPESCRIPT"],
    sideText: ["EMPOWER", "YOUR", "PEOPLE"],
    theme: "light" // Light card background
  },
  {
    number: "04",
    category: "RECIPE SYSTEM",
    title: "Cookbook Studio",
    description: "A Django cookbook and recipe platform with chef profiles, comments, recommendations, and PDF cookbook generator utilizing ReportLab.",
    github: "https://github.com/shammichalas",
    demo: "https://github.com/shammichalas",
    tags: ["DJANGO", "REPORTLAB", "SQLITE/POSTGRESQL", "RECIPES"],
    sideText: ["RECIPES", "PEOPLE", "STORIES"],
    theme: "dark" // Dark card background
  }
];

// Reusable Top Window Dots & Header
const WindowHeader = ({ isDark = true, title = "STUDIO / PREVIEW" }) => (
  <div className={`flex items-center justify-between px-4 py-2.5 border-b text-[9.5px] font-mono tracking-wider ${
    isDark ? 'bg-[#090A0C] border-white/10 text-neutral-400' : 'bg-neutral-100 border-black/10 text-neutral-500'
  }`}>
    <div className="flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
      <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
    </div>
    <span className="uppercase font-semibold opacity-75">{title}</span>
  </div>
);

// Project 01: Flint Visual Mockup
const FlintMockup = () => (
  <div className="relative w-full max-w-[620px] py-6 sm:py-8">
    {/* Main Window (Dark) */}
    <div className="w-full aspect-[16/10] bg-[#08090C] rounded-2xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col relative">
      <WindowHeader isDark={true} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-12 sm:w-14 border-r border-white/10 bg-[#050608] flex flex-col items-center py-4 gap-6">
          <span className="font-mono text-xs font-black text-white">Flint</span>
          <div className="flex flex-col gap-5 text-neutral-400">
            <FileText className="w-4 h-4 text-white" />
            <Search className="w-4 h-4" />
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        {/* Interior Workspace */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-[#08090D] text-white">
          <div>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-neutral-500 font-semibold">YOUR KNOWLEDGE SPACE</span>
            <h4 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-2">
              Turn documents<br />into knowledge.
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans">
              Ask questions. Discover connections. Remember everything
            </p>
          </div>
          {/* File Upload / Input Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/90 border border-white/10 my-3">
            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs">Research-notes.pdf</span>
            </div>
            <button className="px-3 py-1.5 bg-white text-black text-[11px] font-mono font-bold rounded-lg hover:bg-neutral-200 transition">
              Analyze
            </button>
          </div>
          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
            <div>
              <div className="font-mono text-lg font-bold text-white">28</div>
              <div className="text-[10px] text-neutral-400 font-mono">Documents</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">1.4k</div>
              <div className="text-[10px] text-neutral-400 font-mono">Insights</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">89%</div>
              <div className="text-[10px] text-neutral-400 font-mono">Recall</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Card Top Right (White) */}
    <div className="absolute -top-4 -right-3 sm:-top-8 sm:-right-8 w-[220px] sm:w-[260px] bg-white text-black rounded-2xl border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.22)] overflow-hidden z-20">
      <WindowHeader isDark={false} />
      <div className="p-4 space-y-2">
        <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
          SUMMARY
        </span>
        <h5 className="font-display text-sm font-bold text-neutral-900 leading-snug">
          Neural retrieval systems
        </h5>
        <p className="text-xs text-neutral-500 leading-tight">
          Key concepts extracted from 48 pages.
        </p>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[9px] font-mono text-neutral-700">Context</span>
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[9px] font-mono text-neutral-700">Vectors</span>
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[9px] font-mono text-neutral-700">Memory</span>
        </div>
      </div>
    </div>

    {/* Floating Card Bottom Right (White) */}
    <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-6 w-[230px] sm:w-[270px] bg-white text-black rounded-2xl border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.22)] overflow-hidden z-20">
      <WindowHeader isDark={false} />
      <div className="p-4 space-y-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
          ACTIVE RECALL · 04 / 12
        </span>
        <h5 className="font-display text-xs font-bold text-neutral-900 leading-snug">
          What makes semantic search context-aware?
        </h5>
        <div className="space-y-1.5 pt-1">
          <div className="p-2 rounded-lg border border-neutral-200 text-[10px] text-neutral-600 font-sans">
            Token frequency
          </div>
          <div className="p-2 rounded-lg bg-black text-white text-[10px] font-sans font-medium flex items-center justify-between shadow-sm">
            <span>Vector proximity</span>
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="p-2 rounded-lg border border-neutral-200 text-[10px] text-neutral-600 font-sans">
            Positionality
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Project 02: CafeSphere Visual Mockup
const CafeSphereMockup = () => (
  <div className="relative w-full max-w-[620px] py-6 sm:py-8">
    {/* Main Window (Dark) */}
    <div className="w-full aspect-[16/10] bg-[#090A0D] rounded-2xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col relative">
      <WindowHeader isDark={true} />
      {/* App Nav Bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-[#050608] border-b border-white/10 text-xs">
        <span className="font-mono font-bold tracking-wider text-white text-xs">CAFESPHERE</span>
        <div className="flex gap-4 text-[10.5px] font-mono text-neutral-400">
          <span className="text-white border-b border-white pb-0.5 font-semibold">Overview</span>
          <span>Orders</span>
          <span>Menu</span>
          <span>Inventory</span>
        </div>
      </div>
      {/* Main Grid Content */}
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#08090C] text-white">
          <div>
            <span className="font-mono text-[9.5px] uppercase tracking-widest text-neutral-500 font-semibold">TUESDAY 09:41</span>
            <h4 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-2">
              Run your cafe<br />smarter, together.
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
            <div>
              <div className="font-mono text-base sm:text-lg font-bold text-white">84</div>
              <div className="text-[9px] text-neutral-400 font-mono">Orders today</div>
            </div>
            <div>
              <div className="font-mono text-base sm:text-lg font-bold text-white">12m</div>
              <div className="text-[9px] text-neutral-400 font-mono">Avg. service</div>
            </div>
            <div>
              <div className="font-mono text-base sm:text-lg font-bold text-white">$4,820</div>
              <div className="text-[9px] text-neutral-400 font-mono">Net sales</div>
            </div>
          </div>
        </div>
        {/* Right Coffee Image */}
        <div className="relative h-full overflow-hidden bg-black">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
            alt="Cafe Coffee"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* Floating Card Top Right (White) */}
    <div className="absolute -top-4 -right-3 sm:-top-8 sm:-right-8 w-[210px] sm:w-[250px] bg-white text-black rounded-2xl border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.25)] overflow-hidden z-20">
      <WindowHeader isDark={false} />
      <div className="p-4 space-y-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
          LIVE ORDERS
        </span>
        <div className="space-y-1.5 text-[10.5px] font-mono">
          <div className="flex justify-between items-center pb-1.5 border-b border-neutral-100">
            <span className="font-bold text-neutral-900">#2049</span>
            <span className="text-neutral-500">Table 07</span>
            <span className="font-bold text-black">$46.50</span>
          </div>
          <div className="flex justify-between items-center pb-1.5 border-b border-neutral-100">
            <span className="font-bold text-neutral-900">#2048</span>
            <span className="text-neutral-500">Takeaway</span>
            <span className="font-bold text-black">$15.20</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-neutral-900">#2050</span>
            <span className="text-neutral-500">Table 12</span>
            <span className="font-bold text-black">$72.00</span>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Card Bottom Right (Dark) */}
    <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-6 w-[220px] sm:w-[260px] bg-[#0E1015] text-white rounded-2xl border border-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden z-20">
      <WindowHeader isDark={true} />
      <div className="p-4 space-y-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
          KITCHEN DISPLAY
        </span>
        <div className="space-y-1.5 text-[10.5px] font-mono">
          <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 flex justify-between items-center">
            <span className="text-amber-400 font-bold">2:18</span>
            <span className="text-white font-medium">2x Flat White</span>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 flex justify-between items-center">
            <span className="text-neutral-400 font-bold">4:02</span>
            <span className="text-neutral-300">1x Club Sandwich</span>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 flex justify-between items-center">
            <span className="text-neutral-400 font-bold">6:45</span>
            <span className="text-neutral-300">2x Pasta Verde</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Project 03: HRMS Portal Visual Mockup
const HRMSMockup = () => (
  <div className="relative w-full max-w-[620px] py-6 sm:py-8">
    {/* Main Window (Light) */}
    <div className="w-full aspect-[16/10] bg-[#F9FAFB] text-black rounded-2xl border border-black/10 shadow-[0_30px_70px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col relative">
      <WindowHeader isDark={false} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-12 sm:w-14 border-r border-black/10 bg-white flex flex-col items-center py-4 gap-6">
          <div className="w-6 h-6 rounded-md bg-black text-white font-mono text-xs font-bold flex items-center justify-center">H</div>
          <div className="flex flex-col gap-5 text-neutral-400">
            <LayoutDashboard className="w-4 h-4 text-black" />
            <Users className="w-4 h-4" />
            <Calendar className="w-4 h-4" />
            <Clock className="w-4 h-4" />
          </div>
        </div>
        {/* Dashboard Content */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-[#F8F9FA]">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[9.5px] uppercase tracking-widest text-neutral-400 font-semibold">GOOD MORNING</span>
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-500">September 2026</span>
            </div>
            <h4 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-2">
              Welcome back, Aisha.
            </h4>
          </div>
          {/* Metric Cards */}
          <div className="grid grid-cols-3 gap-2.5 my-3">
            <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm">
              <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider block">HEADCOUNT</span>
              <span className="font-display text-lg sm:text-xl font-extrabold text-black">248</span>
              <span className="text-[8px] text-emerald-600 block font-mono">+4 this month</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm">
              <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider block">ON LEAVE</span>
              <span className="font-display text-lg sm:text-xl font-extrabold text-black">12</span>
              <span className="text-[8px] text-neutral-400 block font-mono">4 returning today</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm">
              <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider block">ATTENDANCE</span>
              <span className="font-display text-lg sm:text-xl font-extrabold text-black">96%</span>
              <span className="text-[8px] text-neutral-400 block font-mono">Company avg</span>
            </div>
          </div>
          {/* Growth Chart Bar Graphic */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-neutral-200 shadow-sm">
            <span className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-wider block mb-2">WORKFORCE GROWTH</span>
            <div className="flex items-end gap-2 h-10 pt-1">
              <div className="w-full bg-neutral-900 rounded-t h-[30%]" />
              <div className="w-full bg-neutral-900 rounded-t h-[45%]" />
              <div className="w-full bg-neutral-900 rounded-t h-[40%]" />
              <div className="w-full bg-neutral-900 rounded-t h-[60%]" />
              <div className="w-full bg-neutral-900 rounded-t h-[75%]" />
              <div className="w-full bg-neutral-900 rounded-t h-[70%]" />
              <div className="w-full bg-neutral-900 rounded-t h-[90%]" />
              <div className="w-full bg-neutral-900 rounded-t h-[100%]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Card Top Right (White) */}
    <div className="absolute -top-4 -right-3 sm:-top-8 sm:-right-8 w-[210px] sm:w-[250px] bg-white text-black rounded-2xl border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden z-20">
      <WindowHeader isDark={false} />
      <div className="p-4 space-y-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
          EMPLOYEE QUICK VIEW
        </span>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-black text-white font-mono text-[8px] flex items-center justify-center font-bold">MC</div>
            <div>
              <div className="font-bold text-neutral-900 leading-tight">Maya Chen</div>
              <div className="text-[8.5px] text-neutral-400">Design</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-neutral-800 text-white font-mono text-[8px] flex items-center justify-center font-bold">NW</div>
            <div>
              <div className="font-bold text-neutral-900 leading-tight">Noah Williams</div>
              <div className="text-[8.5px] text-neutral-400">Engineering</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-neutral-700 text-white font-mono text-[8px] flex items-center justify-center font-bold">SP</div>
            <div>
              <div className="font-bold text-neutral-900 leading-tight">Sofia Patel</div>
              <div className="text-[8.5px] text-neutral-400">Product</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Card Bottom Right (White) */}
    <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-6 w-[220px] sm:w-[260px] bg-white text-black rounded-2xl border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden z-20">
      <WindowHeader isDark={false} />
      <div className="p-4 space-y-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
          PAYROLL OVERVIEW
        </span>
        <div>
          <div className="font-display text-xl font-extrabold text-black">$482,940</div>
          <div className="text-[9px] text-neutral-400 font-mono">September payroll · 248 people</div>
        </div>
        <div className="flex items-end gap-1.5 h-6 pt-1">
          <div className="w-full bg-black rounded-t h-[40%]" />
          <div className="w-full bg-black rounded-t h-[60%]" />
          <div className="w-full bg-black rounded-t h-[50%]" />
          <div className="w-full bg-black rounded-t h-[80%]" />
          <div className="w-full bg-black rounded-t h-[100%]" />
        </div>
      </div>
    </div>
  </div>
);

// Project 04: Cookbook Studio Visual Mockup
const CookbookMockup = () => (
  <div className="relative w-full max-w-[620px] py-6 sm:py-8">
    {/* Main Window */}
    <div className="w-full aspect-[16/10] bg-white text-black rounded-2xl border border-black/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative">
      <WindowHeader isDark={false} />
      <div className="flex items-center justify-between px-5 py-2 border-b border-neutral-100">
        <span className="font-serif font-bold text-sm text-black">Cookbook Studio</span>
        <div className="flex gap-4 text-[10px] font-mono text-neutral-500">
          <span>Recipes</span>
          <span>Chefs</span>
          <span>Stories</span>
        </div>
      </div>
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-white text-black">
          <div>
            <span className="font-mono text-[8.5px] uppercase tracking-widest text-neutral-400 font-semibold">THE AUTUMN TABLE · ISSUE 08</span>
            <h4 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-neutral-900 mt-3 mb-2">
              Good food<br />brings people<br />together.
            </h4>
            <p className="text-xs text-neutral-500 font-sans">
              Recipes, stories, and the people behind them.
            </p>
          </div>
          <button className="w-fit px-4 py-1.5 bg-black text-white text-[10.5px] font-mono font-bold rounded-full flex items-center gap-1.5">
            <span>Explore recipes</span>
            <span>&gt;</span>
          </button>
        </div>
        <div className="relative h-full overflow-hidden bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1621996346565-e3d5d6281293?auto=format&fit=crop&w=800&q=80"
            alt="Bucatini Pasta"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* Floating Card Top Right (White) */}
    <div className="absolute -top-4 -right-3 sm:-top-8 sm:-right-8 w-[210px] sm:w-[250px] bg-white text-black rounded-2xl border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden z-20">
      <WindowHeader isDark={false} />
      <div className="p-3.5 space-y-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
          FEATURED RECIPES
        </span>
        <div className="rounded-lg overflow-hidden border border-neutral-100 aspect-[16/9]">
          <img
            src="https://images.unsplash.com/photo-1621996346565-e3d5d6281293?auto=format&fit=crop&w=400&q=80"
            alt="Pasta"
            className="w-full h-full object-cover"
          />
        </div>
        <h5 className="font-serif text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
          Brown butter bucatini
        </h5>
        <span className="text-[9px] text-neutral-400 font-sans block">32 min · By Elena Moretti</span>
      </div>
    </div>

    {/* Floating Card Bottom Right (Dark) */}
    <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-6 w-[220px] sm:w-[260px] bg-[#0A0C0E] text-white rounded-2xl border border-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden z-20">
      <WindowHeader isDark={true} />
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400">
          <BookOpen className="w-3.5 h-3.5 text-white" />
          <span>COOKBOOK BUILDER</span>
        </div>
        <div>
          <h5 className="font-serif text-xs font-bold text-white leading-snug">
            Your weeknight collection
          </h5>
          <span className="text-[9px] text-neutral-400 font-mono block">12 recipes · 48 pages</span>
        </div>
        <button className="w-full py-1.5 bg-white text-black text-[9.5px] font-mono font-bold uppercase rounded-lg hover:bg-neutral-200 transition">
          Generate PDF
        </button>
      </div>
    </div>
  </div>
);

// Switcher for Project Visual Mockup
const ProjectVisualMockup = ({ project }) => {
  switch (project.number) {
    case "01":
      return <FlintMockup />;
    case "02":
      return <CafeSphereMockup />;
    case "03":
      return <HRMSMockup />;
    case "04":
      return <CookbookMockup />;
    default:
      return null;
  }
};

// Individual Stacking Project Card Component
const ProjectCard = ({ project, index, totalCards, scrollYProgress }) => {
  const isDark = project.theme === "dark";

  // Stacking scale calculation
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const step = 1 / (totalCards - 1 || 1);
  const start = index * step;
  const end = (index + 1) * step;

  const scale = useTransform(
    scrollYProgress,
    [start, index === totalCards - 1 ? start + 1 : end],
    [1, targetScale],
    { clamp: true }
  );

  return (
    <div
      style={{
        position: 'sticky',
        top: `calc(70px + ${index * 24}px)`,
        zIndex: 10 + index,
      }}
      className="w-full flex justify-center py-6"
    >
      <motion.div
        style={{ scale }}
        className={`relative w-full max-w-[1380px] rounded-[32px] sm:rounded-[48px] min-h-[600px] sm:min-h-[680px] border transition-shadow duration-300 overflow-hidden flex flex-col justify-center ${
          isDark
            ? 'bg-[#060608] text-white border-white/10 shadow-[0_35px_100px_rgba(0,0,0,0.9)]'
            : 'bg-[#F7F7F8] text-neutral-900 border-black/10 shadow-[0_30px_90px_rgba(0,0,0,0.14)]'
        }`}
      >
        {/* Massive Editorial Watermark Background Number */}
        <div className={`absolute -bottom-16 -left-8 font-display font-black text-[260px] sm:text-[400px] lg:text-[480px] leading-none select-none pointer-events-none opacity-[0.035] tracking-tighter ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          {project.number}
        </div>

        <div className="p-8 sm:p-14 lg:p-16 xl:p-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 relative z-10">

            {/* Left Column: Project Details (approx 44%) */}
            <div className="w-full lg:w-[44%] flex flex-col justify-between space-y-8">
              <div>
                {/* Number & Category */}
                <div className="flex items-center gap-4 mb-5">
                  <span className={`font-mono text-2xl sm:text-3xl font-black tracking-tight ${
                    isDark ? 'text-white/50' : 'text-black/50'
                  }`}>
                    {project.number}
                  </span>
                  <div className={`h-[1px] w-10 ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
                  <span className={`font-mono text-xs uppercase tracking-[0.3em] font-bold ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] mb-6 ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className={`text-base sm:text-lg leading-relaxed mb-8 font-sans font-medium max-w-xl ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`font-mono text-xs uppercase px-4 py-2 rounded-full border tracking-wider transition-colors ${
                        isDark 
                          ? 'border-neutral-800 bg-neutral-900/70 text-neutral-200' 
                          : 'border-neutral-300 bg-white text-neutral-800 shadow-sm'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-7 py-4 rounded-full font-mono text-xs uppercase font-bold tracking-widest transition-all duration-300 ${
                    isDark
                      ? 'bg-white text-black hover:bg-neutral-200 hover:scale-105 shadow-xl'
                      : 'bg-black text-white hover:bg-neutral-800 hover:scale-105 shadow-xl'
                  }`}
                >
                  <span>LIVE PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-6 py-4 rounded-full font-mono text-xs uppercase font-semibold tracking-widest border transition-all duration-300 ${
                    isDark
                      ? 'border-white/25 text-white hover:bg-white/10'
                      : 'border-black/25 text-black hover:bg-black/5'
                  }`}
                >
                  <span>VIEW CODE</span>
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Center/Right Area: Interactive UI Window + 2 Overlay Cards */}
            <div className="w-full lg:w-[50%] flex justify-center py-4 lg:py-0">
              <ProjectVisualMockup project={project} />
            </div>

            {/* Far Right Column: Vertical Side Text & Index */}
            <div className="hidden xl:flex flex-col items-center justify-between h-[460px] border-l border-current/15 pl-8 py-2">
              <div className="font-mono text-xs uppercase tracking-[0.35em] font-semibold opacity-40 [writing-mode:vertical-rl] rotate-180 flex items-center gap-2">
                {project.sideText.join(" · ")}
              </div>
              <div className={`font-mono text-sm font-bold tracking-widest ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                {project.number} | 04
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProjectSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="projects" 
      className="relative w-full bg-[#F4F4F6] text-neutral-900 pt-16 pb-32 px-4 sm:px-6 lg:px-12 overflow-hidden selection:bg-black selection:text-white"
    >
      {/* Main Editorial Hero Header */}
      <div className="max-w-[1380px] mx-auto mb-16 sm:mb-24">
        {/* Top Editorial Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold text-neutral-500">
            SELECTED WORK
          </span>
          <div className="h-[1px] w-24 bg-black/20" />
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-neutral-400">
            REAL PROJECTS. REAL IMPACT.
          </span>
        </div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Hero Title & Subhead (7 cols) */}
          <div className="lg:col-span-7">
            <h1 className="font-display font-black text-[72px] sm:text-[120px] lg:text-[150px] leading-[0.88] tracking-tighter text-black uppercase mb-6">
              Projects
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl font-sans font-medium text-neutral-700 max-w-xl leading-relaxed mb-8">
              Ideas turned into real experiences.<br />
              Built with code, curiosity and purpose.
            </p>

            <div className="flex items-center gap-3 text-neutral-500 font-mono text-xs uppercase tracking-widest animate-pulse">
              <ArrowDown className="w-4 h-4 text-black" />
              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>

          {/* Right Hero Abstract Paper / Cards Visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] aspect-[4/3]">
              {/* Back Card 2 (Bottom layer) */}
              <div className="absolute inset-0 bg-neutral-200 border border-black/10 rounded-2xl rotate-[6deg] translate-y-3 translate-x-3 shadow-sm" />
              
              {/* Back Card 1 (Middle layer) */}
              <div className="absolute inset-0 bg-neutral-100 border border-black/10 rounded-2xl -rotate-[3deg] translate-y-1 translate-x-1 shadow-md" />

              {/* Front Card (Main editorial text) */}
              <div className="absolute inset-0 bg-white border border-black/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl rotate-[1deg]">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">
                    FOR GOALS
                  </span>
                  <span className="font-mono text-xs font-bold text-black">
                    01 / 04
                  </span>
                </div>

                <div className="my-auto py-4">
                  <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
                    "Building solutions for a better digital tomorrow."
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-700">
                    — SHAMMI CHALAS
                  </span>
                  <div className="h-4 w-[1px] bg-black/20" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Stacking Sticky Projects Container */}
      <div 
        ref={containerRef}
        className="max-w-[1380px] mx-auto relative flex flex-col items-center gap-16 sm:gap-24 pb-20"
      >
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.number} 
            project={project} 
            index={index} 
            totalCards={projects.length} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

    </section>
  );
}
