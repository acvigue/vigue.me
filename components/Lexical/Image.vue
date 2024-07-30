<script setup lang="ts">
import type { CardWidth } from '~/utilities/LexicalTypes'

export interface ImageNode {
  type: 'image'
  src: string
  alt: string
  width: number
  height: number
  title: string
  cardWidth: CardWidth
}

defineProps<{
  node: ImageNode
}>()

const lightboxOpen = ref(false)
</script>

<template>
  <div class="relative" @click="lightboxOpen = true">
    <div class="absolute h-full w-full -rotate-1 transform rounded-md bg-licorice bg-opacity-50 -z-10" />
    <NuxtPicture format="avif,webp,jpg" :src="node.src" sizes="lg:500px 300px" class="post-image z-10"
      :width="node.width" :height="node.height" data-cursor="-pointer" loading="lazy" />
  </div>

  <Teleport to="body">
    <vue-easy-lightbox :visible="lightboxOpen" :imgs="[node]" :index="0" :loop="false" :zoom-scale="0.25"
      @hide="lightboxOpen = false" />
  </Teleport>
</template>

<style lang="scss">
.post-image>img {
  @apply rounded-md z-30 cursor-pointer w-full;
  max-height: 550px;
  object-fit: cover;
}
</style>
