<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

useSeoMeta({
  title: `Home - ${appConfig.name}`,
  ogTitle: `Home - ${appConfig.name}`,
  description: appConfig.homeMetaDescription,
  ogDescription: appConfig.homeMetaDescription,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}${route.path}`,
})

defineOgImageComponent('Page', {
  title: 'Home',
  image: appConfig.headshotImage,
  description: appConfig.homeMetaDescription,
})
</script>

<template>
  <IndexLoading />
  <IndexHero />
  <IndexBigPanel />
  <IndexContact />
</template>
