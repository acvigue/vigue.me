<script setup lang="ts">
export interface BookmarkNode {
  version: string
  type: 'bookmark'
  url: string
  metadata: {
    title: string
    description: string
    author: string
    publisher: string
    thumbnail: string
    icon: string
  }
}

const props = defineProps<{
  node: BookmarkNode
}>()

const click = function () {
  window.location.href = props.node.url
}
</script>

<template>
  <div class="relative h-40 transform-gpu  transition duration-300 hover:scale-[0.98] z-0" @click="click">
    <div class="absolute h-full w-full -rotate-1 transform rounded-md bg-licorice bg-opacity-30 -z-10" />
    <div
      class="absolute flex h-40 w-full flex-col justify-between p-6 z-10 cursor-pointer rounded-md border-2 border-persian bg-champagne">
      <div class="flex flex-col justify-between">
        <span class="text-md line-clamp-1 font-bold sm:text-lg text-persian font-serif2">{{
          node.metadata.title
          }}</span>
        <span class="line-clamp-2 text-md font-medium font-serif">
          {{ node.metadata.description }}
        </span>
      </div>
      <div class="mt-2 inline-flex w-fit items-center overflow-clip">
        <span
          class="mr-4 line-clamp-1 text-xs rounded-lg bg-persian text-champagne font-bold font-serif2 h-6 flex justify-center items-center px-2">
          {{ node.metadata.publisher }}
          {{ node.metadata.author ? `• ${node.metadata.author}` : null }}
        </span>
      </div>
    </div>
  </div>
</template>
