<template>
  <div class="top-0 left-0 z-10 pointer-events-none" id="smooth-wrapper">
    <div class="w-screen min-h-screen" id="smooth-content">
      <Section id="jumbotron">
        <Jumbotron />
      </Section>
      <Section id="about">
        <SectionAbout />
      </Section>
      <Section id="projects">
        <SectionProjects />
      </Section>
      <Section id="work">
        <SectionWork />
      </Section>
      <Section id="online">
        <h1>Online Data</h1>
      </Section>
      <Section id="contact">
        <h1>Contact</h1>
      </Section>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";

const { $listen } = useNuxtApp();

definePageMeta({
  layout: "gl-layout",
});

let ctx: gsap.Context;

onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const smoother = ScrollSmoother.create({
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });

  $listen("scrollToBlock", (blockId: string) => {
    smoother.scrollTo(`#${blockId}`, true, "center center");
  });

  ctx = gsap.context(() => {
    const tl = gsap.timeline();
  });
});

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>
