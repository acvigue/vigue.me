<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `Experience - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}/experience`,
})
</script>

<template>
  experience
</template>
