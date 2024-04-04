<template>
  <button
    class="flex flex-col items-center hover:scale-110 duration-500 font-serif2 font-bold lg:text-8xl md:text-7xl text-6xl"
    data-cursor-stick
    @click="clicked"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const { $event } = useNuxtApp();
const route = useRoute();

const props = defineProps<{
  to: string;
}>();

const clicked = () => {
  $event("closeNav");

  const pathsToRescroll = [
    "/",
    "/about",
    "/projects",
    "/experience",
    "/contact",
  ];

  if (pathsToRescroll.includes(route.path)) {
    console.log("scrolling to slug");
    $event("scrollToSlug", props.to);
  } else {
    navigateTo(props.to);
  }
};
</script>
