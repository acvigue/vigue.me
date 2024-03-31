<template>
  <div v-html="props.node.html" />
</template>

<script setup lang="ts">
export type EmbedNode = {
  type: "html";
  html: string;
};

const props = defineProps<{
  node: EmbedNode;
}>();
</script>
