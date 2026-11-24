import React from 'react';
import { TouchSimulator } from '../components/TouchSimulator';
import { Fingerprint } from 'lucide-react';

export const TouchPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold font-mono">
          <Fingerprint className="w-3.5 h-3.5 text-orange-600" />
          <span>CAPACITIVE TOUCH PHYSICS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How Screens <span className="text-orange-500">Feel Your Touch</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Touch, drag, and experiment in real time: watch how capacitive electrostatic fields and 240Hz digitizers register your finger the instant it touches the glass.
        </p>
      </div>

      {/* Main Touch Simulator Component */}
      <TouchSimulator />

    </div>
  );
};
