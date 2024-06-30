<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()
const panelHeader = shallowRef<HTMLHeadingElement>()
const headshotImage = shallowRef<HTMLDivElement>()
const bodyText = shallowRef<HTMLSpanElement>()

//const cta = shallowRef<HTMLDivElement>()

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
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div ref="panel" class="w-full">
    <h2 ref="panelHeader" class="lg:text-8xl sm:text-7xl text-5xl font-serif2 text-champagne font-bold mb-12">SELECTED
      WORKS</h2>
    <div class="md:grid-cols-2 grid-cols-1 grid">
      <div class="col-span-1 md:mb-0 mb-12">
        <div class="flex justify-center w-full">
          <div ref="headshotImage" class="relative h-full z-0">
            <div class="absolute h-full w-full -rotate-2 transform rounded-md bg-khaki bg-opacity-20 -z-10" />
            <NuxtPicture format="avif,webp,jpg" src="/images/headshot.webp" sizes="lg:40vw 500px"
              class="about-headshot z-10" placeholder placeholder-class="custom" data-cursor="-pointer" />
          </div>
        </div>

      </div>
      <div class="col-span-1">
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
      </div>
    </div>
  </div>
</template>