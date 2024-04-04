<script setup lang="ts">
export interface EmbedNode {
  type: 'html'
  html: string
}

const props = defineProps<{
  node: EmbedNode
}>()
</script>

<template>
  <div v-html="props.node.html" />
</template>
