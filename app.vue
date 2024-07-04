<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicons/favicon-dark.ico',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicons/favicon-light.ico',
      media: '(prefers-color-scheme: light)',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <MouseFollower />
  </NuxtLayout>
</template>
