<template>
  <div
    ref="scrollIndicator"
    class="fixed bottom-3 left-0 flex justify-center items-center w-screen p-4 flex-col gap-2 transform-gpu"
  >
    <h1 class="text-xl">Scroll to experience</h1>
    <ArrowDownIcon class="w-4 h-4"></ArrowDownIcon>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownIcon } from "@heroicons/vue/24/outline";
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";

const scrollIndicator = ref<HTMLDivElement>();

let ctx: gsap.Context;

onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    immediateRender: false,
    scrub: true,
  });

  const tl = gsap.timeline();
  tl.to(scrollIndicator.value!, {
    css: { opacity: 0 },
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: "#jumbotron",
      start: "top top",
      end: "top top-=700",
    },
  });
});

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>
