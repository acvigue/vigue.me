<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen z-[150] bg-licorice text-champagne bg-opacity-95 flex flex-col"
  >
    <div class="flex-1 flex p-5 justify-between items-center">
      <div class="flex-1">
        <button
          class="cursor-pointer hover:scale-125 duration-500 h-10"
          data-cursor-stick
          @click="$emit('close')"
        >
          <XMarkIcon class="h-full" />
        </button>
      </div>

      <span class="font-serif text-lg">Resume</span>
      <div class="flex-1"></div>
    </div>
    <VuePdfEmbed
      annotation-layer
      text-layer
      source="https://blogcdn.vigue.me/Resume.pdf"
    />
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VuePdfEmbed from "vue-pdf-embed";
import "vue-pdf-embed/dist/style/index.css";

let ctx: gsap.Context;

const panel = shallowRef<HTMLDivElement>();
const firstName = shallowRef<HTMLSpanElement>();
const lastName = shallowRef<HTMLSpanElement>();

const item1 = shallowRef<HTMLDivElement>();
const item2 = shallowRef<HTMLDivElement>();
const item3 = shallowRef<HTMLDivElement>();

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    if (!panel.value) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value,
        start: "top top+=10%",
        end: "bottom top",
      },
    });

    tl.addLabel("start");

    tl.fromTo(
      firstName.value!,
      {
        opacity: 0,
        x: 100,
        ease: "power1.inOut",
        duration: 1,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power1.inOut",
        duration: 1,
      },
      "start"
    );

    tl.fromTo(
      lastName.value!,
      {
        opacity: 0,
        x: -100,
        ease: "power1.inOut",
        duration: 1,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power1.inOut",
        duration: 1,
      },
      "start"
    );

    tl.fromTo(
      item1.value!,
      {
        opacity: 0,
        y: 10,
        ease: "power1.inOut",
        duration: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.5,
      },
      "<+0.5"
    );

    tl.fromTo(
      item2.value!,
      {
        opacity: 0,
        y: 10,
        ease: "power1.inOut",
        duration: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.5,
      },
      "<+0.5"
    );

    tl.fromTo(
      item3.value!,
      {
        opacity: 0,
        y: 10,
        ease: "power1.inOut",
        duration: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.5,
      },
      "<+0.5"
    );
  });
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
