<script setup lang="ts">
import { ComputerDesktopIcon, CpuChipIcon, Square3Stack3DIcon } from '@heroicons/vue/24/outline';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()
const panelHeader = shallowRef<HTMLHeadingElement>()

const skills = [
  {
    header: "Web Development",
    icon: ComputerDesktopIcon,
    description: "I design unique, custom-engineered digital solutions that ensure scalability, performance, and accessibility. My projects make your brand memorable.",
    points: [
      "Headless CMS Integration",
      "Motion & Interactivity",
      "Caching & CDN"
    ]
  },
  {
    header: "Hardware Design",
    icon: CpuChipIcon,
    description: "I specialize in creating custom hardware products tailored to your needs. With an excellent eye for aesthetics, I help your vision stand out, blending technical proficiency with the art of design.",
    points: [
      "PCB Design",
      "Firmware Development",
      "3D Printing & CNC Machining",
    ]
  },
  {
    header: "Cloud Solutions",
    icon: Square3Stack3DIcon,
    description: "I pursue cost-optimized cloud solutions that utilize microservices. With experience on both Oracle Cloud and AWS, I help businesses improve their digital architecture and positively transform operations.",
    points: [
      "Docker & K8s",
      "Reverse Proxying & Load Balancing",
      "CI/CD Pipelines",
    ]
  }
]

const skillBlockStyle = (i: number) => {
  return {
    top: `calc(20vh + ${i * 5}em)`,
    marginBottom: `${17.25 - (i * 5)}em`,
    zIndex: 10 + i
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value!,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    })

    tl.addLabel('start')

    tl.from(panelHeader.value!, {
      opacity: 0,
      x: 100,
      ease: 'power1.inOut',
      duration: 0.05,
    })
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div ref="panel" class="pt-10 w-full flex flex-col">
    <h2
ref="panelHeader"
      class="lg:text-8xl sm:text-7xl text-5xl font-serif2 text-champagne font-bold mb-2 w-full text-right pb-8">
      MY EXPERTISE
    </h2>

    <div
v-for="skill, i of skills" :key="i" class="border-t border-champagne w-full p-4 sticky top-0 bg-licorice"
      :style="skillBlockStyle(i)">
      <div class="flex w-full justify-between items-center h-16">
        <h3 class="text-champagne font-serif2 font-bold text-3xl md:text-4xl mb-4">{{ skill.header }}</h3>
        <component :is="skill.icon" class="text-champagne h-[36px] w-[36px] mb-4" />
      </div>

      <div class=" grid md:grid-cols-2 grid-cols-1 mx-5 gap-4">
        <div class="col-span-1">
          <p class="text-khaki font-serif font-bold md:text-lg text-md">{{ skill.description }}</p>
        </div>
        <div class="col-span-1 md:mt-0 mt-4">
          <h4
v-for="point in skill.points" :key="point"
            class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• {{ point }}
          </h4>

        </div>
      </div>
    </div>
  </div>
</template>
