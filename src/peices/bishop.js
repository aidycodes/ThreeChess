import * as THREE from "three";
import { SUBTRACTION, Brush, Evaluator } from "three-bvh-csg";
import { peiceMaterial } from "./material";
import { peiceBase } from "./peiceBase";

export function createBishop(color) {
  const bishop = new THREE.Group();
  const material = peiceMaterial(color);
  //base
  const base = peiceBase(material);

  bishop.add(base);
  bishop.position.y = -0.6;

  //legs

  const legsGeomtry = new THREE.CylinderGeometry(0.3, 0.4, 0.2, 32);
  const legsMesh = new THREE.Mesh(legsGeomtry, material);
  legsMesh.position.y = 0.2;
  bishop.add(legsMesh);

  const legDGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 32, 1, false);
  const legDMesh = new THREE.Mesh(legDGeometry, material);
  legDMesh.position.y = 0.3;
  bishop.add(legDMesh);

  //body

  const bodyGeomtry = new THREE.CylinderGeometry(0.15, 0.3, 1, 32);
  const bodyMesh = new THREE.Mesh(bodyGeomtry, material);
  bodyMesh.position.y = 0.7;
  bishop.add(bodyMesh);

  const neckGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 16, 1, false);
  const neckMesh = new THREE.Mesh(neckGeometry, material);
  neckMesh.position.y = 1.2;
  bishop.add(neckMesh);

  //hat
  const hatGeometry = new THREE.SphereGeometry(0.05, 32, 32);
  const hatMesh = new THREE.Mesh(hatGeometry, material);
  hatMesh.position.y = 1.8;

  bishop.add(hatMesh);

  //head with notice
  const headGeometry = new THREE.SphereGeometry(0.18, 32, 32);
  const headMesh = new THREE.Mesh(headGeometry, material);
  headMesh.position.y = 1.45;

  headMesh.updateMatrixWorld(); // Important!

  const notchGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const notchMesh = new THREE.Mesh(notchGeometry);
  notchMesh.position.y = 1.65;
  notchMesh.position.x = 0.1;
  notchMesh.position.z = 0.15;
  notchMesh.updateMatrixWorld(); // Important!

  const brush1 = new Brush(headGeometry, material);
  brush1.position.copy(headMesh.position);
  brush1.scale.y = 1.8;
  brush1.scale.x = 0.8;
  brush1.scale.z = 0.8;
  brush1.material.dark;
  brush1.updateMatrixWorld();

  const brush2 = new Brush(notchGeometry, material);
  brush2.scale.x = 0.8;
  brush2.scale.z = 5;
  brush2.scale.y = 0.2;
  brush2.rotation.z = Math.PI * 0.25;

  brush2.position.copy(notchMesh.position);
  brush2.updateMatrixWorld();

  const evaluator = new Evaluator();
  const result = evaluator.evaluate(brush1, brush2, SUBTRACTION);
  result.position.y = 0;
  bishop.add(result);

  return bishop;
}
