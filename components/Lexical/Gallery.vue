<template>
  <div
    class="md:grid hidden gap-4"
    v-for="row in imagesByRow"
    :style="`grid-template-columns: repeat(${row.length}, minmax(0, 1fr));`"
  >
    <div
      v-for="image in row"
      :key="image.src"
      class="relative w-full flex items-center justify-center"
      @click="imageClicked(image)"
    >
      <NuxtPicture
        format="avif,webp,jpg"
        :src="image.src"
        sizes="lg:500px md:400px sm:300px xs:200px"
        :width="image.width"
        :height="image.height"
        class="gallery-image"
        :placeholder="[100, 50]"
        loading="lazy"
      />
    </div>
  </div>
  <Lightbox
    v-model="lightboxOpen"
    :images="node.images"
    :startIndex="lightboxStartIndex"
  />
</template>

<style lang="scss">
.gallery-image > img {
  @apply rounded-lg z-30 cursor-pointer;
}
</style>

<script setup lang="ts">
type Image = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  row: number;
};

export type GalleryNode = {
  type: "gallery";
  images: Image[];
};

const props = defineProps<{
  node: GalleryNode;
}>();

const imageClicked = (image: Image) => {
  lightboxStartIndex.value = props.node.images.indexOf(image);
  lightboxOpen.value = true;
};

const imagesByRow = computed(() => {
  const imagesByRow: Image[][] = [];
  let currentRow: Image[] = [];
  for (const image of props.node.images) {
    if (imagesByRow.length <= image.row) {
      currentRow = [];
      imagesByRow.push(currentRow);
    }
    currentRow.push(image);
  }
  return imagesByRow;
});

const lightboxOpen = ref(false);
const lightboxStartIndex = ref(0);
</script>
