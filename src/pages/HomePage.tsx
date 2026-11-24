import React from 'react';
import { PageId } from '../components/Navbar';
import { soundFX } from '../audio/soundFX';
import { Layers, Microscope, Sliders, ArrowRight, CheckCircle2, Fingerprint } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'touch' as PageId,
      badge: 'Interactive Sensation',
      badgeColor: 'bg-rose-100 text-rose-800',
      icon: <Fingerprint className="w-6 h-6 text-rose-500" />,
      title: 'Capacitive Touch Sensing',
      desc: 'Tap and drag your finger to see how the electrostatic ITO sensor grid detects capacitance drops (ΔC) in under 5 milliseconds.',
      highlight: '240Hz Electrostatic Grid'
    },
    {
      id: 'layers' as PageId,
      badge: '3D Simulation',
      badgeColor: 'bg-amber-100 text-amber-800',
      icon: <Layers className="w-6 h-6 text-orange-500" />,
      title: '3D Layer Decomposition',
      desc: 'Explode the screen along the Z-axis into 6 floating layers: Sapphire Glass, UI Surface, GPU Paint, Wireframe, OLED Grid, and Titanium Chassis.',
      highlight: '0mm - 80mm Z-Separation Slider'
    },
    {
      id: 'lab' as PageId,
      badge: '1000x Macro',
      badgeColor: 'bg-cyan-100 text-cyan-800',
      icon: <Microscope className="w-6 h-6 text-cyan-600" />,
      title: 'Microscopic Pixel Zoom',
      desc: 'Dive 1000x into the screen surface to observe individual Red (625nm), Green (530nm), and Blue (465nm) organic light-emitting diodes.',
      highlight: '10µm Subpixel Pitch'
    },
    {
      id: 'lab' as PageId,
      badge: 'Interactive Lab',
      badgeColor: 'bg-purple-100 text-purple-800',
      icon: <Sliders className="w-6 h-6 text-purple-600" />,
      title: 'RGB Light Laboratory',
      desc: 'Manipulate R, G, B channels in real time to witness how discrete light points trigger human cone cells into perceiving yellow, magenta, or pure white.',
      highlight: 'Additive Color Synthesis'
    }
  ];

  return (
    <div className="space-y-24 relative overflow-hidden">
      
      {/* Background Soft Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blob-yellow rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-blob-blue rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-10 w-96 h-96 bg-blob-purple rounded-full blur-3xl pointer-events-none -z-10" />

      {/* HERO SECTION (Hello removed as requested) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-xs font-bold tracking-wide shadow-sm">
            <span>✨</span>
            <span>INTERACTIVE 3D DISPLAY & TOUCH SIMULATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            How does your screen <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
              actually come to life?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            We perceive phone screens as a single flat image — but behind that glass lies an intricate combination of <strong>capacitive touch sensors</strong>, <strong>6 spatial layers</strong>, layout geometry, GPU fragment shaders, and millions of microscopic <strong>RGB OLED light photons</strong>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundFX.swoosh();
                onNavigate('touch');
              }}
              className="btn-primary-orange px-8 py-4 text-sm font-bold flex items-center gap-3 shadow-xl"
            >
              <Fingerprint className="w-5 h-5" />
              <span>Try Touch Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFX.click();
                onNavigate('layers');
              }}
              className="btn-secondary-white px-7 py-4 text-sm font-semibold flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Explore 3D Layers</span>
            </button>
          </div>

          {/* Mini Checkmarks */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Capacitive Sensing (ΔC)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>3D Spatial Decomposition</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>1000x Microscopic Zoom</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Visual Graphic with Floating Badges */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          <div className="relative w-full max-w-[420px] h-[440px] flex items-center justify-center">
            
            {/* Organic blob background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-300 rounded-[50px] rotate-3 shadow-2xl opacity-90 transform hover:rotate-6 transition duration-500" />
            <div className="absolute inset-2 bg-gradient-to-bl from-sky-400 to-blue-600 rounded-[46px] -rotate-3 opacity-90" />
            
            {/* Center Content Card */}
            <div className="relative z-10 w-[88%] h-[88%] bg-white rounded-[36px] shadow-2xl p-6 flex flex-col justify-between border border-slate-100">
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    3D
                  </div>
                  <span className="font-bold text-sm text-slate-900">PixelPhysics</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                  LIVE 240Hz TOUCH
                </span>
              </div>

              {/* Central Graphic Illustration */}
              <div className="my-auto text-center space-y-3">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-400 to-rose-500 p-1 shadow-lg shadow-orange-300/50 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-2 text-white">
                    <Fingerprint className="w-8 h-8 text-amber-400 animate-pulse my-auto" />
                    <span className="text-[8px] font-mono text-slate-400">CAPACITIVE MESH</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">Real-Time Touch Reaction</h3>
                  <p className="text-xs text-slate-500">ΔC = -9.8pF • 4.16ms Latency</p>
                </div>
              </div>

              {/* Bottom quick trigger */}
              <button
                onClick={() => {
                  soundFX.swoosh();
                  onNavigate('touch');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                <span>Launch Touch Sensation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Floating Badge 1: Top Right */}
            <div className="absolute -top-4 -right-4 z-20 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-2.5 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-lg">
                ⚡
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Touch Sensor</span>
                <span className="text-xs font-bold text-slate-800">240Hz Digitizer</span>
              </div>
            </div>

            {/* Floating Badge 2: Bottom Left */}
            <div className="absolute -bottom-4 -left-4 z-20 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-lg">
                🔬
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Precision</span>
                <span className="text-xs font-bold text-slate-800">1000x Zoom</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* CORE MODULES SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase font-mono tracking-wider text-orange-500">
            INTERACTIVE MODULES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore 4 Core <span className="text-orange-500">Simulation Modes</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Don't just read about screens — touch with your finger, pull layers apart in 3D, zoom into microscopic diodes, and synthesize light in real time.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m) => (
            <div
              key={m.title}
              className="modern-card p-6 flex flex-col justify-between space-y-6 group cursor-pointer"
              onClick={() => {
                soundFX.click();
                onNavigate(m.id);
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-orange-100 border border-orange-100 flex items-center justify-center transition">
                    {m.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold text-slate-400">
                  {m.highlight}
                </span>
                <span className="text-xs font-bold text-orange-500 group-hover:translate-x-1 transition flex items-center gap-1">
                  Explore ➔
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* CALL TO ACTION BANNER: Try Touch Simulator */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="rounded-[40px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-300/40 relative overflow-hidden">
          
          <div className="space-y-3 max-w-xl z-10">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              Live Touch Physics Experiment
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              See How Your Finger Disrupts Electrostatic Fields
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              When skin touches the glass, human capacitance drains electrical charges from the microscopic ITO wire mesh. Experience this physical phenomenon in real time!
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                soundFX.swoosh();
                onNavigate('touch');
              }}
              className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-sm shadow-xl hover:bg-slate-50 hover:scale-105 transition flex items-center gap-2 whitespace-nowrap"
            >
              <Fingerprint className="w-5 h-5 text-orange-500" />
              <span>Try Touch Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundFX.click();
                onNavigate('layers');
              }}
              className="px-7 py-4 rounded-full bg-black/20 hover:bg-black/30 text-white font-semibold text-sm backdrop-blur-sm transition whitespace-nowrap"
            >
              <span>Explore 3D Layers</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
