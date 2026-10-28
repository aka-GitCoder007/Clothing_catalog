import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Monogram3DProps {
  currentFrame: number; // 1 to 8 matching the storyboard
  timelineTime: number; // Elapsed seconds (0.0s to 5.8s)
}

export const Monogram3D: React.FC<Monogram3DProps> = ({ currentFrame, timelineTime }) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const apexRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const sweepLightRef = useRef<THREE.PointLight>(null);
  const macroSpotRef = useRef<THREE.SpotLight>(null);
  const rimLightLeftRef = useRef<THREE.PointLight>(null);
  const rimLightRightRef = useRef<THREE.PointLight>(null);
  const rimLightBackRef = useRef<THREE.PointLight>(null);

  // Procedural Studio Reflection Map for Hyper-Clinical Metallic Reflections
  const studioEnvMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark clinical studio backdrop
      ctx.fillStyle = '#08090b';
      ctx.fillRect(0, 0, 512, 256);

      // Top Primary Studio Overhead Softbox
      const gradTop = ctx.createLinearGradient(0, 0, 0, 110);
      gradTop.addColorStop(0, '#ffffff');
      gradTop.addColorStop(0.4, '#e2e8f0');
      gradTop.addColorStop(0.8, '#64748b');
      gradTop.addColorStop(1, '#08090b');
      ctx.fillStyle = gradTop;
      ctx.fillRect(60, 0, 392, 110);

      // Left Vertical Clinical Strip Light
      const gradLeft = ctx.createLinearGradient(0, 0, 90, 0);
      gradLeft.addColorStop(0, '#ffffff');
      gradLeft.addColorStop(0.6, '#94a3b8');
      gradLeft.addColorStop(1, 'transparent');
      ctx.fillStyle = gradLeft;
      ctx.fillRect(0, 30, 90, 196);

      // Right Vertical Clinical Strip Light
      const gradRight = ctx.createLinearGradient(512, 0, 422, 0);
      gradRight.addColorStop(0, '#ffffff');
      gradRight.addColorStop(0.6, '#cbd5e1');
      gradRight.addColorStop(1, 'transparent');
      ctx.fillStyle = gradRight;
      ctx.fillRect(422, 30, 90, 196);

      // Center Specular Pinstripe
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillRect(250, 0, 12, 256);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, []);

  // 1. Left Wing Geometry of the 'V'
  const leftWingGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.68, 1.48);
    shape.lineTo(-0.72, 1.48);
    shape.lineTo(-0.06, 0.12);
    shape.lineTo(-0.04, -0.6);
    shape.lineTo(-0.08, -1.35);
    shape.lineTo(-1.28, 1.18);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.07,
      bevelThickness: 0.09,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // 2. Right Wing Geometry of the 'V'
  const rightWingGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(1.68, 1.48);
    shape.lineTo(0.72, 1.48);
    shape.lineTo(0.06, 0.12);
    shape.lineTo(0.04, -0.6);
    shape.lineTo(0.08, -1.35);
    shape.lineTo(1.28, 1.18);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.07,
      bevelThickness: 0.09,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // 3. Lower Dagger Apex & Central Ridge (chiseled diamond spine)
  const apexGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.13, 0.16);
    shape.lineTo(0.13, 0.16);
    shape.lineTo(0.09, -1.3);
    shape.lineTo(0.0, -1.82); // sharp clinical dagger tip
    shape.lineTo(-0.09, -1.3);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.40,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.07,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // 4. Inclined Orbital Halo Blade Ring
  const ringGeo = useMemo(() => {
    return new THREE.TorusGeometry(1.52, 0.042, 32, 140);
  }, []);

  // 5. High-Visibility Clinical Materials
  const materials = useMemo(() => {
    // Polished Aerospace Titanium (bright, distinct, high-contrast, razor-sharp bevels)
    const clinicalTitanium = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#383d47'),
      roughness: 0.09,
      metalness: 0.96,
      envMap: studioEnvMap,
      envMapIntensity: 3.6,
    });

    // Chiseled Apex Ridge (bright platinum steel accent)
    const chiseledApexTitanium = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4c5361'),
      roughness: 0.06,
      metalness: 0.98,
      envMap: studioEnvMap,
      envMapIntensity: 4.2,
    });

    // Liquid Mirror Chrome for Halo Blade Ring (pristine reflection and caustics)
    const liquidMirrorChrome = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.012,
      metalness: 1.0,
      envMap: studioEnvMap,
      envMapIntensity: 5.0,
    });

    return { clinicalTitanium, chiseledApexTitanium, liquidMirrorChrome };
  }, [studioEnvMap]);

  // Frame Loop Animation matching the 8 Storyboard Frames with Clinical Precision
  useFrame((state) => {
    const t = timelineTime;

    // Default rest targets
    let leftTargetX = -0.63;
    let leftTargetY = 0.32;
    let leftTargetZ = 0;
    let leftTargetRotZ = 0;

    let rightTargetX = 0.63;
    let rightTargetY = 0.32;
    let rightTargetZ = 0;
    let rightTargetRotZ = 0;

    let apexTargetY = -0.58;
    let apexTargetZ = 0.05;

    let ringTargetZ = 0.07;
    let ringTargetScale = 1.0;

    // FRAME 1: BLACK SCREEN (0.0s - 0.5s)
    if (t < 0.5) {
      leftTargetZ = -6.0;
      rightTargetZ = -6.0;
      apexTargetZ = -5.0;
      ringTargetScale = 0.05;
      if (rootGroupRef.current) rootGroupRef.current.visible = false;
    } else {
      if (rootGroupRef.current) rootGroupRef.current.visible = true;
    }

    // FRAME 2: LOGO FORMATION (0.5s - 1.5s) - Pieces assemble into final shape
    if (t >= 0.5 && t < 1.5) {
      const progress = Math.min(1, Math.max(0, (t - 0.5) / 1.0));
      // Clinical ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      leftTargetX = THREE.MathUtils.lerp(-2.6, -0.63, ease);
      leftTargetY = THREE.MathUtils.lerp(1.4, 0.32, ease);
      leftTargetZ = THREE.MathUtils.lerp(-2.5, 0, ease);
      leftTargetRotZ = THREE.MathUtils.lerp(-0.48, 0, ease);

      rightTargetX = THREE.MathUtils.lerp(2.6, 0.63, ease);
      rightTargetY = THREE.MathUtils.lerp(1.4, 0.32, ease);
      rightTargetZ = THREE.MathUtils.lerp(-2.5, 0, ease);
      rightTargetRotZ = THREE.MathUtils.lerp(0.48, 0, ease);

      apexTargetY = THREE.MathUtils.lerp(-2.0, -0.58, ease);
      apexTargetZ = THREE.MathUtils.lerp(-1.8, 0.05, ease);

      ringTargetScale = THREE.MathUtils.lerp(0.25, 1.0, ease);
      ringTargetZ = THREE.MathUtils.lerp(-2.0, 0.07, ease);
    }

    // Smooth component interpolation
    if (leftWingRef.current) {
      leftWingRef.current.position.x = THREE.MathUtils.lerp(leftWingRef.current.position.x, leftTargetX, 0.18);
      leftWingRef.current.position.y = THREE.MathUtils.lerp(leftWingRef.current.position.y, leftTargetY, 0.18);
      leftWingRef.current.position.z = THREE.MathUtils.lerp(leftWingRef.current.position.z, leftTargetZ, 0.18);
      leftWingRef.current.rotation.z = THREE.MathUtils.lerp(leftWingRef.current.rotation.z, leftTargetRotZ, 0.18);
    }

    if (rightWingRef.current) {
      rightWingRef.current.position.x = THREE.MathUtils.lerp(rightWingRef.current.position.x, rightTargetX, 0.18);
      rightWingRef.current.position.y = THREE.MathUtils.lerp(rightWingRef.current.position.y, rightTargetY, 0.18);
      rightWingRef.current.position.z = THREE.MathUtils.lerp(rightWingRef.current.position.z, rightTargetZ, 0.18);
      rightWingRef.current.rotation.z = THREE.MathUtils.lerp(rightWingRef.current.rotation.z, rightTargetRotZ, 0.18);
    }

    if (apexRef.current) {
      apexRef.current.position.y = THREE.MathUtils.lerp(apexRef.current.position.y, apexTargetY, 0.18);
      apexRef.current.position.z = THREE.MathUtils.lerp(apexRef.current.position.z, apexTargetZ, 0.18);
    }

    if (ringRef.current) {
      ringRef.current.position.z = THREE.MathUtils.lerp(ringRef.current.position.z, ringTargetZ, 0.18);
      const currentScale = ringRef.current.scale.x / 1.6;
      const targetS = THREE.MathUtils.lerp(currentScale, ringTargetScale, 0.18);
      ringRef.current.scale.set(targetS * 1.6, targetS * 0.72, targetS * 0.22);
    }

    // FRAME 3: REVEAL & SPECULAR LIGHT SWEEP (1.5s - 3.0s)
    if (sweepLightRef.current) {
      if (t >= 1.4 && t < 3.2) {
        const sweepProgress = (t - 1.4) / 1.8;
        sweepLightRef.current.intensity = 11.0;
        sweepLightRef.current.position.x = THREE.MathUtils.lerp(-5.5, 5.5, sweepProgress);
        sweepLightRef.current.position.y = THREE.MathUtils.lerp(3.0, -1.0, sweepProgress);
        sweepLightRef.current.position.z = 3.2;
      } else {
        sweepLightRef.current.intensity = 4.5;
        sweepLightRef.current.position.x = 2.0;
      }
    }

    // FRAME 5: CLOSE-UP MACRO SHOT (4.0s - 4.65s)
    let camTargetX = 0;
    let camTargetY = 0;
    let camTargetZ = 4.6;
    let lookTargetX = 0;
    let lookTargetY = 0;
    let lookTargetZ = 0;

    if (t >= 4.0 && t < 4.65) {
      // Dynamic Macro angle focusing on the intersecting chrome blade & titanium facet
      camTargetX = -0.75;
      camTargetY = 0.30;
      camTargetZ = 2.05;
      lookTargetX = -0.28;
      lookTargetY = 0.12;
      lookTargetZ = 0.15;

      if (macroSpotRef.current) {
        macroSpotRef.current.intensity = 14.0;
        macroSpotRef.current.position.set(-1.2, 0.9, 2.8);
      }
    } else {
      // Frame 4 (3.0s - 4.0s): Slow cinematic dolly-in
      if (t >= 3.0 && t < 4.0) {
        const dollyProgress = (t - 3.0) / 1.0;
        camTargetZ = THREE.MathUtils.lerp(4.8, 4.25, dollyProgress);
      }
      // Frame 6 (4.65s - 5.1s): Full frontal hold
      else if (t >= 4.65 && t < 5.1) {
        camTargetX = 0;
        camTargetY = 0;
        camTargetZ = 4.3;
      }
      // Frame 7 (5.1s - 5.6s): Dissolve into light streaks
      else if (t >= 5.1) {
        camTargetZ = 4.3;
      }

      if (macroSpotRef.current) {
        macroSpotRef.current.intensity = 1.5;
      }
    }

    // Camera smooth cinematic interpolation
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, camTargetX, 0.09);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, camTargetY, 0.09);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, camTargetZ, 0.09);
    state.camera.lookAt(lookTargetX, lookTargetY, lookTargetZ);

    // Subtle idle float when assembled
    if (rootGroupRef.current && t >= 1.5 && t < 5.0 && !(t >= 4.0 && t < 4.65)) {
      rootGroupRef.current.rotation.y = Math.sin(t * 0.7) * 0.035;
      rootGroupRef.current.rotation.x = Math.cos(t * 0.5) * 0.018;
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* High-Visibility Clinical Studio Key & Ambient Lighting */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[0, 6, 5]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-5, 3, -1]} intensity={4.2} color="#e0f2fe" />
      <directionalLight position={[5, -1, 3]} intensity={3.0} color="#f8fafc" />
      <directionalLight position={[0, -4, 2]} intensity={1.5} color="#94a3b8" />

      {/* Razor-Sharp Moving Specular Sweep Light (Frame 3) */}
      <pointLight
        ref={sweepLightRef}
        position={[-5, 2, 3]}
        intensity={8.0}
        color="#ffffff"
        distance={20}
      />

      {/* Macro Close-up Dramatic Spotlight (Frame 5) */}
      <spotLight
        ref={macroSpotRef}
        position={[-1, 2, 3]}
        intensity={2.0}
        color="#ffffff"
        angle={0.55}
        penumbra={0.7}
      />

      {/* Clinical Backlight / Rim Lights for high-contrast edge silhouette */}
      <pointLight
        ref={rimLightLeftRef}
        position={[-3, 2, -2.5]}
        intensity={5.0}
        color="#e0f2fe"
        distance={14}
      />
      <pointLight
        ref={rimLightRightRef}
        position={[3, -1, -2.5]}
        intensity={4.5}
        color="#ffffff"
        distance={14}
      />
      <pointLight
        ref={rimLightBackRef}
        position={[0, 3, -3.5]}
        intensity={4.0}
        color="#93c5fd"
        distance={15}
      />

      {/* 3D Assembling Components (Frame 2 -> Frame 8) */}
      <group ref={leftWingRef} position={[-2.6, 1.4, -2.5]}>
        <mesh geometry={leftWingGeo} material={materials.clinicalTitanium} castShadow />
      </group>

      <group ref={rightWingRef} position={[2.6, 1.4, -2.5]}>
        <mesh geometry={rightWingGeo} material={materials.clinicalTitanium} castShadow />
      </group>

      <group ref={apexRef} position={[0, -2.0, -1.8]}>
        <mesh geometry={apexGeo} material={materials.chiseledApexTitanium} castShadow />
      </group>

      {/* Inclined Orbital Halo Blade Ring Group */}
      <group
        ref={ringRef}
        position={[0, -0.05, -2.0]}
        rotation={[0.42, 0.15, -0.52]}
        scale={[1.6, 0.72, 0.22]}
      >
        <mesh geometry={ringGeo} material={materials.liquidMirrorChrome} />
      </group>
    </group>
  );
};
