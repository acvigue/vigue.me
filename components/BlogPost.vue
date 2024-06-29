<script setup lang="ts">
import { format } from 'date-fns'

const props = defineProps<{
  slug: string;
}>()

const { data, error } = await useFetch("/api/cms/post", {
  query: { slug: props.slug },
})

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    message: "Post not found",
    fatal: false,
  })
}

const post = data.value

const postDataString = computed(() => {
  const strParts = []
  if (post.published_at)
    strParts.push(format(Date.parse(post.published_at), 'MMMM d, yyyy'))

  if (post.featured)
    strParts.push('Featured')

  return strParts.join(' • ')
})

const filteredTags = computed(() => {
  if (!post.tags)
    return []

  return post.tags.filter(tag => tag.slug !== 'projects' && tag.visibility === 'public')
})
</script>

<template>
  <div class="transform-gpu rounded-lg transition duration-300 hover:scale-95">
    <NuxtLink :to="`/posts/${slug}`">
      <div class="group relative w-full rounded">
        <div
          class="absolute h-full w-full -rotate-3 transform-gpu rounded-lg bg-persian opacity-20 transition duration-300 group-hover:rotate-0 dark:opacity-25 dark:mix-blend-overlay" />
        <div class="rounded">
          <div class="relative w-full rounded-lg">
            <NuxtPicture v-if="post.feature_image" format="webp,jpg" :src="post.feature_image"
              sizes="lg:33vw sm:50vw 200px" :width="2000" :height="1500" loading="lazy" class="blogpost-image"
              alt="Post Feature Image" />
          </div>
          <div
            class="absolute left-0 top-0 h-full w-full transform-gpu rounded-lg bg-gradient-to-t from-black to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>
        <div
          class="absolute left-0 top-0 flex h-full w-full flex-col justify-between rounded-lg bg-gradient-to-b from-black to-transparent px-6 py-4">
          <div>
            <div class="text-lg sm:text-xl font-bold font-serif text-champagne lg:text-2xl">
              {{ post.title }}
            </div>
            <div
              class="md:text-md line-clamp-4 transform-gpu font-serif text-sm text-champagne opacity-0 transition duration-300 group-hover:opacity-100 md:mb-0">
              {{ post.excerpt }}
            </div>
          </div>
          <div
            class="absolute bottom-0 my-4 transform-gpu font-serif text-sm text-champagne opacity-0 transition duration-300 group-hover:opacity-100">
            {{ postDataString }}
          </div>
          <div
            class="absolute bottom-0 my-4 flex transform-gpu flex-row items-center justify-start gap-1 text-xs opacity-100 transition duration-300 group-hover:opacity-0">
            <div v-for="tag in filteredTags" :key="tag.id"
              class="flex flex-row items-center rounded-md bg-persian text-champagne p-2 text-xs font-medium uppercase font-serif2 leading-none">
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.blogpost-image>img {
  @apply rounded-lg z-30;
  object-fit: cover;
}
</style>
