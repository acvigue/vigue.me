<script setup lang="ts">
//This is the master slug router

//We first attempt to match to a page
//Then we attempt to match to a post
//If neither, we redirect to 404

const route = useRoute()
const slug = route.params.slug
const appConfig = useAppConfig()

if (typeof slug !== 'string') {
  throw createError({
    statusCode: 400,
    message: "Invalid slug",
    fatal: true,
  })
}

const isUuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(slug)
const queryData = isUuid ? { uuid: slug } : { slug: slug }

const { data, error } = await useFetch(`/api/cms/page`, {
  query: queryData,
})

if (error.value || !data.value) {
  const { error: error_post } = await useFetch(`/api/cms/post`, {
    query: queryData,
  })

  if (error_post.value) {
    throw createError({
      statusCode: error_post.value?.statusCode,
      message: "Page not found",
      fatal: true,
    })
  } else {
    navigateTo(`/posts/${slug}`)
  }
} else {
  useSeoMeta({
    title: `${data.value.title} - ${appConfig.name}`,
    description: data.value.meta_description ?? data.value.excerpt,
    ogDescription: data.value.og_description ?? data.value.meta_description ?? data.value.excerpt,
    ogTitle: `${data.value.title} - ${appConfig.name}`,
    articlePublishedTime: data.value.published_at,
    articleModifiedTime: data.value.updated_at,
    ogType: 'website',
    ogUrl: `${appConfig.baseUrl}/${data.value.slug}`,
  })

  defineOgImageComponent('Page', {
    title: data.value.title,
    image: appConfig.headshotImage,
    description: data.value.og_description ?? data.value.meta_description ?? data.value.excerpt,
  })
}
</script>

<template>
  <div v-if="!error" class="flex justify-center items-center w-full py-10">
    <div class="flex flex-col h-full lg:max-w-7xl w-[95vw] gap-4">
      <div class="flex flex-col items-center text-white mb-4 gap-4">
        <h1 class="text-center text-4xl font-serif font-extrabold text-persian md:w-2/3 lg:w-full lg:text-5xl">
          {{ data?.title }}
        </h1>
      </div>

      <div class="flex w-full flex-col gap-5 px-4 antialiased md:px-0">
        <!-- @vue-expect-error -->
        <LexicalRenderer :state="data?.lexical ?? '{}'" />
      </div>
    </div>
  </div>
</template>
