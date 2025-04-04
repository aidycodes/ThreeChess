import * as THREE from "three";
import { peiceMaterial } from "./material";
import { peiceBase } from "./peiceBase";

export function createPawn(color) {
  const pawn = new THREE.Group();

  const material = peiceMaterial(color);

  //Base

  const base = peiceBase(material);
  base.position.y = -0.6;
  pawn.add(base);

  // Body

  const bodyGeomtry = new THREE.CylinderGeometry(0.15, 0.4, 1, 32);
  const bodyMesh = new THREE.Mesh(bodyGeomtry, material);
  pawn.add(bodyMesh);

  //Neck

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
