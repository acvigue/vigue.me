<script setup lang="ts">
//TK: rename to BigPanel

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const _tl = gsap.timeline()
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div ref="panel" class="bg-licorice breakout rounded-t-2xl z-50">
    <WidthContainer>
      <IndexAbout />
      <IndexSkills />
      <div class="h-[1000px] w-full" />
    </WidthContainer>
  </div>
</template>
