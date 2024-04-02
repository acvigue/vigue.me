<template>
  <Separator :index="2">Projects</Separator>
  <Panel>
    <div class="flex justify-center items-center w-full" ref="panel">
      <div class="flex flex-col h-full lg:max-w-7xl w-[80vw]">
        <div class="flex flex-col flex-1 justify-center">
          <span
            class="font-serif italic text-7xl font-bold leading-3"
            ref="panelHeader"
            >Featured</span
          >
          <span
            class="font-serif italic text-7xl text-taupe ml-72"
            ref="panelHeader"
            >Projects</span
          >
        </div>

        <div class="flex flex-col justify-start items-end w-full px-20">
          <div class="flex project p-4 w-full">
            <span class="text-4xl font-serif">Project 1 Title</span>
          </div>
          <div class="flex project p-4 w-full">
            <span class="text-4xl font-serif">Project 2 Title</span>
          </div>
          <div class="flex project p-4 w-full">
            <span class="text-4xl font-serif">Project 3 Title</span>
          </div>
        </div>

        <div class="flex-1"></div>
      </div>
    </div>
  </Panel>
</template>

<style lang="scss" scoped>
.project {
  &:not(:last-of-type) {
    @apply border-b-2 border-khaki;
  }
}
</style>

<script setup lang="ts">
import { ArrowUpRightIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/solid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let ctx: gsap.Context;

const panel = shallowRef<HTMLDivElement>();
const panelHeader = shallowRef<HTMLSpanElement>();
const bodyText = shallowRef<HTMLSpanElement>();

const cta = shallowRef<HTMLDivElement>();

const cvOpen = ref(false);

onNuxtReady(() => {
  gsap.registerPlugin(SplitText, ScrollTrigger);
  /*
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value,
        start: "top 60%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

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
  });
  */
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
