<script setup lang="ts">
import linkedin from '@/assets/icons/linkedin.svg'
import github from '@/assets/icons/github.svg'
import music from '@/assets/icons/music.svg'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center gap-4 pb-12">
    <div class="w-full flex items-center justify-center gap-4">
      <NuxtLink to="https://www.linkedin.com/in/aidenvigue" data-cursor-stick>
        <linkedin class=" stroke-persian text-transparent fill-transparent icon !h-7 !w-7" />
      </NuxtLink>
      <NuxtLink to="https://github.com/acvigue" data-cursor-stick>
        <github class="stroke-persian text-transparent fill-transparent icon !h-7 !w-7" />
      </NuxtLink>
      <NuxtLink to="https://open.spotify.com/user/w3g33ot2c4zxlxtzy15i7ldxi?si=bbdc95da1a284d60" data-cursor-stick>
        <music class="stroke-persian text-transparent fill-transparent icon !h-7 !w-7" />
      </NuxtLink>
    </div>
    <span class="text-persian text-lg font-serif2">© {{ currentYear }} Aiden Vigue</span>
  </div>
</template>
