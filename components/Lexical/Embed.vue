<script setup lang="ts">
export interface EmbedNode {
  type: 'html'
  html: string
}

const props = defineProps<{
  node: EmbedNode
}>()

const isVideo = props.node.html.includes('.m3u8')
</script>

<template>
  <VideoPlayer v-if="isVideo" :src="node.html" />
  <div v-else v-html="node.html" />
</template>
