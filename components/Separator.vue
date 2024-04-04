<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{
  index: number
}>()

const separator = shallowRef<HTMLDivElement>()

let ctx: gsap.Context

const indexFormatted = computed(() => {
  return props.index.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
})

onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: separator.value,
        start: 'bottom bottom',
        end: `bottom top`,
        scrub: 1,
      },
    })

    tl.to(separator.value!, {
      y: -window.innerHeight,
      height: window.innerHeight,
      ease: 'power2.out',
      duration: 1,
    })
    tl.to(
      separator.value!,
      {
        height: 0,
        ease: 'power1.out',
        duration: 5,
      },
      '+=4',
    )
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div
    ref="separator"
    class="fixed flex w-full bg-licorice justify-start items-end h-24 p-5 py-8 text-champagne"
  >
    <div class="flex items-center gap-4">
      <div
        class="rounded-full border-2 h-10 w-10 border-champagne flex items-center justify-center"
      >
        <span class="font-serif2 text-lg">{{ indexFormatted }}</span>
      </div>
      <span class="font-serif2 text-xl"><slot /></span>
    </div>
  </div>
</template>
