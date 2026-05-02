import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Activity, Disc, Radio } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "SYNTH_ECHO_01",
    artist: "CONSTRUCT_A",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "NEON_DREAM_02",
    artist: "CONSTRUCT_B",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "CYBER_PULSE_03",
    artist: "CONSTRUCT_C",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("LNK_ERR:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="relative border-4 border-magenta-500 bg-black p-6 w-full max-w-xs shadow-[0_0_20px_#f0f] overflow-hidden">
      {/* Glitch Overlay Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 animate-pulse z-10" />
      
      <div className="flex flex-col items-center">
        {/* Data Platter */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: isPlaying ? [0, 90, 180, 270, 360] : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "steps(4)" }}
            className="w-40 h-40 border-8 border-cyan-500 flex items-center justify-center bg-[#111]"
          >
            <div className="w-[80%] h-[80%] border-2 border-magenta-500 flex items-center justify-center">
              <Disc className={`w-16 h-16 ${isPlaying ? 'text-white' : 'text-magenta-500'}`} />
            </div>
          </motion.div>
          
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-1">
             {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: isPlaying ? [2, Math.random() * 20 + 2, 2] : 2 }}
                transition={{ duration: 0.2, repeat: Infinity, ease: "steps(2)" }}
                className="w-2 bg-magenta-500"
              />
            ))}
          </div>
        </div>

        {/* Info Feed */}
        <div className="w-full mb-6 font-display">
          <h3 className="text-lg text-white mb-1 uppercase tracking-tighter truncate bg-white/5 px-2">
            FILE://{currentTrack.title}
          </h3>
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] text-cyan-400 opacity-80 uppercase italic">ID: {currentTrack.artist}</span>
            <Radio className={`w-3 h-3 ${isPlaying ? 'text-red-500 animate-ping' : 'text-white/20'}`} />
          </div>
        </div>

        {/* Binary Bar */}
        <div className="w-full mb-6 relative">
          <div className="h-4 w-full bg-white/10 border border-white/20 overflow-hidden relative">
            <motion.div 
              className="h-full bg-magenta-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
            {/* Binary text over progress */}
            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono mix-blend-difference text-white">
              {Array(20).fill(0).map(() => Math.round(Math.random())).join('')}
            </div>
          </div>
        </div>

        {/* Master Controls */}
        <div className="flex items-center gap-4 w-full">
          <button onClick={handlePrev} className="flex-1 border-2 border-cyan-500 p-2 hover:bg-cyan-500 hover:text-black transition-colors">
            <SkipBack className="w-5 h-5 mx-auto" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-[2] border-2 border-white p-3 bg-white text-black hover:bg-black hover:text-white transition-all font-display uppercase text-xs"
          >
            {isPlaying ? "STOP" : "BOOT"}
          </button>

          <button onClick={handleNext} className="flex-1 border-2 border-magenta-500 p-2 hover:bg-magenta-500 hover:text-black transition-colors">
            <SkipForward className="w-5 h-5 mx-auto" />
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 w-full flex justify-between text-[10px] font-mono text-cyan-500/50 uppercase italic">
          <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> BUFFERING...</span>
          <span>128Kbps</span>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
}
