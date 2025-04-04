import * as THREE from "three";

export function createBoard() {
  const board = new THREE.Group();

  board.position.y = -0.71;

  for (let i = 1; i < 9; i++) {
    let baseColor = i % 2;
    for (let j = 1; j < 9; j++) {
      const tile = createTile((j + baseColor) % 2 === 0 ? "black" : "white");
      tile.position.x = 1.5 * j;
      tile.position.z = 1.5 * i;
      board.add(tile);
    }
  }

  return board;
}

function createTile(color) {
  const tile = new THREE.PlaneGeometry(1.5, 1.5);
  const material = new THREE.MeshStandardMaterial({
    color: color,
    side: THREE.DoubleSide,
  });
  const tileMesh = new THREE.Mesh(tile, material);
  tileMesh.rotation.x = Math.PI / 2;

  return tileMesh;
}
