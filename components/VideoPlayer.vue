<script setup lang="ts">
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const props = defineProps<{
  src: string
}>()

const videoPlayer = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (!videoPlayer.value) return

  const vp = videojs(videoPlayer.value, {
    controls: true,
    autoplay: false,
    preload: 'auto',
    fluid: true,

    aspectRatio: '16:9',
  }, () => {
    vp.src({ type: 'application/x-mpegURL', src: props.src })
  })
})
</script>

<template>
  <video ref="videoPlayer" class="video-js w-full aspect-video" />
</template>

<style lang="scss">
.vjs-big-play-button {
  display: none;
}
</style>
