<script setup lang="ts">
import type { SPDealer } from '@/utilities/SpotifyTypes'

const data = ref<SPDealer | undefined>()

const imageURL = computed(() => {
  if (!data.value)
    return
  const imageID = data.value.track.metadata.image_url.split(':')[2]
  return `https://i.scdn.co/image/${imageID}`
})

let socket: WebSocket

function setupSocket() {
  socket = new WebSocket('wss://guc3-spdealer.koiosdigital.net')

  socket.onmessage = (event) => {
    data.value = JSON.parse(event.data)
  }

  socket.onclose = () => {
    setupSocket()
  }

  socket.onerror = () => {
    socket.close()
  }
}

onMounted(() => {
  setupSocket()
})

onBeforeUnmount(() => {
  socket.close()
})
</script>

<template>
  <div class="bg-persian rounded-full w-44 h-44 flex items-center justify-center">
    <img :src="imageURL" class="rounded-full w-40 h-40">
  </div>
</template>
