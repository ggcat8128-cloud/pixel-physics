import React, { useEffect, useState } from 'react';
import { PageId } from './Navbar';
import { soundFX } from '../audio/soundFX';
import { X, Sparkles } from 'lucide-react';

interface AutoPitchTourProps {
  onNavigate: (page: PageId) => void;
  onStopTour: () => void;
}

export const AutoPitchTour: React.FC<AutoPitchTourProps> = ({
  onNavigate,
  onStopTour
}) => {
  const [seconds, setSeconds] = useState(0);
  const totalSeconds = 44;

  const tourStages = [
    {
      start: 0,
      end: 10,
      page: 'home' as PageId,
      title: '01. THE HOOK // THE HIDDEN ILLUSION',
      subtitle: 'We use our phones every single day, yet few realize what we see as a solid screen is actually an intricate multi-layer optical illusion.'
    },
    {
      start: 10,
      end: 22,
      page: 'layers' as PageId,
      title: '02. 3D EXPLODED ARCHITECTURE // 6 LAYERS',
      subtitle: 'In reality, the display separates into 6 distinct spatial layers: Sapphire Glass, UI Frame, GPU Paint, Box Wireframe, OLED Grid, and Titanium Chassis.'
    },
    {
      start: 22,
      end: 34,
      page: 'lab' as PageId,
      title: '03. 1000x MICROSCOPIC ZOOM // OLED PENTILE',
      subtitle: 'Diving 1000x into the screen reveals millions of microscopic Red, Green, and Blue organic diodes arranged in a Diamond Pentile matrix.'
    },
    {
      start: 34,
      end: 44,
      page: 'pipeline' as PageId,
      title: '04. PHOTON EMISSION // CODE TO RETINA',
      subtitle: 'Additive color physics allows discrete light photons to trigger human cone cells, synthesizing millions of vibrant colors.'
    }
  ];

  const currentStage = tourStages.find((s) => seconds >= s.start && seconds < s.end) || tourStages[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        if (next >= totalSeconds) {
          clearInterval(timer);
          onStopTour();
          return 0;
        }

        const stage = tourStages.find((s) => s.start === next);
        if (stage) {
          onNavigate(stage.page);
          soundFX.swoosh();
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNavigate, onStopTour]);

  const progress = (seconds / totalSeconds) * 100;

  return (
    <div className="fixed top-24 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-50 w-full max-w-xl pointer-events-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border-2 border-orange-500 shadow-2xl text-slate-900 space-y-3 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className="font-mono text-xs font-bold text-orange-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JUDGE GUIDED TOUR ({seconds}s / {totalSeconds}s)</span>
            </span>
          </div>
          <button
            onClick={onStopTour}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stage Title & Narration */}
        <div>
          <span className="text-[11px] font-mono text-orange-500 font-bold block">
            {currentStage.title}
          </span>
          <p className="text-sm sm:text-base font-bold text-slate-900 mt-1 leading-snug">
            "{currentStage.subtitle}"
          </p>
        </div>

      </div>
    </div>
  );
};
