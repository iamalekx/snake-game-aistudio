import React, { useState } from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import NeonBackground from './components/NeonBackground';
import { Activity, Gamepad2, Radio, Terminal } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState({
    score: 0,
    status: 'IDLE' as 'IDLE' | 'PLAYING' | 'GAMEOVER',
  });

  const handleScoreChange = (score: number) => {
    setGameState(prev => ({ ...prev, score }));
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <NeonBackground />

      {/* RAW HUD */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-6xl flex justify-between items-start mb-12 z-10 border-b-2 border-white/10 pb-4"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-display tracking-tighter uppercase italic bg-white text-black px-2">
              NEON_SYNTH
            </h1>
            <div className="flex gap-1">
               <div className="w-2 h-2 bg-cyan-500 animate-ping" />
               <div className="w-2 h-2 bg-magenta-500 animate-ping [animation-delay:0.2s]" />
            </div>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-display tracking-widest uppercase text-cyan-500">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              OS: GLITCH_KERN_v9
            </span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              UPTIME: 03:14:07
            </span>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end font-display">
          <div className="text-[10px] text-[#0f0] mb-1">NETWORK_STRENGTH: 98%</div>
          <div className="flex gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`w-4 h-1 ${i < 8 ? 'bg-[#0f0]' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </motion.header>

      {/* MAIN KERNEL */}
      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 items-center justify-center z-10">
        
        {/* LEFT_NODE: STATS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:flex flex-col gap-8 hidden w-64"
        >
          <div className="border-2 border-cyan-500 p-4 bg-cyan-500/5">
            <h2 className="text-xs font-display tracking-widest uppercase text-cyan-400 mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4" />
              IO_LOG
            </h2>
            <div className="space-y-4 font-mono text-[10px] text-white/40 leading-none">
              <p>{">"} INITIALIZING_BUFFER...</p>
              <p>{">"} FREQ_SYNC: OK</p>
              <p>{">"} RELINKING_DATA_STREAM...</p>
              <p className="text-cyan-500">{">"} CONNECTION_ESTABLISHED</p>
            </div>
          </div>

          <div className="border-4 border-magenta-500 p-4 bg-magenta-500 text-black font-display text-center">
            <p className="text-[10px] tracking-widest uppercase mb-1 font-bold">TOTAL_YIELD</p>
            <p className="text-5xl font-black italic tracking-tighter">
              {gameState.score.toString().padStart(4, '0')}
            </p>
          </div>
        </motion.div>

        {/* CENTER_NODE: EXECUTION */}
        <motion.div 
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0)', opacity: 1 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[450px]">
            <SnakeGame onScoreChange={handleScoreChange} />
          </div>
        </motion.div>

        {/* RIGHT_NODE: FREQUENCY */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <MusicPlayer />
        </motion.div>
      </main>

      {/* FOOTER_DECO */}
      <div className="fixed bottom-4 left-4 font-display text-[8px] text-white/20 uppercase tracking-[0.5em] vertical-rl rotate-180">
        TERMINAL_OP_UNAUTHORIZED
      </div>
      
      <div className="fixed top-1/2 -right-12 font-display text-[8px] text-white/20 uppercase tracking-[0.5em] rotate-90">
        SCANNING_SECTOR_7G
      </div>

      <motion.footer 
        className="mt-16 text-[10px] font-display tracking-[0.4em] uppercase text-magenta-500/50 text-center z-10"
      >
        <span>CORE_ENGINE: AI_STATION_3000</span>
      </motion.footer>

      {/* CRT OVERLAY LAYER */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <div className="absolute inset-0 bg-transparent animate-noise opacity-[0.03]" />
        {/* Horizontal Scanline line */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-4 bg-white/5 blur-sm"
        />
      </div>
    </div>
  );
}
