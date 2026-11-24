export interface DisplayLayer {
  id: string;
  index: number;
  name: string;
  titleEn: string;
  role: string;
  thickness: string;
  engine: string;
  color: string;
  accentHex: string;
  zOffset: number; // base mm offset in 3D
  description: string;
  specs: { [key: string]: string };
}

export const DISPLAY_LAYERS: DisplayLayer[] = [
  {
    id: 'layer-glass',
    index: 1,
    name: 'Sapphire Glass & Polarizer',
    titleEn: '01. Sapphire Glass & Polarizer',
    role: 'Optical Clarity & Reflection Shield',
    thickness: '0.50 mm',
    engine: 'Corning Optical / Oleophobic',
    color: 'border-white/40 text-white',
    accentHex: '#ffffff',
    zOffset: 1.8,
    description: 'Ultra-thin, scratch-resistant sapphire crystal with anti-reflective nano-polarizers to prevent glare and transmit 99.4% of emitted photons directly to the eye.',
    specs: {
      'Transmittance': '99.4%',
      'Refractive Index': '1.52 IOR',
      'Coating': 'Oleophobic Nano-film',
      'Hardness': '9H Mohs Scale'
    }
  },
  {
    id: 'layer-composite',
    index: 2,
    name: 'Composite UI Surface',
    titleEn: '02. Composite UI Surface',
    role: 'Composited Frame Buffer',
    thickness: '0.00 mm (Digital Frame)',
    engine: 'Compositor / Metal Surface',
    color: 'border-purple-400 text-purple-200',
    accentHex: '#e879f9',
    zOffset: 1.1,
    description: 'The final, unified raster image ready to be displayed. Showcases the luxury GridBank fintech app with an iridescent platinum card that human eyes perceive as a solid picture.',
    specs: {
      'Resolution': '2556 × 1179 px',
      'Aspect Ratio': '19.5 : 9',
      'Color Space': 'Display P3 (Wide Gamut)',
      'Frame Rate': '120 Hz ProMotion'
    }
  },
  {
    id: 'layer-raster',
    index: 3,
    name: 'GPU Raster & Paint Engine',
    titleEn: '03. GPU Raster & Paint Engine',
    role: 'Rasterization & Anti-Aliasing',
    thickness: '0.00 mm (Pipeline Stage)',
    engine: 'Skia / CoreAnimation / Metal',
    color: 'border-indigo-400 text-indigo-300',
    accentHex: '#818cf8',
    zOffset: 0.5,
    description: 'Translates vector shapes, rounded corners, typography, gradients, and drop-shadows into raw pixel bitmaps using GPU fragment shaders.',
    specs: {
      'GPU Draw Calls': '14 calls/frame',
      'Raster Cost': '2.4 ms',
      'Anti-Aliasing': '4x MSAA',
      'Shader Precision': 'Highp Float'
    }
  },
  {
    id: 'layer-layout',
    index: 4,
    name: 'Layout & Box Model Wireframe',
    titleEn: '04. Layout & Box Model Wireframe',
    role: 'Geometry, Padding & Bounds Calculation',
    thickness: '0.00 mm (DOM Tree)',
    engine: 'Blink / WebKit Layout Engine',
    color: 'border-blue-400 text-blue-300',
    accentHex: '#38bdf8',
    zOffset: -0.2,
    description: 'Pure structural geometry before any color exists. Calculates bounding boxes, flexbox trees, margins, and padding based on CSS rules.',
    specs: {
      'DOM Nodes': '142 nodes',
      'Layout Engine': 'Yoga / Flexbox',
      'Layout Cost': '1.1 ms',
      'Reflow Passes': '1 pass'
    }
  },
  {
    id: 'layer-subpixel',
    index: 5,
    name: 'OLED Microscopic Subpixel Array',
    titleEn: '05. OLED Subpixel Matrix',
    role: 'Physical Photon Light Emitters',
    thickness: '0.12 mm',
    engine: 'Diamond Pentile OLED Substrate',
    color: 'border-emerald-400 text-emerald-300',
    accentHex: '#00ff73',
    zOffset: -0.9,
    description: 'Millions of microscopic organic light-emitting diodes arranged in a Diamond Pentile matrix. Individual Red (625nm), Green (530nm), and Blue (465nm) diodes emit discrete light photons.',
    specs: {
      'Pixel Density': '460 PPI',
      'Subpixel Pattern': 'Diamond Pentile',
      'Subpixel Pitch': '10 µm',
      'Peak Brightness': '2000 nits'
    }
  },
  {
    id: 'layer-chassis',
    index: 6,
    name: 'Titanium Chassis & Display Driver',
    titleEn: '06. Titanium Chassis & Controller',
    role: 'Physical Substrate & MIPI DSI Bus',
    thickness: '7.80 mm',
    engine: 'Grade 5 Titanium / Display Driver IC',
    color: 'border-slate-500 text-slate-300',
    accentHex: '#94a3b8',
    zOffset: -1.7,
    description: 'The physical backbone: Aerospace-grade titanium frame, logic board, and the high-speed MIPI DSI Display Controller IC transmitting 24-bit RGB pixel data over electrical buses.',
    specs: {
      'Material': 'Grade 5 Titanium',
      'Interface': 'MIPI DSI-2 4-lane',
      'Bandwidth': '6.0 Gbps',
      'Substrate': 'LTPO Polyimide'
    }
  }
];

export const PIPELINE_STEPS = [
  { step: '01', name: 'State Change', titleEn: 'Code & State Update', desc: 'User taps the screen or an event fires -> Application state updates in memory.' },
  { step: '02', name: 'Layout Tree', titleEn: 'Layout & Box Geometry', desc: 'The layout engine calculates exact element dimensions, flex positions, and bounding coordinates.' },
  { step: '03', name: 'GPU Raster', titleEn: 'Rasterization & Paint', desc: 'GPU fragment shaders render vector paths, colors, typography, and shadows into 24-bit pixel maps.' },
  { step: '04', name: 'DSI Controller', titleEn: 'DSI Display Controller', desc: 'Display Driver IC converts digital RGB pixel codes into precise analog voltage pulses.' },
  { step: '05', name: 'OLED Photons', titleEn: 'Photon Light Emission', desc: 'Red (625nm), Green (530nm), and Blue (465nm) organic subpixel diodes physically emit light photons.' },
  { step: '06', name: 'Retina Perception', titleEn: 'Retina Optical Sensation', desc: 'Human eye cone photoreceptors capture the photons and the brain fuses them into perceived full colors.' }
];
