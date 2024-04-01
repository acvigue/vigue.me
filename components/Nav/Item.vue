<template>
  <NuxtLink
    :to="to"
    class="flex flex-col items-center hover:scale-110 duration-500 font-serif2 font-bold lg:text-8xl md:text-7xl text-6xl"
    data-cursor-stick
    @click="clicked"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { $event } = useNuxtApp();

const props = defineProps<{
  to: string;
}>();

const clicked = () => {
  $event("closeNav");
};
</script>
