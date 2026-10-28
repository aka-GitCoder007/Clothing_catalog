import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export type GarmentMaterialTheme = 'obsidian' | 'chrome' | 'crimson' | 'bone';
export type GarmentSilhouette = 'hoodie' | 'jacket' | 'coat' | 'pants';

export interface GarmentModel3DProps {
  silhouette?: GarmentSilhouette;
  materialTheme?: GarmentMaterialTheme;
  xRay?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
  ringsOnly?: boolean;
}

export const GarmentModel3D: React.FC<GarmentModel3DProps> = ({
  silhouette = 'jacket',
  materialTheme = 'obsidian',
  xRay = false,
  exploded = false,
  autoRotate = true,
  ringsOnly = false,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const orbitalRing1Ref = useRef<THREE.Group>(null);
  const orbitalRing2Ref = useRef<THREE.Group>(null);
  const orbitalRing3Ref = useRef<THREE.Group>(null);

  // Explode animation targets
  const hoodRef = useRef<THREE.Group>(null);
  const leftSleeveRef = useRef<THREE.Group>(null);
  const rightSleeveRef = useRef<THREE.Group>(null);
  const pocketRef = useRef<THREE.Group>(null);
  const collarRef = useRef<THREE.Group>(null);
  const lowerHemRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  // ==========================================
  // MATERIAL DEFINITIONS
  // ==========================================
  const materials = useMemo(() => {
    if (xRay) {
      // Ethereal technical holographic visualization
      const fabric = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#78b4e8'),
        transparent: true,
        opacity: 0.22,
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.85,
        ior: 1.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const wireframe = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#94d0ff'),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });

      const hardware = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        emissive: new THREE.Color('#38bdf8'),
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.9,
      });

      const accent = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38bdf8'),
        emissive: new THREE.Color('#0284c7'),
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
      });

      const orbital = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        emissive: new THREE.Color('#38bdf8'),
        emissiveIntensity: 0.5,
        roughness: 0.08,
        metalness: 0.98,
      });

      return { fabric, wireframe, hardware, accent, orbital };
    }

    // Standard high-fashion materials
    let fabricColor = '#0f1013';
    let roughness = 0.42;
    let metalness = 0.12;
    let clearcoat = 0.25;

    if (materialTheme === 'chrome') {
      fabricColor = '#dbe1ea';
      roughness = 0.1;
      metalness = 0.95;
      clearcoat = 0.95;
    } else if (materialTheme === 'crimson') {
      fabricColor = '#4a080e';
      roughness = 0.36;
      metalness = 0.28;
      clearcoat = 0.55;
    } else if (materialTheme === 'bone') {
      fabricColor = '#ded8cc';
      roughness = 0.52;
      metalness = 0.06;
      clearcoat = 0.15;
    }

    const fabric = new THREE.MeshStandardMaterial({
      color: new THREE.Color(fabricColor),
      roughness,
      metalness,
      flatShading: false,
    });

    const wireframe = new THREE.MeshBasicMaterial({
      color: new THREE.Color(materialTheme === 'crimson' ? '#ff3344' : '#ffffff'),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const hardware = new THREE.MeshStandardMaterial({
      color: new THREE.Color(materialTheme === 'bone' ? '#18181c' : '#b0b5be'),
      roughness: 0.14,
      metalness: 0.92,
    });

    const accent = new THREE.MeshStandardMaterial({
      color: new THREE.Color(materialTheme === 'crimson' ? '#ff2a3a' : '#9E1B22'),
      emissive: new THREE.Color(materialTheme === 'crimson' ? '#cc1120' : '#800f15'),
      emissiveIntensity: 0.45,
      roughness: 0.25,
      metalness: 0.7,
    });

    // Mirror-polished metallic silver orbital rings
    const orbital = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f0f3f8'),
      roughness: 0.08,
      metalness: 0.98,
    });

    return { fabric, wireframe, hardware, accent, orbital };
  }, [materialTheme, xRay]);

  // ==========================================
  // CONTINUOUS ANIMATION LOOP
  // ==========================================
  useFrame((state, delta) => {
    // Gentle turntable rotation
    if (rootGroupRef.current && autoRotate) {
      rootGroupRef.current.rotation.y += delta * 0.25;
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
      orbitalRing3Ref.current.rotation.y += delta * 0.09;
    }

    // Explode lerp animation
    const expFactor = exploded ? 1 : 0;
    const lerpSpeed = delta * 6;

    if (hoodRef.current) {
      hoodRef.current.position.y = THREE.MathUtils.lerp(
        hoodRef.current.position.y,
        1.35 + expFactor * 0.4,
        lerpSpeed
      );
      hoodRef.current.position.z = THREE.MathUtils.lerp(
        hoodRef.current.position.z,
        -0.1 - expFactor * 0.2,
        lerpSpeed
      );
    }

    if (collarRef.current) {
      collarRef.current.position.y = THREE.MathUtils.lerp(
        collarRef.current.position.y,
        1.25 + expFactor * 0.35,
        lerpSpeed
      );
    }

    if (leftSleeveRef.current) {
      leftSleeveRef.current.position.x = THREE.MathUtils.lerp(
        leftSleeveRef.current.position.x,
        -1.15 - expFactor * 0.45,
        lerpSpeed
      );
      leftSleeveRef.current.position.z = THREE.MathUtils.lerp(
        leftSleeveRef.current.position.z,
        expFactor * 0.15,
        lerpSpeed
      );
    }

    if (rightSleeveRef.current) {
      rightSleeveRef.current.position.x = THREE.MathUtils.lerp(
        rightSleeveRef.current.position.x,
        1.15 + expFactor * 0.45,
        lerpSpeed
      );
      rightSleeveRef.current.position.z = THREE.MathUtils.lerp(
        rightSleeveRef.current.position.z,
        expFactor * 0.15,
        lerpSpeed
      );
    }

    if (pocketRef.current) {
      pocketRef.current.position.z = THREE.MathUtils.lerp(
        pocketRef.current.position.z,
        0.72 + expFactor * 0.28,
        lerpSpeed
      );
    }

    if (lowerHemRef.current) {
      lowerHemRef.current.position.y = THREE.MathUtils.lerp(
        lowerHemRef.current.position.y,
        -0.9 - expFactor * 0.3,
        lerpSpeed
      );
    }

    if (leftLegRef.current) {
      leftLegRef.current.position.x = THREE.MathUtils.lerp(
        leftLegRef.current.position.x,
        -0.45 - expFactor * 0.35,
        lerpSpeed
      );
    }

    if (rightLegRef.current) {
      rightLegRef.current.position.x = THREE.MathUtils.lerp(
        rightLegRef.current.position.x,
        0.45 + expFactor * 0.35,
        lerpSpeed
      );
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={rootGroupRef} position={[0, -0.05, 0]} scale={1.2}>
        {/* ========================================================
            METALLIC ORBITAL RINGS (Inspired by VOID.ARCHIVE Emblem)
            ======================================================== */}
        {/* Ring 1 - Primary Tilted Celestial Ring with Red Accents */}
        <group
          ref={orbitalRing1Ref}
          position={[0, 0.1, 0]}
          rotation={[Math.PI * 0.28, Math.PI * 0.12, 0]}
        >
          <mesh material={materials.orbital}>
            <torusGeometry args={[2.3, 0.012, 16, 128]} />
          </mesh>
          {/* Dual Red Cylindrical Accents */}
          <mesh position={[2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.accent}>
            <cylinderGeometry args={[0.024, 0.024, 0.24, 16]} />
          </mesh>
          <mesh position={[-2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.accent}>
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
          {/* Dual Red Cylindrical Accents */}
          <mesh position={[0, 2.55, 0]} rotation={[0, 0, 0]} material={materials.accent}>
            <cylinderGeometry args={[0.02, 0.02, 0.22, 16]} />
          </mesh>
          <mesh position={[0, -2.55, 0]} rotation={[0, 0, 0]} material={materials.accent}>
            <cylinderGeometry args={[0.02, 0.02, 0.22, 16]} />
          </mesh>
        </group>

        {/* Ring 3 - Horizontal Radar Coordinate Ring with Satellite Markers */}
        <group ref={orbitalRing3Ref} position={[0, -0.2, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.1, 0.006, 8, 96]} />
            <meshBasicMaterial
              color={materialTheme === 'crimson' ? '#ff3344' : '#F5F3EE'}
              transparent
              opacity={xRay ? 0.45 : 0.25}
            />
          </mesh>
          {/* North, South, East, West Satellite Ticks */}
          {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.1, 0, Math.sin(angle) * 2.1]}
              material={materials.accent}
            >
              <sphereGeometry args={[0.035, 12, 12]} />
            </mesh>
          ))}
        </group>

        {/* ========================================================
            GARMENT GEOMETRY BASED ON SILHOUETTE (WHEN NOT RINGS ONLY)
            ======================================================== */}
        {!ringsOnly && (
          <>
            {/* ---------------- 1. OVERSIZED HOODIE ---------------- */}
        {silhouette === 'hoodie' && (
          <group position={[0, 0, 0]}>
            {/* Deep Anatomical Cowl Hood */}
            <group ref={hoodRef} position={[0, 1.35, -0.1]}>
              {/* Outer Hood Shell */}
              <mesh material={materials.fabric}>
                <sphereGeometry args={[0.62, 28, 28, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
              </mesh>
              {/* Inner Hood Contrast Lining */}
              <mesh scale={0.96} material={materials.hardware}>
                <sphereGeometry args={[0.62, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
              </mesh>
              {/* Hood Face Rim Opening */}
              <mesh position={[0, -0.12, 0.42]} rotation={[Math.PI * 0.25, 0, 0]} material={materials.hardware}>
                <torusGeometry args={[0.44, 0.04, 16, 32]} />
              </mesh>
              {/* Drawstring Cord Left & Aglet */}
              <mesh position={[-0.15, -0.45, 0.48]} material={materials.hardware}>
                <cylinderGeometry args={[0.015, 0.015, 0.5, 12]} />
              </mesh>
              <mesh position={[-0.15, -0.72, 0.48]} material={materials.accent}>
                <cylinderGeometry args={[0.022, 0.022, 0.12, 16]} />
              </mesh>
              {/* Drawstring Cord Right & Aglet */}
              <mesh position={[0.15, -0.45, 0.48]} material={materials.hardware}>
                <cylinderGeometry args={[0.015, 0.015, 0.5, 12]} />
              </mesh>
              <mesh position={[0.15, -0.72, 0.48]} material={materials.accent}>
                <cylinderGeometry args={[0.022, 0.022, 0.12, 16]} />
              </mesh>
            </group>

            {/* Oversized Boxy Dropped-Shoulder Torso */}
            <mesh position={[0, 0.4, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.98, 0.88, 1.15, 32]} />
            </mesh>
            {/* Abdomen Lower Midsection */}
            <mesh position={[0, -0.35, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.88, 0.85, 0.65, 32]} />
            </mesh>

            {/* Front Kangaroo Pouch Pocket */}
            <group ref={pocketRef} position={[0, -0.32, 0.72]}>
              <mesh material={materials.fabric}>
                <boxGeometry args={[0.86, 0.48, 0.12]} />
              </mesh>
              {/* Kangaroo Pocket Left Slit Trim */}
              <mesh position={[-0.44, 0, 0.02]} rotation={[0, 0, -0.3]} material={materials.hardware}>
                <boxGeometry args={[0.04, 0.36, 0.1]} />
              </mesh>
              {/* Kangaroo Pocket Right Slit Trim */}
              <mesh position={[0.44, 0, 0.02]} rotation={[0, 0, 0.3]} material={materials.hardware}>
                <boxGeometry args={[0.04, 0.36, 0.1]} />
              </mesh>
            </group>

            {/* Minimal Chest VOID.ARCHIVE Metal Plate */}
            <mesh position={[0, 0.58, 0.88]} material={materials.hardware}>
              <boxGeometry args={[0.42, 0.08, 0.02]} />
            </mesh>
            <mesh position={[-0.14, 0.58, 0.89]} material={materials.accent}>
              <boxGeometry args={[0.04, 0.04, 0.02]} />
            </mesh>

            {/* Bottom Ribbed Waistband */}
            <group ref={lowerHemRef} position={[0, -0.9, 0]}>
              <mesh material={materials.fabric}>
                <cylinderGeometry args={[0.82, 0.8, 0.3, 32]} />
              </mesh>
              <mesh position={[0, 0, 0.81]} material={materials.accent}>
                <boxGeometry args={[0.12, 0.05, 0.02]} />
              </mesh>
            </group>

            {/* Left Dropped Sleeve */}
            <group ref={leftSleeveRef} position={[-1.15, 0.28, 0]}>
              {/* Dropped Shoulder */}
              <mesh position={[0.1, 0.42, 0]} rotation={[0, 0, 0.28]} material={materials.fabric}>
                <sphereGeometry args={[0.5, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
              </mesh>
              {/* Bicep Sleeve Drape */}
              <mesh position={[-0.05, 0.02, 0]} rotation={[0, 0, 0.2]} material={materials.fabric}>
                <cylinderGeometry args={[0.38, 0.34, 0.82, 24]} />
              </mesh>
              {/* Forearm Sleeve Drape */}
              <mesh position={[-0.24, -0.74, 0]} rotation={[0, 0, 0.12]} material={materials.fabric}>
                <cylinderGeometry args={[0.33, 0.28, 0.88, 24]} />
              </mesh>
              {/* Ribbed Wrist Cuff */}
              <mesh position={[-0.34, -1.25, 0]} rotation={[0, 0, 0.12]} material={materials.hardware}>
                <cylinderGeometry args={[0.26, 0.24, 0.2, 24]} />
              </mesh>
            </group>

            {/* Right Dropped Sleeve */}
            <group ref={rightSleeveRef} position={[1.15, 0.28, 0]}>
              {/* Dropped Shoulder */}
              <mesh position={[-0.1, 0.42, 0]} rotation={[0, 0, -0.28]} material={materials.fabric}>
                <sphereGeometry args={[0.5, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
              </mesh>
              {/* Bicep Sleeve Drape */}
              <mesh position={[0.05, 0.02, 0]} rotation={[0, 0, -0.2]} material={materials.fabric}>
                <cylinderGeometry args={[0.38, 0.34, 0.82, 24]} />
              </mesh>
              {/* Forearm Sleeve Drape */}
              <mesh position={[0.24, -0.74, 0]} rotation={[0, 0, -0.12]} material={materials.fabric}>
                <cylinderGeometry args={[0.33, 0.28, 0.88, 24]} />
              </mesh>
              {/* Ribbed Wrist Cuff */}
              <mesh position={[0.34, -1.25, 0]} rotation={[0, 0, -0.12]} material={materials.hardware}>
                <cylinderGeometry args={[0.26, 0.24, 0.2, 24]} />
              </mesh>
            </group>
          </group>
        )}

        {/* ---------------- 2. FUTURISTIC TECHNICAL JACKET ---------------- */}
        {silhouette === 'jacket' && (
          <group position={[0, 0, 0]}>
            {/* High Storm Funnel Collar */}
            <group ref={collarRef} position={[0, 1.25, 0]}>
              <mesh material={materials.fabric}>
                <cylinderGeometry args={[0.58, 0.68, 0.55, 32, 1, true]} />
              </mesh>
              {/* Collar throat latch strap */}
              <mesh position={[0, 0.08, 0.62]} material={materials.hardware}>
                <boxGeometry args={[0.4, 0.1, 0.04]} />
              </mesh>
              <mesh position={[0.12, 0.08, 0.65]} material={materials.accent}>
                <boxGeometry args={[0.08, 0.12, 0.02]} />
              </mesh>
            </group>

            {/* Upper Chest Yoke Panel */}
            <mesh position={[0, 0.55, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.96, 0.84, 1.05, 32]} />
            </mesh>

            {/* Asymmetrical Waterproof Zipper Track */}
            <mesh position={[0.08, 0.05, 0.84]} material={materials.hardware}>
              <boxGeometry args={[0.05, 1.8, 0.04]} />
            </mesh>
            {/* Anodized Metal Pull Slider */}
            <mesh position={[0.08, 0.45, 0.88]} material={materials.accent}>
              <boxGeometry args={[0.09, 0.14, 0.05]} />
            </mesh>

            {/* Dual Angled Chest Bellows Pockets */}
            <group ref={pocketRef} position={[0, 0.15, 0.72]}>
              {/* Left Chest Utility Pocket */}
              <mesh position={[-0.42, 0.2, 0.1]} rotation={[0, 0, -0.1]} material={materials.fabric}>
                <boxGeometry args={[0.34, 0.42, 0.08]} />
              </mesh>
              <mesh position={[-0.42, 0.42, 0.12]} rotation={[0, 0, -0.1]} material={materials.hardware}>
                <boxGeometry args={[0.36, 0.06, 0.05]} />
              </mesh>
              {/* Right Chest Flap Pocket */}
              <mesh position={[0.42, -0.05, 0.1]} rotation={[0, 0, 0.08]} material={materials.fabric}>
                <boxGeometry args={[0.32, 0.38, 0.08]} />
              </mesh>
            </group>

            {/* Abdomen & Bottom Hem */}
            <mesh position={[0, -0.38, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.84, 0.88, 0.8, 32]} />
            </mesh>
            <group ref={lowerHemRef} position={[0, -0.85, 0]}>
              <mesh material={materials.hardware}>
                <cylinderGeometry args={[0.88, 0.86, 0.14, 32]} />
              </mesh>
              {/* Cinch toggles */}
              <mesh position={[-0.8, 0, 0.1]} material={materials.accent}>
                <sphereGeometry args={[0.05, 12, 12]} />
              </mesh>
              <mesh position={[0.8, 0, 0.1]} material={materials.accent}>
                <sphereGeometry args={[0.05, 12, 12]} />
              </mesh>
            </group>

            {/* Left Articulated Sleeve */}
            <group ref={leftSleeveRef} position={[-1.2, 0.3, 0]}>
              <mesh position={[0.12, 0.5, 0]} rotation={[0, 0, 0.25]} material={materials.fabric}>
                <sphereGeometry args={[0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
              </mesh>
              <mesh position={[-0.04, 0.08, 0]} rotation={[0, 0, 0.2]} material={materials.fabric}>
                <cylinderGeometry args={[0.38, 0.33, 0.85, 24]} />
              </mesh>
              {/* Elbow Articulation Band */}
              <mesh position={[-0.18, -0.38, 0]} rotation={[0, 0, 0.2]} material={materials.hardware}>
                <torusGeometry args={[0.33, 0.04, 16, 32]} />
              </mesh>
              <mesh position={[-0.3, -0.88, 0]} rotation={[0, 0, 0.14]} material={materials.fabric}>
                <cylinderGeometry args={[0.32, 0.26, 0.88, 24]} />
              </mesh>
              {/* Sleeve Utility Zip */}
              <mesh position={[-0.45, -0.7, 0.1]} rotation={[0, 0, 0.14]} material={materials.accent}>
                <boxGeometry args={[0.05, 0.28, 0.1]} />
              </mesh>
              <mesh position={[-0.38, -1.35, 0]} rotation={[0, 0, 0.14]} material={materials.hardware}>
                <cylinderGeometry args={[0.26, 0.28, 0.12, 24]} />
              </mesh>
            </group>

            {/* Right Articulated Sleeve */}
            <group ref={rightSleeveRef} position={[1.2, 0.3, 0]}>
              <mesh position={[-0.12, 0.5, 0]} rotation={[0, 0, -0.25]} material={materials.fabric}>
                <sphereGeometry args={[0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
              </mesh>
              <mesh position={[0.04, 0.08, 0]} rotation={[0, 0, -0.2]} material={materials.fabric}>
                <cylinderGeometry args={[0.38, 0.33, 0.85, 24]} />
              </mesh>
              {/* Elbow Articulation Band */}
              <mesh position={[0.18, -0.38, 0]} rotation={[0, 0, -0.2]} material={materials.hardware}>
                <torusGeometry args={[0.33, 0.04, 16, 32]} />
              </mesh>
              <mesh position={[0.3, -0.88, 0]} rotation={[0, 0, -0.14]} material={materials.fabric}>
                <cylinderGeometry args={[0.32, 0.26, 0.88, 24]} />
              </mesh>
              <mesh position={[0.38, -1.35, 0]} rotation={[0, 0, -0.14]} material={materials.hardware}>
                <cylinderGeometry args={[0.26, 0.28, 0.12, 24]} />
              </mesh>
            </group>
          </group>
        )}

        {/* ---------------- 3. STREETWEAR TRENCH / COAT ---------------- */}
        {silhouette === 'coat' && (
          <group position={[0, 0.2, 0]}>
            {/* High Architectural Lapel Collar */}
            <group ref={collarRef} position={[0, 1.25, 0]}>
              <mesh material={materials.fabric}>
                <cylinderGeometry args={[0.6, 0.72, 0.5, 32, 1, true]} />
              </mesh>
              {/* Lapel fold tabs */}
              <mesh position={[-0.22, -0.15, 0.62]} rotation={[0.2, 0.3, -0.2]} material={materials.hardware}>
                <boxGeometry args={[0.24, 0.4, 0.03]} />
              </mesh>
              <mesh position={[0.22, -0.15, 0.62]} rotation={[0.2, -0.3, 0.2]} material={materials.hardware}>
                <boxGeometry args={[0.24, 0.4, 0.03]} />
              </mesh>
            </group>

            {/* Torso Top */}
            <mesh position={[0, 0.6, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.95, 0.86, 0.95, 32]} />
            </mesh>

            {/* Storm Flap Shield on Right Chest */}
            <mesh position={[0.28, 0.65, 0.82]} rotation={[0, 0, 0.05]} material={materials.hardware}>
              <boxGeometry args={[0.48, 0.58, 0.04]} />
            </mesh>

            {/* Waist Cinch Belt with Quick-Release Buckle */}
            <group ref={pocketRef} position={[0, 0.05, 0]}>
              <mesh material={materials.hardware}>
                <cylinderGeometry args={[0.87, 0.87, 0.14, 32]} />
              </mesh>
              {/* Fidlock Metal Buckle */}
              <mesh position={[0, 0, 0.9]} material={materials.accent}>
                <boxGeometry args={[0.22, 0.16, 0.06]} />
              </mesh>
              {/* Hanging Webbing Strap */}
              <mesh position={[0.08, -0.32, 0.92]} material={materials.hardware}>
                <boxGeometry args={[0.08, 0.5, 0.02]} />
              </mesh>
            </group>

            {/* Elongated Flared Trench Skirt */}
            <group ref={lowerHemRef} position={[0, -0.9, 0]}>
              <mesh material={materials.fabric}>
                <cylinderGeometry args={[0.88, 1.15, 1.6, 32, 1, true]} />
              </mesh>
              {/* Center Front Split Hem */}
              <mesh position={[0, 0, 0.95]} material={materials.hardware}>
                <boxGeometry args={[0.04, 1.58, 0.04]} />
              </mesh>
            </group>

            {/* Sleeves */}
            <group ref={leftSleeveRef} position={[-1.2, 0.35, 0]}>
              <mesh position={[0, 0, 0]} rotation={[0, 0, 0.18]} material={materials.fabric}>
                <cylinderGeometry args={[0.38, 0.28, 1.8, 24]} />
              </mesh>
              {/* Cuff buckle */}
              <mesh position={[-0.2, -0.85, 0]} material={materials.hardware}>
                <torusGeometry args={[0.3, 0.03, 16, 32]} />
              </mesh>
            </group>

            <group ref={rightSleeveRef} position={[1.2, 0.35, 0]}>
              <mesh position={[0, 0, 0]} rotation={[0, 0, -0.18]} material={materials.fabric}>
                <cylinderGeometry args={[0.38, 0.28, 1.8, 24]} />
              </mesh>
              {/* Cuff buckle */}
              <mesh position={[0.2, -0.85, 0]} material={materials.hardware}>
                <torusGeometry args={[0.3, 0.03, 16, 32]} />
              </mesh>
            </group>
          </group>
        )}

        {/* ---------------- 4. TECHWEAR CARGO PANTS ---------------- */}
        {silhouette === 'pants' && (
          <group position={[0, 0.4, 0]}>
            {/* Fitted Anatomical Waistband */}
            <group ref={collarRef} position={[0, 0.8, 0]}>
              <mesh material={materials.fabric}>
                <cylinderGeometry args={[0.78, 0.8, 0.28, 32]} />
              </mesh>
              {/* Front Tactical Buckle */}
              <mesh position={[0, 0, 0.82]} material={materials.accent}>
                <boxGeometry args={[0.18, 0.12, 0.05]} />
              </mesh>
              {/* Belt loops */}
              {[-0.4, -0.18, 0.18, 0.4].map((pos, i) => (
                <mesh key={i} position={[pos, 0, 0.81]} material={materials.hardware}>
                  <boxGeometry args={[0.04, 0.24, 0.02]} />
                </mesh>
              ))}
            </group>

            {/* Upper Hip & Crotch Gusset */}
            <mesh position={[0, 0.42, 0]} material={materials.fabric}>
              <cylinderGeometry args={[0.8, 0.74, 0.52, 32]} />
            </mesh>

            {/* Left Leg */}
            <group ref={leftLegRef} position={[-0.42, -0.3, 0]}>
              {/* Thigh */}
              <mesh position={[0, 0.15, 0]} rotation={[0, 0, -0.04]} material={materials.fabric}>
                <cylinderGeometry args={[0.36, 0.3, 0.85, 24]} />
              </mesh>
              {/* 3D Gusseted Cargo Bellows Pocket */}
              <group ref={pocketRef} position={[-0.32, 0.1, 0.05]}>
                <mesh material={materials.fabric}>
                  <boxGeometry args={[0.14, 0.42, 0.34]} />
                </mesh>
                {/* Flap Closure */}
                <mesh position={[0, 0.2, 0]} material={materials.hardware}>
                  <boxGeometry args={[0.16, 0.06, 0.36]} />
                </mesh>
                {/* Tactical pull strap */}
                <mesh position={[-0.08, 0.05, 0]} material={materials.accent}>
                  <boxGeometry args={[0.02, 0.22, 0.08]} />
                </mesh>
              </group>
              {/* Pre-shaped Knee Darts */}
              <mesh position={[0, -0.35, 0.04]} rotation={[0.12, 0, 0]} material={materials.hardware}>
                <boxGeometry args={[0.26, 0.2, 0.04]} />
              </mesh>
              {/* Tapered Calf */}
              <mesh position={[0, -0.85, 0]} material={materials.fabric}>
                <cylinderGeometry args={[0.28, 0.2, 0.85, 24]} />
              </mesh>
              {/* Ankle Gathered Cuff */}
              <mesh position={[0, -1.3, 0]} material={materials.hardware}>
                <cylinderGeometry args={[0.2, 0.22, 0.12, 24]} />
              </mesh>
            </group>

            {/* Right Leg */}
            <group ref={rightLegRef} position={[0.42, -0.3, 0]}>
              {/* Thigh */}
              <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0.04]} material={materials.fabric}>
                <cylinderGeometry args={[0.36, 0.3, 0.85, 24]} />
              </mesh>
              {/* 3D Gusseted Cargo Bellows Pocket */}
              <group position={[0.32, 0.1, 0.05]}>
                <mesh material={materials.fabric}>
                  <boxGeometry args={[0.14, 0.42, 0.34]} />
                </mesh>
                {/* Flap Closure */}
                <mesh position={[0, 0.2, 0]} material={materials.hardware}>
                  <boxGeometry args={[0.16, 0.06, 0.36]} />
                </mesh>
                {/* Tactical pull strap */}
                <mesh position={[0.08, 0.05, 0]} material={materials.accent}>
                  <boxGeometry args={[0.02, 0.22, 0.08]} />
                </mesh>
              </group>
              {/* Pre-shaped Knee Darts */}
              <mesh position={[0, -0.35, 0.04]} rotation={[0.12, 0, 0]} material={materials.hardware}>
                <boxGeometry args={[0.26, 0.2, 0.04]} />
              </mesh>
              {/* Tapered Calf */}
              <mesh position={[0, -0.85, 0]} material={materials.fabric}>
                <cylinderGeometry args={[0.28, 0.2, 0.85, 24]} />
              </mesh>
              {/* Ankle Gathered Cuff */}
              <mesh position={[0, -1.3, 0]} material={materials.hardware}>
                <cylinderGeometry args={[0.2, 0.22, 0.12, 24]} />
              </mesh>
            </group>
          </group>
        )}
        </>
        )}

        {/* Base Pedestal Marker Ring */}
        <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.25, 1.28, 48]} />
          <meshBasicMaterial
            color={materialTheme === 'crimson' ? '#ff3344' : '#F5F3EE'}
            opacity={xRay ? 0.5 : 0.3}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
};

