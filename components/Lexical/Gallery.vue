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
const lightboxIndex = ref(0)

const openLightbox = (image: Image) => {
  lightboxIndex.value = props.node.images.indexOf(image)
  lightboxOpen.value = true
}

const rowBreakdown = (images: Image[]) => {
  if (images.length === 1) return [1]
  if (images.length === 2) return [2]
  if (images.length === 3) return [3]
  if (images.length === 4) return [2, 2]
  if (images.length === 5) return [3, 2]
  if (images.length === 6) return [3, 3]
  if (images.length === 7) return [3, 2, 2]
  if (images.length === 8) return [3, 3, 2]
  if (images.length === 9) return [3, 3, 3]
  return []
}

const getRows = (images: Image[]) => {
  const rows = rowBreakdown(images)
  const imagesPerRow = []
  let index = 0
  for (const row of rows) {
    imagesPerRow.push(images.slice(index, index + row))
    index += row
  }
  return imagesPerRow
}

const imageContainerStyle = (image: Image) => {
  const ratio = image.width / image.height;

  return {
    flex: `${ratio} 1 0%`,
  }
}


const lightboxImages = props.node.images.map((img) => {
  return {
    src: img.src,
    title: img.alt ?? undefined,
  }
})

const imagesPerRow = getRows(props.node.images);
</script>

<template>
  <div class="flex flex-col md:gap-4 gap-2">
    <div v-for="row, i in imagesPerRow" :key="i" class="flex justify-center md:gap-4 gap-2">
      <button v-for="img, j in row" :key="j" class="gallery-image-container relative" :style="imageContainerStyle(img)"
        @click="openLightbox(img)">
        <div class="absolute h-full w-full -rotate-1 transform rounded-md bg-licorice bg-opacity-50 -z-10" />
        <NuxtPicture format="avif,webp,jpg" :src="img.src" :width="img.width" :height="img.height" class="gallery-image"
          sizes="lg:500px 300px" loading="lazy" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <vue-easy-lightbox :visible="lightboxOpen" :imgs="lightboxImages" :index="lightboxIndex" :loop="false"
      :zoom-scale="0.25" @hide="lightboxOpen = false" />
  </Teleport>
</template>

<style lang="scss">
.gallery-image>img {
  @apply rounded-md z-30 cursor-pointer;
}
</style>
