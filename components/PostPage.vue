<script setup lang="ts">
import { format } from 'date-fns'

const props = defineProps<{
  slug: string
}>()

const isPreview = useRoute().query.preview === 'true'
const appConfig = useAppConfig()

const { data, error } = await useFetch(`/api/post/${props.slug}`, {
  query: { preview: isPreview },
})

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    message: error.value?.message,
    fatal: true,
  })
}

useSeoMeta({
  title: `${data.value.title} - ${appConfig.name}`,
  description: data.value.excerpt ?? '',
  ogImage: data.value.feature_image ?? '',
  articlePublishedTime: data.value.published_at,
  articleModifiedTime: data.value.updated_at,
  ogType: 'article',
  ogUrl: `${appConfig.baseUrl}/posts/${props.slug}`,
})

const dateString = computed(() => {
  if (!data.value)
    return ''

  return data.value.published_at !== null
    ? format(Date.parse(data.value.published_at), 'MMMM d, yyyy')
    : 'UNPUBLISHED'
})
</script>

<template>
  <div class="flex justify-center items-center w-full py-10">
    <div class="flex flex-col h-full lg:max-w-7xl w-[95vw] gap-4">
      <div class="flex flex-col items-center text-white mb-4 gap-4">
        <h1
          class="text-center text-4xl font-serif font-extrabold text-persian md:w-2/3 lg:w-full lg:text-5xl"
        >
          {{ data?.title }}
        </h1>
        <h4
          class="text-md inline text-center font-semibold leading-none text-persian"
        >
          <i>{{ data?.excerpt }}</i>
        </h4>
        <div
          class="flex items-center text-xs uppercase tracking-wide text-persian"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            class="-ml-1 h-4 -translate-y-px transform opacity-75"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.75 8.75C4.75 7.64543 5.64543 6.75 6.75 6.75H17.25C18.3546 6.75 19.25 7.64543 19.25 8.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V8.75Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 4.75V8.25"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 4.75V8.25"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7.75 10.75H16.25"
            />
          </svg>
          <span>{{ dateString }}</span>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            class="ml-2 h-4 opacity-75"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19.25 12C19.25 13 17.5 18.25 12 18.25C6.5 18.25 4.75 13 4.75 12C4.75 11 6.5 5.75 12 5.75C17.5 5.75 19.25 11 19.25 12Z"
            />
            <circle
              cx="12"
              cy="12"
              r="2.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
          <span>{{ data?.reading_time }} min read</span>
        </div>
        <div class="w-full flex justify-center">
          <NuxtPicture
            format="webp,jpg"
            :src="data?.feature_image!"
            :height="1500"
            :width="2000"
            sizes="lg:550px md:500px sm:300px xs:150px"
            class="feature-image"
            placeholder="blur"
          />
        </div>
      </div>

      <div class="flex w-full flex-col gap-5 px-4 antialiased md:px-0">
        <LexicalRenderer :state="data?.lexical ?? '{}'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.feature-image {
  @apply max-w-[80%];
}

.feature-image > img {
  @apply rounded-lg z-30;
}
</style>
