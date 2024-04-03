<template>
  <div class="flex panel">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.panel {
  &:not(.expandable) {
    @apply h-[calc(100vh-5rem)];
  }

  &.expandable {
    @apply min-h-[calc(100vh-5rem)];
  }

  @apply w-full;
}
</style>
