<template>
  <Separator :index="1">About</Separator>
  <Panel>
    <div class="flex justify-center items-center w-full" ref="panel">
      <div
        class="flex flex-col h-full lg:max-w-4xl w-[80vw] justify-center gap-4"
      >
        <span class="font-serif text-lg font-bold" ref="panelHeader"
          >About Me</span
        >
        <span class="font-serif md:text-3xl text-xl pl-4 mb-4" ref="bodyText">
          As a
          <b data-cursor="-pointer" class="text-taupe font-serif2"
            >computer science student</b
          >
          at Purdue University with a passion for
          <b data-cursor="-pointer" class="text-taupe font-serif2"
            >engineering</b
          >, my skills intersect to design digital products. I possess a wide
          range of experience in several programming languages and tools, and my
          involvement in numerous past projects has helped to solidify my
          foundational expertise in the realm of embedded systems and
          <b data-cursor="-pointer" class="text-taupe font-serif2"
            >software development.</b
          >
        </span>
        <div class="flex flex-col gap-4" ref="cta">
          <div class="flex justify-end mr-48">
            <span class="font-serif text-md text-licorice font-bold"
              >Want to learn more?</span
            >
          </div>
          <div class="flex justify-end items-center gap-4">
            <NuxtLink
              to="/contact"
              class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
              data-cursor-stick
            >
              <span class="font-serif2 text-lg">Contact </span>
              <ArrowUpRightIcon class="h-5" />
            </NuxtLink>
            <button
              @click="cvOpen = true"
              class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
              data-cursor-stick
            >
              <span class="font-serif2 text-lg">My CV </span>
              <ArrowDownTrayIcon class="h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Panel>

  <Teleport to="body">
    <Transition name="fade-y">
      <CVModal v-if="cvOpen" @close="cvOpen = false" />
    </Transition>
  </Teleport>
</template>

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

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel.value,
        start: "top 60%",
        end: "top 20%",
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
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
