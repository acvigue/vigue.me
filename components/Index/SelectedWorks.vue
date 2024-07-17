<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SelectedWork from './SelectedWork.vue';
import SplitType from 'split-type';
import { ArrowUpRightIcon } from '@heroicons/vue/24/solid';

let ctx: gsap.Context

const { data } = await useFetch('/api/cms/posts/featured')

const panel = shallowRef<HTMLDivElement>()
const panelHeader = shallowRef<HTMLHeadingElement>()
const panelSubheader = shallowRef<HTMLHeadingElement>()
const digit = shallowRef<HTMLDivElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const words = new SplitType(panelSubheader.value!, {
    types: 'words',
  }).words

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value!,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    })

    tl.from(panelHeader.value!, {
      opacity: 0,
      x: -100,
      ease: 'power1.inOut',
      duration: 0.05,
    })

    tl.from(words, {
      opacity: 0,
      y: 10,
      ease: 'power1.inOut',
      duration: 0.05,
      stagger: 0.01,
    })
  })
})

const setDigit = (num: number) => {
  gsap.set(digit.value!, {
    y: `${-(num) * 100}%`,
  })
}

const digits = computed(() => {
  if (!data.value)
    return []

  return Array.from({ length: data.value.length }, (_, i) => i + 1)
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
    <div class="grid md:grid-cols-12 grid-cols-1 fp">
      <div class="col-span-5 flex text-champagne font-serif fpID">
        <div class="sticky top-0 hidden h-fit w-full overflow-hidden text-[15vw] font-normal text-secondary-50 md:flex">
          <span class="relative">0</span>
          <div class="relative">
            <div ref="digit" class="absolute flex h-full w-fit flex-col transition-all duration-700 ease-in-out-cubic">
              <span v-for="digit of digits" :key="digit" class="inline-block">{{ digit }}.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-span-7 col-span-1">
        <div class=" flex flex-col gap-12 w-full justify-end">
          <!-- @vue-expect-error -->
          <SelectedWork v-for="post, index of data" :key="post.uuid" :post="post" @focused="setDigit(index)" />
          <NuxtLink to="/posts"
            class="flex text-champagne justify-between items-center gap-2 border-champagne border-2 rounded-full px-8 py-3 hover:bg-champagne hover:text-licorice duration-500 mx-auto"
            data-cursor-stick>
            <span class="font-serif2 text-2xl">See More</span>
            <ArrowUpRightIcon class="h-5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
