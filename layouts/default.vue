<template>
  <NavBar />
  <div class="min-w-screen min-h-screen z-0">
    <div class="bg-champagne" id="smooth-wrapper">
      <div id="smooth-content">
        <slot />
      </div>
    </div>
  </div>

  <MouseFollower />
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

onMounted(() => {
  gsap.registerPlugin(ScrollSmoother);

  ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });
});
</script>
