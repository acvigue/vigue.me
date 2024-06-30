<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ArrowDownTrayIcon, ArrowUpRightIcon } from '@heroicons/vue/24/solid'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()
const panelHeader = shallowRef<HTMLHeadingElement>()
const headshotImage = shallowRef<HTMLDivElement>()
const bodyText = shallowRef<HTMLSpanElement>()
const cta = shallowRef<HTMLDivElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(SplitText)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value!,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    })

    const lines = new SplitText(bodyText.value!, { type: 'lines' }).lines

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
      headshotImage.value!,
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
      "<+0.02"
    )

    tl.fromTo(
      lines,
      {
        opacity: 0,
        x: 100,
        ease: 'power1.inOut',
        duration: 0.05,
        stagger: 0.01,
      },
      {
        opacity: 1,
        x: 0,
        ease: 'power1.inOut',
        duration: 0.05,
        stagger: 0.01,
      },
    )

    tl.fromTo(
      cta.value!,
      {
        opacity: 0,
        y: 100,
        ease: 'power1.inOut',
        duration: 0.05,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.05,
      },
      '>+=0.03',
    )
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div ref="panel" class="pt-20 w-full">
    <h2 ref="panelHeader" class="lg:text-8xl sm:text-7xl text-5xl font-serif2 text-champagne font-bold mb-12">BIO</h2>
    <div class="flex justify-center w-full">
      <div class="max-w-4xl w-[85vw]">
        <span ref="bodyText" class="font-serif md:text-3xl text-xl text-champagne">
          As a
          <b data-cursor="-pointer" class="text-persian font-serif2">computer science student</b>
          at Purdue University with a passion for
          <b data-cursor="-pointer" class="text-persian font-serif2">engineering</b>, my skills intersect to design
          digital products. I possess a wide
          range of experience in several programming languages and tools, and my
          involvement in numerous past projects has helped to solidify my
          foundational expertise in the realm of embedded systems and
          <b data-cursor="-pointer" class="text-persian font-serif2">software development.</b>
        </span>
        <div ref="cta" class="flex flex-col gap-4 mt-4">
          <div class="flex justify-end mr-48">
            <span class="font-serif text-md text-champagne font-bold">Want to learn more?</span>
          </div>
          <div class="flex justify-end items-center gap-4">
            <NuxtLink to="/contact"
              class="flex text-champagne items-center gap-2 border-champagne border-2 rounded-full px-4 hover:bg-champagne hover:text-licorice duration-500"
              data-cursor-stick>
              <span class="font-serif2 text-lg">Contact</span>
              <ArrowUpRightIcon class="h-5" />
            </NuxtLink>
            <NuxtLink to="/resume"
              class="flex text-champagne items-center gap-2 border-champagne border-2 rounded-full px-4 hover:bg-champagne hover:text-licorice duration-500"
              data-cursor-stick>
              <span class="font-serif2 text-lg">Résumé</span>
              <ArrowDownTrayIcon class="h-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about-headshot>img {
  max-height: 40vh;
  object-fit: cover;
  @apply rounded-md;
}
</style>
