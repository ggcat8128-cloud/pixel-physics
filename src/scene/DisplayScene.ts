import * as THREE from 'three';
import { DISPLAY_LAYERS } from '../data/layerData';

export type ViewMode = 'hero' | 'exploded' | 'zoom' | 'rgblab' | 'pipeline';

export class DisplayScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animFrameId: number | null = null;

  // 3D Objects
  private phoneGroup: THREE.Group;
  private layerMeshes: THREE.Mesh[] = [];
  private dunesMesh: THREE.Mesh | null = null;
  private subpixelMaterial: THREE.MeshBasicMaterial | null = null;
  private uiTextureCanvas: HTMLCanvasElement | null = null;
  private uiTexture: THREE.CanvasTexture | null = null;

  // State
  private separationFactor: number = 0.6; // 0 to 1
  private viewMode: ViewMode = 'hero';
  private targetCameraPos: THREE.Vector3 = new THREE.Vector3(0, 0, 7.5);
  private targetCameraLookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private currentCameraLookAt: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  // Mouse interaction
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetRotationX: number = 0;
  private targetRotationY: number = 0;
  private isAutoRotating: boolean = false;
  private activeLayerIndex: number | null = null;

  // RGB Lab settings
  private rgbValues = { r: 255, g: 215, b: 0 }; // Default Gold

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.05);

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    this.camera.position.set(0, 0.2, 7.5);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    container.appendChild(this.renderer.domElement);

    // 4. Phone group
    this.phoneGroup = new THREE.Group();
    this.scene.add(this.phoneGroup);

    // 5. Initialize lights and components
    this.setupLighting();
    this.createDunesTerrain();
    this.buildLayers();

    // 6. Event listeners
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);

    // 7. Start render loop
    this.animate();
  }

  private setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Main key light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(5, 8, 6);
    this.scene.add(mainLight);

    // Epic rim lights (Violet and Electric Cyan)
    const violetRim = new THREE.DirectionalLight(0xc084fc, 2.2);
    violetRim.position.set(-8, 3, 2);
    this.scene.add(violetRim);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.9);
    cyanRim.position.set(8, -2, -2);
    this.scene.add(cyanRim);

    // Subtly colored bottom fill light
    const bottomFill = new THREE.PointLight(0xa855f7, 1.2, 10);
    bottomFill.position.set(0, -3, 3);
    this.scene.add(bottomFill);
  }

  // 3D Matte Obsidian Dunes (from user's reference image)
  private createDunesTerrain() {
    const geom = new THREE.PlaneGeometry(16, 8, 48, 24);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Sinusoidal dune ridges
      const z = Math.sin(x * 0.8) * Math.cos(y * 0.6) * 0.45 +
                Math.sin(x * 1.5 + y) * 0.25 - (y * 0.2);
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: 0x08080c,
      roughness: 0.88,
      metalness: 0.12,
      flatShading: true
    });

    this.dunesMesh = new THREE.Mesh(geom, mat);
    this.dunesMesh.position.set(0, -2.6, -1.0);
    this.dunesMesh.rotation.x = -Math.PI / 2.3;
    this.scene.add(this.dunesMesh);
  }

  // Generate dynamic canvas texture for the GridBank app UI
  private createUITexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 2048;
    this.uiTextureCanvas = canvas;
    const ctx = canvas.getContext('2d')!;

    this.drawUICanvas(ctx);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.uiTexture = texture;
    return texture;
  }

  public drawUICanvas(ctx: CanvasRenderingContext2D) {
    const w = 1024;
    const h = 2048;

    // 1. OLED Pitch Black Background
    ctx.fillStyle = '#050608';
    ctx.fillRect(0, 0, w, h);

    // 2. Micro Dot Grid Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const spacing = 48;
    for (let x = spacing; x < w; x += spacing) {
      for (let y = spacing; y < h; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Top Status Bar (Time, Battery, Dynamic Island)
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('9:41', 70, 90);

    // Dynamic Island Pill
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 110, 50, 220, 60, 30);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 4. App Navigation (GridBank)
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 44px "Space Grotesk", sans-serif';
    ctx.fillText('GridBank', 70, 200);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '400 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Services', 360, 200);
    ctx.fillText('Vault', 520, 200);
    ctx.fillText('Insights', 650, 200);

    // 5. Iridescent Platinum Card (Reference Image match!)
    const cardX = 70;
    const cardY = 270;
    const cardW = w - 140;
    const cardH = 500;

    // Holographic iridescent gradient
    const cardGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    cardGrad.addColorStop(0, '#ff9a9e');
    cardGrad.addColorStop(0.2, '#fecfef');
    cardGrad.addColorStop(0.4, '#a1c4fd');
    cardGrad.addColorStop(0.7, '#c2e9fb');
    cardGrad.addColorStop(0.9, '#d4fc79');
    cardGrad.addColorStop(1, '#96e6a1');

    ctx.save();
    ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;

    ctx.fillStyle = cardGrad;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 36);
    ctx.fill();
    ctx.restore();

    // Brushed foil overlay on card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 36);
    ctx.fill();

    // Card chip
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.roundRect(cardX + 50, cardY + 60, 80, 60, 12);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Card texts
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 38px "Space Grotesk", sans-serif';
    ctx.fillText('GridBank', cardX + cardW - 200, cardY + 95);

    ctx.font = '600 36px "JetBrains Mono", monospace';
    ctx.fillText('•••• •••• •••• 8842', cardX + 50, cardY + cardH - 120);

    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('PLATINUM RESERVE', cardX + 50, cardY + cardH - 60);
    ctx.fillText('EXP 11/30', cardX + cardW - 170, cardY + cardH - 60);

    // 6. Hero typography below the card
    ctx.fillStyle = 'rgba(192, 132, 252, 0.8)';
    ctx.font = '700 26px "JetBrains Mono", monospace';
    ctx.fillText('NEXT-GEN PAYMENTS', 70, 880);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 68px "Space Grotesk", sans-serif';
    ctx.fillText('START PAYING SMART', 70, 970);
    ctx.fillText('ACTIVATE YOUR WALLET', 70, 1060);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Transforming complex photon emissions into', 70, 1140);
    ctx.fillText('crisp, high-fidelity digital interactions.', 70, 1185);

    // 7. Interactive Action Button
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.roundRect(70, 1260, 320, 90, 45);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('See Platform ✨', 120, 1318);

    // 8. Stats row
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(70, 1420, w - 140, 240, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 48px "Space Grotesk", sans-serif';
    ctx.fillText('$128,450.00', 110, 1510);

    ctx.fillStyle = '#4ade80';
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('+18.4% THIS MONTH', 110, 1570);

    ctx.fillStyle = '#a855f7';
    ctx.font = '600 28px "JetBrains Mono", monospace';
    ctx.fillText('460 PPI OLED ACTIVE', 580, 1540);
  }

  // Create Diamond Pentile Subpixel procedural texture
  private createSubpixelTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Black matrix
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 512, 512);

    // Draw Diamond Pentile grid
    const cols = 16;
    const rows = 16;
    const cellW = 512 / cols;
    const cellH = 512 / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        const y = r * cellH;

        // Green subpixels (twice as many, smaller, diamond arrangement)
        ctx.fillStyle = '#00ff73';
        ctx.beginPath();
        ctx.ellipse(x + cellW * 0.25, y + cellH * 0.5, cellW * 0.12, cellH * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(x + cellW * 0.75, y + cellH * 0.5, cellW * 0.12, cellH * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Red subpixel (top diamond)
        ctx.fillStyle = '#ff1a53';
        ctx.beginPath();
        ctx.ellipse(x + cellW * 0.5, y + cellH * 0.2, cellW * 0.2, cellH * 0.16, 0, 0, Math.PI * 2);
        ctx.fill();

        // Blue subpixel (bottom diamond, larger)
        ctx.fillStyle = '#0088ff';
        ctx.beginPath();
        ctx.ellipse(x + cellW * 0.5, y + cellH * 0.8, cellW * 0.22, cellH * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(24, 48); // Repeat across screen for high density
    return tex;
  }

  // Create Wireframe Layout blueprint texture
  private createWireframeTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.fillRect(0, 0, 512, 1024);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;

    // Header box
    ctx.strokeRect(30, 40, 452, 60);

    // Card bounding box
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(30, 130, 452, 240);
    ctx.strokeRect(50, 150, 60, 40); // chip
    ctx.strokeRect(50, 310, 200, 30); // numbers

    // Text bounding boxes
    ctx.setLineDash([]);
    ctx.strokeRect(30, 410, 220, 20);
    ctx.strokeRect(30, 450, 400, 40);
    ctx.strokeRect(30, 500, 380, 40);

    // Button bounding box
    ctx.strokeRect(30, 580, 180, 50);

    // Stats box
    ctx.strokeRect(30, 670, 452, 160);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // Build the 6 Exploded Display Layers
  private buildLayers() {
    const width = 2.4;
    const height = 4.8;
    const geom = new THREE.PlaneGeometry(width, height);

    const uiTex = this.createUITexture();
    const subpixelTex = this.createSubpixelTexture();
    const wireframeTex = this.createWireframeTexture();

    // 1. Sapphire Glass Material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 0.95,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      reflectivity: 0.8
    });

    // 2. Composite UI Material
    const uiMat = new THREE.MeshBasicMaterial({
      map: uiTex,
      transparent: false
    });

    // 3. GPU Raster Paint Material
    const rasterMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      roughness: 0.4
    });

    // 4. Layout Wireframe Material
    const layoutMat = new THREE.MeshBasicMaterial({
      map: wireframeTex,
      transparent: true,
      opacity: 0.85
    });

    // 5. OLED Subpixel Material
    this.subpixelMaterial = new THREE.MeshBasicMaterial({
      map: subpixelTex,
      transparent: false
    });

    // 6. Titanium Chassis Material
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      metalness: 0.95,
      roughness: 0.28
    });

    const materials = [glassMat, uiMat, rasterMat, layoutMat, this.subpixelMaterial, chassisMat];

    DISPLAY_LAYERS.forEach((layer, idx) => {
      const mesh = new THREE.Mesh(geom, materials[idx]);
      mesh.name = layer.id;
      mesh.position.z = layer.zOffset * this.separationFactor;
      this.layerMeshes.push(mesh);
      this.phoneGroup.add(mesh);
    });

    // Outer Titanium phone bezel
    const bezelGeom = new THREE.BoxGeometry(width + 0.12, height + 0.12, 0.22);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x181a24,
      metalness: 0.92,
      roughness: 0.3
    });
    const bezelMesh = new THREE.Mesh(bezelGeom, bezelMat);
    bezelMesh.position.z = -1.2 * this.separationFactor;
    this.phoneGroup.add(bezelMesh);
  }

  // Update layer separation distance (0 = collapsed into phone, 1 = fully exploded)
  public setSeparation(val: number) {
    this.separationFactor = Math.max(0, Math.min(1, val));
    DISPLAY_LAYERS.forEach((layer, idx) => {
      if (this.layerMeshes[idx]) {
        this.layerMeshes[idx].position.z = layer.zOffset * this.separationFactor;
      }
    });
  }

  // Set active view mode
  public setViewMode(mode: ViewMode) {
    this.viewMode = mode;

    switch (mode) {
      case 'hero':
        this.targetCameraPos.set(0, 0, 7.2);
        this.targetCameraLookAt.set(0, 0, 0);
        this.setSeparation(0.08); // collapsed phone
        this.targetRotationX = 0.05;
        this.targetRotationY = -0.15;
        break;

      case 'exploded':
        this.targetCameraPos.set(3.2, 0.8, 6.2);
        this.targetCameraLookAt.set(0, 0, 0);
        this.setSeparation(0.75); // fully separated 3D layers
        this.targetRotationX = 0.25;
        this.targetRotationY = -0.65;
        break;

      case 'zoom':
        // 1000x Deep Zoom straight into the OLED subpixel array
        this.targetCameraPos.set(0, 0.4, 0.35);
        this.targetCameraLookAt.set(0, 0.4, -0.6);
        this.setSeparation(0.05);
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        break;

      case 'rgblab':
        this.targetCameraPos.set(0, 0.2, 2.2);
        this.targetCameraLookAt.set(0, 0.2, -0.9);
        this.setSeparation(0.4);
        this.targetRotationX = 0.1;
        this.targetRotationY = -0.3;
        break;

      case 'pipeline':
        this.targetCameraPos.set(-2.2, 0.4, 6.8);
        this.targetCameraLookAt.set(0, 0, 0);
        this.setSeparation(0.9);
        this.targetRotationX = 0.2;
        this.targetRotationY = 0.45;
        break;
    }
  }

  // Isolate a single layer
  public isolateLayer(index: number | null) {
    this.activeLayerIndex = index;
    this.layerMeshes.forEach((mesh, idx) => {
      if (index === null) {
        mesh.visible = true;
      } else {
        mesh.visible = idx === index;
      }
    });
  }

  // Update RGB Lab color
  public setRGB(r: number, g: number, b: number) {
    this.rgbValues = { r, g, b };
    if (this.subpixelMaterial) {
      const color = new THREE.Color(r / 255, g / 255, b / 255);
      this.subpixelMaterial.color = color;
    }
  }

  public getActiveLayerIndex() { return this.activeLayerIndex; }
  public getRGBValues() { return this.rgbValues; }
  public getUITexture() { return this.uiTexture; }
  public getUICanvas() { return this.uiTextureCanvas; }

  public toggleAutoRotate(): boolean {
    this.isAutoRotating = !this.isAutoRotating;
    return this.isAutoRotating;
  }

  private onMouseMove = (e: MouseEvent) => {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    this.mouseX = (e.clientX - halfW) / halfW;
    this.mouseY = (e.clientY - halfH) / halfH;

    if (!this.isAutoRotating && this.viewMode !== 'zoom') {
      this.targetRotationY = this.mouseX * 0.45;
      this.targetRotationX = this.mouseY * 0.3;
    }
  };

  private onResize = () => {
    if (!this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    // Auto-rotation
    if (this.isAutoRotating) {
      this.phoneGroup.rotation.y += 0.008;
    } else {
      // Smooth interpolation (lerp) for rotation
      this.phoneGroup.rotation.x += (this.targetRotationX - this.phoneGroup.rotation.x) * 0.05;
      this.phoneGroup.rotation.y += (this.targetRotationY - this.phoneGroup.rotation.y) * 0.05;
    }

    // Smooth camera position interpolation
    this.camera.position.lerp(this.targetCameraPos, 0.05);

    // Smooth camera lookAt interpolation
    this.currentCameraLookAt.lerp(this.targetCameraLookAt, 0.05);
    this.camera.lookAt(this.currentCameraLookAt);

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.dispose();
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
