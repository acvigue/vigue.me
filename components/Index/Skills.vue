<script setup lang="ts">
import { ComputerDesktopIcon, CpuChipIcon, Square3Stack3DIcon } from '@heroicons/vue/24/outline';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

let ctx: gsap.Context

const panel = shallowRef<HTMLDivElement>()
const panelHeader = shallowRef<HTMLHeadingElement>()
const skillBlock1 = shallowRef<HTMLDivElement>()
const skillBlock2 = shallowRef<HTMLDivElement>()
const skillBlock3 = shallowRef<HTMLDivElement>()

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

    tl.addLabel('start')

    tl.fromTo(
      panelHeader.value!,
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

    new ScrollTrigger({
      trigger: skillBlock1.value!,
      start: 'top 20%',
      end: '+=920',
      scrub: 1,
      pin: true,
    })

    new ScrollTrigger({
      trigger: skillBlock2.value!,
      start: 'top 20%',
      end: '+=420',
      scrub: 1,
      pin: true,
    })
  })
})

onBeforeUnmount(() => {
  if (ctx)
    ctx.revert()
})
</script>

<template>
  <div ref="panel" class="pt-20 w-full flex flex-col">
    <h2 ref="panelHeader"
      class="lg:text-8xl sm:text-7xl text-5xl font-serif2 text-champagne font-bold mb-12 w-full text-right pb-8">
      MY EXPERTISE
    </h2>

    <div ref="skillBlock1" class="skills-block border-t border-champagne w-full p-4 h-[500px]">
      <div class="flex w-full justify-between items-center h-16">
        <h3 class="text-champagne font-serif2 font-bold text-3xl md:text-4xl mb-4">Web Development</h3>
        <ComputerDesktopIcon class="text-champagne h-[36px] w-[36px] mb-4" />
      </div>

      <div class=" grid md:grid-cols-2 grid-cols-1 mx-5 gap-4">
        <div class="col-span-1">
          <p class="text-khaki font-serif font-bold md:text-lg text-md">I design unique, custom-engineered digital
            solutions that
            ensure
            scalability, performance, and accessibility. My projects make your brand memorable.</p>
        </div>
        <div class="col-span-1 md:mt-0 mt-4">
          <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Headless CMS
            Integration
          </h4>
          <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Motion &
            Interactivity
          </h4>
          <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Caching & CDN
          </h4>
        </div>
      </div>
    </div>
    <div ref="skillBlock2" class="skills-block w-full h-[500px]">
      <div class="flex w-full justify-between items-center h-20" />
      <div class="flex flex-col border-t border-champagne bg-licorice p-4">
        <div class="flex w-full justify-between items-center h-16">
          <h3 class="text-champagne font-serif2 font-bold text-3xl md:text-4xl mb-4">Hardware Design</h3>
          <CpuChipIcon class="text-champagne h-[36px] w-[36px] mb-4" />
        </div>
        <div class=" grid md:grid-cols-2 grid-cols-1 mx-5 gap-4">
          <div class="col-span-1">
            <p class="text-khaki font-serif font-bold md:text-lg text-md">I specialize in creating custom hardware
              products
              tailored
              to your
              needs. With an excellent eye for PCB aesthetics, I help your vision stand out, blending technical
              proficiency
              with the art of design.
            </p>
          </div>
          <div class="col-span-1 md:mt-0 mt-4">
            <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Multi Layer
              PCB Design
            </h4>
            <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Firmware
              Development</h4>
            <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Power &
              Signals
              Simulation
            </h4>
          </div>
        </div>
      </div>

    </div>
    <div ref="skillBlock3" class="skills-block  w-full mb-20 z-10">
      <div class="flex w-full justify-between items-center h-20" />
      <div class="flex flex-col border-t border-champagne bg-licorice p-4">
        <div class="flex w-full justify-between items-center h-16">
          <h3 class="text-champagne font-serif2 font-bold text-3xl md:text-4xl mb-4">Cloud Solutions</h3>
          <Square3Stack3DIcon class="text-champagne h-[36px] w-[36px] mb-4" />
        </div>
        <div class=" grid md:grid-cols-2 grid-cols-1 mx-5 gap-4">
          <div class="col-span-1">
            <p class="text-khaki font-serif font-bold md:text-lg text-md">I pursue cost-optimized cloud solutions that
              utilize
              microservices. With experience on both Oracle Cloud and AWS, I help businesses improve their digital
              architecture and
              positively transform operations.</p>
          </div>
          <div class="col-span-1 md:mt-0 mt-4">
            <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Docker</h4>
            <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Nginx</h4>
            <h4 class="text-khaki font-serif2 font-bold md:text-2xl text-xl py-2 border-b border-khaki">• Distributed
              SQL</h4>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
