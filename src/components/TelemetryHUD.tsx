import React from 'react';
import { ViewMode } from '../scene/DisplayScene';

interface TelemetryHUDProps {
  currentMode: ViewMode;
  separation: number;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ currentMode, separation }) => {
  return (
    <div className="fixed top-20 left-4 sm:left-6 z-30 hidden md:block max-w-xs pointer-events-none select-none">
      <div className="glass-panel rounded-2xl p-4 text-white space-y-3 border border-white/10 shadow-xl">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-white tracking-wider">TELEMETRY</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">WebGL 2.0</span>
        </div>

        <div className="space-y-2 font-mono text-[11px]">
          
          <div className="flex justify-between items-center">
            <span className="text-slate-400">ACTIVE MODE:</span>
            <span className="text-purple-300 font-bold uppercase">{currentMode}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">PIXEL DENSITY:</span>
            <span className="text-cyan-400 font-bold">460 PPI (10µm)</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Z-SEPARATION:</span>
            <span className="text-white font-bold">{Math.round(separation * 80)} mm</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">COLOR SPACE:</span>
            <span className="text-emerald-400 font-bold">Display P3</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">FRAME TIME:</span>
            <span className="text-slate-300">8.3 ms (120Hz)</span>
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500">
            <div>EMITTER WAVELENGTHS:</div>
            <div className="flex justify-between mt-1 text-slate-400">
              <span className="text-[#ff1a53]">R: 625nm</span>
              <span className="text-[#00ff73]">G: 530nm</span>
              <span className="text-[#0088ff]">B: 465nm</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
