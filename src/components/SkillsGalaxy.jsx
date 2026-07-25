import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, Server, Database, Cpu, Terminal as TermIcon, Cloud, Layers, 
  Brain, Workflow, Play, CheckCircle2, Activity, FileCode, Check, RefreshCw 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// HIGH-FIDELITY VECTOR MOCKUPS (SCREENSHOTS)
// ==========================================

const ReactMockup = () => (
  <div className="w-full h-[140px] bg-slate-950/80 rounded-lg p-3 border border-white/5 font-mono text-[9px] text-slate-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">React Fiber Telemetry</span>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-[7px] text-emerald-400 font-bold">120 FPS</span>
      </div>
    </div>
    <div className="flex-1 py-2 flex items-center justify-between gap-3">
      {/* Mini Bar Chart */}
      <div className="flex-1 h-full flex flex-col justify-between">
        <div className="flex justify-between text-[7px] text-slate-500">
          <span>RENDER LATENCY</span>
          <span className="text-cyan-400">0.42ms</span>
        </div>
        <div className="h-10 flex items-end gap-1.5 pb-1">
          {[40, 65, 30, 85, 45, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-cyan-600 to-sky-400 rounded-t-[1px]" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
      {/* Mini Gauge */}
      <div className="w-12 h-12 rounded-full border-2 border-white/5 relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 rotate-45"></div>
        <span className="text-[8px] font-bold text-slate-200">89.4%</span>
      </div>
    </div>
    <div className="text-[7px] text-slate-500 border-t border-white/5 pt-1.5 flex justify-between">
      <span>HOOKS IN SCOPE: 8</span>
      <span>RE-RENDERS: 0</span>
    </div>
  </div>
);

const NextMockup = () => (
  <div className="w-full h-[140px] bg-[#030303] rounded-lg p-3 border border-white/10 font-sans flex flex-col justify-between overflow-hidden relative">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
      backgroundSize: '8px 8px'
    }}></div>
    
    <div className="flex items-center justify-between z-10 border-b border-white/5 pb-2">
      <div className="flex items-center gap-1">
        <span className="font-extrabold text-[10px] text-white tracking-tighter">NEXT.js</span>
        <span className="text-[6px] text-slate-500 border border-slate-700 px-1 rounded-sm uppercase tracking-wide">v15.0</span>
      </div>
      <span className="text-[7px] text-violet-400 font-mono">edge:route /dashboard</span>
    </div>
    <div className="flex-1 py-3 flex flex-col justify-center items-center text-center z-10">
      <h4 className="text-[9px] font-bold text-white leading-tight max-w-[120px] mb-1.5">
        Production-grade Server Components
      </h4>
      <div className="w-16 h-4 bg-white text-black font-bold text-[7px] rounded flex items-center justify-center shadow-lg shadow-white/5 cursor-pointer uppercase tracking-wider">
        Deploy Now
      </div>
    </div>
    <div className="text-[6px] font-mono text-slate-500 flex justify-between border-t border-white/5 pt-1.5 z-10">
      <span>RSC HYDRATED</span>
      <span>TTI: 0.12s</span>
    </div>
  </div>
);

const SpringBootMockup = () => (
  <div className="w-full h-[140px] bg-[#0e1712] rounded-lg p-3 border border-emerald-950 font-mono text-[8px] text-emerald-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-emerald-900/40 pb-1.5">
      <span className="text-emerald-500 font-bold uppercase tracking-wider">Spring Swagger API v3</span>
      <span className="text-[7px] text-emerald-600">secure:active</span>
    </div>
    <div className="flex-1 py-2 flex flex-col justify-center gap-1.5">
      <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-900/50 rounded px-1.5 py-0.5">
        <span className="text-[7px] bg-green-500 text-black px-1 rounded-sm font-bold uppercase">POST</span>
        <span className="flex-1 text-left pl-1.5 text-slate-300">/api/v1/telemetry</span>
        <span className="text-emerald-500">201 OK</span>
      </div>
      <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-900/30 rounded px-1.5 py-0.5 opacity-80">
        <span className="text-[7px] bg-blue-500 text-white px-1 rounded-sm font-bold uppercase">GET</span>
        <span className="flex-1 text-left pl-1.5 text-slate-300">/api/v1/nodes/cluster</span>
        <span className="text-emerald-500">200 OK</span>
      </div>
      <div className="flex items-center justify-between bg-emerald-950/20 border border-emerald-900/20 rounded px-1.5 py-0.5 opacity-60">
        <span className="text-[7px] bg-amber-500 text-black px-1 rounded-sm font-bold uppercase">PUT</span>
        <span className="flex-1 text-left pl-1.5 text-slate-300">/api/v1/nodes/sync</span>
        <span className="text-amber-400">202 PND</span>
      </div>
    </div>
    <div className="text-[6px] text-emerald-600 flex justify-between border-t border-emerald-900/40 pt-1">
      <span>JVM RUNNING</span>
      <span>HEAP: 420MB / 1GB</span>
    </div>
  </div>
);

const FastAPIMockup = () => (
  <div className="w-full h-[140px] bg-[#0c131a] rounded-lg p-3 border border-cyan-950/80 font-mono text-[8px] text-cyan-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-cyan-900/40 pb-1.5">
      <span className="text-cyan-500 font-bold uppercase tracking-wider">FastAPI OpenAPI Schema</span>
      <span className="text-[7px] text-cyan-600">async_loop:uvicorn</span>
    </div>
    <div className="flex-1 py-1.5 flex flex-col justify-between">
      <div className="flex items-center gap-1.5">
        <span className="text-[7px] bg-rose-500 text-white px-1 rounded-sm font-bold uppercase">POST</span>
        <span className="text-slate-300">/v2/rag/query</span>
      </div>
      <div className="bg-[#050a0f] p-1.5 rounded border border-cyan-900/30 text-slate-400 text-[7px] leading-tight">
        <span className="text-cyan-500">request_body:</span><br />
        {`{ "query": "vector latency", "top_k": 3 }`}<br />
        <span className="text-emerald-400">response [200]:</span> {`{ "matches": 42 }`}
      </div>
    </div>
    <div className="text-[6px] text-cyan-600 flex justify-between border-t border-cyan-900/40 pt-1">
      <span>Pydantic v2 Compiled</span>
      <span>LATENCY: 3.14ms</span>
    </div>
  </div>
);

const DockerMockup = () => (
  <div className="w-full h-[140px] bg-[#0d1624] rounded-lg p-3 border border-sky-950 font-mono text-[8px] text-sky-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-sky-900/40 pb-2">
      <div className="flex items-center gap-1">
        <span className="w-2 h-2 bg-sky-400 rounded-sm"></span>
        <span className="font-bold text-white uppercase tracking-wider">Docker Desktop</span>
      </div>
      <span className="text-[6px] text-slate-500">STABLE CONTAINER GRID</span>
    </div>
    <div className="flex-1 py-2 flex flex-col gap-1">
      <div className="flex items-center justify-between bg-sky-950/20 px-1.5 py-0.5 rounded border border-sky-900/30">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-300">edge-router</span>
        </div>
        <span className="text-slate-500 text-[6px]">nginx:alpine</span>
      </div>
      <div className="flex items-center justify-between bg-sky-950/20 px-1.5 py-0.5 rounded border border-sky-900/30">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-300">redis-broker</span>
        </div>
        <span className="text-slate-500 text-[6px]">redis:7.2</span>
      </div>
      <div className="flex items-center justify-between bg-sky-950/20 px-1.5 py-0.5 rounded border border-sky-900/30 opacity-70">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="text-slate-400">django-cron</span>
        </div>
        <span className="text-slate-500 text-[6px]">python:3.11</span>
      </div>
    </div>
    <div className="text-[7px] text-sky-500/80 flex justify-between border-t border-sky-900/40 pt-1">
      <span>CPU: 1.4%</span>
      <span>RAM: 382MB</span>
    </div>
  </div>
);

const MongoDBMockup = () => (
  <div className="w-full h-[140px] bg-[#0c140e] rounded-lg p-3 border border-green-950 font-mono text-[8px] text-green-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-green-900/40 pb-1.5">
      <span className="text-green-500 font-bold uppercase tracking-wider">Compass Database Document</span>
      <span className="text-[6px] text-slate-500">prod_db.nodes</span>
    </div>
    <div className="flex-1 py-1.5 overflow-hidden">
      <div className="text-[7.5px] leading-relaxed text-slate-400">
        <span className="text-purple-400">{`{`}</span><br />
        <span className="pl-3 text-emerald-500">"_id":</span> <span className="text-amber-400">"65a2d9c021ef"</span>,<br />
        <span className="pl-3 text-emerald-500">"role":</span> <span className="text-amber-400">"edge-node"</span>,<br />
        <span className="pl-3 text-emerald-500">"active":</span> <span className="text-indigo-400">true</span>,<br />
        <span className="pl-3 text-emerald-500">"metrics":</span> <span className="text-purple-400">{`{`}</span> <span className="text-slate-500">"rtt": 4ms</span> <span className="text-purple-400">{`}`}</span><br />
        <span className="text-purple-400">{`}`}</span>
      </div>
    </div>
    <div className="text-[6px] text-green-600 flex justify-between border-t border-green-900/40 pt-1">
      <span>FILTER: {"{ role: 'edge-node' }"}</span>
      <span>SHARD: PRIMARY</span>
    </div>
  </div>
);

const PostgresMockup = () => (
  <div className="w-full h-[140px] bg-[#0b1219] rounded-lg p-2.5 border border-sky-950 font-mono text-[7px] text-slate-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-sky-900/40 pb-1.5 text-[8px]">
      <span className="text-sky-400 font-bold">SQL Editor: telemetry</span>
      <span className="text-emerald-400">SELECT * FROM cluster_metrics;</span>
    </div>
    <div className="flex-1 py-1.5 overflow-x-auto">
      <table className="w-full text-left border-collapse text-[7px]">
        <thead>
          <tr className="border-b border-sky-900/20 text-sky-500 font-bold text-[7px]">
            <th className="pb-1">id</th>
            <th className="pb-1">system_name</th>
            <th className="pb-1">status</th>
            <th className="pb-1">load_pct</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          <tr className="border-b border-sky-900/10">
            <td className="py-0.5">1</td>
            <td className="py-0.5">gateway-router</td>
            <td className="py-0.5 text-emerald-400">ACTIVE</td>
            <td className="py-0.5">18.4%</td>
          </tr>
          <tr className="border-b border-sky-900/10">
            <td className="py-0.5">2</td>
            <td className="py-0.5">vector-store</td>
            <td className="py-0.5 text-emerald-400">ACTIVE</td>
            <td className="py-0.5">42.1%</td>
          </tr>
          <tr className="opacity-60">
            <td className="py-0.5">3</td>
            <td className="py-0.5">auth-microservice</td>
            <td className="py-0.5 text-rose-400">STANDBY</td>
            <td className="py-0.5">0.0%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="text-[6px] text-sky-600 flex justify-between border-t border-sky-900/40 pt-1">
      <span>ROWS: 3</span>
      <span>EXECUTION TIME: 0.82ms</span>
    </div>
  </div>
);

const GitHubMockup = () => (
  <div className="w-full h-[140px] bg-[#090b0e] rounded-lg p-3 border border-white/5 font-mono text-[8px] text-slate-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <span className="text-[7.5px] text-slate-400">github.com/shammichalas</span>
      <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Actions Pipeline</span>
    </div>
    <div className="flex-1 py-2 flex flex-col justify-center items-center">
      <div className="text-[7px] text-slate-500 mb-1">1,824 contributions in the last 12 months</div>
      {/* 20 columns x 5 rows grid */}
      <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[2px]">
        {Array.from({ length: 100 }).map((_, i) => {
          // Generate realistic contribution density patterns
          const rand = Math.sin(i * 0.1) * Math.cos(i * 0.2);
          let bg = "bg-neutral-900"; // zero
          if (rand > 0.6) bg = "bg-emerald-400"; // very high
          else if (rand > 0.2) bg = "bg-emerald-600"; // medium
          else if (rand > -0.2) bg = "bg-emerald-800"; // low
          else if (rand > -0.6) bg = "bg-emerald-950"; // low-medium
          return <div key={i} className={`w-[5.5px] h-[5.5px] rounded-sm ${bg}`}></div>;
        })}
      </div>
    </div>
    <div className="text-[7px] text-emerald-400 border-t border-white/5 pt-1.5 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Check className="w-2.5 h-2.5" />
        <span>CI PIPELINE GREEN</span>
      </div>
      <span className="text-slate-500">telemetry-sync.yml</span>
    </div>
  </div>
);

const VSCodeMockup = () => (
  <div className="w-full h-[140px] bg-[#1e1e1e] rounded-lg p-2.5 border border-white/5 font-mono text-[7.5px] text-[#d4d4d4] flex flex-col justify-between overflow-hidden shadow-2xl">
    <div className="flex items-center justify-between border-b border-black/40 pb-1.5 text-[7px] text-slate-400">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span className="ml-1 text-slate-300 font-bold bg-[#2d2d2d] px-2 py-0.5 rounded border border-white/5">SkillsGalaxy.jsx</span>
      </div>
      <span className="text-slate-500">WORKSPACE: SHAMMICHALAS</span>
    </div>
    <div className="flex-1 py-1.5 flex text-left leading-normal">
      <div className="text-slate-600 text-right pr-2 select-none border-r border-white/5 mr-2">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
      <div className="flex-1 overflow-x-auto text-[7.5px] text-slate-300">
        <div><span className="text-purple-400">import</span> {`{ gsap }`} <span className="text-purple-400">from</span> <span className="text-emerald-400">'gsap'</span>;</div>
        <div><span className="text-purple-400">export function</span> <span className="text-blue-400">orchestrate</span>() {`{`}</div>
        <div className="pl-3"><span className="text-purple-400">return</span> <span className="text-cyan-400">System</span>.<span className="text-yellow-400">build</span>({`{`}</div>
        <div className="pl-6">architecture: <span className="text-emerald-400">"cinematic"</span></div>
        <div>{`  });`}</div>
      </div>
    </div>
    <div className="text-[6.5px] text-slate-500 flex justify-between border-t border-black/40 pt-1">
      <span>UTF-8 │ JAVASCRIPT REACT</span>
      <span>LN 3, COL 24</span>
    </div>
  </div>
);

const TerminalMockup = () => (
  <div className="w-full h-[140px] bg-black/90 rounded-lg p-3 border border-slate-900 font-mono text-[7.5px] text-slate-300 flex flex-col justify-between overflow-hidden relative">
    <div className="flex items-center justify-start gap-1.5 border-b border-white/5 pb-2 mb-1.5">
      <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
      <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
      <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
      <span className="text-[7px] text-slate-500 font-bold ml-2">bash - sham@edge-compute</span>
    </div>
    <div className="flex-1 flex flex-col gap-1.5 text-left text-slate-400 leading-tight">
      <div>
        <span className="text-emerald-400">sham@edge-compute:~$</span> <span className="text-slate-200">npm run build</span>
      </div>
      <div>
        <span className="text-slate-500">vite v6.0.0 building for production...</span>
      </div>
      <div className="text-emerald-400">✓ 142 modules compiled successfully.</div>
      <div className="text-slate-500 pl-2">
        dist/assets/index-A4f91.js &nbsp; &nbsp; 241.82 kB │ gzip: 64.18 kB<br />
        dist/assets/index-G92d1.css &nbsp; &nbsp; 48.12 kB │ gzip: 12.02 kB
      </div>
      <div className="flex items-center gap-1 text-emerald-400">
        <span>✔ Production build completed in 1.42s</span>
      </div>
    </div>
    <div className="text-[7px] text-slate-500 flex justify-between border-t border-white/5 pt-1.5">
      <span>SHELL: ZSH</span>
      <span className="flex items-center gap-1">
        <RefreshCw className="w-2.5 h-2.5 animate-spin text-emerald-400" />
        <span>SERVER STANDBY</span>
      </span>
    </div>
  </div>
);

const AWSMockup = () => (
  <div className="w-full h-[140px] bg-[#111721] rounded-lg p-3 border border-amber-500/20 font-mono text-[8px] text-slate-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <div className="flex items-center gap-1.5">
        <span className="text-amber-500 font-bold text-[9px]">AWS</span>
        <span className="text-slate-500 font-bold">CloudWatch</span>
      </div>
      <span className="text-[7px] text-emerald-400 bg-emerald-950/80 px-1 rounded-sm border border-emerald-900/30">ALL SYSTEMS OK</span>
    </div>
    <div className="flex-1 py-2 flex justify-between items-center gap-3">
      <div className="flex-1 flex flex-col justify-between h-full py-0.5 text-left gap-1">
        <div className="flex justify-between border-b border-white/5 pb-0.5">
          <span>Lambda::gateway</span>
          <span className="text-emerald-400">200 OK</span>
        </div>
        <div className="flex justify-between border-b border-white/5 pb-0.5">
          <span>ECS::cluster</span>
          <span className="text-emerald-400">100% UP</span>
        </div>
        <div className="flex justify-between">
          <span>S3::telemetry</span>
          <span className="text-sky-400">14.8 GB</span>
        </div>
      </div>
      <div className="w-14 h-full flex flex-col justify-between items-center bg-slate-950/50 p-1.5 rounded border border-white/5">
        <span className="text-[6.5px] text-slate-500 uppercase flex">Requests</span>
        <svg className="w-full h-8 overflow-visible">
          <path d="M 0 25 Q 10 5, 20 20 T 40 5 T 60 18" fill="none" stroke="#f97316" strokeWidth="1.5" />
          <circle cx="50" cy="18" r="2.5" fill="#f97316" className="animate-ping" />
        </svg>
      </div>
    </div>
    <div className="text-[7px] text-slate-500 border-t border-white/5 pt-1.5 flex justify-between">
      <span>REGION: us-east-1</span>
      <span>ERROR RATE: 0.02%</span>
    </div>
  </div>
);

const OpenAIMockup = () => (
  <div className="w-full h-[140px] bg-[#0f171d] rounded-lg p-3 border border-emerald-950/80 font-mono text-[8px] text-slate-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span className="text-[8px] text-slate-300 font-bold uppercase tracking-wider">GPT-4o fine-tuning</span>
      </div>
      <span className="text-[7px] text-slate-500">hyperparameters:dev</span>
    </div>
    <div className="flex-1 py-2 flex flex-col gap-2 leading-relaxed">
      <div className="bg-slate-900/60 p-1.5 rounded border border-white/5 text-right max-w-[80%] self-end text-slate-200">
        "Optimize SQL indexes for composite query workloads."
      </div>
      <div className="bg-[#050b10] p-1.5 rounded border border-emerald-900/20 max-w-[85%] text-slate-300">
        "To optimize, construct indexing using: <span className="text-emerald-400">CREATE INDEX idx_nodes ON nodes(status, load);</span>"
      </div>
    </div>
    <div className="text-[6px] text-slate-500 border-t border-white/5 pt-1.5 flex justify-between">
      <span>TEMPERATURE: 0.2</span>
      <span>TOKENS: 420 /sec</span>
    </div>
  </div>
);

const LangChainMockup = () => (
  <div className="w-full h-[140px] bg-slate-950/90 rounded-lg p-2.5 border border-white/5 font-mono text-[7.5px] text-slate-400 flex flex-col justify-between overflow-hidden relative">
    <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-1">
      <span className="text-[8px] text-slate-300 font-bold uppercase tracking-wider">LangChain Agent Canvas</span>
      <span className="text-[7px] text-purple-400">agent_state:execute</span>
    </div>
    <div className="flex-1 relative flex items-center justify-center">
      {/* Mini Node Graph */}
      <div className="absolute inset-0 flex items-center justify-between px-3">
        <div className="w-9 h-7 bg-[#1e1e2d] border border-sky-500/50 rounded flex flex-col justify-center items-center shadow-lg">
          <span className="text-[6px] text-sky-400 font-bold uppercase">Prompt</span>
        </div>
        <div className="w-9 h-7 bg-[#2d1e2f] border border-purple-500/50 rounded flex flex-col justify-center items-center shadow-lg">
          <span className="text-[6px] text-purple-400 font-bold uppercase">LLMChain</span>
        </div>
        <div className="w-9 h-7 bg-[#1e2d24] border border-emerald-500/50 rounded flex flex-col justify-center items-center shadow-lg">
          <span className="text-[6px] text-emerald-400 font-bold uppercase">Store</span>
        </div>
      </div>
      {/* Node connecting SVG line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 45 42 L 80 42" fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M 120 42 L 155 42" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="3 2" />
      </svg>
    </div>
    <div className="text-[6.5px] text-slate-500 border-t border-white/5 pt-1.5 flex justify-between">
      <span>MEMORY CORE: REDIS</span>
      <span>CALL LATENCY: 220ms</span>
    </div>
  </div>
);

const RAGMockup = () => (
  <div className="w-full h-[140px] bg-[#0c0d12] rounded-lg p-3 border border-white/5 font-mono text-[8px] text-slate-400 flex flex-col justify-between overflow-hidden">
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <span className="text-[8px] text-slate-300 font-bold uppercase tracking-wider">Semantic Vector Space</span>
      <span className="text-[7px] text-rose-400 font-bold">RAG PIPELINE</span>
    </div>
    <div className="flex-1 py-1.5 flex gap-2 justify-between items-center">
      {/* 2D Vector Cluster Space Scatter Plot */}
      <div className="w-18 h-full bg-slate-950/50 rounded border border-white/5 relative flex items-center justify-center">
        <div className="absolute top-2 left-4 w-1 h-1 bg-sky-400 rounded-full"></div>
        <div className="absolute top-6 left-8 w-1 h-1 bg-sky-400 rounded-full animate-ping"></div>
        <div className="absolute top-8 left-12 w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
        <div className="absolute top-4 left-16 w-1 h-1 bg-sky-400 rounded-full"></div>
        <div className="absolute top-8 left-2 w-1 h-1 bg-sky-400 rounded-full"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center text-left text-[7px] leading-snug">
        <div className="text-slate-500">QUERY EMBEDDING:</div>
        <div className="text-rose-400 truncate font-bold">[0.142, -0.912, 0.428...]</div>
        <div className="text-slate-500 mt-1">COSINE SIMILARITY:</div>
        <div className="text-emerald-400 font-bold">94.8% Match (Chunk_12)</div>
      </div>
    </div>
    <div className="text-[7px] text-slate-500 border-t border-white/5 pt-1.5 flex justify-between">
      <span>DIMENSIONS: 1536</span>
      <span>DB: PGVECTOR</span>
    </div>
  </div>
);

// ==========================================
// INDIVIDUAL FLOATING CARD WRAPPER WITH TILT
// ==========================================

const PremiumTechCard = ({ card, isMobile }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // 3D rotations based on mouse cursor position
  const rotateX = -tilt.y * 22; // max tilt degrees
  const rotateY = tilt.x * 22;
  const scale = tilt.x !== 0 || tilt.y !== 0 ? 1.05 : 1;
  const shadowTranslateZ = tilt.x !== 0 || tilt.y !== 0 ? '25px' : '0px';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-speed={card.speed}
      className={`parallax-card absolute z-20 transition-all duration-300 ease-out select-none cursor-pointer ${card.floatClass}`}
      style={{
        left: `${card.left}px`,
        top: card.top,
        width: `${isMobile ? card.size * 0.7 : card.size}px`,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Holographic Glowing Border Background */}
      <div 
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          background: 'rgba(10, 10, 12, 0.65)',
          boxShadow: `0 35px 80px -20px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)`,
        }}
        className="rounded-2xl p-4 backdrop-blur-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden group select-none"
      >
        {/* Fine-grained Noise Layer */}
        <div 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            opacity: 0.02
          }}
          className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
        />

        {/* Ambient Backlight Reflection */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, ${card.glow} 0%, transparent 60%)`
          }}
        />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-3 z-10 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
              {card.icon}
            </div>
            <span className="font-sans font-extrabold text-xs uppercase tracking-widest text-slate-200">
              {card.name}
            </span>
          </div>
          {/* Mini active status light */}
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_6px_#10b981] animate-pulse"></div>
        </div>

        {/* High-Fidelity Mockup Container */}
        <div 
          className="relative z-10 transition-transform duration-500 ease-out select-none"
          style={{ transform: `translateZ(${shadowTranslateZ})` }}
        >
          {card.mockup}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MOBILE FLOATING CARD SPECIFIC WRAPPER
// ==========================================

const MobileTechCard = ({ card }) => {
  return (
    <div
      className={`absolute z-10 select-none ${card.cls}`}
      style={{
        left: card.left || 'auto',
        right: card.right || 'auto',
        top: card.top,
        width: `${card.size}px`,
      }}
    >
      <div 
        style={{
          background: 'rgba(10, 10, 12, 0.75)',
          boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`,
        }}
        className="rounded-xl p-2.5 backdrop-blur-xl border border-white/5 flex flex-col justify-between overflow-hidden select-none"
      >
        <div className="flex items-center justify-between mb-2 select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center">
              {React.cloneElement(card.icon, { className: "w-2.5 h-2.5" })}
            </div>
            <span className="font-sans font-extrabold text-[8px] uppercase tracking-widest text-slate-300">
              {card.name}
            </span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></div>
        </div>
        
        {/* Scale down mockup to fit the mobile card */}
        <div className="scale-90 origin-top">
          {card.mockup}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN SKILLSGALAXY COMPONENT
// ==========================================

export default function SkillsGalaxy() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const mobileStickyRef = useRef(null);
  const wordRefs = useRef([]);

  // Clear word refs on each render to prevent array leakage
  wordRefs.current = [];

  // Styling token keyframe injections for floating offsets
  const animationStyles = `
    @keyframes float-up {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes float-down {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(12px); }
    }
    @keyframes rotate-slow {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(3deg); }
    }
    @keyframes rotate-counter-slow {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-3deg); }
    }
    @keyframes horizontal-drift {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(10px); }
    }
    @keyframes depth-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    .animate-float-up { animation: float-up 6s ease-in-out infinite; }
    .animate-float-down { animation: float-down 7s ease-in-out infinite; }
    .animate-rotate-slow { animation: rotate-slow 9s ease-in-out infinite; }
    .animate-rotate-counter-slow { animation: rotate-counter-slow 8s ease-in-out infinite; }
    .animate-horizontal-drift { animation: horizontal-drift 8s ease-in-out infinite; }
    .animate-depth-pulse { animation: depth-pulse 10s ease-in-out infinite; }
  `;

  // 14 Premium technology cards dataset for desktop
  const cardsData = [
    {
      name: "React",
      icon: <Code className="w-4 h-4 text-sky-400" />,
      size: 380,
      left: 450,
      top: "14%",
      speed: 1.08,
      floatClass: "animate-float-up",
      glow: "rgba(56, 189, 248, 0.15)",
      mockup: <ReactMockup />
    },
    {
      name: "VS Code",
      icon: <FileCode className="w-4 h-4 text-sky-500" />,
      size: 280,
      left: 950,
      top: "58%",
      speed: 0.92,
      floatClass: "animate-depth-pulse",
      glow: "rgba(0, 122, 255, 0.12)",
      mockup: <VSCodeMockup />
    },
    {
      name: "Next.js",
      icon: <Layers className="w-4 h-4 text-white" />,
      size: 340,
      left: 1550,
      top: "12%",
      speed: 1.05,
      floatClass: "animate-float-down",
      glow: "rgba(255, 255, 255, 0.1)",
      mockup: <NextMockup />
    },
    {
      name: "Spring Boot",
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      size: 240,
      left: 2100,
      top: "64%",
      speed: 0.95,
      floatClass: "animate-rotate-slow",
      glow: "rgba(109, 179, 63, 0.1)",
      mockup: <SpringBootMockup />
    },
    {
      name: "FastAPI",
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      size: 250,
      left: 2700,
      top: "15%",
      speed: 1.06,
      floatClass: "animate-horizontal-drift",
      glow: "rgba(5, 150, 105, 0.12)",
      mockup: <FastAPIMockup />
    },
    {
      name: "Terminal",
      icon: <TermIcon className="w-4 h-4 text-slate-400" />,
      size: 240,
      left: 3200,
      top: "60%",
      speed: 0.88,
      floatClass: "animate-float-up",
      glow: "rgba(148, 163, 184, 0.1)",
      mockup: <TerminalMockup />
    },
    {
      name: "Docker",
      icon: <Layers className="w-4 h-4 text-sky-500" />,
      size: 300,
      left: 3800,
      top: "13%",
      speed: 1.12,
      floatClass: "animate-float-down",
      glow: "rgba(14, 165, 233, 0.15)",
      mockup: <DockerMockup />
    },
    {
      name: "MongoDB",
      icon: <Database className="w-4 h-4 text-emerald-500" />,
      size: 290,
      left: 4400,
      top: "66%",
      speed: 0.94,
      floatClass: "animate-depth-pulse",
      glow: "rgba(34, 197, 94, 0.12)",
      mockup: <MongoDBMockup />
    },
    {
      name: "PostgreSQL",
      icon: <Database className="w-4 h-4 text-sky-600" />,
      size: 320,
      left: 5000,
      top: "12%",
      speed: 1.04,
      floatClass: "animate-float-up",
      glow: "rgba(51, 103, 145, 0.12)",
      mockup: <PostgresMockup />
    },
    {
      name: "GitHub",
      icon: <Play className="w-4 h-4 text-slate-300" />,
      size: 260,
      left: 5600,
      top: "62%",
      speed: 0.9,
      floatClass: "animate-rotate-counter-slow",
      glow: "rgba(255, 255, 255, 0.1)",
      mockup: <GitHubMockup />
    },
    {
      name: "AWS",
      icon: <Cloud className="w-4 h-4 text-amber-500" />,
      size: 330,
      left: 6200,
      top: "15%",
      speed: 1.15,
      floatClass: "animate-horizontal-drift",
      glow: "rgba(249, 115, 22, 0.15)",
      mockup: <AWSMockup />
    },
    {
      name: "OpenAI",
      icon: <Brain className="w-4 h-4 text-emerald-500" />,
      size: 310,
      left: 6800,
      top: "58%",
      speed: 0.96,
      floatClass: "animate-float-up",
      glow: "rgba(16, 185, 129, 0.15)",
      mockup: <OpenAIMockup />
    },
    {
      name: "LangChain",
      icon: <Workflow className="w-4 h-4 text-violet-400" />,
      size: 200,
      left: 7400,
      top: "14%",
      speed: 1.05,
      floatClass: "animate-rotate-slow",
      glow: "rgba(139, 92, 246, 0.1)",
      mockup: <LangChainMockup />
    },
    {
      name: "RAG Pipeline",
      icon: <Cpu className="w-4 h-4 text-rose-400" />,
      size: 190,
      left: 7900,
      top: "64%",
      speed: 0.92,
      floatClass: "animate-float-down",
      glow: "rgba(244, 63, 94, 0.1)",
      mockup: <RAGMockup />
    }
  ];

  // 6 Premium technology cards dataset for mobile
  const mobileCards = [
    {
      name: "React",
      icon: <Code className="w-4 h-4 text-sky-400" />,
      size: 130,
      left: "4%",
      top: "10%",
      glow: "rgba(56, 189, 248, 0.1)",
      mockup: <ReactMockup />,
      cls: "mobile-card-react"
    },
    {
      name: "Spring Boot",
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      size: 120,
      right: "4%",
      top: "14%",
      glow: "rgba(109, 179, 63, 0.08)",
      mockup: <SpringBootMockup />,
      cls: "mobile-card-springboot"
    },
    {
      name: "Docker",
      icon: <Layers className="w-4 h-4 text-sky-500" />,
      size: 125,
      left: "2%",
      top: "40%",
      glow: "rgba(14, 165, 233, 0.1)",
      mockup: <DockerMockup />,
      cls: "mobile-card-docker"
    },
    {
      name: "GitHub",
      icon: <Play className="w-4 h-4 text-slate-300" />,
      size: 120,
      right: "2%",
      top: "44%",
      glow: "rgba(255, 255, 255, 0.08)",
      mockup: <GitHubMockup />,
      cls: "mobile-card-github"
    },
    {
      name: "MongoDB",
      icon: <Database className="w-4 h-4 text-emerald-500" />,
      size: 120,
      left: "4%",
      top: "74%",
      glow: "rgba(34, 197, 94, 0.08)",
      mockup: <MongoDBMockup />,
      cls: "mobile-card-mongodb"
    },
    {
      name: "OpenAI",
      icon: <Brain className="w-4 h-4 text-emerald-500" />,
      size: 130,
      right: "4%",
      top: "78%",
      glow: "rgba(16, 185, 129, 0.1)",
      mockup: <OpenAIMockup />,
      cls: "mobile-card-openai"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const maxScrollX = () => trackRef.current ? trackRef.current.scrollWidth - window.innerWidth : 0;

    if (window.innerWidth >= 1024) {
      // ==========================================
      // DESKTOP: CINEMATIC HORIZONTAL CANVAS SCRUB
      // ==========================================
      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      desktopTl.to(trackRef.current, {
        x: () => -maxScrollX(),
        ease: 'none',
        duration: 0.75
      }, 0);

      desktopTl.to('.parallax-card', {
        x: (i, target) => {
          const speed = parseFloat(target.getAttribute('data-speed') || '1.0');
          return -maxScrollX() * (speed - 1);
        },
        ease: 'none',
        duration: 0.75
      }, 0);

      // Resting pause hold buffer at the end of scroll
      desktopTl.to({}, {
        duration: 0.25
      });

    } else {
      // ==========================================
      // MOBILE: PINNED TEXT REVEAL STORY FLOW
      // ==========================================
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Filter out empty spaces and select span targets
      const words = wordRefs.current.filter(Boolean);
      const totalSteps = words.length;

      // Programmed sequence:
      // Active word is highlighted at opacity 1 + subtle blue glow.
      // Previously read words transition to opacity 0.75.
      // Inactive future words remain at opacity 0.25.
      words.forEach((word, index) => {
        const startTime = index * 0.08; // sequential spacing

        // Highlight active word
        mobileTl.to(word, {
          opacity: 1,
          textShadow: '0 0 12px rgba(255, 255, 255, 0.95), 0 0 20px rgba(56, 189, 248, 0.45)',
          color: '#ffffff',
          duration: 0.05
        }, startTime);

        // Previous word dims to read status
        if (index > 0) {
          mobileTl.to(words[index - 1], {
            opacity: 0.75,
            textShadow: 'none',
            duration: 0.05
          }, startTime);
        }
      });

      // Subtle float animations and micro-rotation mapped to mobile scroll progress
      mobileTl.to('.mobile-card-react', { y: -20, rotate: 2, ease: 'none', duration: 0.8 }, 0);
      mobileTl.to('.mobile-card-springboot', { y: 25, rotate: -2, ease: 'none', duration: 0.8 }, 0);
      mobileTl.to('.mobile-card-docker', { y: -15, rotate: 1, ease: 'none', duration: 0.8 }, 0);
      mobileTl.to('.mobile-card-github', { y: 20, rotate: -2, ease: 'none', duration: 0.8 }, 0);
      mobileTl.to('.mobile-card-mongodb', { y: -25, rotate: 2, ease: 'none', duration: 0.8 }, 0);
      mobileTl.to('.mobile-card-openai', { y: 15, rotate: -1, ease: 'none', duration: 0.8 }, 0);

      // Final scroll hold so the full sentence is visible for a moment
      mobileTl.to({}, { duration: 0.22 });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative w-full h-[400vh] lg:h-[400vh] h-[250vh] bg-[#050505] overflow-visible border-t border-white/5 z-[25]"
    >
      <style>{animationStyles}</style>

      {/* ==========================================
          DESKTOP VIEWPORT: HORIZONTAL SCRUB POSTER
          ========================================== */}
      <div 
        ref={stickyRef}
        className="hidden lg:flex sticky top-0 w-full h-screen overflow-hidden flex-col justify-center bg-[#050505] z-[25]"
      >
        {/* Spatial Vignette to blend transitions */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-100" />

        {/* Panning Track */}
        <div 
          ref={trackRef}
          className="flex items-center relative h-full whitespace-nowrap px-[20vw] select-none"
          style={{ minWidth: '8400px' }}
        >
          {/* Monumental Text Line */}
          <h2 className="text-[clamp(140px,18vw,280px)] font-extrabold font-display tracking-tight text-white/5 uppercase select-none relative z-10 flex items-center leading-none">
            <span className="text-white/10 pr-6 transition-all duration-300 hover:text-white">I don't just</span>
            <span className="text-white/20 pr-6 transition-all duration-300 hover:text-white font-bold">know these</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 pr-6 select-none font-extrabold filter drop-shadow-[0_0_20px_rgba(139,92,246,0.1)]">technologies</span>
            <span className="text-white/25 pr-6">—</span>
            <span className="text-white/30 pr-6 transition-all duration-300 hover:text-white font-bold">I build</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 pr-6 font-extrabold filter drop-shadow-[0_0_20px_rgba(244,63,94,0.1)] font-extrabold">systems</span>
            <span className="text-white/15">with them.</span>
          </h2>

          {/* Absolute Cards */}
          {cardsData.map((card, i) => (
            <PremiumTechCard 
              key={i} 
              card={card} 
              isMobile={false}
            />
          ))}
        </div>
      </div>

      {/* ==========================================
          MOBILE VIEWPORT: PINNED TEXT REVEAL STORY
          ========================================== */}
      <div 
        ref={mobileStickyRef}
        className="flex lg:hidden sticky top-0 w-full h-screen overflow-hidden flex-col justify-center items-center bg-[#050505] z-[25] px-6"
      >
        {/* Spatial Vignette */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-100" />
        
        {/* Soft active glow behind the text */}
        <div className="absolute w-72 h-72 rounded-full bg-[hsla(210,80%,70%,0.015)] blur-[110px] pointer-events-none -z-10 animate-pulse" />

        {/* Central Responsive Typography Block */}
        <div className="max-w-[90%] text-center z-20 leading-[1.1]">
          <div className="flex flex-col text-center font-display font-extrabold tracking-tighter text-white uppercase select-none text-[32px] min-[400px]:text-[38px] min-[500px]:text-[46px]">
            {/* Line 1 */}
            <div className="mb-2 flex justify-center gap-1.5">
              <span ref={el => wordRefs.current[0] = el} className="inline-block opacity-25">I</span>
              <span ref={el => wordRefs.current[1] = el} className="inline-block opacity-25">don't</span>
              <span ref={el => wordRefs.current[2] = el} className="inline-block opacity-25">just</span>
              <span ref={el => wordRefs.current[3] = el} className="inline-block opacity-25">know</span>
            </div>
            
            {/* Line 2 */}
            <div className="mb-6 flex justify-center">
              <span ref={el => wordRefs.current[4] = el} className="inline-block opacity-25">these technologies —</span>
            </div>
            
            {/* Line 3 */}
            <div className="mb-2 flex justify-center gap-1.5">
              <span ref={el => wordRefs.current[5] = el} className="inline-block opacity-25">I</span>
              <span ref={el => wordRefs.current[6] = el} className="inline-block opacity-25">build</span>
              <span ref={el => wordRefs.current[7] = el} className="inline-block opacity-25">systems</span>
            </div>
            
            {/* Line 4 */}
            <div className="flex justify-center">
              <span ref={el => wordRefs.current[8] = el} className="inline-block opacity-25">with them.</span>
            </div>
          </div>
        </div>

        {/* Mobile floating cards */}
        {mobileCards.map((card, i) => (
          <MobileTechCard key={i} card={card} />
        ))}
      </div>
    </section>
  );
}
