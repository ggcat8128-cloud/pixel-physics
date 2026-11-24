import React from 'react';
import { Volume2, VolumeX, Layers, Box, Cpu, Info, Home, Fingerprint } from 'lucide-react';
import { soundFX } from '../audio/soundFX';

export type PageId = 'home' | 'layers' | 'touch' | 'lab' | 'pipeline' | 'about';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isMuted,
  onToggleMute
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'layers', label: '3D Layers', icon: <Layers className="w-4 h-4" /> },
    { id: 'touch', label: 'Touch Physics', icon: <Fingerprint className="w-4 h-4" /> },
    { id: 'lab', label: 'RGB Lab', icon: <Box className="w-4 h-4" /> },
    { id: 'pipeline', label: 'Pipeline', icon: <Cpu className="w-4 h-4" /> },
    { id: 'about', label: 'About Project', icon: <Info className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 md:px-8 h-20 flex items-center justify-between transition-all">
      
      {/* Brand Logo */}
      <div 
        onClick={() => { soundFX.click(); onNavigate('home'); }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-300/40 group-hover:scale-105 transition">
          <span className="font-bold text-lg font-mono">3D</span>
        </div>
        <div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-orange-500 transition">
            Pixel<span className="text-orange-500">Physics</span>
          </span>
          <span className="hidden sm:block text-[10px] text-slate-400 font-semibold tracking-wide">
            3D DISPLAY & TOUCH SIMULATION
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/50">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundFX.click();
                onNavigate(item.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-orange-600 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Sound Toggle */}
        <button
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-orange-500" />}
        </button>

        {/* Try Touch Physics CTA Button */}
        <button
          onClick={() => {
            soundFX.swoosh();
            onNavigate('touch');
          }}
          className="btn-primary-orange px-5 py-2.5 text-xs font-bold flex items-center gap-2"
        >
          <Fingerprint className="w-4 h-4" />
          <span>Try Touch Sensor</span>
        </button>
      </div>

    </header>
  );
};
