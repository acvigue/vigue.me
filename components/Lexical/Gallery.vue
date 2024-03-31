<template></template>

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
