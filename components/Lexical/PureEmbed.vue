<script setup lang="ts">
export interface PureEmbedNode {
  type: 'embed'
  url: string
  html: string
}

const props = defineProps<{
  node: PureEmbedNode
}>()
</script>

<template>
  <div v-html="props.node.html" />
</template>
