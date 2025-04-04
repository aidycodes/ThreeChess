import * as THREE from "three";
import { peiceMaterial } from "./material";
import { peiceBase } from "./peiceBase";

export function createKing(color) {
  // Create a group to hold all the geometries
  const king = new THREE.Group();

  king.position.x = -2;
  king.position.y = -0.6;

  const material = peiceMaterial(color);

  //Base

  const base = peiceBase(material);
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
