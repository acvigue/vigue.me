<template>
  <NavBar />
  <div class="min-w-screen min-h-screen z-0 bg-champagne">
    <div id="smooth-wrapper">
      <div id="smooth-content" class="bg-champagne pt-20">
        <slot />
      </div>
    </div>
  </div>

  <MouseFollower />
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

onNuxtReady(() => {
  gsap.registerPlugin(ScrollSmoother);

  ScrollSmoother.create({
    smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: false, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });
});
</script>
