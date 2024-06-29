<script setup lang="ts">
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export interface EmbedNode {
  type: 'html'
  html: string
}

const props = defineProps<{
  node: EmbedNode
}>()

const videoPlayer = ref<HTMLVideoElement | null>(null)

//if html is a m3u8 link, then render a video player
const isVideo = props.node.html.includes('.m3u8')

if (isVideo) {
  onMounted(() => {
    if (!videoPlayer.value) return

    const vp = videojs(videoPlayer.value, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      aspectRatio: '16:9',
    }, () => {
      vp.src({ type: 'application/x-mpegURL', src: props.node.html })
    })
  })
}
</script>

<template>
  <video v-if="isVideo" ref="videoPlayer" class="video-js w-full aspect-video" />
  <div v-else v-html="props.node.html" />
</template>
