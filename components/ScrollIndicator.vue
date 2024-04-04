<template>
  <div class="flex gap-3 items-center" id="scroll-indicator">
    <span class="text-persian font-serif">scroll down</span>
    <div
      class="flex flex-col items-center justify-end p-1 h-8 w-4 rounded-full bg-khaki"
    >
      <div class="h-5 w-2 bg-persian rounded-full animate-bounce"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownIcon } from "@heroicons/vue/24/outline";
</script>
