<script setup lang="ts">
import { format } from 'date-fns'
import { parseHeadData } from '~/utilities/CodeInjectionParser';

const appConfig = useAppConfig()
const route = useRoute()

const slug = route.params.slug

const { data, error } = await useFetch(`/api/cms/post/${slug}`)

if (!data.value) {
  let message = error.value?.message;
  if (error.value?.statusCode === 404)
    message = 'Post not found'
  throw createError({
    status: error.value?.statusCode,
    message: message,
    fatal: true
  })
}

const parsedHeadData = computed(() => {
  if (!data.value)
    return undefined

  return parseHeadData(data.value.codeinjection_head ?? '')
})

const dateString = computed(() => {
  if (!data.value)
    return ''

  if (data.value.status !== 'published')
    return 'UNPUBLISHED'

  return data.value.published_at !== null
    ? format(Date.parse(data.value.published_at), 'MMMM d, yyyy')
    : 'UNPUBLISHED'
})

const featureImageAlt = computed(() => {
  return data.value?.feature_image_alt ?? data.value?.feature_image_caption ?? 'Post Feature Image'
})

useSeoMeta({
  title: `${data.value.title} - ${appConfig.name}`,
  description: data.value.meta_description ?? data.value.excerpt,
  ogDescription: data.value.og_description ?? data.value.meta_description ?? data.value.excerpt,
  ogTitle: `${data.value.title} - ${appConfig.name}`,
  articlePublishedTime: data.value.published_at,
  articleModifiedTime: data.value.updated_at,
  ogType: 'article',
  ogUrl: `${appConfig.baseUrl}/posts/${slug}`,
  keywords: parsedHeadData.value?.keywords,
})

defineOgImageComponent('Page', {
  title: data.value.title,
  image: data.value.feature_image,
  description: data.value.og_description ?? data.value.meta_description ?? data.value.excerpt,
})
</script>

<template>

  <div class="w-full py-10">
    <div class="flex flex-col items-center gap-4">
      <WidthContainer class="flex flex-col items-center gap-4 text-persian">
        <h1 class="text-center font-extrabold font-serif2 text-4xl lg:text-5xl">
          {{ data?.title }}
        </h1>
        <h4 class="text-center text-md font-serif">
          <i>{{ data?.excerpt }}</i>
        </h4>
        <div class="flex items-center text-xs uppercase tracking-wide font-serif2 font-bold">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
            class="-ml-1 h-4 -translate-y-px transform opacity-75">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M8 4.75V8.25" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M16 4.75V8.25" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M7.75 10.75H16.25" />
          </svg>
          <span>{{ dateString }}</span>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" class="ml-2 h-4 opacity-75">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M19.25 12C19.25 13 17.5 18.25 12 18.25C6.5 18.25 4.75 13 4.75 12C4.75 11 6.5 5.75 12 5.75C17.5 5.75 19.25 11 19.25 12Z" />
            <circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
              strokeWidth="1.5" />
          </svg>
          <span>{{ data?.reading_time }} min read</span>
        </div>
        <div class="relative">
          <div class="absolute h-full w-full -rotate-1 transform rounded-md bg-licorice bg-opacity-40 -z-10" />
          <NuxtPicture format="avif,webp,jpg" :src="data?.feature_image!" sizes="lg:1000px md:750px sm:300px 100px"
            class="feature-image z-10" :alt="featureImageAlt" :width="2000" :height="1500" placeholder />
        </div>
        <i v-if="data?.feature_image_caption" class="text-sm" v-html="data?.feature_image_caption" />
      </WidthContainer>

      <div class="flex flex-col gap-10 pt-8 max-w-6xl w-[80vw]">
        <LexicalRenderer :state="data?.lexical ?? '{}'" />
      </div>
    </div>
  </div>


</template>

<style lang="scss">
.feature-image>img {
  @apply rounded-lg;
  max-height: 550px;
  object-fit: cover;
}
</style>
