<script setup lang="ts">
export interface HRNode {
  type: 'horizontalrule'
}

defineProps<{
  node: HRNode
}>()
</script>

<template>
  <div class="flex justify-center">
    <div class="max-w-3xl w-[6xl] rounded-full h-1 bg-gray-700" />
  </div>
</template>
