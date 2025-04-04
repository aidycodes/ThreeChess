import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { peiceMaterial } from "./material";
import { peiceBase } from "./peiceBase";

export function createKnight(color) {
  const knight = new THREE.Group();
  const loader = new GLTFLoader();

  const material = peiceMaterial(color);

  //Base
  const base = peiceBase(material);
  base.position.y = -0.6;
  knight.add(base);

  //Horse Model
  loader.load("/models/horse_head.glb", function (glb) {
    const model = glb.scene;
    model.scale.set(0.25, 0.33, 0.25);
    model.position.y = 0.25;
    model.position.z = 0.35;
    model.traverse((child) => {
      if (child.isMesh) {
        child.material = material.clone(); // give each mesh its own identical material
        child.castShadow = true;
        child.receiveShadow = true;
        if (
          child.geometry.attributes.uv2 === undefined &&
          child.geometry.attributes.uv
        ) {
          child.geometry.setAttribute("uv2", child.geometry.attributes.uv);
        }
      }
    });

    knight.add(model);
  });

  return knight;
}
