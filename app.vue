<script setup lang="ts">
const config = useAppConfig()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicons/favicon.ico',
    },
  ],
})

useSeoMeta({
  description: config.description,
  ogType: 'website',
  ogLocale: 'en_US',
  ogUrl: config.baseUrl,
  ogTitle: config.name,
  ogDescription: config.description,
  ogImage: [
    {
      url: `${config.baseUrl}/og.jpg`,
      width: 1280,
      height: 720,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
