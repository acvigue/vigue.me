<template>
  <div
    class="flex flex-col items-start justify-start w-full h-full gap-8 pt-[4.5rem]"
  >
    <h1
      class="text-4xl font-semibold font-mono drop-shadow-lg text-pink-600 p-11"
    >
      my projects
    </h1>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";

const trigger = ref<HTMLDivElement>();
const texts = [
  "Developer",
  "3D Modeler",
  "Innovator",
  "Blogger",
  "PCB Designer",
  "Maker",
];

let ctx: gsap.Context;

onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top top",
        pin: true,
        end: "+=3000",
        //markers: { startColor: "blue", endColor: "blue" },
        scrub: true,
      },
    });
    tl.addLabel("start");
    //.to(".p-11", { scale: 0.3, rotation: 45, autoAlpha: 0 }, "start-=10")
    //.addLabel("color")
    //.from(".w-64", { backgroundColor: "#28a92b" })
    //.addLabel("spin")
    //.to(".w-64", { rotation: 360 })
    //.addLabel("end");
  });
});

onBeforeUnmount(() => {
  console.log(ctx);
  ctx.revert();
});
</script>
