<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <NuxtLink
    to="/"
    class="flex flex-col hover:scale-105 duration-500"
    data-cursor-stick
  >
    <span class="font-serif2 font-bold text-sm">Online Portfolio</span>
    <span class="font-serif2 text-md">{{ appConfig.name }}</span>
  </NuxtLink>
</template>
