<template>
  <Suspense>
    <img :src="fallback" :srcSet="srcSet" v-bind="$attrs" />
    <template #fallback>
      <div class="w-full h-full bg-gray-300 animate-pulse"></div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { getResizedImageURLS } from "@/utilities/images";

const props = defineProps<{
  image: { src: string; width?: number; height?: number };
}>();

const resizedImages = getResizedImageURLS(
  props.image.src,
  props.image.width ?? 2000,
  props.image.height ?? 1500
);

const srcSet = computed(() => {
  const srcs = [];
  for (const src of resizedImages) {
    srcs.push(`${src.src} ${src.width.toFixed(0)}w`);
  }
  return srcs.join(", ");
});

const fallback = props.image.src;
</script>
