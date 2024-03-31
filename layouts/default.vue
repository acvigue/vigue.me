<template>
  <div class="relative text-gray-200 overflow-x-clip">
    <div class="fixed bg-slate-950 w-screen h-screen -z-10"></div>
    <WebGLView class="-z-10" />
    <NavBar class="z-10" />
    <div class="flex justify-center pt-32 z-0 w-full">
      <slot />
    </div>
  </div>
</template>
