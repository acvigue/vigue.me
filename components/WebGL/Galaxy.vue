<script lang="ts" setup>
import * as THREE from "three";
import { type ThreeEvent } from "@tresjs/core";

import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import fragment from "@/assets/shaders/GalaxyFragmentShader.glsl";
import vertex from "@/assets/shaders/GalaxyVertexShader.glsl";
import particconstexture from "@/assets/images/particle.webp";
import { particleTypes } from "~/utilities/particleTypes";

const context = useTresContext();
const galaxyGroup = shallowRef();

const meshes = ref<THREE.Mesh[]>([]);

class GalaxyClass {
  constructor() {
    particleTypes.forEach((opt) => {
      meshes.value.push(this.getMesh(opt));
    });
  }

  getMesh(opts: (typeof particleTypes)[0]): THREE.Mesh {
    const count = opts.instance_count;
    const min_radius = opts.min_radius;
    const max_radius = opts.max_radius;
    const startergeo = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.setAttribute("position", startergeo.getAttribute("position")),
      (geo.index = startergeo.index);

    const wpos = new Float32Array(3 * count);

    for (let r = 0; r < count; r++) {
      const i = 0.05 * (2 * Math.random() - 1);
      const s = 0.2 * (2 * Math.random() - 1);
      const a = 0.05 * (2 * Math.random() - 1);
      const l = Math.pow(r / (count - 1), 0.5);
      const c = 2 * Math.PI * 0.618033 * r;
      const u = new THREE.Vector3(l * Math.cos(c) + i, 0, l * Math.sin(c) + a);
      u
        .multiplyScalar(max_radius - min_radius)
        .add(u.clone().normalize().multiplyScalar(min_radius)),
        (wpos[3 * r + 0] = u.x);
      wpos[3 * r + 1] = u.y + s;
      wpos[3 * r + 2] = u.z;
    }

    const attr = new THREE.InstancedBufferAttribute(wpos, 3, false);
    geo.setAttribute("w_pos", attr);
    geo.instanceCount = count;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        _MainTexture: {
          value: new THREE.TextureLoader().load(particconstexture),
        },
        _Opacity: {
          value: opts.opacity,
        },
        _MouseWorldPosition: {
          value: new THREE.Vector3(100, 0, 0),
        },
        _Size: {
          value: opts.particle_size,
        },
        _Time: {
          value: 0,
        },
        _RotationSpeed: {
          value: opts.rotation_speed,
        },
        _TwistSpeed: {
          value: opts.twist_speed,
        },
        _TwistFrequency: {
          value: opts.twist_frequency,
        },
        _TwistDispersion: {
          value: opts.twist_dispersion,
        },
        _TwistDispersionFrequency: {
          value: opts.twist_dispersion_frequency,
        },
        _RotationDispersion: {
          value: opts.rotation_dispersion,
        },
        _SizeFrequency: {
          value: opts.particle_size_frequency,
        },
        _SizeDispersion: {
          value: opts.particle_size_dispersion,
        },
        _TwistAmplitude: {
          value: opts.twist_amplitude,
        },
        _NoiseOffset: {
          value: opts.offset,
        },
        _NoiseFrequency: {
          value: 0,
        },
        _NoiseAmplitude: {
          value: opts.amplitude,
        },
        _Color: {
          // value: new THREE.Color('#f9ebb8'),
          value: new THREE.Color(opts.color),
        },
        _UseConeShape: {
          value: 0,
        },
        _MouseSphereRadius: {
          value: 0.3,
        },
        _MouseSphereAttractionRadius: {
          value: 0.4,
        },
        _MouseSphereFalloff: {
          value: 1,
        },
        _UseMouse: {
          value: 0,
        },
        _CameraFadeout: {
          value: 1,
        },
      },
      // wireframe: true,
      depthWrite: false,
      transparent: true,
      opacity: 0,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    const cloud = new THREE.Mesh(geo, material);
    cloud.frustumCulled = false;

    return cloud;
  }

  updateTime(deltaTime: number) {
    meshes.value.forEach((mesh) => {
      if (mesh.material instanceof THREE.ShaderMaterial) {
        mesh.material.uniforms._Time.value += deltaTime;
      }
    });
  }

  mouseUpdate(v: THREE.Vector3) {
    meshes.value.forEach((mesh) => {
      if (mesh.material instanceof THREE.ShaderMaterial) {
        mesh.material.uniforms._MouseWorldPosition.value = v;
      }
    });
  }

  handlePointerMove(event: ThreeEvent<PointerEvent>) {
    const v3 = event.point;
    galaxy.mouseUpdate(v3);
  }

  handlePointerLeave() {
    galaxy.mouseUpdate(new THREE.Vector3(1000, 1000, 1000));
  }
}

const galaxy = new GalaxyClass();
const { onLoop } = useRenderLoop();

onLoop(({ delta }) => {
  galaxy.updateTime(delta * 0.1);
});

onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger);
  registerTimelines();
});

let ctx: gsap.Context;

const registerTimelines = () => {
  ScrollTrigger.defaults({
    immediateRender: false,
    scrub: true,
  });
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: "#jumbotron",
      endTrigger: "#contact",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const dirFactor = self.getVelocity() < 0 ? 10 : 5;
        galaxy.updateTime(0.0000005 * self.getVelocity() * dirFactor);
        galaxy.handlePointerLeave();
      },
    });

    const tl = gsap.timeline();
    tl.to(context.camera.value!.position, {
      z: 10,
      scrollTrigger: {
        trigger: "#jumbotron",
        start: "bottom bottom",
        end: "bottom center",
      },
    });
    tl.to(galaxyGroup.value.rotation, {
      x: -Math.PI / 6,
      scrollTrigger: {
        trigger: "#jumbotron",
        start: "bottom bottom",
        end: "bottom center",
      },
    });
    tl.to(galaxyGroup.value.position, {
      y: 3,
      scrollTrigger: {
        trigger: "#jumbotron",
        start: "bottom 90%",
        end: "bottom 20%",
      },
    });
  });
};

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>

<template>
  <TresGroup :rotate-z="0.3" ref="galaxyGroup" :position="[0, -1, -1]">
    <TresMesh
      v-for="mesh of meshes"
      :key="mesh.id"
      :geometry="mesh.geometry"
      :material="mesh.material"
    />
    <TresMesh
      @pointer-move="galaxy.handlePointerMove"
      @pointer-leave="galaxy.handlePointerLeave"
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" :rotate-x="Math.PI / 2" />
      <TresMeshBasicMaterial
        :color="0x000000"
        :wireframe="true"
        :opacity="0"
        :transparent="true"
        :side="2"
      />
    </TresMesh>
  </TresGroup>
</template>
