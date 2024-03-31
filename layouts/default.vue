<template>
  <div class="relative text-gray-200">
    <div class="fixed bg-slate-950 w-screen h-screen z-[-1]"></div>
    <WebGLView class="z-0" />
    <NavBar class="z-20" />
    <div class="z-10">
      <slot />
    </div>
    <ScrollIndicator class="text-gray-200" v-if="route.path === '/'" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
