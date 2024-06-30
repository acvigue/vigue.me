<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRightIcon } from '@heroicons/vue/24/solid'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()

const item1 = shallowRef<HTMLDivElement>()
const item2 = shallowRef<HTMLDivElement>()
const item3 = shallowRef<HTMLDivElement>()

const scrollIndicator = shallowRef<HTMLDivElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      item1.value!,
      {
        opacity: 0,
        y: 10,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      1.5,
    )

    tl.fromTo(
      item2.value!,
      {
        opacity: 0,
        y: 10,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      '<+0.2',
    )

    tl.fromTo(
      item3.value!,
      {
        opacity: 0,
        y: 10,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      '<+0.2',
    )

    tl.fromTo(
      scrollIndicator.value!,
      {
        opacity: 0,
        y: -20,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      '<+0.5',
    )

    gsap.to('#scroll-indicator', {
      scrollTrigger: {
        trigger: panel.value!,
        start: 'bottom bottom',
        end: 'bottom 80%',
        scrub: 1,
      },
      opacity: 0,
      ease: 'power1.inOut',
      duration: 0.5,
    })

    gsap.to(panel.value!, {
      scrollTrigger: {
        trigger: panel.value!,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
      },
      scale: 0.9,
      opacity: 0,
      y: "+30%",
      ease: 'inOut',
      duration: 0.5,
    })
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div ref="panel" class="flex flex-col justify-between items-center w-full h-full gap-8 py-12">
    <div class="flex-1" />

    <div class="flex flex-col items-center w-full text-licorice gap-4">
      <div class="font-serif2 font-bold lg:text-8xl sm:text-7xl text-5xl uppercase" data-cursor="-pointer">
        <span>Got an Idea?</span>
      </div>

      <NuxtLink to="/contact"
        class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-8 py-3 hover:bg-licorice hover:text-champagne duration-500"
        data-cursor-stick>
        <span class="font-serif2 text-2xl">Contact</span>
        <ArrowUpRightIcon class="h-5" />
      </NuxtLink>
    </div>
  </div>
</template>