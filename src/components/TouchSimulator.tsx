import React, { useState, useRef, useCallback } from 'react';
import { soundFX } from '../audio/soundFX';
import { Fingerprint, Zap, Activity, Cpu } from 'lucide-react';

export const TouchSimulator: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: 180, y: 220 });
  const [pressure, setPressure] = useState(0.75);
  const [viewMode, setViewMode] = useState<'capacitive' | 'photons' | 'code'>('capacitive');
  const [samplingRate, setSamplingRate] = useState<'240Hz' | '480Hz'>('240Hz');
  const [touchLog, setTouchLog] = useState<string[]>([
    'Touch Digitizer Initialized [240Hz Active]',
    'Electrostatic ITO Mesh Calibrated: 0.00 pF Baseline'
  ]);

  // Real-time capacitance delta based on touch presence & pressure
  const capDelta = isTouching ? -(pressure * 9.8).toFixed(2) : '-0.00';

  // Handle pointer down / move / up inside the phone screen
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setTouchPos({ x: Math.round(x), y: Math.round(y) });

    if (isTouching) {
      soundFX.click();
    }
  }, [isTouching]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsTouching(true);
    handlePointerMove(e);
    soundFX.click();
    const time = new Date().toLocaleTimeString();
    setTouchLog((prev) => [
      `[${time}] PointerDown: (${Math.round(touchPos.x)}, ${Math.round(touchPos.y)}) | ΔC: -${(pressure * 9.8).toFixed(1)}pF`,
      ...prev.slice(0, 5)
    ]);
  };

  const handlePointerUp = () => {
    if (isTouching) {
      setIsTouching(false);
      const time = new Date().toLocaleTimeString();
      setTouchLog((prev) => [
        `[${time}] PointerUp: Finger Released | Electrostatic baseline restored`,
        ...prev.slice(0, 5)
      ]);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Capacitive Touch Physics</h3>
            <p className="text-xs text-slate-500">Real-Time Electrostatic Field & Sensing Simulation</p>
          </div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          <button
            onClick={() => setViewMode('capacitive')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              viewMode === 'capacitive' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Capacitive Mesh (ITO)
          </button>
          <button
            onClick={() => setViewMode('photons')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              viewMode === 'photons' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            OLED Photon Reaction
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              viewMode === 'code' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            OS Signal Stream
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Interactive Smartphone Touchscreen (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          <div className="text-center pb-3">
            <span className="text-xs font-bold text-slate-400 font-mono">
              👇 TAP, HOLD, OR DRAG INSIDE THE PHONE SCREEN
            </span>
          </div>

          {/* Phone Frame */}
          <div className="w-full max-w-[360px] h-[520px] bg-slate-900 p-3.5 rounded-[48px] shadow-2xl border-4 border-slate-800 relative select-none">
            
            {/* Dynamic Island Cutout */}
            <div className="absolute top-6 inset-x-0 flex justify-center z-30 pointer-events-none">
              <div className="w-24 h-6 rounded-full bg-black border border-white/10 flex items-center justify-between px-2 text-[9px] text-white font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>240Hz</span>
              </div>
            </div>

            {/* Interactive Screen Surface */}
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-full bg-slate-950 rounded-[38px] relative overflow-hidden cursor-crosshair active:cursor-grabbing border border-slate-800 touch-none flex flex-col justify-between p-6"
            >
              
              {/* Background Layer A: Indium Tin Oxide (ITO) Sensor Grid Lines */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(249, 115, 22, 0.25) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(56, 189, 248, 0.25) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Real-time Capacitive Distortion Ripple / Finger Aura */}
              {isTouching && (
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                  style={{
                    left: `${touchPos.x}px`,
                    top: `${touchPos.y}px`
                  }}
                >
                  {/* Mode 1: Electrostatic Drain Ripple */}
                  {viewMode === 'capacitive' && (
                    <>
                      {/* Outer electrostatic disruption aura */}
                      <div 
                        className="rounded-full bg-orange-500/20 blur-xl animate-pulse"
                        style={{ width: `${80 * pressure + 40}px`, height: `${80 * pressure + 40}px` }}
                      />
                      {/* Core finger contact zone */}
                      <div 
                        className="absolute inset-0 m-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)] border-2 border-white"
                        style={{ width: `${40 * pressure + 20}px`, height: `${40 * pressure + 20}px` }}
                      />
                      {/* Charge flux lines */}
                      <div className="absolute inset-x-0 -top-6 text-center text-[10px] font-mono font-bold text-amber-300 whitespace-nowrap drop-shadow">
                        ΔC = {capDelta} pF
                      </div>
                    </>
                  )}

                  {/* Mode 2: OLED Photon Burst Reaction */}
                  {viewMode === 'photons' && (
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-cyan-400/30 blur-lg animate-ping" />
                      <div className="absolute w-12 h-12 rounded-full bg-white shadow-[0_0_35px_#38bdf8] border-2 border-cyan-300" />
                      <div className="absolute flex gap-1 -bottom-6 text-[9px] font-mono text-cyan-300 font-bold">
                        <span>RGB PHOTONS BURST</span>
                      </div>
                    </div>
                  )}

                  {/* Mode 3: OS Event Reticle */}
                  {viewMode === 'code' && (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-400 animate-spin" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400 absolute inset-0 m-auto" />
                      <span className="text-[9px] font-mono font-bold text-emerald-400 mt-2 bg-black/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
                        ({touchPos.x}, {touchPos.y})
                      </span>
                    </div>
                  )}

                </div>
              )}

              {/* Simulated UI Content inside Phone */}
              <div className="relative z-10 pt-10 text-white space-y-4 pointer-events-none">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>9:41</span>
                  <span>5G 100%</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">TOUCH EXPERIMENT CARD</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/30 text-orange-300 border border-orange-500/40">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    Tap anywhere on this screen. Human skin drains electrostatic charges from the ITO matrix.
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Touch Trigger Pill */}
              <div className="relative z-10 pb-4">
                <div 
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs text-center transition-all ${
                    isTouching 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/50 scale-95' 
                      : 'bg-white/15 text-white border border-white/20'
                  }`}
                >
                  {isTouching ? '⚡ Finger Detected (Charging Drain)' : '👆 Press or Drag Your Finger Here'}
                </div>
              </div>

            </div>

          </div>

          <span className="text-[11px] font-mono text-slate-400 mt-3">
            Status: <strong className={isTouching ? 'text-orange-500' : 'text-slate-600'}>
              {isTouching ? 'TOUCH DOWN (CAPACITANCE DRAINED)' : 'IDLE (NO CONTACT)'}
            </strong>
          </span>

        </div>

        {/* RIGHT: Live Physics Telemetry & Explanation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Telemetry Card */}
          <div className="modern-card p-6 space-y-5 bg-white">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-500" />
                <span>Live Touch Sensor Telemetry</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">
                {samplingRate} SCANNING
              </span>
            </div>

            {/* Readout Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">COORDINATES</span>
                <span className="text-sm font-bold text-slate-900">
                  X: {touchPos.x}px, Y: {touchPos.y}px
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">CAPACITANCE DROP (ΔC)</span>
                <span className="text-sm font-bold text-orange-600">
                  {capDelta} pF
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">SAMPLING LATENCY</span>
                <span className="text-sm font-bold text-slate-900">
                  {samplingRate === '240Hz' ? '4.16 ms' : '2.08 ms'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">TOUCH CONTROLLER</span>
                <span className="text-sm font-bold text-slate-900">
                  ADC 12-Bit Dual Bus
                </span>
              </div>

            </div>

            {/* Pressure Slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-mono">
                <span>SIMULATED FINGER PRESSURE:</span>
                <span className="text-orange-600 font-bold">{Math.round(pressure * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={pressure}
                onChange={(e) => setPressure(parseFloat(e.target.value))}
                className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Light Tap (Small Area)</span>
                <span>Firm Press (Large Area)</span>
              </div>
            </div>

            {/* Sampling Rate Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-700">Touch Sampling Rate:</span>
              <div className="flex gap-1.5 font-mono">
                <button
                  onClick={() => setSamplingRate('240Hz')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    samplingRate === '240Hz' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  240 Hz
                </button>
                <button
                  onClick={() => setSamplingRate('480Hz')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    samplingRate === '480Hz' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  480 Hz Pro
                </button>
              </div>
            </div>

          </div>

          {/* Real-time Hardware Event Log */}
          <div className="modern-card p-5 space-y-2 bg-slate-900 text-white font-mono text-[11px] rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[10px]">
              <span className="flex items-center gap-1.5 font-bold text-orange-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>OS TOUCH EVENT BUS</span>
              </span>
              <span>ADC STREAM</span>
            </div>

            <div className="space-y-1.5 h-28 overflow-y-auto pt-1 font-mono text-[10px] text-slate-300">
              {touchLog.map((log, i) => (
                <div key={i} className="truncate">
                  <span className="text-orange-400">➔</span> {log}
                </div>
              ))}
            </div>
          </div>

          {/* Educational Physics Insight */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5 leading-relaxed">
            <span className="font-bold flex items-center gap-1.5 text-amber-800">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>How Phone Glass Senses Your Touch:</span>
            </span>
            <p className="text-amber-800">
              Human skin is a natural electrical conductor with a dielectric constant of around 80. When your finger touches the glass, it creates a minute capacitive coupling that drains electrical charges from the diamond ITO wire grid. The controller measures this micro-capacitance drop ($\Delta C$) at 240Hz to pinpoint your finger's exact coordinate in under 5 milliseconds!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
