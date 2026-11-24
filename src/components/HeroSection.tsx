import React from 'react';
import { Layers, Eye, Cpu, ChevronRight } from 'lucide-react';
import { soundFX } from '../audio/soundFX';
import { ViewMode } from '../scene/DisplayScene';

interface HeroSectionProps {
  onSelectMode: (mode: ViewMode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectMode }) => {
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-8 flex flex-col items-center text-center select-none pointer-events-none">
      
      {/* Sub-headline Badge */}
      <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[11px] text-purple-300 font-mono mb-4 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
        <span>THE ARCHITECTURE OF DIGITAL LIGHT</span>
      </div>

      {/* Main Epic Heading */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-white max-w-4xl">
        The Physics Behind <br />
        <span className="epic-gradient-text">Every Single Pixel</span>
      </h1>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
        An interactive 3D web simulation exploring how digital UI decomposes into 6 physical spatial layers, layout geometry, GPU fragment shaders, and millions of microscopic RGB OLED light photons.
      </p>

      {/* Action Buttons */}
      <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => {
            soundFX.swoosh();
            onSelectMode('exploded');
          }}
          className="glow-button px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white flex items-center gap-2"
        >
          <Layers className="w-4 h-4 text-purple-300" />
          <span>Explore 3D Layers</span>
          <ChevronRight className="w-4 h-4 text-purple-300/70" />
        </button>

        <button
          onClick={() => {
            soundFX.microscopeFocus();
            onSelectMode('zoom');
          }}
          className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 border border-white/20 text-white flex items-center gap-2 backdrop-blur-md transition hover:-translate-y-0.5"
        >
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>Microscopic Zoom (1000x)</span>
        </button>
      </div>

      {/* PHOTONIC LIGHT WAVE (The Epic Fiber-Optic Wave Graphic) */}
      <div className="w-full max-w-3xl h-24 my-6 relative overflow-hidden flex items-center justify-center opacity-85">
        <svg className="w-full h-full" viewBox="0 0 1000 140" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveLightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="20%" stopColor="#c084fc" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#e879f9" stopOpacity="0.95" />
            </linearGradient>
            <filter id="waveGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Wave strands */}
          <path d="M 0 70 Q 250 10 500 70 T 1000 70" stroke="url(#waveLightGradient)" strokeWidth="6" filter="url(#waveGlowFilter)" fill="none" opacity="0.6"/>
          <path d="M 0 72 Q 240 15 490 68 T 1000 68" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.9"/>
          <path d="M 0 75 Q 260 25 510 72 T 1000 74" stroke="#c084fc" strokeWidth="2.5" fill="none" opacity="0.75"/>
          <path d="M 0 68 Q 230 5 480 66 T 1000 66" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.7"/>
        </svg>
      </div>

      {/* Quick Feature Pillars */}
      <div className="pointer-events-auto grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl text-left">
        <div 
          onClick={() => { soundFX.swoosh(); onSelectMode('exploded'); }}
          className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-purple-400/50 backdrop-blur-md cursor-pointer transition group"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold mb-1">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>01. 6-LAYER ARCHITECTURE</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">Sapphire glass, UI, Paint, Wireframe, OLED grid, and chassis.</p>
        </div>

        <div 
          onClick={() => { soundFX.microscopeFocus(); onSelectMode('zoom'); }}
          className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-cyan-400/50 backdrop-blur-md cursor-pointer transition group"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold mb-1">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>02. 1000x DEEP ZOOM</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">Dive into the OLED Diamond Pentile micro-emitter array.</p>
        </div>

        <div 
          onClick={() => { soundFX.click(); onSelectMode('rgblab'); }}
          className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-400/50 backdrop-blur-md cursor-pointer transition group"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 font-bold mb-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>03. RGB PHOTON LAB</span>
          </div>
          <p className="text-xs text-slate-400 leading-snug">Synthesize colors through real-time additive light synthesis.</p>
        </div>
      </div>

    </div>
  );
};
