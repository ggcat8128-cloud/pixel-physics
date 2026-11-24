import React, { useState } from 'react';
import { soundFX } from '../audio/soundFX';
import { Sliders } from 'lucide-react';

interface RGBLabProps {
  onRGBChange: (r: number, g: number, b: number) => void;
}

export const RGBLab: React.FC<RGBLabProps> = ({ onRGBChange }) => {
  const [r, setR] = useState(255);
  const [g, setG] = useState(215);
  const [b, setB] = useState(0);

  const presets = [
    { name: 'Warm Gold', r: 255, g: 215, b: 0 },
    { name: 'Neon Cyan', r: 0, g: 245, b: 255 },
    { name: 'Hot Pink', r: 255, g: 26, b: 180 },
    { name: 'Pure White', r: 255, g: 255, b: 255 },
    { name: 'Lime Green', r: 50, g: 255, b: 70 },
    { name: 'OLED Pure Black', r: 0, g: 0, b: 0 }
  ];

  const updateColor = (newR: number, newG: number, newB: number) => {
    setR(newR);
    setG(newG);
    setB(newB);
    onRGBChange(newR, newG, newB);
    soundFX.photonChime(400 + (newR + newG + newB));
  };

  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const currentHex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 w-full max-w-sm sm:max-w-md pointer-events-auto">
      <div className="glass-panel-elevated rounded-2xl p-5 text-white space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white">RGB PHOTON SYNTHESIS LAB</span>
              <p className="text-[10px] font-mono text-purple-300">ADDITIVE COLOR ILLUSION</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white font-bold">
            {currentHex}
          </span>
        </div>

        {/* Split Screen: Microscopic Reality vs Human Eye Perception */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* 1. Microscopic Diodes */}
          <div className="bg-black/80 p-3 rounded-xl border border-white/15 flex flex-col items-center justify-between h-28">
            <span className="text-[9px] font-mono text-slate-400">10µm REALITY (DISCRETE)</span>
            <div className="flex gap-2 items-center my-auto">
              {/* Red Diode */}
              <div 
                className="w-3.5 h-10 rounded-full transition-all duration-150"
                style={{
                  backgroundColor: '#ff1a53',
                  opacity: Math.max(0.1, r / 255),
                  boxShadow: `0 0 ${Math.round((r / 255) * 16)}px #ff1a53`
                }}
              />
              {/* Green Diode */}
              <div 
                className="w-3.5 h-8 rounded-full transition-all duration-150"
                style={{
                  backgroundColor: '#00ff73',
                  opacity: Math.max(0.1, g / 255),
                  boxShadow: `0 0 ${Math.round((g / 255) * 16)}px #00ff73`
                }}
              />
              {/* Blue Diode */}
              <div 
                className="w-3.5 h-10 rounded-full transition-all duration-150"
                style={{
                  backgroundColor: '#0088ff',
                  opacity: Math.max(0.1, b / 255),
                  boxShadow: `0 0 ${Math.round((b / 255) * 16)}px #0088ff`
                }}
              />
            </div>
            <span className="text-[8px] font-mono text-slate-500">3 PHYSICAL EMITTERS</span>
          </div>

          {/* 2. Human Eye Perceived Color */}
          <div className="bg-black/80 p-3 rounded-xl border border-white/15 flex flex-col items-center justify-between h-28">
            <span className="text-[9px] font-mono text-slate-400">HUMAN EYE (PERCEPTION)</span>
            <div 
              className="w-16 h-12 rounded-lg border border-white/30 shadow-2xl transition-all duration-150 my-auto"
              style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
            />
            <span className="text-[9px] font-mono text-white font-bold">
              {r === 0 && g === 0 && b === 0 ? 'TRUE OLED BLACK' : currentHex}
            </span>
          </div>

        </div>

        {/* RGB Sliders */}
        <div className="space-y-2 font-mono text-xs">
          {/* Red */}
          <div className="flex items-center gap-3">
            <span className="w-5 text-[#ff1a53] font-bold text-xs">R</span>
            <input 
              type="range" 
              min="0" 
              max="255" 
              value={r}
              onChange={(e) => updateColor(parseInt(e.target.value), g, b)}
              className="w-full accent-[#ff1a53] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span className="w-8 text-right text-slate-300 font-bold">{r}</span>
          </div>

          {/* Green */}
          <div className="flex items-center gap-3">
            <span className="w-5 text-[#00ff73] font-bold text-xs">G</span>
            <input 
              type="range" 
              min="0" 
              max="255" 
              value={g}
              onChange={(e) => updateColor(r, parseInt(e.target.value), b)}
              className="w-full accent-[#00ff73] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span className="w-8 text-right text-slate-300 font-bold">{g}</span>
          </div>

          {/* Blue */}
          <div className="flex items-center gap-3">
            <span className="w-5 text-[#0088ff] font-bold text-xs">B</span>
            <input 
              type="range" 
              min="0" 
              max="255" 
              value={b}
              onChange={(e) => updateColor(r, g, parseInt(e.target.value))}
              className="w-full accent-[#0088ff] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span className="w-8 text-right text-slate-300 font-bold">{b}</span>
          </div>
        </div>

        {/* Quick Preset Pills */}
        <div className="pt-1">
          <span className="text-[10px] font-mono text-slate-400 block mb-1.5">PRESETS:</span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateColor(preset.r, preset.g, preset.b)}
                className="px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:border-purple-400 text-[10px] font-mono text-slate-300 transition"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Educational Insight */}
        <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/20 text-[11px] font-sans text-slate-300 leading-snug">
          💡 <strong className="text-white">Scientific Fact:</strong> Displays cannot physically emit yellow light! When Red and Green diodes shine simultaneously, human Long (L) and Medium (M) cone cells are stimulated equally, and the visual cortex synthesizes the sensory input as <strong>YELLOW</strong>.
        </div>

      </div>
    </div>
  );
};
