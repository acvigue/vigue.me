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
    vp.addClass('vjs-theme')
  })
})
</script>

<template>
  <video ref="videoPlayer" class="video-js w-full aspect-video" />
</template>

<style lang="scss">
.vjs-theme .vjs-big-play-button {}

.video-js {
  @apply rounded-md;
}

.vjs-theme .vjs-tech {
  @apply rounded-md;
}

.vjs-theme .vjs-big-play-button {
  @apply bg-persian text-champagne border-champagne;
}
</style>
