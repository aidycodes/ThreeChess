import * as THREE from "three";

export function createPawn(color) {
  const textureLoader = new THREE.TextureLoader();

  const peiceColorMaterial = textureLoader.load(
    "/textures/beige_wall_001/beige_wall_001_diff_1k.jpg"
  );
  const peiceNormalMaterial = textureLoader.load(
    "/textures/beige_wall_001/beige_wall_001_nor_gl_1k.jpg"
  );
  const peiceARMMaterial = textureLoader.load(
    "/textures/beige_wall_001/beige_wall_001_arm_1k.jpg"
  );

  const pawn = new THREE.Group();

  const peiceColor = color === "white" ? 0xf0d9b5 : 0x946f51;

  const material = new THREE.MeshStandardMaterial({
    color: peiceColor,
    map: peiceColorMaterial,
    normalMap: peiceNormalMaterial,
    roughnessMap: peiceARMMaterial,
    metalnessMap: peiceARMMaterial,
    aoMap: peiceARMMaterial,
    roughness: 0.2,
    metalness: 0.2,
    side: THREE.DoubleSide,
  });

  //Base

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.47, 0.2, 32, 1, false, 0, Math.PI * 2),
    material
  );

  base.position.y = -0.6;
  pawn.add(base);

  // Body

  const bodyGeomtry = new THREE.CylinderGeometry(0.15, 0.4, 1, 32);
  const bodyMesh = new THREE.Mesh(bodyGeomtry, material);
  pawn.add(bodyMesh);

  //Neck

  //   const neckGeometry = new THREE.CircleGeometry(0.2, 16);
  //   const neckMesh = new THREE.Mesh(neckGeometry, material);
  //   neckMesh.rotation.x = Math.PI / 2;
  //   neckMesh.position.y = 0.5;
  //   pawn.add(neckMesh);
  const neckGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 16, 1, false);
  const neckMesh = new THREE.Mesh(neckGeometry, material);
  neckMesh.position.y = 0.5;
  pawn.add(neckMesh);
  //Head

  const headGeomtry = new THREE.SphereGeometry(0.2, 32, 16);
  const headMesh = new THREE.Mesh(headGeomtry, material);
  headMesh.position.y = 0.65;
  pawn.add(headMesh);

  console.log(THREE.REVISION);
  return pawn;
}
