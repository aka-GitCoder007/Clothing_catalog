import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export interface Garment3DProps {
  materialTheme?: 'obsidian' | 'chrome' | 'crimson' | 'bone';
  wireframe?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
}

export const TechnicalJacket3D: React.FC<Garment3DProps> = ({
  materialTheme = 'obsidian',
  wireframe = false,
  exploded = false,
  autoRotate = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const collarRef = useRef<THREE.Group>(null);
  const hudRing1Ref = useRef<THREE.Mesh>(null);
  const hudRing2Ref = useRef<THREE.Mesh>(null);

  // Material configurations
  const materials = useMemo(() => {
    let mainColor = '#121212';
    let roughness = 0.35;
    let metalness = 0.15;
    let clearcoat = 0.4;

    if (materialTheme === 'chrome') {
      mainColor = '#e5e7eb';
      roughness = 0.1;
      metalness = 0.95;
      clearcoat = 0.9;
    } else if (materialTheme === 'crimson') {
      mainColor = '#4a080d';
      roughness = 0.4;
      metalness = 0.3;
      clearcoat = 0.6;
    } else if (materialTheme === 'bone') {
      mainColor = '#DDD8CB';
      roughness = 0.55;
      metalness = 0.05;
      clearcoat = 0.1;
    }

    const fabric = new THREE.MeshStandardMaterial({
      color: new THREE.Color(mainColor),
      roughness,
      metalness,
      wireframe,
      flatShading: false,
    });

    const hardware = new THREE.MeshStandardMaterial({
      color: new THREE.Color(materialTheme === 'bone' ? '#111111' : '#9ca3af'),
      roughness: 0.15,
      metalness: 0.85,
      wireframe,
    });

    const accent = new THREE.MeshStandardMaterial({
      color: new THREE.Color(materialTheme === 'crimson' ? '#ff3344' : '#9E1B22'),
      emissive: new THREE.Color(materialTheme === 'crimson' ? '#ff1122' : '#9E1B22'),
      emissiveIntensity: 0.4,
      roughness: 0.2,
      wireframe,
    });

    return { fabric, hardware, accent };
  }, [materialTheme, wireframe]);

  // Animation frame loop
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }

    // Floating HUD ring rotations
    if (hudRing1Ref.current) {
      hudRing1Ref.current.rotation.z += delta * 0.2;
      hudRing1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (hudRing2Ref.current) {
      hudRing2Ref.current.rotation.z -= delta * 0.15;
      hudRing2Ref.current.rotation.y += delta * 0.1;
    }

    // Exploded chassis animation lerp
    const explodeTarget = exploded ? 0.35 : 0;
    if (leftArmRef.current) {
      leftArmRef.current.position.x = THREE.MathUtils.lerp(
        leftArmRef.current.position.x,
        -1.3 - explodeTarget,
        delta * 6
      );
    }
    if (rightArmRef.current) {
      rightArmRef.current.position.x = THREE.MathUtils.lerp(
        rightArmRef.current.position.x,
        1.3 + explodeTarget,
        delta * 6
      );
    }
    if (collarRef.current) {
      collarRef.current.position.y = THREE.MathUtils.lerp(
        collarRef.current.position.y,
        1.35 + (exploded ? 0.25 : 0),
        delta * 6
      );
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, -0.2, 0]} scale={1.25}>
        {/* ================= TORSO CORE ================= */}
        {/* Main upper chest taper */}
        <mesh position={[0, 0.45, 0]} material={materials.fabric}>
          <cylinderGeometry args={[0.95, 0.82, 1.1, 32, 1]} />
        </mesh>

        {/* Lower torso abdomen */}
        <mesh position={[0, -0.45, 0]} material={materials.fabric}>
          <cylinderGeometry args={[0.82, 0.9, 0.75, 32, 1]} />
        </mesh>

        {/* Back Armor / Spine Plates */}
        <mesh position={[0, 0.15, -0.72]} rotation={[0.05, 0, 0]} material={materials.hardware}>
          <boxGeometry args={[0.28, 1.4, 0.08]} />
        </mesh>
        <mesh position={[0, 0.5, -0.74]} material={materials.accent}>
          <boxGeometry args={[0.12, 0.2, 0.04]} />
        </mesh>

        {/* Tactical Storm Flap & Asymmetric RiRi Zip Line */}
        <mesh position={[0.08, 0, 0.84]} material={materials.hardware}>
          <boxGeometry args={[0.06, 1.7, 0.04]} />
        </mesh>
        <mesh position={[-0.08, 0, 0.83]} material={materials.fabric}>
          <boxGeometry args={[0.2, 1.7, 0.02]} />
        </mesh>
        {/* Magnetic Zipper Slider */}
        <mesh position={[0.08, 0.35, 0.87]} material={materials.accent}>
          <boxGeometry args={[0.1, 0.15, 0.05]} />
        </mesh>

        {/* ================= HIGH BALLISTIC COLLAR ================= */}
        <group ref={collarRef} position={[0, 1.35, 0]}>
          <mesh material={materials.fabric}>
            <cylinderGeometry args={[0.62, 0.72, 0.65, 32, 1, true]} />
          </mesh>
          {/* Collar throat latch strap */}
          <mesh position={[0, 0.05, 0.65]} material={materials.hardware}>
            <boxGeometry args={[0.42, 0.12, 0.04]} />
          </mesh>
          <mesh position={[0.12, 0.05, 0.68]} material={materials.accent}>
            <boxGeometry args={[0.08, 0.14, 0.03]} />
          </mesh>
        </group>

        {/* ================= LEFT ARM & SLEEVE ================= */}
        <group ref={leftArmRef} position={[-1.3, 0.25, 0]}>
          {/* Shoulder Cap */}
          <mesh position={[0.15, 0.55, 0]} rotation={[0, 0, 0.25]} material={materials.fabric}>
            <sphereGeometry args={[0.55, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          </mesh>
          {/* Bicep Segment */}
          <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0.22]} material={materials.fabric}>
            <cylinderGeometry args={[0.4, 0.34, 0.85, 24]} />
          </mesh>
          {/* Articulated Ballistic Elbow Ring */}
          <mesh position={[-0.15, -0.38, 0]} rotation={[0, 0, 0.22]} material={materials.hardware}>
            <torusGeometry args={[0.34, 0.05, 16, 32]} />
          </mesh>
          {/* Forearm Segment */}
          <mesh position={[-0.28, -0.9, 0]} rotation={[0, 0, 0.15]} material={materials.fabric}>
            <cylinderGeometry args={[0.32, 0.27, 0.9, 24]} />
          </mesh>
          {/* Utility Sleeve Pocket */}
          <mesh position={[-0.45, -0.7, 0.1]} rotation={[0, 0, 0.15]} material={materials.hardware}>
            <boxGeometry args={[0.1, 0.35, 0.22]} />
          </mesh>
          {/* Anodized Cuff Band */}
          <mesh position={[-0.37, -1.35, 0]} rotation={[0, 0, 0.15]} material={materials.accent}>
            <cylinderGeometry args={[0.26, 0.28, 0.1, 24]} />
          </mesh>
        </group>

        {/* ================= RIGHT ARM & SLEEVE ================= */}
        <group ref={rightArmRef} position={[1.3, 0.25, 0]}>
          {/* Shoulder Cap */}
          <mesh position={[-0.15, 0.55, 0]} rotation={[0, 0, -0.25]} material={materials.fabric}>
            <sphereGeometry args={[0.55, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          </mesh>
          {/* Bicep Segment */}
          <mesh position={[0, 0.1, 0]} rotation={[0, 0, -0.22]} material={materials.fabric}>
            <cylinderGeometry args={[0.4, 0.34, 0.85, 24]} />
          </mesh>
          {/* Articulated Ballistic Elbow Ring */}
          <mesh position={[0.15, -0.38, 0]} rotation={[0, 0, -0.22]} material={materials.hardware}>
            <torusGeometry args={[0.34, 0.05, 16, 32]} />
          </mesh>
          {/* Forearm Segment */}
          <mesh position={[0.28, -0.9, 0]} rotation={[0, 0, -0.15]} material={materials.fabric}>
            <cylinderGeometry args={[0.32, 0.27, 0.9, 24]} />
          </mesh>
          {/* Anodized Cuff Band */}
          <mesh position={[0.37, -1.35, 0]} rotation={[0, 0, -0.15]} material={materials.accent}>
            <cylinderGeometry args={[0.26, 0.28, 0.1, 24]} />
          </mesh>
        </group>

        {/* ================= CHEST HARNESS STRAPS (FIDLOCK®) ================= */}
        {/* Diagonal Cross Webbing */}
        <mesh position={[-0.1, 0.5, 0.85]} rotation={[0, 0, -0.6]} material={materials.hardware}>
          <boxGeometry args={[0.08, 0.9, 0.02]} />
        </mesh>
        {/* Fidlock Magnetic Buckle on Chest */}
        <mesh position={[-0.28, 0.45, 0.87]} material={materials.hardware}>
          <boxGeometry args={[0.24, 0.16, 0.06]} />
        </mesh>
        <mesh position={[-0.28, 0.45, 0.91]} material={materials.accent}>
          <boxGeometry args={[0.08, 0.08, 0.04]} />
        </mesh>

        {/* ================= HOLOGRAPHIC HUD RINGS ================= */}
        {/* Ring 1 - Horizontal Orbit */}
        <mesh ref={hudRing1Ref} position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.0, 0.008, 8, 64]} />
          <meshBasicMaterial color="#ffffff" opacity={0.35} transparent wireframe />
        </mesh>

        {/* Ring 2 - Angled Pitch Orbit */}
        <mesh ref={hudRing2Ref} position={[0, 0.1, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.006, 8, 64]} />
          <meshBasicMaterial color={materialTheme === 'crimson' ? '#ff3344' : '#F5F3EE'} opacity={0.2} transparent wireframe />
        </mesh>

        {/* Base Pedestal Marker Brackets */}
        <mesh position={[0, -1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.24, 32]} />
          <meshBasicMaterial color={materialTheme === 'crimson' ? '#ff3344' : '#F5F3EE'} opacity={0.4} transparent side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -1.35, 1.22]} material={materials.accent}>
          <boxGeometry args={[0.16, 0.04, 0.04]} />
        </mesh>
        <mesh position={[0, -1.35, -1.22]} material={materials.accent}>
          <boxGeometry args={[0.16, 0.04, 0.04]} />
        </mesh>
      </group>
    </Float>
  );
};

