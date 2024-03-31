<template>
  <vue-easy-lightbox
    :visible="model"
    :imgs="images"
    :index="currentImage"
    :scroll-disabled="false"
    @hide="model = false"
  ></vue-easy-lightbox>
</template>

<script setup lang="ts">
import VueEasyLightbox from "vue-easy-lightbox";
import "vue-easy-lightbox/external-css/vue-easy-lightbox.css";

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

const currentImage = ref(0);

const props = defineProps<{
  images: LightboxImage[];
  startIndex: number;
}>();

watch(
  () => props.startIndex,
  (startIndex) => {
    currentImage.value = startIndex;
  }
);

const model = defineModel<boolean>();
</script>
