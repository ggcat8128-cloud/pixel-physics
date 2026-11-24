import React, { useState } from 'react';
import { PIPELINE_STEPS } from '../data/layerData';
import { soundFX } from '../audio/soundFX';
import { GitCommit, Layout, Paintbrush, Cpu, Zap, Eye } from 'lucide-react';

export const PipelineTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const icons = [
    <GitCommit className="w-4 h-4 text-purple-400" />,
    <Layout className="w-4 h-4 text-blue-400" />,
    <Paintbrush className="w-4 h-4 text-indigo-400" />,
    <Cpu className="w-4 h-4 text-emerald-400" />,
    <Zap className="w-4 h-4 text-amber-400" />,
    <Eye className="w-4 h-4 text-pink-400" />
  ];

  return (
    <div className="fixed bottom-6 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-40 w-full max-w-2xl pointer-events-auto">
      <div className="glass-panel-elevated rounded-2xl p-4 sm:p-5 text-white space-y-4">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="font-display font-bold text-sm text-white">THE JOURNEY OF A PIXEL: 6 STAGES</span>
            <p className="text-[10px] font-mono text-purple-300">FROM JAVASCRIPT STATE TO HUMAN RETINA</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-500/30">
            STAGE 0{activeStep + 1} OF 06
          </span>
        </div>

        {/* 6 Step Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => {
                  soundFX.click();
                  setActiveStep(idx);
                }}
                className={`p-2 rounded-xl border flex flex-col items-center text-center transition-all ${
                  isSelected
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="mb-1">{icons[idx]}</div>
                <span className="font-mono text-[9px] font-bold text-slate-300">0{idx + 1}</span>
                <span className="text-[8px] truncate max-w-full font-medium">{step.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-white block">
              {PIPELINE_STEPS[activeStep].titleEn} ({PIPELINE_STEPS[activeStep].name})
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {PIPELINE_STEPS[activeStep].desc}
            </p>
          </div>
          <button
            onClick={() => {
              soundFX.click();
              setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length);
            }}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white transition whitespace-nowrap self-end sm:self-center"
          >
            Next Stage ➔
          </button>
        </div>

      </div>
    </div>
  );
};
