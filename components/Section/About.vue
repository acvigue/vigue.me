<template>
  <div
    class="flex flex-col items-start justify-start w-full min-h-screen gap-0"
    id="about-container"
  >
    <div class="flex-1 z-[11]">
      <h1
        class="text-4xl font-semibold font-mono drop-shadow-lg p-11 pt-[7.5rem] w-full pointer-events-auto"
        id="about-section-title"
        @pointerover="scrambleHeader"
      >
        about me
      </h1>
    </div>
    <div
      class="absolute w-full h-screen flex items-center justify-start overflow-clip text-5xl font-bold leading-normal z-10 pointer-events-auto"
      style="min-width: calc(200vw + 100vh)"
      id="about-horiz-scroll"
    >
      <div
        class="w-[100vw] bg-pink-600 h-full flex items-center justify-center"
        id="about-first-slide"
      >
        <span id="about-first-slide-words">I wear a lotttttt of hats.</span>
        <span id="about-first-slide-icon-hat" class="opacity-0">🎩</span>
      </div>
      <div
        class="w-[100vh] h-full grid grid-cols-2 gap-12 p-12"
        id="about-second-slide"
      >
        <div class="bg-red-500 w-full">student</div>
        <div class="bg-red-500 w-full">intern</div>
        <div class="bg-red-500 w-full">runner</div>
        <div class="bg-red-500 w-full">napper</div>
      </div>
      <div
        class="w-[100vw] bg-pink-600 h-full flex items-center justify-center"
        id="about-third-slide"
      >
        <span id="about-third-slide-words">..and I do a lot of things.</span>
        <span id="about-third-slide-icon-hat" class="opacity-0">🎩</span>
      </div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap-trial";
import ScrambleTextPlugin from "gsap-trial/ScrambleTextPlugin";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";
import GSDevTools from "gsap-trial/GSDevTools";

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

const scrambleHeader = (payload: PointerEvent) => {
  gsap.to("#about-section-title", {
    duration: 1,
    scrambleText: "about me",
  });
};

onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, GSDevTools);

  ctx = gsap.context(() => {
    /*const words = new SplitText("#about-long-text-container", {
      type: "words,lines",
      wordsClass: "word++",
    });*/

    const firstSlideWords = new SplitText("#about-first-slide-words", {
      type: "words,lines",
      wordsClass: "w-0 overflow-hidden word++",
    });

    const firstSlideTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-first-slide",
        start: "top 60%",
        end: "top top",
        markers: { startColor: "blue", endColor: "blue" },
        scrub: true,
      },
    });
    firstSlideTL.addLabel("start").to("#about-section-title", {
      scrambleText: {
        text: "about me",
        chars: "lowerCase",
        speed: 0.5,
      },
      duration: 0.05,
    });
    firstSlideTL.addLabel("wordsStart", 0.01);
    firstSlideTL.to(
      firstSlideWords.words[0],
      {
        css: { width: "auto" },
        duration: 0.0,
      },
      "start"
    );
    firstSlideTL.fromTo(
      firstSlideWords.words[1],
      {
        css: { width: "auto", height: "0" },
      },
      {
        css: { width: "auto", height: "auto" },
        duration: 0.005,
      },
      "wordsStart"
    );
    firstSlideTL.fromTo(
      firstSlideWords.words[2],
      {
        css: { width: "0" },
      },
      {
        css: { width: "auto" },
        duration: 0.005,
      },
      ">"
    );
    firstSlideTL.fromTo(
      firstSlideWords.words[3],
      {
        css: { width: "0" },
      },
      {
        css: { width: "auto" },
        duration: 0.015,
      },
      ">"
    );
    firstSlideTL.fromTo(
      firstSlideWords.words[4],
      {
        css: { width: "auto", height: "0" },
      },
      {
        css: { width: "auto", height: "auto" },
        duration: 0.005,
      },
      ">"
    );
    firstSlideTL.fromTo(
      firstSlideWords.words[5],
      {
        css: { width: "0" },
      },
      {
        css: { width: "auto" },
        duration: 0.005,
      },
      ">"
    );
    firstSlideTL.to(
      "#about-first-slide-icon-hat",
      {
        css: { opacity: 1, translateY: "-3rem", rotate: 45, scale: 2 },
        duration: 0.01,
      },
      ">"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "top top-=200%",
        pin: true,
        markers: { startColor: "blue", endColor: "blue" },
        scrub: true,
      },
    });
    tl.addLabel("start");
    tl.to(
      "#about-horiz-scroll",
      {
        xPercent: -100,
        x: () => innerWidth,
        ease: "none",
      },
      "start"
    );
    /*
    tl.to(
      "#about-text-container",
      {
        css: { opacity: 0 },
      },
      "start"
    );
      */

    GSDevTools.create({ animation: tl });
  });
});

onBeforeUnmount(() => {
  console.log(ctx);
  ctx.revert();
});
</script>
