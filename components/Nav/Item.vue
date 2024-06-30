<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink
    class="flex flex-col items-center hover:scale-110 duration-500 font-serif2 font-bold lg:text-8xl md:text-7xl text-6xl hover:text-persian"
    data-cursor-stick :to="to">
    <slot />
  </NuxtLink>
</template>
