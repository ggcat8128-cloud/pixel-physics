import React, { useState } from 'react';
import { PIPELINE_STEPS } from '../data/layerData';
import { soundFX } from '../audio/soundFX';
import { GitCommit, Layout, Paintbrush, Cpu, Zap, Eye, ArrowRight } from 'lucide-react';

export const PipelinePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const icons = [
    <GitCommit className="w-6 h-6 text-orange-500" />,
    <Layout className="w-6 h-6 text-blue-500" />,
    <Paintbrush className="w-6 h-6 text-indigo-500" />,
    <Cpu className="w-6 h-6 text-emerald-500" />,
    <Zap className="w-6 h-6 text-amber-500" />,
    <Eye className="w-6 h-6 text-rose-500" />
  ];

  const current = PIPELINE_STEPS[activeStep];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>SYSTEM ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Code to Retina: <span className="text-orange-500">6-Stage Pipeline</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          The complete rendering and photonic pipeline: from application code in memory to visual sensation in the human visual cortex.
        </p>
      </div>

      {/* Main Interactive Step Card */}
      <div className="modern-card p-6 sm:p-10 space-y-8">
        
        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PIPELINE_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => {
                  soundFX.click();
                  setActiveStep(idx);
                }}
                className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between h-28 transition-all ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/40 shadow-lg scale-105'
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    0{idx + 1}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-50">
                    {icons[idx]}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    {step.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {step.titleEn}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Focus on Active Step */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-orange-500 text-white">
                STAGE 0{activeStep + 1}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {current.name}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {current.titleEn}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {current.desc}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  soundFX.click();
                  setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length);
                }}
                className="btn-primary-orange px-6 py-3 text-xs font-bold flex items-center gap-2"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="w-36 h-36 rounded-3xl bg-white border border-slate-200 shadow-xl flex items-center justify-center p-4 text-center">
              <div>
                <div className="mb-2 flex justify-center">{icons[activeStep]}</div>
                <span className="text-xs font-mono font-bold text-slate-900 block">{current.step} / 06</span>
                <span className="text-[10px] text-slate-500 font-semibold">{current.name}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Additive Color Physics Explanation Diagram */}
      <div className="modern-card p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase font-mono tracking-wider text-orange-500">
            OPTICAL PHYSICS
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Additive Color Synthesis (Physics of Light)
          </h3>
          <p className="text-sm text-slate-500">
            Unlike paint pigments that subtract light toward darkness, digital displays combine light wavelengths toward crisp WHITE.
          </p>
        </div>

        {/* 3 Overlapping Color Circles Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-center">
          
          <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
              R + G
            </div>
            <h4 className="font-bold text-sm text-slate-900">Red + Green = YELLOW</h4>
            <p className="text-xs text-slate-600">
              The screen activates 625nm red and 530nm green emitters; human retina cones fuse them into yellow.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cyan-50/60 border border-cyan-200/60 space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
              G + B
            </div>
            <h4 className="font-bold text-sm text-slate-900">Green + Blue = CYAN</h4>
            <p className="text-xs text-slate-600">
              Medium and short wavelengths stimulate M and S cone cells, producing brilliant cyan light.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200/60 space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-fuchsia-400 flex items-center justify-center font-bold text-white text-xs shadow-md">
              R + B
            </div>
            <h4 className="font-bold text-sm text-slate-900">Red + Blue = MAGENTA</h4>
            <p className="text-xs text-slate-600">
              The longest (625nm) and shortest (465nm) visible light photons fuse into vivid magenta.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
