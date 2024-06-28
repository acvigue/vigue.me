<script setup lang="ts">
interface Image {
  src: string
  width: number
  height: number
  alt?: string
  row: number
}

export interface GalleryNode {
  type: 'gallery'
  images: Image[]
}

const props = defineProps<{
  node: GalleryNode
}>()

const lightboxOpen = ref(false)
const lightboxStartIndex = ref(0)

function imageClicked(image: Image) {
  lightboxStartIndex.value = props.node.images.indexOf(image)
  lightboxOpen.value = true
}

const imagesByRow = computed(() => {
  const imagesByRow: { images: Image[], rowNum: number }[] = []
  let currentRow: Image[] = []
  for (const image of props.node.images) {
    if (imagesByRow.length <= image.row) {
      currentRow = []
      imagesByRow.push({ images: currentRow, rowNum: image.row })
    }
    currentRow.push(image)
  }
  return imagesByRow
})
</script>

<template>
  <div
v-for="row in imagesByRow" :key="row.rowNum" class="md:grid hidden gap-4"
    :style="`grid-template-columns: repeat(${row.images.length}, minmax(0, 1fr));`">
    <div
v-for="image in row.images" :key="image.src" class="relative w-full flex items-center justify-center"
      @click="imageClicked(image)">
      <NuxtPicture
format="webp,jpg" :src="image.src" sizes="lg:500px md:400px sm:300px xs:200px" :width="image.width"
        :height="image.height" class="gallery-image" :placeholder="[100, 50]" loading="lazy" />
    </div>
  </div>
  <ImageLightbox v-model="lightboxOpen" :images="node.images" :start-index="lightboxStartIndex" />
</template>

<style lang="scss">
.gallery-image>img {
  @apply rounded-lg z-30 cursor-pointer;
}
</style>
