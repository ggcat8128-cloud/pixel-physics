import React, { useState } from 'react';
import { soundFX } from '../audio/soundFX';
import { Microscope, Sliders, Lightbulb } from 'lucide-react';

export const LabPage: React.FC = () => {
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
    soundFX.photonChime(400 + (newR + newG + newB));
  };

  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const currentHex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold font-mono">
          <Microscope className="w-3.5 h-3.5 text-cyan-600" />
          <span>MICRO & PHOTON LAB</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Subpixel & <span className="text-orange-500">RGB Light</span> Laboratory
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Zoom 1000x into microscopic OLED diodes and manipulate Red, Green, and Blue channels to witness how discrete light packets synthesize full color.
        </p>
      </div>

      {/* Grid: 2 Big Interactive Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SECTION: 1000x Deep Zoom Reticle Viewfinder */}
        <div className="lg:col-span-6 modern-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">1000x Microscopic Zoom</h3>
                <span className="text-[11px] font-mono text-cyan-600 font-semibold">OLED DIAMOND PENTILE MATRIX</span>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
              10 µm PITCH
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            What appears as a solid unified color to the human eye is physically constructed from discrete 10-micron Red, Green, and Blue organic light-emitting diodes.
          </p>

          {/* Microscopic Viewfinder Box */}
          <div className="relative h-64 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
            
            {/* Viewfinder Crosshair */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/30" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/30" />
            <div className="absolute w-36 h-36 rounded-full border border-cyan-400/25 pointer-events-none" />
            <div className="absolute w-52 h-52 rounded-full border border-cyan-400/15 pointer-events-none" />

            {/* Simulated Pentile Diode Matrix */}
            <div className="grid grid-cols-3 gap-4 z-10">
              {[0, 1, 2].map((idx) => (
                <div 
                  key={idx}
                  className={`relative w-16 h-16 bg-slate-900 border rounded-xl flex items-center justify-center ${
                    idx === 1 ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]' : 'border-slate-800'
                  }`}
                >
                  {/* Red Top Diamond */}
                  <div className="absolute top-1.5 inset-x-0 flex justify-center">
                    <span className="w-4 h-3 rounded-full diode-red" />
                  </div>
                  {/* Green Pair */}
                  <div className="absolute inset-y-0 left-1.5 flex items-center">
                    <span className="w-3 h-4 rounded-full diode-green" />
                  </div>
                  <div className="absolute inset-y-0 right-1.5 flex items-center">
                    <span className="w-3 h-4 rounded-full diode-green" />
                  </div>
                  {/* Blue Bottom Diamond */}
                  <div className="absolute bottom-1.5 inset-x-0 flex justify-center">
                    <span className="w-4 h-4 rounded-full diode-blue" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Telemetry */}
            <div className="absolute bottom-2.5 inset-x-4 flex justify-between text-[9px] font-mono text-cyan-300">
              <span>R: 625nm (AlInGaP)</span>
              <span>G: 530nm (InGaN)</span>
              <span>B: 465nm (GaN)</span>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-100 text-xs text-cyan-900 space-y-1 leading-relaxed">
            <span className="font-bold block">💡 Why are there twice as many Green subpixels?</span>
            <p className="text-cyan-800">
              Human retinas have peak sensitivity to green wavelengths (530nm). Display engineers arrange green emitters as double diagonal pairs, providing maximum perceived sharpness while balancing diode longevity.
            </p>
          </div>

        </div>

        {/* RIGHT SECTION: Real-time RGB Additive Color Synthesis Lab */}
        <div className="lg:col-span-6 modern-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">RGB Additive Color Sandbox</h3>
                <span className="text-[11px] font-mono text-purple-600 font-semibold">ADDITIVE COLOR ILLUSION</span>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-white font-bold">
              {currentHex}
            </span>
          </div>

          {/* Split Comparison Box: Micro Diodes vs Human Eye */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* 1. Microscopic Diodes */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-between h-36">
              <span className="text-[10px] font-mono text-slate-400 font-bold">10µm PHYSICAL REALITY</span>
              <div className="flex gap-2.5 items-center my-auto">
                <div 
                  className="w-4 h-12 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: '#ef4444',
                    opacity: Math.max(0.1, r / 255),
                    boxShadow: `0 0 ${Math.round((r / 255) * 20)}px #ef4444`
                  }}
                />
                <div 
                  className="w-4 h-10 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: '#10b981',
                    opacity: Math.max(0.1, g / 255),
                    boxShadow: `0 0 ${Math.round((g / 255) * 20)}px #10b981`
                  }}
                />
                <div 
                  className="w-4 h-12 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: '#3b82f6',
                    opacity: Math.max(0.1, b / 255),
                    boxShadow: `0 0 ${Math.round((b / 255) * 20)}px #3b82f6`
                  }}
                />
              </div>
              <span className="text-[9px] font-mono text-slate-500">3 DISCRETE EMITTERS</span>
            </div>

            {/* 2. Perceived Human Eye Color */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-between h-36">
              <span className="text-[10px] font-mono text-slate-400 font-bold">HUMAN RETINA (PERCEIVED)</span>
              <div 
                className="w-20 h-16 rounded-xl border-2 border-white/40 shadow-2xl transition-all duration-150 my-auto"
                style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              />
              <span className="text-[10px] font-mono font-bold text-white">
                {r === 0 && g === 0 && b === 0 ? 'TRUE BLACK' : currentHex}
              </span>
            </div>

          </div>

          {/* RGB Range Sliders */}
          <div className="space-y-3 font-mono text-xs">
            {/* Red */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-rose-500">RED CHANNEL (625nm):</span>
                <span className="text-slate-800">{r} / 255</span>
              </div>
              <input 
                type="range"
                min="0"
                max="255"
                value={r}
                onChange={(e) => updateColor(parseInt(e.target.value), g, b)}
                className="w-full accent-rose-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Green */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-emerald-500">GREEN CHANNEL (530nm):</span>
                <span className="text-slate-800">{g} / 255</span>
              </div>
              <input 
                type="range"
                min="0"
                max="255"
                value={g}
                onChange={(e) => updateColor(r, parseInt(e.target.value), b)}
                className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Blue */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-blue-500">BLUE CHANNEL (465nm):</span>
                <span className="text-slate-800">{b} / 255</span>
              </div>
              <input 
                type="range"
                min="0"
                max="255"
                value={b}
                onChange={(e) => updateColor(r, g, parseInt(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 block">Quick Color Presets:</span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => updateColor(preset.r, preset.g, preset.b)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 transition"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Insight Callout */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1 leading-relaxed">
            <span className="font-bold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Scientific Fact:</span>
            </span>
            <p className="text-amber-800">
              Displays cannot physically emit yellow light! When Red and Green diodes shine simultaneously, human Long (L) and Medium (M) cone cells are stimulated equally, and the visual cortex synthesizes the sensory input as <strong>YELLOW</strong>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
