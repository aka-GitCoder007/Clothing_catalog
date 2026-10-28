/**
 * Standalone Generator Script to create a genuine 3D Spider Tech Hoodie model
 * and export it directly as a spec-compliant binary GLB to:
 * public/assets/models/void-archive-spider-hoodie.glb
 */

import fs from 'fs';
import path from 'path';

// Polyfill FileReader for Node.js GLTFExporter
global.FileReader = class FileReader {
  async readAsArrayBuffer(blob) {
    const buf = await blob.arrayBuffer();
    this.result = buf;
    setTimeout(() => {
      if (this.onloadend) this.onloadend({ target: this });
    }, 10);
  }
};

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const OUTPUT_DIR = path.resolve('public/assets/models');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'void-archive-spider-hoodie.glb');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const rootGroup = new THREE.Group();
rootGroup.name = 'SpiderTechHoodie_Root';

// ==========================================
// PBR MATERIALS
// ==========================================
const blackFabric = new THREE.MeshStandardMaterial({
  name: 'Mat_BlackFabric',
  color: new THREE.Color('#0d0e12'),
  roughness: 0.58,
  metalness: 0.1,
  flatShading: false,
});

const innerHoodDark = new THREE.MeshStandardMaterial({
  name: 'Mat_InnerHoodCavity',
  color: new THREE.Color('#040406'),
  roughness: 0.7,
  metalness: 0.05,
  side: THREE.BackSide,
});

const ribbedTrim = new THREE.MeshStandardMaterial({
  name: 'Mat_RibbedTrim',
  color: new THREE.Color('#14151a'),
  roughness: 0.75,
  metalness: 0.05,
});

const crimsonGraphic = new THREE.MeshStandardMaterial({
  name: 'Mat_CrimsonGraphic',
  color: new THREE.Color('#c91424'),
  emissive: new THREE.Color('#55070e'),
  emissiveIntensity: 0.35,
  roughness: 0.35,
  metalness: 0.25,
});

const crimsonTrim = new THREE.MeshStandardMaterial({
  name: 'Mat_CrimsonTrim',
  color: new THREE.Color('#e01b2d'),
  emissive: new THREE.Color('#660911'),
  emissiveIntensity: 0.45,
  roughness: 0.28,
  metalness: 0.3,
});

const chromeAglets = new THREE.MeshStandardMaterial({
  name: 'Mat_ChromeHardware',
  color: new THREE.Color('#f2f4f8'),
  roughness: 0.1,
  metalness: 0.95,
});

// ==========================================
// 1. TORSO & CORE CHASSIS (Oversized Streetwear Body)
// ==========================================
const torsoGroup = new THREE.Group();
torsoGroup.name = 'Torso';

// Upper chest (tapered cylinder with organic volume)
const upperChestGeom = new THREE.CylinderGeometry(0.96, 0.88, 1.15, 36);
const upperChest = new THREE.Mesh(upperChestGeom, blackFabric);
upperChest.position.set(0, 0.38, 0);
torsoGroup.add(upperChest);

// Lower abdomen
const abdomenGeom = new THREE.CylinderGeometry(0.88, 0.84, 0.68, 36);
const abdomen = new THREE.Mesh(abdomenGeom, blackFabric);
abdomen.position.set(0, -0.38, 0);
torsoGroup.add(abdomen);

// Chest front contour panel (gives thickness and forward drape)
const chestPlateGeom = new THREE.BoxGeometry(1.42, 1.0, 0.25);
const chestPlate = new THREE.Mesh(chestPlateGeom, blackFabric);
chestPlate.position.set(0, 0.35, 0.32);
torsoGroup.add(chestPlate);

// Back shoulder yoke panel
const backYokeGeom = new THREE.BoxGeometry(1.46, 0.9, 0.22);
const backYoke = new THREE.Mesh(backYokeGeom, blackFabric);
backYoke.position.set(0, 0.4, -0.32);
torsoGroup.add(backYoke);

rootGroup.add(torsoGroup);

// ==========================================
// 2. KANGAROO FRONT POUCH POCKET
// ==========================================
const pocketGroup = new THREE.Group();
pocketGroup.name = 'KangarooPocket';

// Main pouch body
const pocketGeom = new THREE.BoxGeometry(0.92, 0.52, 0.15);
const pocket = new THREE.Mesh(pocketGeom, blackFabric);
pocket.position.set(0, -0.32, 0.48);
pocketGroup.add(pocket);

// Left angled entrance slit with crimson piping
const leftPipingGeom = new THREE.BoxGeometry(0.04, 0.42, 0.16);
const leftPiping = new THREE.Mesh(leftPipingGeom, crimsonTrim);
leftPiping.position.set(-0.48, -0.32, 0.48);
leftPiping.rotation.set(0, 0, -0.28);
pocketGroup.add(leftPiping);

// Right angled entrance slit with crimson piping
const rightPipingGeom = new THREE.BoxGeometry(0.04, 0.42, 0.16);
const rightPiping = new THREE.Mesh(rightPipingGeom, crimsonTrim);
rightPiping.position.set(0.48, -0.32, 0.48);
rightPiping.rotation.set(0, 0, 0.28);
pocketGroup.add(rightPiping);

rootGroup.add(pocketGroup);

// ==========================================
// 3. BOTTOM RIBBED HEM WAISTBAND
// ==========================================
const hemGroup = new THREE.Group();
hemGroup.name = 'RibbedHem';

const hemGeom = new THREE.CylinderGeometry(0.83, 0.80, 0.3, 36);
const hem = new THREE.Mesh(hemGeom, ribbedTrim);
hem.position.set(0, -0.85, 0);
hemGroup.add(hem);

// Center hem logo tag
const hemTagGeom = new THREE.BoxGeometry(0.14, 0.06, 0.02);
const hemTag = new THREE.Mesh(hemTagGeom, crimsonTrim);
hemTag.position.set(0, -0.85, 0.82);
hemGroup.add(hemTag);

rootGroup.add(hemGroup);

// ==========================================
// 4. THREE-DIMENSIONAL COWL HOOD (With Visible Hollow Opening)
// ==========================================
const hoodGroup = new THREE.Group();
hoodGroup.name = 'Hood';

// Outer hood dome (sculpted curved dome curving over the head)
const outerHoodGeom = new THREE.SphereGeometry(0.66, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.74);
const outerHood = new THREE.Mesh(outerHoodGeom, blackFabric);
outerHood.position.set(0, 1.34, -0.08);
outerHood.rotation.set(-0.1, 0, 0);
hoodGroup.add(outerHood);

// Deep dark inner hood cavity (visible opening into the hood interior)
const innerHoodGeom = new THREE.SphereGeometry(0.62, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.74);
const innerHood = new THREE.Mesh(innerHoodGeom, innerHoodDark);
innerHood.position.set(0, 1.34, -0.08);
innerHood.rotation.set(-0.1, 0, 0);
hoodGroup.add(innerHood);

// Crimson Face Rim Opening Border (Iconic red rim trim around the hood opening!)
const hoodRimGeom = new THREE.TorusGeometry(0.46, 0.038, 16, 48);
const hoodRim = new THREE.Mesh(hoodRimGeom, crimsonTrim);
hoodRim.position.set(0, 1.25, 0.38);
hoodRim.rotation.set(Math.PI * 0.24, 0, 0);
hoodGroup.add(hoodRim);

// Neck Cowl Wrap (Transition between hood base and torso collar)
const neckWrapGeom = new THREE.CylinderGeometry(0.62, 0.74, 0.42, 32, 1, true);
const neckWrap = new THREE.Mesh(neckWrapGeom, blackFabric);
neckWrap.position.set(0, 1.05, 0.05);
hoodGroup.add(neckWrap);

// Hanging Drawstrings with Chrome Aglets (Left & Right)
// Left cord
const leftCordGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.58, 12);
const leftCord = new THREE.Mesh(leftCordGeom, ribbedTrim);
leftCord.position.set(-0.16, 0.68, 0.52);
hoodGroup.add(leftCord);

// Left chrome aglet tip
const leftAgletGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.12, 16);
const leftAglet = new THREE.Mesh(leftAgletGeom, chromeAglets);
leftAglet.position.set(-0.16, 0.36, 0.52);
hoodGroup.add(leftAglet);

// Right cord
const rightCordGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.58, 12);
const rightCord = new THREE.Mesh(rightCordGeom, ribbedTrim);
rightCord.position.set(0.16, 0.68, 0.52);
hoodGroup.add(rightCord);

// Right chrome aglet tip
const rightAgletGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.12, 16);
const rightAglet = new THREE.Mesh(rightAgletGeom, chromeAglets);
rightAglet.position.set(0.16, 0.36, 0.52);
hoodGroup.add(rightAglet);

rootGroup.add(hoodGroup);

// ==========================================
// 5. SEPARATE ARTICULATED SLEEVES & RED WEB DETAILS
// ==========================================
// LEFT SLEEVE
const leftSleeveGroup = new THREE.Group();
leftSleeveGroup.name = 'LeftSleeve';

// Dropped shoulder cap
const leftShoulderGeom = new THREE.SphereGeometry(0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6);
const leftShoulder = new THREE.Mesh(leftShoulderGeom, blackFabric);
leftShoulder.position.set(0.12, 0.44, 0);
leftShoulder.rotation.set(0, 0, 0.28);
leftSleeveGroup.add(leftShoulder);

// Upper arm bicep drape
const leftBicepGeom = new THREE.CylinderGeometry(0.38, 0.33, 0.85, 24);
const leftBicep = new THREE.Mesh(leftBicepGeom, blackFabric);
leftBicep.position.set(-0.06, 0.04, 0);
leftBicep.rotation.set(0, 0, 0.22);
leftSleeveGroup.add(leftBicep);

// Red geometric web panel on left shoulder/upper arm
const leftRedYokeGeom = new THREE.BoxGeometry(0.18, 0.62, 0.38);
const leftRedYoke = new THREE.Mesh(leftRedYokeGeom, crimsonGraphic);
leftRedYoke.position.set(-0.08, 0.22, 0);
leftRedYoke.rotation.set(0, 0, 0.22);
leftSleeveGroup.add(leftRedYoke);

// Forearm segment
const leftForearmGeom = new THREE.CylinderGeometry(0.33, 0.27, 0.9, 24);
const leftForearm = new THREE.Mesh(leftForearmGeom, blackFabric);
leftForearm.position.set(-0.25, -0.74, 0);
leftForearm.rotation.set(0, 0, 0.14);
leftSleeveGroup.add(leftForearm);

// Red sleeve web graphic chevron stripes (outer forearm)
for (let i = 0; i < 3; i++) {
  const stripeGeom = new THREE.BoxGeometry(0.06, 0.12, 0.26);
  const stripe = new THREE.Mesh(stripeGeom, crimsonGraphic);
  stripe.position.set(-0.45 - i * 0.04, -0.5 - i * 0.22, 0);
  stripe.rotation.set(0, 0, 0.14);
  leftSleeveGroup.add(stripe);
}

// Ribbed wrist cuff
const leftCuffGeom = new THREE.CylinderGeometry(0.26, 0.24, 0.22, 24);
const leftCuff = new THREE.Mesh(leftCuffGeom, ribbedTrim);
leftCuff.position.set(-0.36, -1.26, 0);
leftCuff.rotation.set(0, 0, 0.14);
leftSleeveGroup.add(leftCuff);

leftSleeveGroup.position.set(-1.18, 0.25, 0);
rootGroup.add(leftSleeveGroup);

// RIGHT SLEEVE
const rightSleeveGroup = new THREE.Group();
rightSleeveGroup.name = 'RightSleeve';

// Dropped shoulder cap
const rightShoulderGeom = new THREE.SphereGeometry(0.52, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6);
const rightShoulder = new THREE.Mesh(rightShoulderGeom, blackFabric);
rightShoulder.position.set(-0.12, 0.44, 0);
rightShoulder.rotation.set(0, 0, -0.28);
rightSleeveGroup.add(rightShoulder);

// Upper arm bicep drape
const rightBicepGeom = new THREE.CylinderGeometry(0.38, 0.33, 0.85, 24);
const rightBicep = new THREE.Mesh(rightBicepGeom, blackFabric);
rightBicep.position.set(0.06, 0.04, 0);
rightBicep.rotation.set(0, 0, -0.22);
rightSleeveGroup.add(rightBicep);

// Red geometric web panel on right shoulder/upper arm
const rightRedYokeGeom = new THREE.BoxGeometry(0.18, 0.62, 0.38);
const rightRedYoke = new THREE.Mesh(rightRedYokeGeom, crimsonGraphic);
rightRedYoke.position.set(0.08, 0.22, 0);
rightRedYoke.rotation.set(0, 0, -0.22);
rightSleeveGroup.add(rightRedYoke);

// Forearm segment
const rightForearmGeom = new THREE.CylinderGeometry(0.33, 0.27, 0.9, 24);
const rightForearm = new THREE.Mesh(rightForearmGeom, blackFabric);
rightForearm.position.set(0.25, -0.74, 0);
rightForearm.rotation.set(0, 0, -0.14);
rightSleeveGroup.add(rightForearm);

// Red sleeve web graphic chevron stripes (outer forearm)
for (let i = 0; i < 3; i++) {
  const stripeGeom = new THREE.BoxGeometry(0.06, 0.12, 0.26);
  const stripe = new THREE.Mesh(stripeGeom, crimsonGraphic);
  stripe.position.set(0.45 + i * 0.04, -0.5 - i * 0.22, 0);
  stripe.rotation.set(0, 0, -0.14);
  rightSleeveGroup.add(stripe);
}

// Ribbed wrist cuff
const rightCuffGeom = new THREE.CylinderGeometry(0.26, 0.24, 0.22, 24);
const rightCuff = new THREE.Mesh(rightCuffGeom, ribbedTrim);
rightCuff.position.set(0.36, -1.26, 0);
rightCuff.rotation.set(0, 0, -0.14);
rightSleeveGroup.add(rightCuff);

rightSleeveGroup.position.set(1.18, 0.25, 0);
rootGroup.add(rightSleeveGroup);

// ==========================================
// 6. ORIGINAL CRIMSON SPIDER CHEST EMBLEM
// ==========================================
const spiderChestGroup = new THREE.Group();
spiderChestGroup.name = 'SpiderChestEmblem';

// Central spider cephalothorax body
const spiderBodyGeom = new THREE.ConeGeometry(0.14, 0.52, 16);
const spiderBody = new THREE.Mesh(spiderBodyGeom, crimsonGraphic);
spiderBody.position.set(0, 0.22, 0.48);
spiderBody.rotation.set(Math.PI, 0, 0);
spiderChestGroup.add(spiderBody);

// Spider head / carapace diamond
const spiderHeadGeom = new THREE.OctahedronGeometry(0.11, 0);
const spiderHead = new THREE.Mesh(spiderHeadGeom, crimsonGraphic);
spiderHead.position.set(0, 0.44, 0.48);
spiderChestGroup.add(spiderHead);

// Radiating spider leg segments (8 legs radiating dynamically)
// Left upper leg 1
const lLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.035, 0.04), crimsonGraphic);
lLeg1.position.set(-0.24, 0.46, 0.48);
lLeg1.rotation.set(0, 0, 0.42);
spiderChestGroup.add(lLeg1);

// Right upper leg 1
const rLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.035, 0.04), crimsonGraphic);
rLeg1.position.set(0.24, 0.46, 0.48);
rLeg1.rotation.set(0, 0, -0.42);
spiderChestGroup.add(rLeg1);

// Left middle leg 2
const lLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.032, 0.04), crimsonGraphic);
lLeg2.position.set(-0.28, 0.32, 0.48);
lLeg2.rotation.set(0, 0, 0.12);
spiderChestGroup.add(lLeg2);

// Right middle leg 2
const rLeg2 = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.032, 0.04), crimsonGraphic);
rLeg2.position.set(0.28, 0.32, 0.48);
rLeg2.rotation.set(0, 0, -0.12);
spiderChestGroup.add(rLeg2);

// Left lower leg 3
const lLeg3 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.03, 0.04), crimsonGraphic);
lLeg3.position.set(-0.26, 0.16, 0.48);
lLeg3.rotation.set(0, 0, -0.28);
spiderChestGroup.add(lLeg3);

// Right lower leg 3
const rLeg3 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.03, 0.04), crimsonGraphic);
rLeg3.position.set(0.26, 0.16, 0.48);
rLeg3.rotation.set(0, 0, 0.28);
spiderChestGroup.add(rLeg3);

// Left bottom vertical leg 4
const lLeg4 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.028, 0.04), crimsonGraphic);
lLeg4.position.set(-0.16, -0.04, 0.48);
lLeg4.rotation.set(0, 0, -0.75);
spiderChestGroup.add(lLeg4);

// Right bottom vertical leg 4
const rLeg4 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.028, 0.04), crimsonGraphic);
rLeg4.position.set(0.16, -0.04, 0.48);
rLeg4.rotation.set(0, 0, 0.75);
spiderChestGroup.add(rLeg4);

// Angular chest harness geometric slashes (connecting spider towards shoulders)
const lSlash = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.03), crimsonGraphic);
lSlash.position.set(-0.45, 0.58, 0.46);
lSlash.rotation.set(0, 0, 0.65);
spiderChestGroup.add(lSlash);

const rSlash = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.03), crimsonGraphic);
rSlash.position.set(0.45, 0.58, 0.46);
rSlash.rotation.set(0, 0, -0.65);
spiderChestGroup.add(rSlash);

rootGroup.add(spiderChestGroup);

// Scale & center the whole model
rootGroup.position.set(0, -0.1, 0);
rootGroup.scale.set(1.15, 1.15, 1.15);

// ==========================================
// EXPORT TO GLB
// ==========================================
console.log('Generating 3D Spider Tech Hoodie GLB...');
const scene = new THREE.Scene();
scene.add(rootGroup);

const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (glbBuffer) => {
    fs.writeFileSync(OUTPUT_FILE, Buffer.from(glbBuffer));
    const stats = fs.statSync(OUTPUT_FILE);
    console.log(`\nSUCCESS! Exported 3D Hoodie model to:`);
    console.log(`  Path: ${OUTPUT_FILE}`);
    console.log(`  File size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`  Geometry: Torso, Cowl Hood (hollow opening), Left/Right Sleeves, Kangaroo Pocket, Ribbed Hem, Drawstrings with Aglets, and Crimson Spider Emblem.`);
  },
  (err) => {
    console.error('GLTF Export Error:', err);
    process.exit(1);
  },
  { binary: true, embedImages: true }
);

