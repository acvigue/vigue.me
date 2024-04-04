<template>about</template>

<script setup lang="ts">
const appConfig = useAppConfig();

useSeoMeta({
  title: `About - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: "website",
  ogUrl: `${appConfig.baseUrl}${route.path}`,
});
</script>
