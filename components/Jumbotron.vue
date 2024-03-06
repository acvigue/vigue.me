<template>
  <div
    class="flex flex-col items-left justify-center md:max-w-2xl max-w-[80vw] w-full gap-4"
  >
    <h1 class="text-6xl font-semibold text-pink-600 drop-shadow-lg">
      Aiden Vigue
    </h1>
    <div class="flex items-center w-full gap-4">
      <h1 class="text-3xl font-mono text-white drop-shadow-lg">cs @ purdue</h1>
      <div class="flex-1 h-[2px] bg-gray-200 opacity-50"></div>
    </div>
    <h2 class="text-4xl font-mono drop-shadow-lg flex gap-4 items-center">
      <span class="text-gray-200 opacity-50">+</span>
      <span ref="scramble" class="w-full">{{ texts[1] }}</span>
    </h2>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap-trial";
import ScrambleTextPlugin from "gsap-trial/ScrambleTextPlugin";

const scramble = ref<HTMLSpanElement>();
const texts = [
  "Developer",
  "PCB Artist",
  "UI Designer",
  "Entrepreneur",
  "Inventor",
  "Programmer",
  "Engineer",
].map((text) => text.toLowerCase());

let ctx: gsap.Context;

onNuxtReady(() => {
  gsap.registerPlugin(ScrambleTextPlugin);

  if (!scramble.value) {
    return;
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        tl.invalidate();
      },
    });

    if (!scramble.value) {
      return;
    }

    for (const text of texts) {
      tl.to(
        scramble.value,
        {
          scrambleText: {
            text,
            chars: "lowerCase",
            speed: 0.5,
          },
        },
        "+=1.2"
      );
    }
  });
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
