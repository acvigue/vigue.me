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
const appConfig = useAppConfig();

watch(
  route,
  (newRoute) => {
    console.log(newRoute.name);
  },
  { immediate: true }
);

useSeoMeta({
  title: `${route.name?.toString()} - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: "website",
  ogUrl: `${appConfig.baseUrl}${route.path}`,
});
</script>
