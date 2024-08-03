<template>
  <div class="bg-champagne">
    <div class="min-h-screen">
      <NavHeader />
      <slot />
    </div>
    <NavFooter />
  </div>
</template>

<script setup lang="ts">
import Lenis from 'lenis';

onMounted(() => {
  const lenis = new Lenis()

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
});
</script>
