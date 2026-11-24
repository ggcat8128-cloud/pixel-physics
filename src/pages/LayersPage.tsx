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
        <div className="relative w-full h-[460px] sm:h-[560px] bg-slate-950 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          <div
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Helper */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-[11px] font-mono pointer-events-none">
            🖱️ Drag to orbit · Slider to explode layers
          </div>

          {/* Active Layer Banner */}
          {activeLayer && (
            <div className="absolute bottom-4 inset-x-4 z-10 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-black font-mono flex-shrink-0"
                  style={{ backgroundColor: activeLayer.accentHex }}
                >
                  0{activeLayer.index}
                </span>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase" style={{ color: activeLayer.accentHex }}>
                    {activeLayer.role}
                  </span>
                  <h4 className="font-bold text-base text-slate-900">{activeLayer.titleEn}</h4>
                  <p className="text-xs text-slate-600 max-w-xl">{activeLayer.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleSelectLayer(null)}
                className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex-shrink-0"
              >
                View All ✕
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Layer cards legend */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-slate-900">Click Any Layer to Inspect &amp; Isolate</h3>
          <span className="text-xs text-slate-400 font-mono">6 physical layers · Z-axis decomposition</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DISPLAY_LAYERS.map((layer, idx) => {
            const isSelected = selectedLayerIndex === idx;
            return (
              <div
                key={layer.id}
                onClick={() => handleSelectLayer(isSelected ? null : idx)}
                className={`modern-card overflow-hidden cursor-pointer border-2 transition-all group ${
                  isSelected
                    ? 'border-orange-500 shadow-xl scale-[1.02]'
                    : 'border-slate-100 hover:border-slate-300 hover:shadow-md hover:scale-[1.01]'
                }`}
              >
                {/* Accent color top bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: layer.accentHex }} />

                <div className="p-5 space-y-3">
                  {/* Top row: number badge + thickness */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black font-mono text-white shadow-sm"
                        style={{ backgroundColor: layer.accentHex + 'dd' }}
                      >
                        0{layer.index}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">thickness</span>
                        <span className="text-[11px] font-mono font-bold text-slate-700">{layer.thickness}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: layer.accentHex }}
                      >
                        ISOLATED ✓
                      </span>
                    )}
                  </div>

                  {/* Title + role */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight">{layer.titleEn}</h4>
                    <p className="text-[11px] font-semibold mt-0.5" style={{ color: layer.accentHex }}>
                      {layer.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {layer.description}
                  </p>

                  {/* All 4 specs */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(layer.specs).map(([k, v]) => (
                      <div key={k} className="bg-slate-50 border border-slate-100 p-1.5 rounded-lg">
                        <span className="text-[9px] font-mono text-slate-400 block truncate">{k}</span>
                        <span className="text-[10px] font-bold font-mono text-slate-800 truncate block">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Engine + CTA */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-[9px] font-mono text-slate-400 truncate max-w-[65%]">
                      {layer.engine}
                    </span>
                    <span className="text-xs font-bold group-hover:underline" style={{ color: layer.accentHex }}>
                      {isSelected ? 'Viewing ✓' : 'Isolate →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
