<template>
  <div class="relative text-gray-200">
    <div class="fixed bg-slate-950 w-screen h-screen z-4"></div>
    <WebGLView class="z-5" />
    <NavBar class="z-20" />
    <slot />
    <ScrollIndicator class="text-gray-200 z-10" />
  </div>
</template>
