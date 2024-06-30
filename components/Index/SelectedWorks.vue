<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import SelectedWork from './SelectedWork.vue';

let ctx: gsap.Context

const { data } = await useFetch('/api/cms/allPosts', {
  query: { limit: 6, featured: true },
})


const panel = shallowRef<HTMLDivElement>()
const panelHeader = shallowRef<HTMLHeadingElement>()
const panelSubheader = shallowRef<HTMLHeadingElement>()
const featuredProjects = shallowRef<HTMLDivElement>()
const featuredProjectID = shallowRef<HTMLDivElement>()
const featuredProjectIDDigit = shallowRef<HTMLDivElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(SplitText)

  const words = new SplitText(panelSubheader.value!, { type: 'words' }).words

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value!,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    })

    tl.addLabel('start')

    tl.fromTo(
      panelHeader.value!,
      {
        opacity: 0,
        x: -100,
        ease: 'power1.inOut',
        duration: 0.05,
      },
      {
        opacity: 1,
        x: 0,
        ease: 'power1.inOut',
        duration: 0.05,
      },
    )

    tl.fromTo(
      words,
      {
        opacity: 0,
        y: 10,
        ease: 'power1.inOut',
        duration: 0.05,
        stagger: 0.01,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.05,
        stagger: 0.01,
      },
    )

    new ScrollTrigger({
      trigger: featuredProjects.value!,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: featuredProjectID.value!,
      pinSpacing: false,
    });
  })
})

const setDigit = (digit: number) => {
  gsap.set(featuredProjectIDDigit.value!, {
    y: `${-(digit) * 100}%`,
  })
}

const digits = computed(() => {
  if (!data.value)
    return []

  return Array.from({ length: data.value.posts.length }, (_, i) => i + 1)
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div v-if="data" ref="panel" class="w-full flex flex-col pb-20">
    <h2 ref="panelHeader" class="lg:text-8xl sm:text-7xl text-5xl font-serif2 text-champagne font-bold mb-8 pb-0">
      FEATURED WORKS
    </h2>
    <h3 ref="panelSubheader"
      class="lg:text-3xl sm:text-3xl text-2xl font-serif2 text-champagne font-bold mb-12 w-full text-right pb-0">
      Here are some of my favorite projects I've worked on.
    </h3>
    <div ref="featuredProjects" class="grid md:grid-cols-12 grid-cols-1">
      <div ref="featuredProjectID" class="col-span-5 md:flex hidden text-champagne font-serif">
        <div class="sticky top-0 hidden h-fit w-full overflow-hidden text-[15vw] font-normal text-secondary-50 md:flex">
          <span class="relative">0</span>
          <div class="relative">
            <div ref="featuredProjectIDDigit"
              class="absolute flex h-full w-fit flex-col transition-all duration-700 ease-in-out-cubic">
              <span v-for="digit of digits" :key="digit" class="inline-block">{{ digit }}.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-span-7 col-span-1">
        <div class=" flex flex-col gap-12 w-full justify-end">
          <SelectedWork v-for="post, index of data.posts" :key="post.uuid" :post="post" @focused="setDigit(index)" />
        </div>
      </div>
    </div>
  </div>
</template>
