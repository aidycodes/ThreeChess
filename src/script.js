import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
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

const ambientLightParams = {
  color: "#ffffff",
  intensity: 3.5,
};
const directionalLightParams = {
  color: "#fffffa",
  intensity: 10,
};
const ambientLight = new THREE.AmbientLight(
  ambientLightParams.color,
  ambientLightParams.intensity
);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
  directionalLightParams.color,
  directionalLightParams.intensity
);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(lightHelper);

scene.add(directionalLight);
directionalLight.position.x = -2.146;
const ambientLightFolder = gui.addFolder("Ambient Lighting");
const directionalLightFolder = gui.addFolder("directional  Light");
const cameraFolder = gui.addFolder("Camera");
ambientLightFolder
  .addColor(ambientLightParams, "color")
  .name("Color")
  .onChange((value) => ambientLight.color.set(value));

directionalLightFolder
  .addColor(directionalLight, "color")
  .name("Color")
  .onChange((value) => directionalLight.color.set(value));

directionalLightFolder
  .add(directionalLight, "intensity")
  .min(-10)
  .max(50)
  .step(0.001);

ambientLightFolder.add(ambientLight, "intensity").min(-10).max(50).step(0.001);
directionalLightFolder
  .add(directionalLight.position, "x")
  .min(-10)
  .max(50)
  .step(0.001);
directionalLightFolder
  .add(directionalLight.position, "z")
  .min(-10)
  .max(50)
  .step(0.001);
directionalLightFolder
  .add(directionalLight.position, "y")
  .min(-10)
  .max(50)
  .step(0.001);

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
camera.position.y = 3.767;
camera.position.x = 17.207;
camera.position.z = 8;
camera.rotation.y = Math.PI * 0.25;

gui.add(camera.position, "y").min(-10).max(50).step(0.001);
gui.add(camera.position, "x").min(-10).max(50).step(0.001);
gui.add(camera.position, "z").min(-10).max(50).step(0.001);

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const board = createBoard();
scene.add(board);

const { whitePeices, blackPeices } = createPeices(board, scene);
//camera.lookAt(board);
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
