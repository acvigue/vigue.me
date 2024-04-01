<template>
  <div
    class="flex justify-center items-center w-full flex-col h-full"
    ref="panel"
  >
    <div class="flex-1"></div>
    <div class="flex flex-col items-center w-full">
      <span class="font-serif text-8xl italic" ref="firstName">Aiden</span>
      <span class="font-serif text-8xl italic" ref="lastName">Vigue</span>
      <div
        class="flex max-w-[60vw] lg:max-w-2xl justify-between items-center w-full mt-8"
      >
        <span class="font-serif2 text-3xl text-taupe" ref="item1">Student</span>
        <span class="font-serif2 text-3xl text-taupe" ref="item2"
          >Developer</span
        >
        <span class="font-serif2 text-3xl text-taupe" ref="item3">Maker</span>
      </div>
    </div>
    <div class="flex-1 flex flex-col justify-end">
      <div class="mb-12" ref="scrollIndicator">
        <ScrollIndicator />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let ctx: gsap.Context;

const panel = shallowRef<HTMLDivElement>();
const firstName = shallowRef<HTMLSpanElement>();
const lastName = shallowRef<HTMLSpanElement>();

const item1 = shallowRef<HTMLDivElement>();
const item2 = shallowRef<HTMLDivElement>();
const item3 = shallowRef<HTMLDivElement>();

const scrollIndicator = shallowRef<HTMLDivElement>();

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
        duration: 0.7,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power1.inOut",
        duration: 0.7,
      },
      "start"
    );

    tl.fromTo(
      lastName.value!,
      {
        opacity: 0,
        x: -100,
        ease: "power1.inOut",
        duration: 0.7,
      },
      {
        opacity: 1,
        x: 0,
        ease: "power1.inOut",
        duration: 0.7,
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
      "<+0.2"
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
      "<+0.2"
    );

    tl.fromTo(
      scrollIndicator.value!,
      {
        opacity: 0,
        y: -20,
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
