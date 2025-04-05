import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function createBoard() {
  const board = new THREE.Group();
  board.position.y = -0.71;

  const ARMTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_arm_1k.png"
  );
  const colorTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_diff_1k.png"
  );
  const dispTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_disp_1k.png"
  );
  const normTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_nor_gl_1k.png"
  );
  const material1 = new THREE.MeshStandardMaterial({
    color: "white",
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  });

  const material2 = new THREE.MeshStandardMaterial({
    color: "black",
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
  });

  // [colorTexture, ARMTexture, dispTexture].forEach((texture) => {
  //   texture.colorSpace = THREE.SRGBColorSpace;
  //   texture.wrapS = THREE.RepeatWrapping;
  //   texture.wrapT = THREE.RepeatWrapping;
  //   //texture.colorSpace = THREE.SRGBColorSpace;

  //   // Set different repeat values for sides vs top/bottom
  //   //texture.repeat.set(0.0625, 0.0625); // Different ratio for Y dimension

  //   // Prevent texture stretching
  //   texture.anisotropy = 16; // Depends on your renderer's capabilities
  // });

  const tileGeometry = new THREE.PlaneGeometry(1.5, 1.5);

  const instanceCount = 32;
  const instancedMesh1 = new THREE.InstancedMesh(
    tileGeometry,
    material1,
    instanceCount
  );
  const instancedMesh2 = new THREE.InstancedMesh(
    tileGeometry,
    material2,
    instanceCount
  );

  instancedMesh1.receiveShadow = true;
  instancedMesh2.receiveShadow = true;

  const matrix = new THREE.Matrix4();
  let count1 = 0;
  let count2 = 0;

  for (let x = 0; x < 8; x++) {
    for (let z = 0; z < 8; z++) {
      matrix.makeRotationX(Math.PI / 2);
      matrix.setPosition(x * 1.5, 0, z * 1.5);

      if ((x + z) % 2 === 0) {
        instancedMesh1.setMatrixAt(count1++, matrix);
      } else {
        instancedMesh2.setMatrixAt(count2++, matrix);
      }
    }
  }
  // Updates the internal matrices
  instancedMesh1.instanceMatrix.needsUpdate = true;
  instancedMesh2.instanceMatrix.needsUpdate = true;

  const boarder = createBorder();
  boarder.position.x = 1.5 * 3.5;
  boarder.position.z = 1.5 * 3.5;
  board.add(boarder);
  board.add(instancedMesh1);
  board.add(instancedMesh2);
  board.position.set(0, -0.71, 0);

  return board;
}

function createBorder() {
  const ARMTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_arm_1k.png"
  );
  const colorTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_diff_1k.png"
  );
  const dispTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_disp_1k.png"
  );
  const normTexture = textureLoader.load(
    "/textures/rosewood_veneer1/rosewood_veneer1_nor_gl_1k.png"
  );
  console.log(colorTexture);
  // colorTexture.repeat.set(8, 8);
  [colorTexture, ARMTexture, dispTexture].forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;

    // Set different repeat values for sides vs top/bottom
    texture.repeat.set(2, 1); // Different ratio for Y dimension

    // Prevent texture stretching
    texture.anisotropy = 16; // Depends on your renderer's capabilities
  });

  const XY = 1.5 * 8 + 2.5;
  const borderGeometry = new THREE.BoxGeometry(XY, 2, XY, 8, 8);
  const material = new THREE.MeshStandardMaterial({
    aoMap: ARMTexture,
    roughness: ARMTexture,
    normalMap: normTexture,
    roughnessMap: ARMTexture,
    map: colorTexture,
  });
  const border = new THREE.Mesh(borderGeometry, material);
  border.position.y = -1.01;
  border.receiveShadow = true;
  return border;
}
