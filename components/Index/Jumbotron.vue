<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()
const firstName = shallowRef<HTMLSpanElement>()
const lastName = shallowRef<HTMLSpanElement>()

const item1 = shallowRef<HTMLDivElement>()
const item2 = shallowRef<HTMLDivElement>()
const item3 = shallowRef<HTMLDivElement>()

const scrollIndicator = shallowRef<HTMLDivElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      firstName.value!,
      {
        opacity: 0,
        x: 100,
        ease: 'power1.inOut',
        duration: 0.7,
      },
      {
        opacity: 1,
        x: 0,
        ease: 'power1.inOut',
        duration: 0.7,
      },
      0,
    )

    tl.fromTo(
      lastName.value!,
      {
        opacity: 0,
        x: -100,
        ease: 'power1.inOut',
        duration: 0.7,
      },
      {
        opacity: 1,
        x: 0,
        ease: 'power1.inOut',
        duration: 0.7,
      },
      '>-0.5',
    )

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
      '<+0.5',
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
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <IndexPanel>
    <div ref="panel" class="flex justify-end items-center w-full flex-col h-full gap-8 pb-12">
      <div class="flex flex-col items-center w-full text-licorice">
        <div class="font-serif2 font-bold text-8xl uppercase" data-cursor="-pointer">
          <span ref="firstName" class="opacity-0">Aiden</span>
          <span>&nbsp;</span>
          <span ref="lastName" class="opacity-0">Vigue</span>
        </div>

        <div
          class="flex max-w-[60vw] lg:max-w-2xl justify-between items-center w-full mt-8 font-serif md:text-3xl text-xl text-persian lowercase">
          <span ref="item1" class="opacity-0">Student</span>
          <span ref="item2" class="opacity-0">Developer</span>
          <span ref="item3" class="opacity-0">Maker</span>
        </div>
      </div>
      <div class="flex justify-center items-center w-full">
        <div ref="scrollIndicator" class="opacity-0">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  </IndexPanel>
</template>
