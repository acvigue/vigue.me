<script setup lang="ts">
import ms from 'ms'

const route = useRoute()
const rawSlug = route.params.slug

//if no slug
if (typeof rawSlug !== 'string') {
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

const generatedAt = useState(() => new Date().toISOString())
const date = new Date(generatedAt.value)
const timeAgo = ref()
onMounted(() => {
  timeAgo.value = ms(Date.now() - date.valueOf(), { long: true })
})
</script>

<template>
  <PostsListPage v-if="page" :page="page" />
  <PostPage v-else-if="slug" :slug="slug" />
  <p>{{ timeAgo }}</p>
</template>
