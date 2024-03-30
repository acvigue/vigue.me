<template>
  <div
    class="flex flex-col items-start justify-start w-full gap-0 pb-11"
    id="projects-container"
  >
    <div class="flex-1 z-[11]">
      <h1
        class="md:text-4xl text-3xl font-semibold font-mono drop-shadow-lg p-11 w-full text-pink-600"
        id="projects-section-title"
        @pointerover="scrambleHeader"
      >
        my projects
      </h1>
    </div>
    <div
      class="w-full flex flex-col items-center justify-center overflow-clip md:text-5xl text-2xl font-bold leading-normal z-10 md:px-20s gap-11"
      style="min-width: none; max-width: none"
      id="projects-vert-scroll"
    >
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-11 w-full px-11"
      >
        <BlogPost
          :post="project"
          v-for="(project, i) in featuredProjects?.posts"
          :key="project.uuid"
        />
      </div>
      <NuxtLink
        to="/posts"
        class="text-sm px-4 py-2 bg-pink-600 rounded inline-block w-min whitespace-nowrap hover:bg-opacity-80 transition duration-300 shadow-2xl font-mono"
      >
        see more
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap-trial";
import ScrambleTextPlugin from "gsap-trial/ScrambleTextPlugin";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";

let ctx: gsap.Context;

const scrambleHeader = (payload: PointerEvent) => {
  gsap.to("#projects-section-title", {
    duration: 1,
    scrambleText: "my projects",
  });
};

const {
  data: featuredProjects,
  pending,
  error,
} = useAsyncData("featured_posts", () =>
  $fetch("/api/posts", { query: { featured: true } })
);

onNuxtReady(() => {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

  ctx = gsap.context(() => {
    const firstSlideTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-container",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    firstSlideTL.addLabel("start").to("#projects-section-title", {
      scrambleText: {
        text: "my projects",
        chars: "lowerCase",
        speed: 0.5,
      },
      duration: 0.05,
    });
    firstSlideTL.addLabel("start").to(
      "#projects-section-title",
      {
        opacity: 0,
        duration: 0.05,
      },
      ">+0.5"
    );
  });
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
