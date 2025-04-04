import * as THREE from "three";
import { peiceMaterial } from "./material";
import { peiceBase } from "./peiceBase";

export function createQueen(color) {
  // Create a group to hold all the geometries
  const queen = new THREE.Group();

  queen.position.x = 1.2;
  queen.position.y = -0.6;

  const material = peiceMaterial(color);

  //Base

  const base = peiceBase(material);
  queen.add(base);

  //body

  const bodyGeomtry = new THREE.CylinderGeometry(0.15, 0.4, 1.5, 32);
  const bodyMesh = new THREE.Mesh(bodyGeomtry, material);
  bodyMesh.position.y = 0.7;
  queen.add(bodyMesh);

  //neck

  const neckGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 16, 1, false);
  const neckMesh = new THREE.Mesh(neckGeometry, material);
  neckMesh.position.y = 1.45;
  queen.add(neckMesh);

  //outer crown
  const outerSpikeGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const crownMesh = new THREE.Mesh(outerSpikeGeometry, material);
    crownMesh.position.y = 1.55;
    crownMesh.position.x = Math.sin(angle) / 6;
    crownMesh.position.z = Math.cos(angle) / 6;

    crownMesh.lookAt(new THREE.Vector3(0, crownMesh.position.y, 0));
    crownMesh.rotateX(-Math.PI / 8);

    queen.add(crownMesh);
  }

  // center crown

  const centerSpikeGeometry = new THREE.ConeGeometry(0.06, 0.3, 16);
  const centerSpikeMesh = new THREE.Mesh(centerSpikeGeometry, material);
  centerSpikeMesh.position.y = 1.6;
  queen.add(centerSpikeMesh);

  // head

  const headGeomtry = new THREE.SphereGeometry(0.05, 32, 16);
  const headMesh = new THREE.Mesh(headGeomtry, material);
  headMesh.position.y = 1.7;
  queen.add(headMesh);

  return queen;
}
