<script setup lang="ts">
import { ArrowUpRightIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="flex flex-col justify-between items-center w-full h-full gap-8 py-12">
    <div class="flex-1" />

    <div class="flex flex-col items-center w-full text-licorice gap-4">
      <div class="font-serif2 font-bold lg:text-8xl sm:text-7xl text-5xl uppercase" data-cursor="-pointer">
        <span>Got an Idea?</span>
      </div>

      <NuxtLink to="/contact"
        class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-8 py-3 hover:bg-licorice hover:text-champagne duration-500"
        data-cursor-stick>
        <span class="font-serif2 text-2xl">Contact</span>
        <ArrowUpRightIcon class="h-5" />
      </NuxtLink>
    </div>
  </div>
</template>