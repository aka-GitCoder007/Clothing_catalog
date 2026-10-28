import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export interface SpiderHoodie3DProps {
  materialTheme?: 'obsidian' | 'chrome' | 'crimson' | 'bone';
  wireframe?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
}

export const SpiderHoodie3D: React.FC<SpiderHoodie3DProps> = ({
  materialTheme = 'obsidian',
  wireframe = false,
  exploded = false,
  autoRotate = true,
}) => {
  const rootRef = useRef<THREE.Group>(null);

  // Explode animation sub-group refs
  const hoodRef = useRef<THREE.Group>(null);
  const leftSleeveRef = useRef<THREE.Group>(null);
  const rightSleeveRef = useRef<THREE.Group>(null);
  const pocketRef = useRef<THREE.Group>(null);
  const hemRef = useRef<THREE.Group>(null);
  const spiderGraphicRef = useRef<THREE.Group>(null);

  // Metallic orbital rings refs
  const orbitalRing1Ref = useRef<THREE.Group>(null);
  const orbitalRing2Ref = useRef<THREE.Group>(null);
  const orbitalRing3Ref = useRef<THREE.Group>(null);

  // ==========================================
  // PBR MATERIAL SYSTEM
  // ==========================================
  const materials = useMemo(() => {
    if (wireframe) {
      // X-Ray Mode: Semi-transparent technical holographic visualization
      const fabric = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#38bdf8'),
        transparent: true,
        opacity: 0.26,
        wireframe: true,
        roughness: 0.1,
        metalness: 0.2,
        side: THREE.DoubleSide,
      });

      const innerCavity = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#0284c7'),
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });

      const redAccent = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff2a3a'),
        emissive: new THREE.Color('#ff1122'),
        emissiveIntensity: 0.8,
        wireframe: true,
      });

      const chrome = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        emissive: new THREE.Color('#38bdf8'),
        emissiveIntensity: 0.5,
      });

      const orbital = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        emissive: new THREE.Color('#38bdf8'),
        emissiveIntensity: 0.6,
        roughness: 0.08,
        metalness: 0.98,
      });

      return { fabric, innerCavity, redAccent, chrome, orbital };
    }

    // Default & Palette Modes
    let mainColor = '#0f1014';
    let roughness = 0.58;
    let metalness = 0.1;

    let graphicColor = '#c91424';
    let graphicEmissive = '#50060d';

    if (materialTheme === 'chrome') {
      mainColor = '#dbe1ea';
      roughness = 0.12;
      metalness = 0.95;
      graphicColor = '#1e2229';
      graphicEmissive = '#000000';
    } else if (materialTheme === 'crimson') {
      mainColor = '#46070d';
      roughness = 0.42;
      metalness = 0.25;
      graphicColor = '#ff2a3a';
      graphicEmissive = '#aa1120';
    } else if (materialTheme === 'bone') {
      mainColor = '#ded8cc';
      roughness = 0.55;
      metalness = 0.06;
      graphicColor = '#9E1B22';
      graphicEmissive = '#440408';
    }

    const fabric = new THREE.MeshStandardMaterial({
      color: new THREE.Color(mainColor),
      roughness,
      metalness,
      flatShading: false,
    });

    const innerCavity = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#030305'),
      roughness: 0.85,
      metalness: 0.0,
      side: THREE.BackSide,
    });

    const redAccent = new THREE.MeshStandardMaterial({
      color: new THREE.Color(graphicColor),
      emissive: new THREE.Color(graphicEmissive),
      emissiveIntensity: 0.45,
      roughness: 0.32,
      metalness: 0.3,
    });

    const chrome = new THREE.MeshStandardMaterial({
      color: new THREE.Color(materialTheme === 'bone' ? '#18181c' : '#f0f3f8'),
      roughness: 0.12,
      metalness: 0.94,
    });

    const orbital = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f0f3f8'),
      roughness: 0.08,
      metalness: 0.98,
    });

    return { fabric, innerCavity, redAccent, chrome, orbital };
  }, [materialTheme, wireframe]);

  // ==========================================
  // CONTINUOUS ANIMATION LOOP (Orbitals & Explode)
  // ==========================================
  useFrame((state, delta) => {
    // Turntable rotation
    if (rootRef.current && autoRotate) {
      rootRef.current.rotation.y += delta * 0.25;
    }

    // Metallic Orbital Rings rotation
    if (orbitalRing1Ref.current) {
      orbitalRing1Ref.current.rotation.z += delta * 0.14;
      orbitalRing1Ref.current.rotation.y += delta * 0.06;
    }
    if (orbitalRing2Ref.current) {
      orbitalRing2Ref.current.rotation.z -= delta * 0.11;
      orbitalRing2Ref.current.rotation.x += delta * 0.07;
    }
    if (orbitalRing3Ref.current) {
      orbitalRing3Ref.current.rotation.y += delta * 0.08;
    }

    // Explode lerp animation
    const exp = exploded ? 1 : 0;
    const lerpSpeed = delta * 6;

    if (hoodRef.current) {
      hoodRef.current.position.y = THREE.MathUtils.lerp(
        hoodRef.current.position.y,
        1.34 + exp * 0.4,
        lerpSpeed
      );
      hoodRef.current.position.z = THREE.MathUtils.lerp(
        hoodRef.current.position.z,
        -0.08 - exp * 0.2,
        lerpSpeed
      );
    }

    if (leftSleeveRef.current) {
      leftSleeveRef.current.position.x = THREE.MathUtils.lerp(
        leftSleeveRef.current.position.x,
        -1.18 - exp * 0.45,
        lerpSpeed
      );
      leftSleeveRef.current.position.z = THREE.MathUtils.lerp(
        leftSleeveRef.current.position.z,
        exp * 0.15,
        lerpSpeed
      );
    }

    if (rightSleeveRef.current) {
      rightSleeveRef.current.position.x = THREE.MathUtils.lerp(
        rightSleeveRef.current.position.x,
        1.18 + exp * 0.45,
        lerpSpeed
      );
      rightSleeveRef.current.position.z = THREE.MathUtils.lerp(
        rightSleeveRef.current.position.z,
        exp * 0.15,
        lerpSpeed
      );
    }

    if (pocketRef.current) {
      pocketRef.current.position.z = THREE.MathUtils.lerp(
        pocketRef.current.position.z,
        0.48 + exp * 0.28,
        lerpSpeed
      );
    }

    if (hemRef.current) {
      hemRef.current.position.y = THREE.MathUtils.lerp(
        hemRef.current.position.y,
        -0.85 - exp * 0.3,
        lerpSpeed
      );
    }

    if (spiderGraphicRef.current) {
      spiderGraphicRef.current.position.z = THREE.MathUtils.lerp(
        spiderGraphicRef.current.position.z,
        0.48 + exp * 0.22,
        lerpSpeed
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.3}>
      <group ref={rootRef} position={[0, -0.05, 0]} scale={1.2}>
        {/* ========================================================
            METALLIC ORBITAL RINGS (Thin Silver with Red Telemetry)
            ======================================================== */}
        {/* Ring 1 - Tilted Celestial Ring with Red Accents */}
        <group
          ref={orbitalRing1Ref}
          position={[0, 0.1, 0]}
          rotation={[Math.PI * 0.28, Math.PI * 0.12, 0]}
        >
          <mesh material={materials.orbital}>
            <torusGeometry args={[2.3, 0.012, 16, 128]} />
          </mesh>
          {/* Red Telemetry Sleeve Cylinders (Reference Image match) */}
          <mesh position={[2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.redAccent}>
            <cylinderGeometry args={[0.024, 0.024, 0.24, 16]} />
          </mesh>
          <mesh position={[-2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.redAccent}>
            <cylinderGeometry args={[0.024, 0.024, 0.24, 16]} />
          </mesh>
        </group>

        {/* Ring 2 - Secondary Counter-Inclined Ring with Red Accents */}
        <group
          ref={orbitalRing2Ref}
          position={[0, 0.15, 0]}
          rotation={[-Math.PI * 0.24, Math.PI * 0.3, 0]}
        >
          <mesh material={materials.orbital}>
            <torusGeometry args={[2.55, 0.009, 16, 128]} />
          </mesh>
          <mesh position={[0, 2.55, 0]} rotation={[0, 0, 0]} material={materials.redAccent}>
            <cylinderGeometry args={[0.02, 0.02, 0.22, 16]} />
          </mesh>
          <mesh position={[0, -2.55, 0]} rotation={[0, 0, 0]} material={materials.redAccent}>
            <cylinderGeometry args={[0.02, 0.02, 0.22, 16]} />
          </mesh>
        </group>

        {/* Ring 3 - Horizontal Radar Coordinate Ring */}
        <group ref={orbitalRing3Ref} position={[0, -0.2, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.1, 0.006, 8, 96]} />
            <meshBasicMaterial
              color={materialTheme === 'crimson' ? '#ff3344' : '#F5F3EE'}
              transparent
              opacity={wireframe ? 0.45 : 0.25}
            />
          </mesh>
          {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.1, 0, Math.sin(angle) * 2.1]}
              material={materials.redAccent}
            >
              <sphereGeometry args={[0.035, 12, 12]} />
            </mesh>
          ))}
        </group>

        {/* ========================================================
            GENUINE 3D HOODIE GEOMETRY
            ======================================================== */}

        {/* 1. TORSO & CORE CHASSIS (Front and Back with Volume) */}
        <group position={[0, 0, 0]}>
          {/* Upper chest tapered volume */}
          <mesh position={[0, 0.38, 0]} material={materials.fabric}>
            <cylinderGeometry args={[0.96, 0.88, 1.15, 36]} />
          </mesh>
          {/* Abdomen / midsection */}
          <mesh position={[0, -0.38, 0]} material={materials.fabric}>
            <cylinderGeometry args={[0.88, 0.84, 0.68, 36]} />
          </mesh>
          {/* Front chest volume block */}
          <mesh position={[0, 0.35, 0.32]} material={materials.fabric}>
            <boxGeometry args={[1.42, 1.0, 0.25]} />
          </mesh>
          {/* Back shoulder yoke block */}
          <mesh position={[0, 0.4, -0.32]} material={materials.fabric}>
            <boxGeometry args={[1.46, 0.9, 0.22]} />
          </mesh>
        </group>

        {/* 2. KANGAROO FRONT POUCH POCKET */}
        <group ref={pocketRef} position={[0, 0, 0]}>
          <mesh position={[0, -0.32, 0.48]} material={materials.fabric}>
            <boxGeometry args={[0.92, 0.52, 0.15]} />
          </mesh>
          {/* Left Angled Piping */}
          <mesh position={[-0.48, -0.32, 0.48]} rotation={[0, 0, -0.28]} material={materials.redAccent}>
            <boxGeometry args={[0.04, 0.42, 0.16]} />
          </mesh>
          {/* Right Angled Piping */}
          <mesh position={[0.48, -0.32, 0.48]} rotation={[0, 0, 0.28]} material={materials.redAccent}>
            <boxGeometry args={[0.04, 0.42, 0.16]} />
          </mesh>
        </group>

        {/* 3. RIBBED HEM WAISTBAND */}
        <group ref={hemRef} position={[0, 0, 0]}>
          <mesh position={[0, -0.85, 0]} material={materials.fabric}>
            <cylinderGeometry args={[0.83, 0.80, 0.3, 36]} />
          </mesh>
          {/* Center logo label */}
          <mesh position={[0, -0.85, 0.82]} material={materials.redAccent}>
            <boxGeometry args={[0.14, 0.06, 0.02]} />
          </mesh>
        </group>

        {/* 4. THREE-DIMENSIONAL COWL HOOD (With Visible Hollow Opening) */}
        <group ref={hoodRef} position={[0, 0, 0]}>
          {/* Outer curved hood shell */}
          <mesh position={[0, 1.34, -0.08]} rotation={[-0.1, 0, 0]} material={materials.fabric}>
            <sphereGeometry args={[0.66, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.74]} />
          </mesh>
          {/* Dark inner cavity lining (visible opening looking inside the hood) */}
          <mesh position={[0, 1.34, -0.08]} rotation={[-0.1, 0, 0]} material={materials.innerCavity}>
            <sphereGeometry args={[0.62, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.74]} />
          </mesh>
          {/* Crimson Red Face Rim Torus (Framing the hood opening) */}
          <mesh position={[0, 1.25, 0.38]} rotation={[Math.PI * 0.24, 0, 0]} material={materials.redAccent}>
            <torusGeometry args={[0.46, 0.038, 16, 48]} />
          </mesh>
          {/* Neck cowl collar wrap */}
          <mesh position={[0, 1.05, 0.05]} material={materials.fabric}>
            <cylinderGeometry args={[0.62, 0.74, 0.42, 32, 1, true]} />
          </mesh>

          {/* Hanging Drawstrings with Shiny Chrome Aglets */}
          {/* Left cord & aglet */}
          <mesh position={[-0.16, 0.68, 0.52]} material={materials.fabric}>
            <cylinderGeometry args={[0.014, 0.014, 0.58, 12]} />
          </mesh>
          <mesh position={[-0.16, 0.36, 0.52]} material={materials.chrome}>
            <cylinderGeometry args={[0.022, 0.022, 0.12, 16]} />
          </mesh>
          {/* Right cord & aglet */}
          <mesh position={[0.16, 0.68, 0.52]} material={materials.fabric}>
            <cylinderGeometry args={[0.014, 0.014, 0.58, 12]} />
          </mesh>
          <mesh position={[0.16, 0.36, 0.52]} material={materials.chrome}>
            <cylinderGeometry args={[0.022, 0.022, 0.12, 16]} />
          </mesh>
        </group>

        {/* 5. SEPARATE ARTICULATED SLEEVES & RED WEB DETAILS */}
        {/* Left Sleeve */}
        <group ref={leftSleeveRef} position={[-1.18, 0.25, 0]}>
          <mesh position={[0.12, 0.44, 0]} rotation={[0, 0, 0.28]} material={materials.fabric}>
            <sphereGeometry args={[0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          </mesh>
          <mesh position={[-0.06, 0.04, 0]} rotation={[0, 0, 0.22]} material={materials.fabric}>
            <cylinderGeometry args={[0.38, 0.33, 0.85, 24]} />
          </mesh>
          {/* Left Red Geometric Shoulder/Bicep Panel */}
          <mesh position={[-0.08, 0.22, 0]} rotation={[0, 0, 0.22]} material={materials.redAccent}>
            <boxGeometry args={[0.18, 0.62, 0.38]} />
          </mesh>
          <mesh position={[-0.25, -0.74, 0]} rotation={[0, 0, 0.14]} material={materials.fabric}>
            <cylinderGeometry args={[0.33, 0.27, 0.9, 24]} />
          </mesh>
          {/* Outer Forearm Red Geometric Chevron Stripes */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[-0.45 - i * 0.04, -0.5 - i * 0.22, 0]}
              rotation={[0, 0, 0.14]}
              material={materials.redAccent}
            >
              <boxGeometry args={[0.06, 0.12, 0.26]} />
            </mesh>
          ))}
          {/* Left Ribbed Wrist Cuff */}
          <mesh position={[-0.36, -1.26, 0]} rotation={[0, 0, 0.14]} material={materials.fabric}>
            <cylinderGeometry args={[0.26, 0.24, 0.22, 24]} />
          </mesh>
        </group>

        {/* Right Sleeve */}
        <group ref={rightSleeveRef} position={[1.18, 0.25, 0]}>
          <mesh position={[-0.12, 0.44, 0]} rotation={[0, 0, -0.28]} material={materials.fabric}>
            <sphereGeometry args={[0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          </mesh>
          <mesh position={[0.06, 0.04, 0]} rotation={[0, 0, -0.22]} material={materials.fabric}>
            <cylinderGeometry args={[0.38, 0.33, 0.85, 24]} />
          </mesh>
          {/* Right Red Geometric Shoulder/Bicep Panel */}
          <mesh position={[0.08, 0.22, 0]} rotation={[0, 0, -0.22]} material={materials.redAccent}>
            <boxGeometry args={[0.18, 0.62, 0.38]} />
          </mesh>
          <mesh position={[0.25, -0.74, 0]} rotation={[0, 0, -0.14]} material={materials.fabric}>
            <cylinderGeometry args={[0.33, 0.27, 0.9, 24]} />
          </mesh>
          {/* Outer Forearm Red Geometric Chevron Stripes */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[0.45 + i * 0.04, -0.5 - i * 0.22, 0]}
              rotation={[0, 0, -0.14]}
              material={materials.redAccent}
            >
              <boxGeometry args={[0.06, 0.12, 0.26]} />
            </mesh>
          ))}
          {/* Right Ribbed Wrist Cuff */}
          <mesh position={[0.36, -1.26, 0]} rotation={[0, 0, -0.14]} material={materials.fabric}>
            <cylinderGeometry args={[0.26, 0.24, 0.22, 24]} />
          </mesh>
        </group>

        {/* 6. ORIGINAL CRIMSON SPIDER CHEST EMBLEM & HARNESS */}
        <group ref={spiderGraphicRef} position={[0, 0, 0]}>
          {/* Central Spider Body Abdomen */}
          <mesh position={[0, 0.22, 0.48]} rotation={[Math.PI, 0, 0]} material={materials.redAccent}>
            <coneGeometry args={[0.14, 0.52, 16]} />
          </mesh>
          {/* Spider Head Carapace */}
          <mesh position={[0, 0.44, 0.48]} material={materials.redAccent}>
            <octahedronGeometry args={[0.11, 0]} />
          </mesh>
          {/* Radiating 8 Spider Legs */}
          <mesh position={[-0.24, 0.46, 0.48]} rotation={[0, 0, 0.42]} material={materials.redAccent}>
            <boxGeometry args={[0.38, 0.035, 0.04]} />
          </mesh>
          <mesh position={[0.24, 0.46, 0.48]} rotation={[0, 0, -0.42]} material={materials.redAccent}>
            <boxGeometry args={[0.38, 0.035, 0.04]} />
          </mesh>
          <mesh position={[-0.28, 0.32, 0.48]} rotation={[0, 0, 0.12]} material={materials.redAccent}>
            <boxGeometry args={[0.46, 0.032, 0.04]} />
          </mesh>
          <mesh position={[0.28, 0.32, 0.48]} rotation={[0, 0, -0.12]} material={materials.redAccent}>
            <boxGeometry args={[0.46, 0.032, 0.04]} />
          </mesh>
          <mesh position={[-0.26, 0.16, 0.48]} rotation={[0, 0, -0.28]} material={materials.redAccent}>
            <boxGeometry args={[0.48, 0.03, 0.04]} />
          </mesh>
          <mesh position={[0.26, 0.16, 0.48]} rotation={[0, 0, 0.28]} material={materials.redAccent}>
            <boxGeometry args={[0.48, 0.03, 0.04]} />
          </mesh>
          <mesh position={[-0.16, -0.04, 0.48]} rotation={[0, 0, -0.75]} material={materials.redAccent}>
            <boxGeometry args={[0.38, 0.028, 0.04]} />
          </mesh>
          <mesh position={[0.16, -0.04, 0.48]} rotation={[0, 0, 0.75]} material={materials.redAccent}>
            <boxGeometry args={[0.38, 0.028, 0.04]} />
          </mesh>
          {/* Angular Shoulder Slashes */}
          <mesh position={[-0.45, 0.58, 0.46]} rotation={[0, 0, 0.65]} material={materials.redAccent}>
            <boxGeometry args={[0.55, 0.04, 0.03]} />
          </mesh>
          <mesh position={[0.45, 0.58, 0.46]} rotation={[0, 0, -0.65]} material={materials.redAccent}>
            <boxGeometry args={[0.55, 0.04, 0.03]} />
          </mesh>
        </group>

        {/* Base Pedestal Marker Ring */}
        <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.25, 1.28, 48]} />
          <meshBasicMaterial
            color={materialTheme === 'crimson' ? '#ff3344' : '#F5F3EE'}
            opacity={wireframe ? 0.5 : 0.3}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
};

