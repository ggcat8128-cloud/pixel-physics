import React from 'react';
import { Microscope } from 'lucide-react';

export const SubpixelInspector: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 w-full max-w-sm sm:max-w-md pointer-events-auto">
      <div className="glass-panel-elevated rounded-2xl p-5 text-white space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Microscope className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white">MICROSCOPIC DEEP ZOOM (1000x)</span>
              <p className="text-[10px] font-mono text-cyan-400">OLED DIAMOND PENTILE MATRIX</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
            10 µm PITCH
          </span>
        </div>

        {/* Microscopic Reticle View */}
        <div className="relative h-44 bg-black rounded-xl border border-white/15 overflow-hidden flex items-center justify-center">
          
          {/* Crosshair Lines */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-400/30"></div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-400/30"></div>
          
          {/* Concentric Reticle Rings */}
          <div className="absolute w-24 h-24 rounded-full border border-cyan-400/25 pointer-events-none"></div>
          <div className="absolute w-36 h-36 rounded-full border border-cyan-400/15 pointer-events-none"></div>

          {/* Real-time Diamond Pentile Subpixel Array Simulation */}
          <div className="grid grid-cols-3 gap-3 p-4 z-10">
            {/* Cell 1 */}
            <div className="relative w-14 h-14 bg-slate-950 border border-white/10 rounded-lg flex items-center justify-center">
              <div className="absolute top-1 inset-x-0 flex justify-center">
                <span className="w-3.5 h-2.5 rounded-full diode-red"></span>
              </div>
              <div className="absolute inset-y-0 left-1 flex items-center">
                <span className="w-2.5 h-3.5 rounded-full diode-green"></span>
              </div>
              <div className="absolute inset-y-0 right-1 flex items-center">
                <span className="w-2.5 h-3.5 rounded-full diode-green"></span>
              </div>
              <div className="absolute bottom-1 inset-x-0 flex justify-center">
                <span className="w-3.5 h-3.5 rounded-full diode-blue"></span>
              </div>
            </div>

            {/* Cell 2 */}
            <div className="relative w-14 h-14 bg-slate-950 border border-cyan-400/40 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <div className="absolute top-1 inset-x-0 flex justify-center">
                <span className="w-3.5 h-2.5 rounded-full diode-red"></span>
              </div>
              <div className="absolute inset-y-0 left-1 flex items-center">
                <span className="w-2.5 h-3.5 rounded-full diode-green"></span>
              </div>
              <div className="absolute inset-y-0 right-1 flex items-center">
                <span className="w-2.5 h-3.5 rounded-full diode-green"></span>
              </div>
              <div className="absolute bottom-1 inset-x-0 flex justify-center">
                <span className="w-3.5 h-3.5 rounded-full diode-blue"></span>
              </div>
            </div>

            {/* Cell 3 */}
            <div className="relative w-14 h-14 bg-slate-950 border border-white/10 rounded-lg flex items-center justify-center">
              <div className="absolute top-1 inset-x-0 flex justify-center">
                <span className="w-3.5 h-2.5 rounded-full diode-red"></span>
              </div>
              <div className="absolute inset-y-0 left-1 flex items-center">
                <span className="w-2.5 h-3.5 rounded-full diode-green"></span>
              </div>
              <div className="absolute inset-y-0 right-1 flex items-center">
                <span className="w-2.5 h-3.5 rounded-full diode-green"></span>
              </div>
              <div className="absolute bottom-1 inset-x-0 flex justify-center">
                <span className="w-3.5 h-3.5 rounded-full diode-blue"></span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry in viewfinder */}
          <div className="absolute bottom-1.5 inset-x-3 flex justify-between text-[8px] font-mono text-cyan-300">
            <span>R: 625nm (AlInGaP)</span>
            <span>G: 530nm (InGaN)</span>
            <span>B: 465nm (GaN)</span>
          </div>
        </div>

        {/* Explanation Text */}
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Diamond Pentile Layout:</strong> The human retina is most sensitive to green wavelengths, so displays incorporate twice as many green subpixels (arranged as diagonal pairs) to maximize perceived image sharpness.
          </p>
          <p className="text-[11px] text-slate-400">
            When viewed from a standard 30cm distance, these discrete photon emitters diffuse seamlessly into a crisp, unified picture.
          </p>
        </div>

      </div>
    </div>
  );
};
