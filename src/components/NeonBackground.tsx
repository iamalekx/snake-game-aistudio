import React from 'react';
import { motion } from 'motion/react';

export default function NeonBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000]">
      {/* Static Noise Overlay */}
      <div className="absolute inset-0 static-overlay opacity-10 mix-blend-screen" />
      
      {/* Low-res Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0ff 1px, transparent 1px),
            linear-gradient(to bottom, #f0f 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Screen Tearing Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ left: '-100%', top: `${Math.random() * 100}%` }}
            animate={{ 
              left: ['-100%', '200%'],
              opacity: [0, 0.4, 0] 
            }}
            transition={{
              duration: 0.1 + Math.random() * 0.4,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 5,
              ease: "linear"
            }}
            className="absolute h-px w-full bg-magenta-500 shadow-[0_0_15px_#f0f]"
          />
        ))}
      </div>

      {/* Retro Perspective - Distorted */}
      <div className="absolute bottom-0 w-full h-[60%] [perspective:800px] opacity-10">
        <motion.div 
          animate={{ 
            rotateX: [60, 58, 62, 60],
            skewX: [0, 2, -2, 0]
          }}
          transition={{ duration: 0.2, repeat: Infinity, ease: "steps(4)" }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0ff 1px, transparent 1px),
              linear-gradient(to bottom, #f0f 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* CRT Vignette Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
    </div>
  );
}
