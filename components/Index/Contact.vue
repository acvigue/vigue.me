<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

let ctx: gsap.Context

/*
onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value,
        start: 'top 60%',
        end: 'top 20%',
        scrub: 1,
      },
    })

    const lines = new SplitText(bodyText.value!, { type: "lines" }).lines;

    tl.addLabel("start");

    tl.fromTo(
      panelHeader.value!,
      {
        opacity: 0,
        x: -100,
        ease: "power1.inOut",
        duration: 0.05,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power1.inOut",
        duration: 0.05,
      }
    );

    tl.fromTo(
      lines,
      {
        opacity: 0,
        x: 100,
        ease: "power1.inOut",
        duration: 0.05,
        stagger: 0.01,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power1.inOut",
        duration: 0.05,
        stagger: 0.01,
      }
    );

    tl.fromTo(
      cta.value!,
      {
        opacity: 0,
        y: 100,
        ease: "power1.inOut",
        duration: 0.05,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.05,
      },
      "<+=0.03"
    );

  })
})
*/

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <IndexPanel>
    <div class="flex justify-center items-center w-full py-[4rem]">
      <div class="flex flex-col h-full lg:max-w-4xl w-[80vw] justify-center gap-4">
        <div class="flex flex-1 justify-start items-center gap-2">
          <span class="font-serif italic md:text-7xl text-4xl text-persian font-bold">Let's</span>
          <span class="font-serif italic md:text-6xl text-4xl mt-8">Connect</span>
        </div>
        <div class="rounded-lg p-4 border border-khaki shadow-lg">
          <FormKit type="form" class="lg:w-2xl" :actions="false">
            <FormKit type="text" label="Name" validation="required" />
            <FormKit type="text" label="Email" validation="required|email" />
            <FormKit type="textarea" label="Message" validation="required" />
            <button type="submit"
              class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
              data-cursor-stick>
              <span class="font-serif2 text-lg">Send </span>
              <EnvelopeIcon class="h-5" />
            </button>
          </FormKit>
        </div>
        <div class="flex-1" />
      </div>
    </div>
  </IndexPanel>
</template>

<style lang="scss">
.icon * {
  @apply fill-transparent;
}
</style>
