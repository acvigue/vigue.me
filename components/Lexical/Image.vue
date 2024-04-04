<template>
  <div class="relative w-full flex items-center justify-center">
    <NuxtPicture
      format="avif,webp,jpg"
      :src="node.src"
      sizes="lg:500px md:400px sm:300px xs:200px"
      :width="2000"
      :height="1500"
      class="post-image"
      loading="lazy"
      :placeholder="[100, 50]"
      @click="lightboxOpen = true"
    />
  </div>
  <Lightbox v-model="lightboxOpen" :images="[node]" :startIndex="0" />
</template>

<style lang="scss">
.post-image {
  @apply md:max-w-[50%] cursor-pointer;
}

.post-image > img {
  @apply rounded-lg z-30;
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
