<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()
const panelHeader = shallowRef<HTMLSpanElement>()
const panelHeader2 = shallowRef<HTMLSpanElement>()
const projectRefs = ref([])

const cta = shallowRef<HTMLDivElement>()

const { data } = await useFetch('/api/posts', {
  query: { limit: 6, featured: true },
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    })

    tl.addLabel('start')

    tl.fromTo(
      panelHeader.value!,
      {
        opacity: 0,
        y: -100,
        ease: 'power1.inOut',
        duration: 0.05,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.05,
      },
    )

    tl.fromTo(
      panelHeader2.value!,
      {
        opacity: 0,
        x: 100,
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
      projectRefs.value!,
      {
        opacity: 0,
        y: 10,
        ease: 'power1.inOut',
        duration: 0.05,
        stagger: 0.02,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power1.inOut',
        duration: 0.05,
        stagger: 0.02,
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
      '<+=0.03',
    )

    const hideTL = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value,
        start: 'bottom 40%',
        end: 'bottom 30%',
        scrub: 1,
      },
    })

    hideTL.fromTo(
      panel.value!,
      {
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.5,
      },
      {
        opacity: 0,
        ease: 'power1.inOut',
        duration: 0.5,
      },
    )

    nextTick(() => {
      nextTick(() => {
        tl.scrollTrigger!.refresh()
        hideTL.scrollTrigger!.refresh()
      })
    })
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <IndexPanel class="expandable py-[3rem]">
    <div ref="panel" class="flex justify-center items-center w-full">
      <div class="flex flex-col h-full lg:max-w-7xl w-[80vw] gap-4">
        <div class="flex flex-1 justify-start gap-2">
          <span ref="panelHeader" class="font-serif italic md:text-7xl text-4xl text-persian font-bold">Featured</span>
          <span ref="panelHeader2" class="font-serif italic md:text-7xl text-4xl mt-6">Projects</span>
        </div>

        <div v-if="data" class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full">
          <div v-for="project of data.posts" ref="projectRefs" :key="project.uuid">
            <BlogPost :post="project" class="flex p-4 w-full justify-between items-center gap-4" />
          </div>
        </div>
        <div class="flex-1 flex justify-center items-start">
          <div ref="cta">
            <NuxtLink to="/posts"
              class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
              data-cursor-stick>
              <span class="font-serif2 text-lg">see more</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </IndexPanel>
</template>

<style lang="scss" scoped>
.project {
  &:not(:last-of-type) {
    @apply border-b-2 border-khaki;
  }
}
</style>
