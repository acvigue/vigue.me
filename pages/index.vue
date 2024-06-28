<script setup lang="ts">
const route = useRoute()
const panelsContainer = shallowRef<HTMLDivElement>()
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

defineOgImageComponent('NuxtSeo')
</script>

<template>
  <div id="panels-container" ref="panelsContainer">
    <SectionJumbotron />
    <SectionAbout />
    <SectionProjects />
    <SectionContact />
  </div>
</template>
