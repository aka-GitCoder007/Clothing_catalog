import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SpiderHoodie3D } from './SpiderHoodie3D';
import { ThreeFallback } from './ThreeFallback';
import { Eye, Layers, RotateCcw, Compass } from 'lucide-react';

interface CameraResetControllerProps {
  resetTrigger: number;
}

const CameraResetController: React.FC<CameraResetControllerProps> = ({ resetTrigger }) => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (resetTrigger > 0) {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
      camera.position.set(0, 0.2, 4.8);
      camera.lookAt(0, 0, 0);
    }
  }, [resetTrigger, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={3.0}
      maxDistance={6.6}
      minPolarAngle={Math.PI / 4.2}
      maxPolarAngle={Math.PI / 1.72}
      dampingFactor={0.06}
      enableDamping
    />
  );
};

export const Hero3DCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [materialTheme, setMaterialTheme] = useState<'obsidian' | 'chrome' | 'crimson' | 'bone'>('obsidian');
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetCount, setResetCount] = useState(0);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Show a minimal skeleton while WebGL detection runs
  if (hasWebGL === null) {
    return (
      <div className="relative w-full h-full min-h-[500px] lg:min-h-[640px] flex items-center justify-center bg-[#0e0e0e] border border-[#222222] select-none">
        <div className="flex flex-col items-center gap-3 text-[#555555]">
          <div className="w-8 h-8 border-2 border-[#333333] border-t-[#F5F3EE] rounded-full animate-spin" />
          <span className="text-[10px] font-mono tracking-widest uppercase">INITIALISING 3D CHASSIS</span>
        </div>
      </div>
    );
  }

  if (hasWebGL === false) {
    return <ThreeFallback />;
  }

  const handleResetCamera = () => {
    setResetCount((c) => c + 1);
    setExploded(false);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[640px] flex items-center justify-center bg-gradient-to-b from-[#0e0e0e]/50 to-[#050505]/90 border border-[#222222] overflow-hidden select-none font-mono">
      {/* Subtle Background Radial Aura */}
      <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent pointer-events-none" />

      {/* R3F Canvas */}
      <Canvas
        camera={{ position: [0, 0.2, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        {/* Key Studio Light */}
        <directionalLight position={[5, 6, 4]} intensity={2.0} color="#ffffff" />
        {/* Cool Metallic Rim Light */}
        <directionalLight position={[-5, 3, -4]} intensity={2.4} color="#a5b4fc" />
        {/* Warm Fill Light */}
        <directionalLight position={[0, -4, 3]} intensity={0.55} color="#fed7aa" />
        {/* Accent Point Light */}
        <pointLight
          position={[0, 2, 2]}
          intensity={materialTheme === 'crimson' ? 2.5 : wireframe ? 2.2 : 0.9}
          color={wireframe ? '#38bdf8' : materialTheme === 'crimson' ? '#ff2a3a' : '#ffffff'}
        />

        <Suspense fallback={null}>
          <SpiderHoodie3D
            materialTheme={materialTheme}
            wireframe={wireframe}
            exploded={exploded}
            autoRotate={autoRotate}
          />
          <ContactShadows
            position={[0, -1.9, 0]}
            opacity={0.7}
            scale={6.2}
            blur={2.4}
            far={4}
            color="#000000"
          />
        </Suspense>

        <CameraResetController resetTrigger={resetCount} />
      </Canvas>

      {/* Floating Interactive HUD Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="bg-[#121212]/90 border border-[#282828] backdrop-blur-md p-2.5 flex flex-col gap-1.5 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B22] animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-[#777777] uppercase">
              3D SPATIAL CHASSIS
            </span>
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-[#F5F3EE]">
            SP-01 SPIDER HOODIE
          </span>
        </div>

        {/* Material Switcher */}
        <div className="bg-[#121212]/90 border border-[#282828] backdrop-blur-md p-2 flex flex-col gap-1.5 shadow-xl">
          <span className="text-[9px] font-mono tracking-widest text-[#666666] uppercase">
            MATERIAL COATING
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setMaterialTheme('obsidian')}
              className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-left border transition-colors ${
                materialTheme === 'obsidian' && !wireframe
                  ? 'border-[#F5F3EE] bg-[#222222] text-[#F5F3EE] font-bold'
                  : 'border-[#282828] text-[#888888] hover:text-[#F5F3EE]'
              }`}
            >
              OBSIDIAN
            </button>
            <button
              onClick={() => setMaterialTheme('chrome')}
              className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-left border transition-colors ${
                materialTheme === 'chrome' && !wireframe
                  ? 'border-[#F5F3EE] bg-[#222222] text-[#F5F3EE] font-bold'
                  : 'border-[#282828] text-[#888888] hover:text-[#F5F3EE]'
              }`}
            >
              CHROME
            </button>
            <button
              onClick={() => setMaterialTheme('crimson')}
              className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-left border transition-colors ${
                materialTheme === 'crimson' && !wireframe
                  ? 'border-[#9E1B22] bg-[#9E1B22]/20 text-rose-300 font-bold'
                  : 'border-[#282828] text-[#888888] hover:text-[#F5F3EE]'
              }`}
            >
              CRIMSON
            </button>
            <button
              onClick={() => setMaterialTheme('bone')}
              className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-left border transition-colors ${
                materialTheme === 'bone' && !wireframe
                  ? 'border-[#DDD8CB] bg-[#DDD8CB]/20 text-[#DDD8CB] font-bold'
                  : 'border-[#282828] text-[#888888] hover:text-[#F5F3EE]'
              }`}
            >
              BONE
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Toggles */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        {/* Explode Layers */}
        <button
          onClick={() => setExploded(!exploded)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border backdrop-blur-md transition-all ${
            exploded
              ? 'bg-[#F5F3EE] text-[#080808] border-[#F5F3EE] font-bold'
              : 'bg-[#121212]/90 text-[#A0A0A0] border-[#2a2a2a] hover:text-[#F5F3EE]'
          }`}
          title="Deconstruct Garment 3D Layers"
          aria-label="Explode view"
        >
          <Layers className="w-3 h-3" />
          <span>{exploded ? 'ASSEMBLE' : 'EXPLODE'}</span>
        </button>

        {/* Wireframe Mode */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border backdrop-blur-md transition-all ${
            wireframe
              ? 'bg-[#38bdf8] text-[#050b14] border-[#38bdf8] font-bold'
              : 'bg-[#121212]/90 text-[#A0A0A0] border-[#2a2a2a] hover:text-[#F5F3EE]'
          }`}
          title="Toggle Technical Wireframe X-Ray"
          aria-label="Toggle X-ray"
        >
          <Eye className="w-3 h-3" />
          <span>X-RAY</span>
        </button>

        {/* Reset Camera Button */}
        <button
          onClick={handleResetCamera}
          className="p-1.5 text-[10px] font-mono uppercase border border-[#2a2a2a] hover:border-[#444444] bg-[#121212]/90 text-[#A0A0A0] hover:text-[#F5F3EE] backdrop-blur-md transition-all"
          title="Reset Camera Framing"
          aria-label="Reset camera"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-1.5 text-[10px] font-mono uppercase border backdrop-blur-md transition-all ${
            autoRotate
              ? 'bg-[#121212]/90 text-[#F5F3EE] border-[#3a3a3a]'
              : 'bg-[#121212]/90 text-[#666666] border-[#222222]'
          }`}
          title="Toggle Auto Rotation"
          aria-label="Toggle auto rotation"
        >
          <Compass className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </button>
      </div>

      {/* Subtle bottom drag hint */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:block pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-[#555555] uppercase">
          DRAG TO ORBIT // SCROLL TO ZOOM
        </span>
      </div>
    </div>
  );
};
