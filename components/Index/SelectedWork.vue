<template>
    <div ref="work" class="w-full flex flex-col gap-4">
        <NuxtLink :to="`/posts/${post.slug}`"
            class="flex flex-col justify-center items-center gap-4 aspect-square w-full bg-gray-300 rounded-md hover:scale-95 duration-300">
            <NuxtPicture format="avif,webp,jpg" :src="post.feature_image" :caption="post.feature_image_caption"
                class="h-full w-full rounded-md work-image" loading="lazy" placeholder alt="Post Featured Image"
                :width="2000" :height="1500" sizes="md:600px sm:370px 200px" />
        </NuxtLink>
        <div class="flex justify-between items-center w-full">
            <div class="flex flex-col justify-between items-start">
                <p class="text-lg font-serif2 text-khaki font-normal">{{ parsedHeadData?.featured_subtitle ??
                    post.excerpt }}</p>
                <h3 class="text-3xl font-serif text-champagne font-bold">{{ parsedHeadData?.featured_title ??
                    post.title }}</h3>
            </div>
            <div class="flex items-center gap-2">
                <span
                    class="text-persian p-2 py-1 border-persian border rounded-full font-serif2 min-w-12 text-center">{{
                        dateTag
                    }}</span>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { parseHeadData } from '~/utilities/CodeInjectionParser';

let ctx: gsap.Context

const work = shallowRef<HTMLDivElement>()

const props = defineProps<{
    post: {
        title: string
        slug: string
        excerpt: string
        feature_image: string
        feature_image_alt: string
        feature_image_caption: string
        published_at: string
        status: string
        codeinjection_head: string
        tags: { id: string, name: string, slug: string, visibility: string }[]
        featured: boolean
    }
}>()

const parsedHeadData = parseHeadData(props.post.codeinjection_head ?? undefined)

const dateTag = computed(() => {
    return props.post.published_at ? format(Date.parse(props.post.published_at), 'yyyy') : '0000'
})

const emit = defineEmits<{
    (e: 'focused'): void
}>()

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (ctx) ctx.revert()

    ctx = gsap.context(() => {
        new ScrollTrigger({
            trigger: work.value!,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => emit('focused'),
            onEnterBack: () => emit('focused'),
        });
    })
})
</script>

<style lang="scss">
.category-tag {
    @apply line-clamp-1;
    @apply hidden md:inline;
}

.work-image>img {
    @apply rounded-md;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>