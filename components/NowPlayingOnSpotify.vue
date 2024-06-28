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
</script>

<template>
  <div class="bg-persian rounded-full w-44 h-44 flex items-center justify-center">
    {{data}}
  </div>
</template>
