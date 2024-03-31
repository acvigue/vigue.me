<template>
  <div class="flex justify-center">
    <div class="max-w-3xl w-[80vw] rounded-full h-1 bg-gray-700"></div>
  </div>
</template>

<script setup lang="ts">
export type HRNode = {
  type: "horizontalrule";
};

const props = defineProps<{
  node: HRNode;
}>();
</script>
