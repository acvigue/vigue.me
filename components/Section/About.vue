<template>
  <div class="flex justify-center items-center w-full">
    <div
      class="flex flex-col h-full lg:max-w-2xl w-[80vw] justify-center gap-4"
    >
      <span class="font-serif text-md font-bold">About Me</span>
      <span class="font-serif2 text-3xl pl-4 mb-4">
        As a
        <b data-cursor-stick data-cursor="-pointer">computer science student</b>
        at Purdue University with a passion for
        <b data-cursor-stick data-cursor="-pointer">engineering</b>, my skills
        intersect at designing digital products. I possess a wide range of
        experience in several programming languages and tools, and my
        involvement in numerous past projects has helped to solidify my
        foundational expertise in the realm of embedded systems and
        <b data-cursor-stick data-cursor="-pointer">software development</b>.
      </span>
      <div class="flex justify-end mr-48">
        <span class="font-serif text-md text-licorice font-bold"
          >Want to learn more?</span
        >
      </div>
      <div class="flex justify-end items-center gap-4">
        <NuxtLink
          to="/contact"
          class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
        >
          <span class="font-serif2 text-lg">Contact </span>
          <ArrowUpRightIcon class="h-5" />
        </NuxtLink>
        <button
          @click="cvOpen = true"
          class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
        >
          <span class="font-serif2 text-lg">My CV </span>
          <ArrowDownTrayIcon class="h-5" />
        </button>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="fade-y">
      <CVModal v-if="cvOpen" @close="cvOpen = false" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ArrowUpRightIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/solid";

const cvOpen = ref(false);
</script>
