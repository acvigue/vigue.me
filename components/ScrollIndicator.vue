<template>
  <div class="flex gap-2 items-center">
    <span class="text-taupe font-serif">scroll down</span>
    <div
      class="flex flex-col items-center justify-end p-1 h-8 w-4 rounded-full bg-khaki"
    >
      <div class="h-5 w-2 bg-taupe rounded-full animate-bounce"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownIcon } from "@heroicons/vue/24/outline";
</script>
