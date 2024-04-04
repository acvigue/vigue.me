<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'

export interface LightboxImage {
  src: string
  width: number
  height: number
  alt?: string
}

const props = defineProps<{
  images: LightboxImage[]
  startIndex: number
}>()

const currentImage = ref(0)

watch(
  () => props.startIndex,
  (startIndex) => {
    currentImage.value = startIndex
  },
)

const model = defineModel<boolean>()
</script>

<template>
  <Teleport to="body">
    <VueEasyLightbox
      :visible="model"
      :imgs="images"
      :index="currentImage"
      :scroll-disabled="false"
      @hide="model = false"
    />
  </Teleport>
</template>
