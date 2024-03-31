<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const config = useAppConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${config.name}` : config.name;
  },
});

useSeoMeta({
  description: config.description,
  ogType: "website",
  ogLocale: "en_US",
  ogUrl: config.baseUrl,
  ogTitle: config.name,
  ogDescription: config.description,
  ogImage: [
    {
      url: config.baseUrl + "/og.jpg",
      width: 1280,
      height: 720,
    },
  ],
});
</script>
