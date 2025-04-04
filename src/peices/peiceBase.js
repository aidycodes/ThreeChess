import * as THREE from "three";

export function peiceBase(material) {
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.47, 0.2, 32, 1, false, 0, Math.PI * 2),
    material
  );

  return base;
}
