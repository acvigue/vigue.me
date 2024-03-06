<template>
  <div class="relative text-gray-200">
    <WebGLView style="pointer-events: all !important" class="z-5 bg-gray-900" />
    <NavBar class="z-20" />
    <slot />
    <ScrollIndicator class="text-gray-200 z-10 pointer-events-none" />
  </div>
</template>
