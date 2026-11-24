import React from 'react';
import { PageId } from './Navbar';
import { Heart, Fingerprint } from 'lucide-react';
import { soundFX } from '../audio/soundFX';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-300/40">
              <span className="font-bold text-base font-mono">3D</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
              Pixel<span className="text-orange-500">Physics</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            An interactive 3D web simulation exploring how digital UI decomposes into 6 physical spatial layers, capacitive touch sensing, and millions of microscopic Red, Green, and Blue (RGB) OLED light photons.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Hackathon Showcase</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-xs font-mono uppercase text-slate-900 tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
            <li>
              <button 
                onClick={() => { soundFX.click(); onNavigate('home'); }} 
                className="hover:text-orange-600 transition"
              >
                Home Overview
              </button>
            </li>
            <li>
              <button 
                onClick={() => { soundFX.click(); onNavigate('layers'); }} 
                className="hover:text-orange-600 transition"
              >
                3D Exploded Layers
              </button>
            </li>
            <li>
              <button 
                onClick={() => { soundFX.click(); onNavigate('touch'); }} 
                className="hover:text-orange-600 transition flex items-center gap-1.5"
              >
                <span>Touch Physics Simulator</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-100 text-orange-700 font-bold">New</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => { soundFX.click(); onNavigate('lab'); }} 
                className="hover:text-orange-600 transition"
              >
                RGB & Subpixel Lab
              </button>
            </li>
            <li>
              <button 
                onClick={() => { soundFX.click(); onNavigate('pipeline'); }} 
                className="hover:text-orange-600 transition"
              >
                6-Stage Render Pipeline
              </button>
            </li>
            <li>
              <button 
                onClick={() => { soundFX.click(); onNavigate('about'); }} 
                className="hover:text-orange-600 transition"
              >
                About & Architecture
              </button>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
          <h4 className="font-bold text-xs font-mono uppercase text-slate-900 tracking-wider mb-4">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">Three.js</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">WebGL 2.0</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">Capacitive ITO</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">React 18</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">Tailwind CSS</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">Web Audio API</span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                soundFX.swoosh();
                onNavigate('touch');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl btn-primary-orange text-xs font-bold shadow-md shadow-orange-300/30"
            >
              <Fingerprint className="w-4 h-4" />
              <span>Launch Touch Simulator</span>
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <span>© 2026 PixelPhysics. Interactive Educational Display Simulation.</span>
        <div className="flex items-center gap-6">
          <span>OLED Diamond Pentile (460 PPI)</span>
          <span>Capacitive Sensing (ΔC)</span>
        </div>
      </div>
    </footer>
  );
};
