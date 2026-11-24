# PixelPhysics — 3D Interactive Display Simulation

An interactive 3D web simulation exploring how digital UI decomposes into 6 physical spatial layers, layout geometry, GPU fragment shaders, and millions of microscopic Red, Green, and Blue (RGB) OLED light photons.

---

## Key Features & Pages

1. **Home Overview (`#home`):**
   * Friendly, modern light SaaS design with warm orange buttons and floating 3D badges.
   * 4 interactive module showcase cards (3D Layers, Subpixel Zoom, RGB Lab, Pipeline).
2. **3D Layer Decomposition (`#layers`):**
   * Dedicated Three.js WebGL canvas displaying a 3D smartphone exploding into 6 physical layers: Sapphire Glass, UI Frame, GPU Paint, Box Wireframe, OLED Grid, and Titanium Chassis.
   * Z-Axis separation distance slider (0mm to 80mm).
   * Interactive layer isolation and engineering telemetry.
3. **RGB & Subpixel Laboratory (`#lab`):**
   * 1000x microscopic reticle viewfinder displaying the OLED Diamond Pentile diode array.
   * Real-time Additive Color Synthesis sandbox with interactive Red (625nm), Green (530nm), and Blue (465nm) channel controls.
4. **Code to Retina Pipeline (`#pipeline`):**
   * 6-stage end-to-end rendering pipeline: Code State -> Layout Box Model -> GPU Raster Paint -> DSI Display Controller -> OLED Photon Emission -> Human Retina Optical Perception.
   * Additive color synthesis Venn diagrams.
5. **Project Pitch & About (`#about`):**
   * Hackathon pitch narrative, value proposition, and technical architecture specifications.
   * 45-Second Automated Judge Tour with live narration subtitles.

---

## How to Run

### In Antigravity IDE:
1. In **Antigravity IDE**, choose `File > Open Folder...` and select `Desktop/hackt`.
2. The IDE will automatically load project rules from `.agents/rules/project.md`.
3. In the integrated terminal:
   ```bash
   npm install
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

### Keyboard Shortcuts:
* `M`: Toggle Sound (Mute/Unmute)
