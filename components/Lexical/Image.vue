<template>
  <div class="relative w-full flex items-center justify-center">
    <NuxtPicture
      format="avif,webp,jpg"
      :src="node.src"
      :height="node.height"
      :width="node.width"
      class="post-image"
      sizes="lg:750px md:500px sm:300px xs:200px"
      placeholder
    />
  </div>
  <Lightbox v-model="lightboxOpen" :images="[node]" :startIndex="0" />
</template>

<style lang="scss">
.post-image > img {
  @apply w-full rounded z-30 max-h-[400px] relative;
}
</style>

<script setup lang="ts">
import type { CardWidth } from "~/utilities/LexicalTypes";

export type ImageNode = {
  type: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  cardWidth: CardWidth;
};

const props = defineProps<{
  node: ImageNode;
}>();

const lightboxOpen = ref(false);

const classes = computed(() => {
  return {
    "w-full": props.node.cardWidth === "wide",
    "max-w-3xl": props.node.cardWidth === "regular",
    "w-screen": props.node.cardWidth === "full",
    rounded: props.node.cardWidth !== "full",
    "object-cover": true,
    "max-h-[450px]": true,
  };
});
</script>
