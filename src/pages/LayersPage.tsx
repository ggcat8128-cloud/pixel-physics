import React, { useEffect, useRef, useState } from 'react';
import { DisplayScene } from '../scene/DisplayScene';
import { DISPLAY_LAYERS, DisplayLayer } from '../data/layerData';
import { soundFX } from '../audio/soundFX';
import { RotateCw, Layers } from 'lucide-react';

export const LayersPage: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<DisplayScene | null>(null);

  const [separation, setSeparation] = useState(0.75);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new DisplayScene(canvasRef.current);
    sceneRef.current = scene;

    // Set to exploded view mode
    scene.setViewMode('exploded');
    scene.setSeparation(0.75);

    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, []);

  const handleSeparationChange = (val: number) => {
    setSeparation(val);
    sceneRef.current?.setSeparation(val);
  };

  const handleSelectLayer = (idx: number | null) => {
    setSelectedLayerIndex(idx);
    sceneRef.current?.isolateLayer(idx);
    soundFX.click();
  };

  const handleToggleAutoRotate = () => {
    if (!sceneRef.current) return;
    const rotating = sceneRef.current.toggleAutoRotate();
    setIsAutoRotating(rotating);
    soundFX.click();
  };

  const handleResetView = () => {
    sceneRef.current?.setViewMode('exploded');
    sceneRef.current?.setSeparation(0.75);
    setSeparation(0.75);
    setSelectedLayerIndex(null);
    sceneRef.current?.isolateLayer(null);
    soundFX.click();
  };

  const activeLayer: DisplayLayer | null = 
    selectedLayerIndex !== null ? DISPLAY_LAYERS[selectedLayerIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold font-mono">
          <Layers className="w-3.5 h-3.5 text-orange-600" />
          <span>3D EXPLODED ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          6-Stage <span className="text-orange-500">Layer Decomposition</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Separate the phone display in 3D along the Z-axis. Drag the slider to adjust separation distance and isolate individual physical layers.
        </p>
      </div>

      {/* Main 3D Viewport Card */}
      <div className="modern-card p-4 sm:p-6 bg-white overflow-hidden space-y-4">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          
          {/* Separation Slider */}
          <div className="flex-1 max-w-md space-y-1">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Z-AXIS SEPARATION:</span>
              <span className="text-orange-600 font-mono text-sm">
                {Math.round(separation * 100)}% ({Math.round(separation * 80)}mm)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={separation}
              onChange={(e) => {
                handleSeparationChange(parseFloat(e.target.value));
                soundFX.swoosh();
              }}
              className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0% (Collapsed Phone)</span>
              <span>50%</span>
              <span>100% (Fully Exploded)</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleToggleAutoRotate}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                isAutoRotating
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-300/40'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isAutoRotating ? 'Stop Spin' : 'Auto Rotate'}</span>
            </button>

            <button
              onClick={handleResetView}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              Reset View
            </button>
          </div>

        </div>

        {/* 3D Canvas Box */}
        <div className="relative w-full h-[460px] sm:h-[540px] bg-slate-950 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          <div 
            ref={canvasRef} 
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* 3D Canvas Helper Overlay */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-[11px] font-mono pointer-events-none">
            🖱️ Drag with cursor to orbit 360°
          </div>

          {/* Active Layer Banner */}
          {activeLayer && (
            <div className="absolute bottom-4 inset-x-4 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-600 uppercase">
                  Isolated Layer: {activeLayer.id}
                </span>
                <h4 className="font-bold text-base text-slate-900">
                  {activeLayer.titleEn}
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  {activeLayer.description}
                </p>
              </div>

              <button
                onClick={() => handleSelectLayer(null)}
                className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                View All Layers ✕
              </button>
            </div>
          )}

        </div>

      </div>

      {/* 6 Individual Layer Details Cards Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl text-slate-900">
          Click Any Layer to Inspect & Isolate
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DISPLAY_LAYERS.map((layer, idx) => {
            const isSelected = selectedLayerIndex === idx;
            return (
              <div
                key={layer.id}
                onClick={() => handleSelectLayer(isSelected ? null : idx)}
                className={`modern-card p-5 cursor-pointer border-2 transition-all ${
                  isSelected
                    ? 'border-orange-500 shadow-xl bg-orange-50/20'
                    : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: layer.accentHex }}
                    />
                    <span className="font-mono text-xs font-bold text-slate-900">
                      0{layer.index}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {layer.thickness}
                  </span>
                </div>

                <div className="py-3 space-y-1.5">
                  <h4 className="font-bold text-base text-slate-900">
                    {layer.titleEn}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600">
                  {Object.entries(layer.specs).slice(0, 2).map(([k, v]) => (
                    <div key={k} className="bg-slate-50 p-1.5 rounded">
                      <span className="text-slate-400 block">{k}</span>
                      <span className="font-bold text-slate-800 truncate block">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-bold text-orange-600">
                  <span>{isSelected ? 'Isolated ✓' : 'Inspect & Isolate'}</span>
                  <span>➔</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
