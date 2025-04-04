import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";
import { createPawn } from "./peices/pawn.js";
import { createBoard } from "./board.js";
import { createPeices } from "./corePeices.js";

//debugger / tweeker
const gui = new GUI({
  width: 300,
  title: "Debug  UI",
  closeFolders: false,
});

//gui.close()
//gui.hide();

window.addEventListener("keydown", (event) => {
  if (event.key == "h") {
    gui.show(gui._hidden);
  }
});

const debugObject = {};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
//debugObject.color = "#e3b7b7";

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);

scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const board = createBoard();
scene.add(board);

console.log(board);

for (let i = 0; i < 8; i++) {
  const whitePawn = createPawn("white");
  console.log({ i });
  scene.add(whitePawn);
  whitePawn.position.x = board.children[8 + i].position.x;
  whitePawn.position.z = board.children[8 + i].position.z;
}
for (let i = 55; i > 47; i--) {
  const whitePawn = createPawn("black");
  console.log({ i });
  scene.add(whitePawn);
  whitePawn.position.x = board.children[i].position.x;
  whitePawn.position.z = board.children[i].position.z;
}

const { whitePeices, blackPeices } = createPeices(board, scene);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
