<script setup lang="ts">
import type { SPDealer } from '@/utilities/SpotifyTypes'

const data = ref<SPDealer | undefined>()

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

const songTitle = computed(() => {
  return data.value?.track.name
})

const songArtists = computed(() => {
  return data.value?.track.artists.map((artist) => artist.name).join(' • ')
})
</script>

<template>
  <div v-if="data?.is_playing ?? false" class="h-12 max-w-72 items-center justify-center gap-2 md:flex hidden">
    <img v-if="data?.track.album.images[0].url" :src="data?.track.album.images[0].url" alt="Album Art"
      class="h-20 w-20 rounded-r-md vinyl">

    <div class="flex flex-col max-w-64 px-4 py-2 bg-khaki rounded-md pl-8 ml-[-2rem]">
      <a class="line-clamp-1 font-serif2 text-persian text-md" :href="data?.track.uri">{{ songTitle }}</a>
      <span class="line-clamp-1 font-serif2 text-licorice text-sm">{{ songArtists }}</span>
    </div>
  </div>
</template>

<style lang="scss">
img.vinyl {
  border-radius: 50%;
  animation: spinThat 8s linear infinite;
}

@keyframes spinThat {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
