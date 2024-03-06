import * as THREE from "three";
import { useLoader } from "@tresjs/core";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loadNormalizedCable = async (
  sections: number
): Promise<THREE.Mesh[]> => {
  const url = "/models/cables.glb";
  // Load a glTF resource

  //@ts-expect-error
  const gltf = await useLoader(GLTFLoader, url);
  const object = gltf.scene || gltf.scenes[0];

  object.updateMatrixWorld(); // donmccurdy/three-gltf-viewer#330

  object.rotation.y = Math.PI * 1.5;

  object.scale.set(0.02, 0.02, 0.02);
  const box = new THREE.Box3().setFromObject(object);

  //object.position.x += object.position.x - center.x;
  object.position.y -= box.min.y * 2;
  object.position.y -= 8;
  object.position.z += 0;

  //camera.lookAt(center);
  const size = new THREE.Vector3();
  box.getSize(size);

  const objects: THREE.Mesh[] = [];

  for (let i = 0; i < sections; i++) {
    const instance = object.clone();
    instance.position.y -= i * size.y;
    objects.push(instance);
  }
  console.log(objects);
  return objects;
};
