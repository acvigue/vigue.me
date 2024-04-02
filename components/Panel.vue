<template>
  <div class="flex panel">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.panel {
  @apply h-[calc(100vh-5rem)];
  @apply w-full;
}
</style>
