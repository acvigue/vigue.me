<template>
  <Separator :index="2">Projects</Separator>
  <Panel class="expandable pt-[3rem]">
    <div class="flex justify-center items-center w-full" ref="panel">
      <div class="flex flex-col h-full lg:max-w-7xl w-[80vw] gap-4">
        <div class="flex flex-1 justify-start gap-2">
          <span
            class="font-serif italic md:text-7xl text-4xl text-taupe font-bold"
            ref="panelHeader"
            >Featured</span
          >
          <span
            class="font-serif italic md:text-7xl text-4xl mt-6"
            ref="panelHeader2"
            >Projects</span
          >
        </div>

        <div
          class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full"
          v-if="data"
        >
          <div
            v-for="project in data.posts"
            ref="projectRefs"
            :key="project.id"
          >
            <BlogPost
              :post="project"
              class="flex p-4 w-full justify-between items-center gap-4"
            />
          </div>
        </div>
        <div class="flex-1 flex justify-center items-start">
          <NuxtLink
            to="/projects"
            class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
            data-cursor-stick
            ref="cta"
          >
            <span class="font-serif2 text-lg">see more</span>
          </NuxtLink>
        </div>
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
const panelHeader2 = shallowRef<HTMLSpanElement>();
const projectRefs = ref([]);

const cta = shallowRef<HTMLDivElement>();

const { data, pending } = await useFetch("/api/posts", {
  query: { limit: 6, featured: true },
});

onNuxtReady(() => {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.addLabel("start");

    tl.fromTo(
      panelHeader.value!,
      {
        opacity: 0,
        y: -100,
        ease: "power1.inOut",
        duration: 0.05,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.05,
      }
    );

    tl.fromTo(
      panelHeader2.value!,
      {
        opacity: 0,
        x: 100,
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
      projectRefs.value!,
      {
        opacity: 0,
        y: 10,
        ease: "power1.inOut",
        duration: 0.05,
        stagger: 0.02,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 0.05,
        stagger: 0.02,
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
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
