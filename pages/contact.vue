<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `Contact - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}/contact`,
})
</script>

<template>
  contact
</template>
