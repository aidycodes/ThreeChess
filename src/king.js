import * as THREE from "three";

export function createKing(color) {
  // Create a group to hold all the geometries
  const king = new THREE.Group();

  king.position.x = -2;
  king.position.y = -0.6;

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
  king.add(base);

  //body

  const bodyGeomtry = new THREE.CylinderGeometry(0.15, 0.4, 1.5, 32);
  const bodyMesh = new THREE.Mesh(bodyGeomtry, material);
  bodyMesh.position.y = 0.7;
  king.add(bodyMesh);

  //neck

  const neckGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 16, 1, false);
  const neckMesh = new THREE.Mesh(neckGeometry, material);
  neckMesh.position.y = 1.45;
  king.add(neckMesh);

  //head

  const headGeometry = new THREE.CylinderGeometry(0.15, 0.1, 0.1, 32);
  const headMesh = new THREE.Mesh(headGeometry, material);
  headMesh.position.y = 1.5;
  king.add(headMesh);

  //cross

  const cross = new THREE.Group();
  king.add(cross);

  cross.position.y = 1.6;

  const vertical = new THREE.BoxGeometry(0.05, 0.3, 0.05);
  const verticalMesh = new THREE.Mesh(vertical, material);
  cross.add(verticalMesh);
  const horozontal = new THREE.BoxGeometry(0.05, 0.2, 0.05);
  const horozontalMesh = new THREE.Mesh(horozontal, material);
  horozontalMesh.rotation.z = Math.PI / 2;
  horozontalMesh.position.y += 0.05;
  cross.add(horozontalMesh);

  return king;
}
