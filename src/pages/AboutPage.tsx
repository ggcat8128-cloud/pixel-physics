import React from 'react';
import { Trophy, Lightbulb, Code2, Fingerprint, ArrowRight } from 'lucide-react';
import { soundFX } from '../audio/soundFX';
import { PageId } from '../components/Navbar';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold font-mono">
          <Trophy className="w-3.5 h-3.5 text-orange-600" />
          <span>PROJECT VISION & ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Project Vision & <span className="text-orange-500">Core Value</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          An interactive educational bridge uniting UI/UX Design, Computer Graphics Engineering, and Quantum Display Physics.
        </p>
      </div>

      {/* Featured Banner: Live Interactive Simulator */}
      <div className="rounded-[36px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-300/40">
        <div className="space-y-3 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            Interactive Learning Experience
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Touch, Disassemble, and Explore in Real Time
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            Experience the technology with your own hands: watch your finger disrupt electrostatic fields, separate 6 spatial display layers, and zoom 1000x into microscopic OLED diodes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              soundFX.swoosh();
              onNavigate('touch');
            }}
            className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-sm shadow-xl hover:bg-slate-50 hover:scale-105 transition flex items-center gap-2 whitespace-nowrap"
          >
            <Fingerprint className="w-4 h-4 text-orange-500" />
            <span>Try Touch Sensation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Core Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="modern-card p-6 sm:p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">1. Why Does This Topic Matter?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Billions of people look at phone displays daily thinking it is a single pane of glass. We demystify the spatial mathematics, capacitive touch sensors, GPU fragment shaders, and photon physics behind every tap into an accessible, interactive experience.
          </p>
        </div>

        <div className="modern-card p-6 sm:p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">2. "Show, Don't Tell" Philosophy</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Instead of static theoretical slides, visitors directly interact with the physical layer stack in 3D, dive 1000x into subpixel diodes, and see electrostatic charges drain live under their fingers.
          </p>
        </div>

        <div className="modern-card p-6 sm:p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">3. High-Fidelity Engineering</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Built on a custom Three.js WebGL 2.0 engine running at a smooth 60 FPS, with accurate OLED Diamond Pentile geometry, procedural Web Audio API synthesis, capacitive electrostatic algorithms, and clean multi-page SPA navigation.
          </p>
        </div>

      </div>

      {/* Tech Stack Specs Table */}
      <div className="modern-card p-6 sm:p-10 space-y-6">
        <h3 className="font-bold text-xl text-slate-900">
          Engineering Architecture
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">3D GRAPHICS</span>
            <span className="font-bold text-slate-900 text-sm">Three.js / WebGL 2.0</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">TOUCH SIMULATOR</span>
            <span className="font-bold text-slate-900 text-sm">Capacitive ITO Grid</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">FRONTEND UI</span>
            <span className="font-bold text-slate-900 text-sm">React 18 + TypeScript</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px]">AUDIO SYNTHESIS</span>
            <span className="font-bold text-slate-900 text-sm">Web Audio API</span>
          </div>
        </div>
      </div>

    </div>
  );
};
