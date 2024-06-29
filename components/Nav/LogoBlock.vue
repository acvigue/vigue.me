<script setup lang="ts">
import SiteLogo from '~/assets/icons/logo.svg'
</script>

<template>
  <NuxtLink to="/" class="flex items-center space-x-2">
    <SiteLogo class="!w-10 !h-10 [&>*]:stroke-[0.2em] text-transparent stroke-licorice"
      style="stroke-linecap: round; stroke-linejoin: round" />
  </NuxtLink>
</template>
