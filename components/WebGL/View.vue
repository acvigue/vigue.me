<template>
  <TresCanvas
    clear-color="#020617"
    :window-size="true"
    class="fixed top-0 left-0 w-screen h-screen"
    :use-window-pointer="true"
  >
    <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />
    <!--<OrbitControls />-->
    <Stars
      :rotation="[0, starsYRotation, 0]"
      :radius="50"
      :depth="50"
      :count="5000"
      :size="0.2"
      :size-attenuation="true"
    />

    <TresAmbientLight :intensity="1" />
    <WebGLGalaxy />
  </TresCanvas>
</template>

<script setup lang="ts">
import { Stars } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";
const { onLoop } = useRenderLoop();

const starsYRotation = shallowRef(0);

onLoop(({ delta }) => {
  starsYRotation.value += 0.01 * delta;
});
</script>
