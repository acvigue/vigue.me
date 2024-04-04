<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `Experience - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}/experience`,
})

const { $initScrollSmoother } = useNuxtApp()

let sm: ScrollSmoother
onMounted(() => {
  sm = $initScrollSmoother()
})
onUnmounted(() => {
  if (sm)
    sm.kill()
})
</script>

<template>
  experience
</template>
