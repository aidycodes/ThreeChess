import * as THREE from "three";
export function peiceMaterial(color) {
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
    side: THREE.DoubleSide,
  });

  return material;
}
