<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

    tl.from(item1.value!, {
      opacity: 0,
      y: 10,
      ease: 'power1.inOut',
      duration: 0.5,
    }, 1.5)

    tl.from(item2.value!, {
      opacity: 0,
      y: 10,
      ease: 'power1.inOut',
      duration: 0.5,
    }, '<+0.2')

    tl.from(item3.value!, {
      opacity: 0,
      y: 10,
      ease: 'power1.inOut',
      duration: 0.5,
    }, '<+0.2')

    tl.from(scrollIndicator.value!, {
      opacity: 0,
      y: -20,
      ease: 'power1.inOut',
      duration: 0.5,
    }, '<+0.5')

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
  <WidthContainer>
    <div ref="panel" class="flex flex-col justify-between items-center w-full h-full gap-8 hero-panel py-12">
      <div class="flex-1" />

      <div class="flex flex-col items-center w-full text-licorice">
        <div class="font-serif2 font-bold lg:text-8xl sm:text-7xl text-5xl uppercase" data-cursor="-pointer">
          <span>Aiden Vigue</span>
        </div>

        <div
          class="flex max-w-[60vw] lg:max-w-2xl justify-between items-center w-full mt-8 font-serif md:text-4xl sm:text-3xl text-2xl text-persian lowercase">
          <span ref="item1">Student</span>
          <span ref="item2">Developer</span>
          <span ref="item3">Maker</span>
        </div>
      </div>

      <div class="flex-1" />

      <div class="flex justify-center items-center w-full">
        <div ref="scrollIndicator">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  </WidthContainer>
</template>

<style lang="scss">
.hero-panel {
  height: calc(100vh - 5rem);
}
</style>