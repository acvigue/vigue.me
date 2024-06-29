<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

useSeoMeta({
  title: `Home - ${appConfig.name}`,
  ogTitle: `Home - ${appConfig.name}`,
  description: appConfig.description,
  ogDescription: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}${route.path}`,
})
</script>

<template>
  <div>
    <IndexLoading />
    <IndexHero />
    <IndexFullWidthPanel>full width!</IndexFullWidthPanel>
  </div>
</template>
