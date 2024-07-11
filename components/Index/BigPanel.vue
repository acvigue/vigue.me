<script setup lang="ts">
//TK: rename to BigPanel

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const exitTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value!,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: 1
      },
    })

    exitTimeline.to(
      panel.value!,
      {
        scaleX: 0.95,
        duration: 1,
      }
    )
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div ref="panel" class="bg-licorice rounded-2xl overflow-clip">
    <WidthContainer>
      <IndexAbout />
      <IndexSkills />
      <IndexSelectedWorks />
    </WidthContainer>
  </div>
</template>
