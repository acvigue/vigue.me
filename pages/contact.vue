<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `Contact - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}/contact`,
})

const { $initScrollSmoother } = useNuxtApp()

let sm: ScrollSmoother
onMounted(() => {
  sm = $initScrollSmoother()
})
onBeforeUnmount(() => {
  if (sm)
    sm.kill()
})
</script>

<template>
  contact
</template>
