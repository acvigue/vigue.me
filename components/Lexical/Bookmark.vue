<template>
  <div
    @click="click"
    class="relative h-40 transform-gpu cursor-pointer overflow-clip rounded-lg border-2 border-taupe transition duration-300 hover:scale-[0.98]"
  >
    <div class="absolute z-20 flex h-40 w-full flex-col justify-between p-6">
      <div class="flex flex-col justify-between">
        <span class="text-md line-clamp-1 font-bold sm:text-lg text-taupe">{{
          node.metadata.title
        }}</span>
        <span class="line-clamp-2 text-md">
          {{ node.metadata.description }}
        </span>
      </div>
      <div
        class="mt-2 inline-flex w-fit items-center overflow-clip rounded-lg bg-taupe text-champagne font-bold"
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
