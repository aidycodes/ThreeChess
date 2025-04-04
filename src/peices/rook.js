import * as THREE from "three";
import { peiceMaterial } from "./material";
import { peiceBase } from "./peiceBase";

export function createRook(color) {
  const rook = new THREE.Group();

  rook.position.x = -2;
  rook.position.y = -0.6;

  const material = peiceMaterial(color);

  //Base

  const base = peiceBase(material);
  rook.add(base);

  //body

  const bodyGeomtry = new THREE.CylinderGeometry(0.2, 0.5, 1.2, 4);
  const bodyMesh = new THREE.Mesh(bodyGeomtry, material);
  bodyMesh.rotation.y = Math.PI / 4;
  bodyMesh.position.y = 0.7;
  rook.add(bodyMesh);

  //head

  const headGeometry = new THREE.BoxGeometry(0.42, 0.15, 0.42);
  const headMesh = new THREE.Mesh(headGeometry, material);
  headMesh.position.y = 1.3;
  rook.add(headMesh);

  //crenellations
  const size = 0.04;
  const crenellationGeometry = new THREE.BoxGeometry(
    size - 0.02,
    size * 2,
    size * 2
  );
  const crenellations = new THREE.Group();

  rook.add(crenellations);
  const points = placeItemsOnSquare(11);
  for (let i = 0; i < 11; i++) {
    const crenellation1 = new THREE.Mesh(crenellationGeometry, material);

    const posX = points[i][0];
    const posZ = points[i][1];
    const adjustX = i === 0 ? 0.03 : 0;
    crenellation1.position.set(posX + adjustX, 1.4, posZ);
    const squareSize = 0.4;
    const half = squareSize / 2;
    const epsilon = 0.001;
    // Determine which edge it's on based on position
    // Determine which side it's on
    if (Math.abs(posZ + half) < 0.001) {
      // Bottom edge: horizontal along X-axis
      crenellation1.rotation.y = Math.PI / 2;
    } else if (Math.abs(posX - half) < 0.001) {
      // Right edge: vertical along Z-axis
      crenellation1.rotation.y = 0;
    } else if (Math.abs(posZ - half) < 0.001) {
      // Top edge: horizontal along X-axis
      crenellation1.rotation.y = Math.PI / 2;
    } else if (Math.abs(posX + half) < 0.001) {
      // Left edge: vertical along Z-axis
      crenellation1.rotation.y = 0;
    }

    crenellations.add(crenellation1);
  }

  return rook;
}

const placeItemsOnSquare = (numItems, squareSize = 0.4) => {
  const half = squareSize / 2;
  const points = [];

  const perimeter = 4 * squareSize;
  const spacing = perimeter / numItems;
  let x, y;

  for (let i = 0; i < numItems; i++) {
    const distance = i * spacing;

    if (distance < squareSize) {
      x = -half + distance;
      y = -half;
    } else if (distance < 2 * squareSize) {
      x = half;
      y = -half + (distance - squareSize);
    } else if (distance < 3 * squareSize) {
      x = half - (distance - 2 * squareSize);
      y = half;
    } else {
      x = -half;
      y = half - (distance - 3 * squareSize);
    }

    points.push([x, y]);
  }

  return points;
};
