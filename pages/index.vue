<template>
  <div ref="panelsContainer" id="panels-container">
    <SectionJumbotron />
    <SectionAbout />
    <SectionProjects />
    <SectionContact />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const panelsContainer = shallowRef<HTMLDivElement>();

watch(
  route,
  (newRoute) => {
    console.log(newRoute.name);
  },
  { immediate: true }
);
</script>
