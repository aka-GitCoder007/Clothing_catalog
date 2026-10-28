import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Product, ProductColor } from '../../types/product';
import {
  GarmentModel3D,
  GarmentMaterialTheme,
  GarmentSilhouette,
} from '../three/GarmentModel3D';
import { ThreeFallback } from '../three/ThreeFallback';
import {
  Layers,
  Eye,
  RotateCcw,
  Compass,
  Info,
  Box,
} from 'lucide-react';

interface CameraResetControllerProps {
  resetTrigger: number;
  onResetComplete?: () => void;
}

const CameraResetController: React.FC<CameraResetControllerProps> = ({
  resetTrigger,
  onResetComplete,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (resetTrigger > 0) {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
      camera.position.set(0, 0.2, 4.8);
      camera.lookAt(0, 0, 0);
      onResetComplete?.();
    }
  }, [resetTrigger, camera, onResetComplete]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={3.0}
      maxDistance={6.8}
      minPolarAngle={Math.PI / 4.2}
      maxPolarAngle={Math.PI / 1.72}
      dampingFactor={0.06}
      enableDamping
      touches={{
        ONE: 1, // TOUCH.ROTATE
        TWO: 2, // TOUCH.DOLLY_PAN
      }}
    />
  );
};

export interface Product3DViewerProps {
  product: Product;
  selectedColor?: ProductColor;
  onColorChange?: (color: ProductColor) => void;
  className?: string;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  product,
  selectedColor,
  onColorChange,
  className = '',
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [materialTheme, setMaterialTheme] = useState<GarmentMaterialTheme>('obsidian');
  const [xRay, setXRay] = useState<boolean>(false);
  const [exploded, setExploded] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [resetCount, setResetCount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Parallax & Zoom for 2.5D visual
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; px: number; py: number }>({
    x: 0,
    y: 0,
    px: 0,
    py: 0,
  });

  // Check if product uses 2.5D high-res image specimen
  const hasImage3D = !!product.image3D || product.id === 'sp-01-spider-hoodie';
  const [viewMode, setViewMode] = useState<'image' | 'mesh'>(hasImage3D ? 'image' : 'mesh');

  // WebGL Availability Detection
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Determine silhouette based on product type / category
  const silhouette: GarmentSilhouette = React.useMemo(() => {
    if (product.modelType === 'hoodie') return 'hoodie';
    if (product.modelType === 'jacket') return 'jacket';
    const nameLower = product.name.toLowerCase();
    const catLower = product.category.toLowerCase();
    if (catLower === 'hoodies' || nameLower.includes('hoodie')) return 'hoodie';
    if (
      catLower === 'pants' ||
      nameLower.includes('cargo') ||
      nameLower.includes('pant') ||
      nameLower.includes('trouser')
    )
      return 'pants';
    if (nameLower.includes('trench') || nameLower.includes('coat') || nameLower.includes('matrix'))
      return 'coat';
    return 'jacket';
  }, [product]);

  // Sync incoming selectedColor with materialTheme
  useEffect(() => {
    if (!selectedColor) return;
    const name = selectedColor.name.toLowerCase();
    if (name.includes('titanium') || name.includes('chrome') || name.includes('silver') || name.includes('raw')) {
      setMaterialTheme('chrome');
    } else if (name.includes('blood') || name.includes('crimson') || name.includes('red') || name.includes('rust')) {
      setMaterialTheme('crimson');
    } else if (name.includes('bone') || name.includes('white') || name.includes('ecru') || name.includes('sand') || name.includes('stone')) {
      setMaterialTheme('bone');
    } else if (name.includes('obsidian') || name.includes('black') || name.includes('soot') || name.includes('dark') || name.includes('charcoal')) {
      setMaterialTheme('obsidian');
    }
  }, [selectedColor]);

  // Handle user selecting a material theme inside the 3D viewer
  const handleSelectMaterial = (theme: GarmentMaterialTheme) => {
    setMaterialTheme(theme);

    if (viewMode === 'image' && theme === 'bone') {
      setStatusMessage('MASTER SPECIMEN RETAINED IN ORIGINAL OBSIDIAN/CRIMSON COATING');
      setTimeout(() => setStatusMessage(null), 3800);
    } else {
      setStatusMessage(null);
    }

    // Match and trigger parent color selection
    if (onColorChange && product.colors?.length) {
      let matchedColor: ProductColor | undefined;
      if (theme === 'obsidian') {
        matchedColor = product.colors.find((c) =>
          /black|obsidian|soot|dark|charcoal/i.test(c.name)
        );
      } else if (theme === 'chrome') {
        matchedColor = product.colors.find((c) =>
          /titanium|chrome|silver|raw|grey/i.test(c.name)
        );
      } else if (theme === 'crimson') {
        matchedColor = product.colors.find((c) =>
          /blood|crimson|red|rust/i.test(c.name)
        );
      } else if (theme === 'bone') {
        matchedColor = product.colors.find((c) =>
          /bone|white|ecru|sand|stone/i.test(c.name)
        );
      }

      if (matchedColor) {
        onColorChange(matchedColor);
      }
    }
  };

  // Reset camera handler
  const handleResetCamera = () => {
    setResetCount((c) => c + 1);
    setZoomLevel(1.0);
    setParallax({ x: 0, y: 0 });
    setExploded(false);
  };

  // Parallax drag handlers for 2.5D visual
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode !== 'image') return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      px: parallax.x,
      py: parallax.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || viewMode !== 'image') return;
    const deltaX = (e.clientX - dragStartRef.current.x) * 0.08;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.08;
    setParallax({
      x: Math.max(-12, Math.min(12, dragStartRef.current.px - deltaY)),
      y: Math.max(-16, Math.min(16, dragStartRef.current.py + deltaX)),
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Scroll to Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode === 'image') {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.06 : 0.06;
      setZoomLevel((prev) => Math.max(0.85, Math.min(1.45, prev + delta)));
    }
  };

  // WebGL Fallback states
  if (hasWebGL === false) {
    return <ThreeFallback />;
  }

  // Primary hoodie visual asset
  const hoodieVisual =
    product.image3D ||
    '/assets/products/void-archive-spider-hoodie-clean.png';

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      className={`relative w-full h-[540px] sm:h-[620px] lg:h-[660px] bg-[#000000] border border-[#222226] overflow-hidden select-none font-mono ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Corner Cinematic Framing Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#555566] pointer-events-none z-30" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#555566] pointer-events-none z-30" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#555566] pointer-events-none z-30" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#555566] pointer-events-none z-30" />

      {/* Atmospheric Radial Studio Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.07)_0%,rgba(158,27,34,0.03)_35%,rgba(0,0,0,0)_75%)] pointer-events-none" />

      {/* Subtle Inset Vignette Shadow */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{ boxShadow: 'inset 0 0 110px 40px #000000' }}
      />

      {/* ========================================================
          IMAGE-BASED HOODIE PRESENTATION (When viewMode === 'image')
          Occupies 60–70% of available viewer height, object-fit: contain,
          never cropped, centered on pure black background with parallax
          ======================================================== */}
      {viewMode === 'image' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          <div
            className="relative flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${parallax.x}deg) rotateY(${parallax.y}deg) scale(${zoomLevel})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* The Central Primary Hoodie Visual */}
            <img
              src={hoodieVisual}
              alt={product.name}
              className="relative z-10 max-h-[64vh] sm:max-h-[68vh] h-[360px] sm:h-[450px] lg:h-[480px] w-auto max-w-[85vw] sm:max-w-[540px] object-contain pointer-events-none select-none transition-all duration-300 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
              style={{
                filter: xRay
                  ? 'invert(0.85) hue-rotate(185deg) contrast(1.4) brightness(1.1) drop-shadow(0 0 25px rgba(56,189,248,0.6))'
                  : materialTheme === 'crimson'
                  ? 'contrast(1.08) drop-shadow(0 0 24px rgba(158,27,34,0.35))'
                  : 'contrast(1.05)',
              }}
            />

            {/* X-Ray Animated Holographic Scanline Overlay */}
            {xRay && (
              <div
                aria-hidden="true"
                className="absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden opacity-50"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, rgba(56,189,248,0.18) 0px, rgba(56,189,248,0.18) 1px, transparent 2px, transparent 5px)',
                }}
              />
            )}

            {/* Explode Mode: Architectural Structural Schematic Callouts */}
            {exploded && (
              <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4">
                {/* Hood Callout */}
                <div className="absolute top-[8%] left-[2%] bg-[#0e0e14]/90 border border-[#38bdf8] text-[#38bdf8] px-2.5 py-1 text-[9px] uppercase tracking-widest backdrop-blur-md shadow-lg flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full" />
                  <span>01 // DUAL-PLY COWL HOOD</span>
                </div>

                {/* Chest Spider Emblem Callout */}
                <div className="absolute top-[38%] right-[4%] bg-[#0e0e14]/90 border border-[#ff2a3a] text-rose-300 px-2.5 py-1 text-[9px] uppercase tracking-widest backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#ff2a3a] rounded-full animate-ping" />
                  <span>02 // CRIMSON SPIDER CHASSIS</span>
                </div>

                {/* Sleeve Callout */}
                <div className="absolute bottom-[35%] left-[2%] bg-[#0e0e14]/90 border border-[#71717a] text-[#ded8cc] px-2.5 py-1 text-[9px] uppercase tracking-widest backdrop-blur-md shadow-lg">
                  <span>03 // ARTICULATED WEB SLEEVE</span>
                </div>

                {/* Kangaroo Pocket Callout */}
                <div className="absolute bottom-[16%] right-[6%] bg-[#0e0e14]/90 border border-[#71717a] text-[#ded8cc] px-2.5 py-1 text-[9px] uppercase tracking-widest backdrop-blur-md shadow-lg">
                  <span>04 // BELLOWS POUCH POCKET</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          3D THREE.JS CANVAS (Orbital Rings, Lights & 3D Garments)
          ======================================================== */}
      <Canvas
        camera={{ position: [0, 0.2, 4.8], fov: 44 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />

        {/* Key Directional Studio Light */}
        <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
        {/* Cool Metallic Rim Light */}
        <directionalLight position={[-4, 3, -4]} intensity={2.3} color="#b0c8ea" />
        {/* Soft Warm Fill Light */}
        <directionalLight position={[0, -3, 3]} intensity={0.55} color="#ebdcc9" />
        {/* Overhead Softbox */}
        <directionalLight position={[0, 6, 0]} intensity={1.1} color="#ffffff" />

        {/* Dynamic Accent Point Light (Intensifies with Crimson / X-Ray) */}
        <pointLight
          position={[0, 2, 2.2]}
          intensity={xRay ? 2.5 : materialTheme === 'crimson' ? 2.4 : 1.0}
          color={
            xRay
              ? '#38bdf8'
              : materialTheme === 'crimson'
              ? '#ff2a3a'
              : '#f8fafc'
          }
        />

        <Suspense fallback={null}>
          <GarmentModel3D
            silhouette={silhouette}
            materialTheme={materialTheme}
            xRay={xRay}
            exploded={exploded}
            autoRotate={autoRotate}
            ringsOnly={viewMode === 'image'}
          />
          <ContactShadows
            position={[0, -1.95, 0]}
            opacity={0.72}
            scale={6.5}
            blur={2.4}
            far={4}
            color="#000000"
          />
        </Suspense>

        <CameraResetController resetTrigger={resetCount} />
      </Canvas>

      {/* ========================================================
          TOP-LEFT TECHNICAL PRODUCT INFORMATION PANEL
          ======================================================== */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 max-w-[270px] sm:max-w-xs pointer-events-auto">
        {/* Brand & Chassis Identification */}
        <div className="bg-[#0c0c10]/90 border border-[#24242c] backdrop-blur-md p-3 shadow-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B22] animate-pulse" />
              <span className="text-[9px] tracking-[0.25em] text-[#888899] uppercase">
                3D SPATIAL CHASSIS
              </span>
            </div>
            <span className="text-[9px] text-[#666677] uppercase tracking-widest">
              {product.sku || 'SP-01'}
            </span>
          </div>

          <h2 className="text-xs sm:text-sm font-extrabold tracking-wider text-[#F5F3EE] uppercase leading-tight truncate">
            {product.name}
          </h2>

          <div className="flex items-center gap-2 mt-1.5 text-[9px] text-[#71717a] uppercase tracking-widest">
            <span className="text-[#a1a1aa] font-bold">VOID.ARCHIVE</span>
            <span>•</span>
            <span>{product.category}</span>
            <span>•</span>
            <span className="text-[#9E1B22] font-semibold">
              {viewMode === 'image' ? '2.5D SPECIMEN' : '3D MESH'}
            </span>
          </div>
        </div>

        {/* Material Coating Switcher */}
        <div className="bg-[#0c0c10]/90 border border-[#24242c] backdrop-blur-md p-3 shadow-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] tracking-[0.25em] text-[#777788] uppercase">
              MATERIAL COATING
            </span>
            <span className="text-[9px] font-bold text-[#F5F3EE] uppercase tracking-widest">
              [{materialTheme}]
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {/* OBSIDIAN — Black */}
            <button
              onClick={() => handleSelectMaterial('obsidian')}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-[10px] tracking-wider uppercase border transition-all ${
                materialTheme === 'obsidian' && !xRay
                  ? 'border-[#F5F3EE] bg-[#202026] text-[#F5F3EE] shadow-[0_0_12px_rgba(255,255,255,0.15)] font-bold'
                  : 'border-[#26262e] text-[#888899] hover:border-[#444455] hover:text-[#F5F3EE] bg-[#121216]/60'
              }`}
              title="Obsidian Black"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0a0a0c] border border-[#444455]" />
              <span className="truncate">OBSIDIAN</span>
            </button>

            {/* CRIMSON — Black and Red */}
            <button
              onClick={() => handleSelectMaterial('crimson')}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-[10px] tracking-wider uppercase border transition-all ${
                materialTheme === 'crimson' && !xRay
                  ? 'border-[#9E1B22] bg-[#9E1B22]/20 text-rose-300 shadow-[0_0_12px_rgba(158,27,34,0.35)] font-bold'
                  : 'border-[#26262e] text-[#888899] hover:border-[#444455] hover:text-[#F5F3EE] bg-[#121216]/60'
              }`}
              title="Crimson Red"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#9E1B22] border border-rose-400" />
              <span className="truncate">CRIMSON</span>
            </button>

            {/* BONE — Off-White */}
            <button
              onClick={() => handleSelectMaterial('bone')}
              className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-[10px] tracking-wider uppercase border transition-all ${
                materialTheme === 'bone' && !xRay
                  ? 'border-[#ded8cc] bg-[#ded8cc]/20 text-[#ded8cc] shadow-[0_0_12px_rgba(222,216,204,0.25)] font-bold'
                  : 'border-[#26262e] text-[#888899] hover:border-[#444455] hover:text-[#F5F3EE] bg-[#121216]/60'
              }`}
              title="Bone Off-White"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ded8cc] border border-[#ffffff]" />
              <span className="truncate">BONE</span>
            </button>
          </div>

          {/* Status Note on Material Adaptation */}
          {statusMessage && (
            <div className="mt-1 text-[8.5px] text-[#ff8899] bg-[#9E1B22]/15 border border-[#9E1B22]/40 p-1.5 leading-tight flex items-start gap-1">
              <Info className="w-3 h-3 shrink-0 mt-0.5 text-rose-400" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          TOP-RIGHT SPECIMEN MODE TOGGLE (2.5D IMAGE vs 3D MESH)
          ======================================================== */}
      {hasImage3D && (
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-[#0c0c10]/90 border border-[#24242c] p-1 backdrop-blur-md shadow-xl pointer-events-auto">
          <button
            onClick={() => setViewMode('image')}
            className={`px-2.5 py-1 text-[9px] tracking-widest uppercase transition-all ${
              viewMode === 'image'
                ? 'bg-[#F5F3EE] text-[#080808] font-bold shadow-md'
                : 'text-[#888899] hover:text-[#F5F3EE]'
            }`}
            title="View Official Master Visual Reference"
          >
            2.5D MASTER
          </button>
          <button
            onClick={() => setViewMode('mesh')}
            className={`px-2.5 py-1 text-[9px] tracking-widest uppercase transition-all flex items-center gap-1 ${
              viewMode === 'mesh'
                ? 'bg-[#9E1B22] text-[#F5F3EE] font-bold shadow-md'
                : 'text-[#888899] hover:text-[#F5F3EE]'
            }`}
            title="Switch to 360° Rotatable Procedural 3D Mesh"
          >
            <Box className="w-3 h-3" />
            <span>3D MESH</span>
          </button>
        </div>
      )}

      {/* ========================================================
          BOTTOM-RIGHT INTERACTIVE CONTROLS TOOLBAR
          ======================================================== */}
      <div className="absolute bottom-4 right-4 z-30 flex flex-wrap items-center justify-end gap-2 pointer-events-auto">
        {/* EXPLODE VIEW BUTTON */}
        <button
          onClick={() => setExploded((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-2 text-[10px] sm:text-[11px] tracking-widest uppercase border backdrop-blur-md transition-all shadow-xl active:scale-95 ${
            exploded
              ? 'bg-[#F5F3EE] text-[#080808] border-[#F5F3EE] font-bold shadow-[0_0_16px_rgba(255,255,255,0.35)]'
              : 'bg-[#0c0c10]/90 text-[#a1a1aa] border-[#2c2c36] hover:text-[#F5F3EE] hover:border-[#555566]'
          }`}
          title={
            viewMode === 'image'
              ? 'Display Structural Schematic Layers'
              : 'Deconstruct Garment 3D Layers'
          }
          aria-label="Explode view"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{exploded ? 'ASSEMBLE' : 'EXPLODE'}</span>
        </button>

        {/* X-RAY VIEW BUTTON */}
        <button
          onClick={() => setXRay((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-2 text-[10px] sm:text-[11px] tracking-widest uppercase border backdrop-blur-md transition-all shadow-xl active:scale-95 ${
            xRay
              ? 'bg-[#38bdf8] text-[#050b14] border-[#38bdf8] font-bold shadow-[0_0_18px_rgba(56,189,248,0.45)]'
              : 'bg-[#0c0c10]/90 text-[#a1a1aa] border-[#2c2c36] hover:text-[#F5F3EE] hover:border-[#555566]'
          }`}
          title="Toggle Technical X-Ray Hologram"
          aria-label="X-ray view"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{xRay ? 'SOLID' : 'X-RAY'}</span>
        </button>

        {/* RESET CAMERA BUTTON */}
        <button
          onClick={handleResetCamera}
          className="flex items-center gap-1.5 px-3 py-2 text-[10px] sm:text-[11px] tracking-widest uppercase border border-[#2c2c36] hover:border-[#555566] bg-[#0c0c10]/90 text-[#a1a1aa] hover:text-[#F5F3EE] backdrop-blur-md transition-all shadow-xl active:scale-95"
          title="Reset Camera, Tilt & Zoom"
          aria-label="Reset camera"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">RESET</span>
        </button>

        {/* AUTO-ROTATE TOGGLE */}
        <button
          onClick={() => setAutoRotate((prev) => !prev)}
          className={`p-2 text-[10px] uppercase border backdrop-blur-md transition-all shadow-xl active:scale-95 ${
            autoRotate
              ? 'bg-[#181822] text-[#F5F3EE] border-[#444458]'
              : 'bg-[#0c0c10]/90 text-[#666677] border-[#222228]'
          }`}
          title="Toggle Turntable Rotation"
          aria-label="Toggle auto rotation"
        >
          <Compass
            className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`}
            style={{ animationDuration: '10s' }}
          />
        </button>
      </div>

      {/* ========================================================
          BOTTOM-LEFT INTERACTION HINT & TELEMETRY
          ======================================================== */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 pointer-events-none">
        <div className="px-2.5 py-1 bg-[#0a0a0e]/85 border border-[#202028] text-[9px] text-[#71717a] tracking-[0.2em] uppercase backdrop-blur-sm">
          <span>DRAG TO ORBIT</span>
          <span className="text-[#333340] mx-1.5">//</span>
          <span>SCROLL TO ZOOM</span>
          {zoomLevel !== 1 && (
            <>
              <span className="text-[#333340] mx-1.5">//</span>
              <span className="text-[#F5F3EE]">{Math.round(zoomLevel * 100)}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
