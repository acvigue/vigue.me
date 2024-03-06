<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen w-screen"
    :id="`${id}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string | number;
}>();
</script>
