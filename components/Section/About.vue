<template>
  <div
    class="flex flex-col items-start justify-start w-full min-h-screen gap-0"
    id="about-container"
  >
    <div class="flex-1 z-[11]">
      <h1
        class="md:text-4xl text-3xl font-semibold font-mono drop-shadow-lg p-11 pt-[7.5rem] w-full"
        id="about-section-title"
        @pointerover="scrambleHeader"
      >
        about me
      </h1>
    </div>
    <div
      class="absolute w-fit h-screen flex items-center justify-start overflow-clip md:text-5xl text-2xl font-bold leading-normal z-10"
      style="min-width: none; max-width: none"
      id="about-horiz-scroll"
    >
      <div
        class="w-[100vw] bg-pink-600 h-full flex items-center justify-center"
        id="about-first-slide"
      >
        <span id="about-first-slide-icon-hat-left" class="opacity-0 rotate-45"
          >🪚</span
        >
        <span id="about-first-slide-words">I do a lot of things...</span>
        <span id="about-first-slide-icon-hat-right" class="opacity-0 -rotate-45"
          >🪛</span
        >
      </div>
      <div
        class="w-[100vw] h-full flex flex-col items-start justify-evenly px-12 pt-24"
        id="about-second-slide"
      >
        <div class="item flex flex-col gap-3">
          <span class="text-3xl text-pink-600">🧑🏼‍🎓 student</span>
          <span class="text-lg"
            >I'm a freshman at Purdue currently studying computer science and my
            dream job is embedded engineering</span
          >
        </div>
        <div class="item flex flex-col gap-3">
          <span class="text-3xl text-pink-600">💻 developer</span>
          <span class="text-lg"
            >I've worked with a variety of technologies ranging from frameworks
            like React and Vue, all the way to hosting and configuring
            production-ready containerized workloads on AWS. I also have
            extensive experience in languages such as C/C++, Python, and Swift
          </span>
        </div>
        <div class="item flex flex-col gap-3">
          <span class="text-3xl text-pink-600">🧱 maker</span>
          <span class="text-lg"
            >I showcase my love for design through my projects. I mainly work in
            Altium Designer and Fusion 360 and specialize in high-speed circuit
            design (my favorite IC is the ESP32)</span
          >
        </div>
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
    const firstSlideWords = new SplitText("#about-first-slide-words", {
      type: "words,lines",
      wordsClass: "w-0 overflow-hidden word++",
    });

    const firstSlideTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-first-slide",
        start: "top 60%",
        end: "top top-=200",
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
      "#about-first-slide-icon-hat-left",
      {
        css: { opacity: 1, translateY: "-3rem", rotate: 0, scale: 2 },
        duration: 0.01,
      },
      ">"
    );
    firstSlideTL.to(
      "#about-first-slide-icon-hat-right",
      {
        css: { opacity: 1, translateY: "-3rem", rotate: 0, scale: 2 },
        duration: 0.01,
      },
      "<"
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "top top-=200%",
        pin: true,
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
    tl.to(
      "#about-section-title",
      { css: { opacity: 0 }, duration: 0.1 },
      "start"
    );

    /*
    thirdSlideTL.to(
      "#about-third-slide-icon-hat-left",
      {
        css: { opacity: 1, translateY: "-3rem", rotate: -45, scale: 2 },
        duration: 0.01,
      },
      ">"
    );
    thirdSlideTL.to(
      "#about-third-slide-icon-hat-right",
      {
        css: { opacity: 1, translateY: "-3rem", rotate: 45, scale: 2 },
        duration: 0.01,
      },
      "<"
    );
*/
  });
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
