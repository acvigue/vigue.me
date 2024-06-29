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

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const lightboxImages = computed(() => props.node.images.map((img) => {
  return {
    src: img.src,
    title: img.alt ?? undefined,
  }
}))
</script>

<template>
  <masonry-wall :items="node.images" :gap="16" :min-columns="1" :max-columns="3" class="breakout px-[2vw]">
    <template #default="{ item, index }">
      <div class="relative" @click="openLightbox(index)">
        <div class="absolute h-full w-full -rotate-1 transform rounded-md bg-licorice bg-opacity-50 -z-10" />

        <!-- @vue-expect-error -->
        <NuxtPicture format="avif,webp,jpg" :src="item.src" sizes="lg:700px 250px" class="gallery-image z-10"
          :width="item.width" :height="item.height" placeholder placeholder-class="custom" data-cursor="-pointer" />
      </div>
    </template>
  </masonry-wall>

  <Teleport to="body">
    <vue-easy-lightbox :visible="lightboxOpen" :imgs="lightboxImages" :index="lightboxIndex" :loop="false"
      :zoom-scale="0.25" @hide="closeLightbox" />
  </Teleport>
</template>

<style lang="scss">
.gallery-image>img {
  @apply rounded-md z-30 cursor-pointer;
}
</style>
