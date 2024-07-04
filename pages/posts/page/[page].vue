<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const appConfig = useAppConfig()
const route = useRoute()

const rawPage = route.params.page

if (typeof rawPage !== 'string') {
    throw createError({
        statusCode: 400,
        message: 'Bad page format',
        fatal: true,
    })
}

const page = parseInt(rawPage)

useSeoMeta({
    title: `Posts: Page ${page} - ${appConfig.name}`,
    description: appConfig.postListMetaDescription,
    ogDescription: appConfig.postListMetaDescription,
    ogTitle: `Posts: Page ${page} - ${appConfig.name}`,
    ogType: 'website',
    ogUrl: `${appConfig.baseUrl}/posts/${page}`,
})

defineOgImageComponent('Page', {
    title: `Posts: Page ${page}`,
    image: appConfig.headshotImage,
    description: appConfig.postListMetaDescription,
})

const maxVisibleButtons = 5

const { data } = await useFetch(`/api/cms/posts/by-page/${page}`)

const totalPages = computed(() => {
    if (!data.value)
        return 0
    return data.value.pagination.pages
})

const startPage = computed(() => {
    // When on the first page
    if (page === 1)
        return 1

    // When on the last page
    if (page === totalPages.value)
        return Math.max(1, totalPages.value - maxVisibleButtons)

    // When inbetween
    return page - 1
})

const pages = computed(() => {
    const range = []

    for (
        let i = startPage.value;
        i <= Math.min(startPage.value + maxVisibleButtons - 1, totalPages.value);
        i++
    ) {
        range.push({
            name: i,
            isDisabled: i === page,
        })
    }

    return range
})

function goToPage(newPage: number) {
    if (page === newPage)
        return
    navigateTo(`/posts/page/${newPage}`)
}
</script>

<template>
    <div class="flex justify-center items-center w-full py-10">
        <div class="flex flex-col h-full lg:max-w-7xl w-[90vw] gap-4">
            <DuotoneHeading title="All Blog Posts" subtitle="Take a look!" />

            <div v-if="data" class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 w-full">
                <!-- @vue-expect-error -->
                <BlogPost v-for="post in data.posts" :key="post.uuid" :post="post"
                    class="flex p-4 w-full justify-between items-center gap-2" />
            </div>
            <div class="flex-1 flex justify-center items-start">
                <button :disabled="page === 1"
                    class="rounded-l-lg text-persian p-2 border-persian border-2 border-r-0 h-10 w-10 flex items-center justify-center font-bold font-serif2 disabled:border-khaki disabled:text-khaki"
                    @click="goToPage(page - 1)">
                    <ArrowLeftIcon class="h-5 w-5" />
                </button>
                <button v-for="p in pages" :key="p.name" :disabled="p.isDisabled" :class="{
                    'bg-persian !border-persian !text-champagne': p.name === page,
                }" class="text-persian p-2 border-persian border-2 border-l-1 border-r-0 h-10 w-10 flex items-center justify-center font-bold font-serif2 disabled:border-khaki disabled:text-khaki"
                    @click="goToPage(p.name)">
                    {{ p.name }}
                </button>
                <button :disabled="page === totalPages"
                    class="rounded-r-lg text-persian p-2 border-persian border-2 border-l-1 h-10 w-10 flex items-center justify-center font-bold font-serif2 disabled:border-khaki disabled:text-khaki"
                    @click="goToPage(page + 1)">
                    <ArrowRightIcon class="h-5 w-5" />
                </button>
            </div>
        </div>
    </div>
</template>
