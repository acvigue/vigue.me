<script setup lang="ts">
const route = useRoute()
const panelsContainer = shallowRef<HTMLDivElement>()
const appConfig = useAppConfig()

useSeoMeta({
  title: `Home - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}${route.path}`,
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
  <div id="panels-container" ref="panelsContainer">
    <SectionJumbotron />
    <SectionAbout />
    <SectionProjects />
    <SectionContact />
  </div>
</template>
