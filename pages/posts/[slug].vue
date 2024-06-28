<script setup lang="ts">
const route = useRoute()
const rawSlug = route.params.slug

//if no slug
if(typeof rawSlug !== 'string') {
  navigateTo('/posts/1')
}

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
  <PostsListPage v-if="page" :page="page" />
  <PostPage v-else-if="slug" :slug="slug" />
</template>
