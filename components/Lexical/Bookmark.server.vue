<template>
  <div
    @click="click"
    class="relative h-40 transform-gpu cursor-pointer overflow-clip rounded-md border-2 border-gray-200 transition duration-300 hover:scale-[0.98] dark:border-gray-700"
  >
    <div class="absolute z-20 flex h-40 w-full flex-col justify-between p-6">
      <div class="flex flex-col justify-between">
        <span class="text-md line-clamp-1 font-bold sm:text-lg">{{
          node.metadata.title
        }}</span>
        <span
          class="line-clamp-2 text-xs font-light text-gray-700 dark:text-gray-400 sm:text-sm"
        >
          {{ node.metadata.description }}
        </span>
      </div>
      <div
        class="mt-2 inline-flex w-fit items-center overflow-clip rounded-md dark:bg-gray-700"
      >
        <div class="mr-4">
          <img :src="node.metadata.icon" class="h-6" />
        </div>
        <span class="mr-4 line-clamp-1 text-xs">
          {{ node.metadata.publisher }}
          {{ node.metadata.author ? `• ${node.metadata.author}` : null }}
        </span>
      </div>
    </div>
    <div class="absolute z-10 flex h-40 w-full justify-end opacity-25">
      <img :src="node.metadata.thumbnail" class="h-40 flex-shrink-0" />
    </div>
  </div>
</template>

<script setup lang="ts">
export type BookmarkNode = {
  version: string;
  type: "bookmark";
  url: string;
  metadata: {
    title: string;
    description: string;
    author: string;
    publisher: string;
    thumbnail: string;
    icon: string;
  };
};

const props = defineProps<{
  node: BookmarkNode;
}>();

const click = function () {
  window.location.href = props.node.url;
};
</script>
