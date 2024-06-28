<script setup lang="ts">
const route = useRoute()
const rawSlug = route.params.slug

const page = computed(() => {
  if (!(typeof rawSlug === 'string' && /^\d+$/.test(rawSlug)))
    return
  if (typeof rawSlug !== 'string')
    return
  return Number.parseInt(rawSlug)
})

const slug = computed(() => {
  if (typeof rawSlug !== 'string')
    return
  return rawSlug
})
</script>

<template>
  <ProjectsListPage v-if="page" :page="page" />
  <ProjectPage v-else-if="slug" :slug="slug" />
</template>
