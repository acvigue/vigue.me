<script setup lang="ts">
const { $gsap } = useNuxtApp()

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()
const firstName = shallowRef<HTMLSpanElement>()
const lastName = shallowRef<HTMLSpanElement>()

const item1 = shallowRef<HTMLDivElement>()
const item2 = shallowRef<HTMLDivElement>()
const item3 = shallowRef<HTMLDivElement>()

const scrollIndicator = shallowRef<HTMLDivElement>()

onMounted(() => {
  ctx = $gsap.context(() => {
    const tl = $gsap.timeline()

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
      '<',
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

    $gsap.to('#scroll-indicator', {
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
  <Panel>
    <div
      ref="panel"
      class="flex justify-center items-center w-full flex-col h-full"
    >
      <div class="flex-1 flex items-start justify-end w-full">
        <NowPlayingOnSpotify class="m-20" />
      </div>
      <div class="flex flex-col items-center w-full text-licorice">
        <span
          ref="firstName"
          class="font-serif italic font-bold text-8xl opacity-0"
          data-cursor="-pointer"
        >Aiden</span>

        <span
          ref="lastName"
          class="font-serif italic font-bold text-8xl opacity-0"
          data-cursor="-pointer"
        >Vigue</span>
        <div
          class="flex max-w-[60vw] lg:max-w-2xl justify-between items-center w-full mt-8"
        >
          <span
            ref="item1"
            class="font-serif2 md:text-3xl text-xl text-persian opacity-0"
          >Student</span>
          <span
            ref="item2"
            class="font-serif2 md:text-3xl text-xl text-persian opacity-0"
          >Developer</span>
          <span
            ref="item3"
            class="font-serif2 md:text-3xl text-xl text-persian opacity-0"
          >Maker</span>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-end">
        <div ref="scrollIndicator" class="mb-12 opacity-0">
          <ScrollIndicator />
        </div>
      </div>
    </div>
  </Panel>
</template>
