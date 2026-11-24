import React from 'react';
import { DISPLAY_LAYERS, DisplayLayer } from '../data/layerData';
import { soundFX } from '../audio/soundFX';
import { RotateCw } from 'lucide-react';

interface LayerControlsProps {
  separation: number;
  onSeparationChange: (val: number) => void;
  selectedLayerIndex: number | null;
  onSelectLayer: (idx: number | null) => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  onResetView: () => void;
}

export const LayerControls: React.FC<LayerControlsProps> = ({
  separation,
  onSeparationChange,
  selectedLayerIndex,
  onSelectLayer,
  isAutoRotating,
  onToggleAutoRotate,
  onResetView
}) => {
  const selectedLayer: DisplayLayer | null = 
    selectedLayerIndex !== null ? DISPLAY_LAYERS[selectedLayerIndex] : null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 w-full max-w-sm sm:max-w-md pointer-events-auto">
      
      <div className="glass-panel-elevated rounded-2xl p-4 sm:p-5 text-white space-y-4">
        
        {/* Header & Action Buttons */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="font-display font-bold text-sm text-white">3D LAYER DECOMPOSITION</span>
            <p className="text-[10px] font-mono text-slate-400">Z-AXIS SEPARATION CONTROLLER</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleAutoRotate}
              title={isAutoRotating ? 'Stop Rotation' : 'Auto Rotate'}
              className={`p-2 rounded-lg border text-xs transition ${
                isAutoRotating 
                  ? 'bg-purple-600/40 border-purple-400 text-white' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetView}
              title="Reset View"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Separation Distance Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-slate-400 text-[11px]">SEPARATION DEPTH:</span>
            <span className="text-cyan-400 font-bold">{Math.round(separation * 100)}% ({Math.round(separation * 80)}mm)</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={separation}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onSeparationChange(val);
              soundFX.swoosh();
            }}
            className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>0% (Phone Chassis)</span>
            <span>50%</span>
            <span>100% (Full Exploded)</span>
          </div>
        </div>

        {/* 6 Layer Selection Pills */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400">SELECT LAYER TO INSPECT:</span>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
            {DISPLAY_LAYERS.map((layer, idx) => {
              const isSelected = selectedLayerIndex === idx;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    soundFX.click();
                    onSelectLayer(isSelected ? null : idx);
                  }}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-purple-400 text-white shadow-md'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: layer.accentHex }}
                    />
                    <span>0{layer.index}</span>
                  </div>
                  <div className="truncate text-[9px] text-slate-300 mt-0.5">{layer.name.split(' ')[0]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Layer Inspector Panel (if selected) */}
        {selectedLayer && (
          <div className="mt-3 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 font-mono text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
              <span className="font-bold text-white text-[11px]">{selectedLayer.titleEn}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                {selectedLayer.thickness}
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug font-sans">
              {selectedLayer.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
              {Object.entries(selectedLayer.specs).map(([key, val]) => (
                <div key={key} className="bg-black/40 p-1.5 rounded border border-white/5">
                  <span className="text-slate-500 block text-[9px]">{key}</span>
                  <span className="text-white font-bold">{val}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => onSelectLayer(null)}
                className="text-[10px] text-purple-300 hover:underline"
              >
                View All Layers ✕
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
