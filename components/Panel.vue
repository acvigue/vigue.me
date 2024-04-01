<template>
  <div class="flex h-screen w-screen panel">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.panel {
  &:first-of-type {
    @apply lg:ml-24;
  }
  &:not(:first-of-type) {
    @apply lg:w-[calc(100vw-6rem)];
  }
  @apply h-[calc(100vh-5rem)];
  @apply lg:mt-0;
  @apply mt-20;
}
</style>
