<template>
  <div
    class="w-full transform-gpu rounded-lg drop-shadow-2xl transition duration-300 hover:scale-95"
  >
    <NuxtLink :to="`/posts/${post.slug}`">
      <div class="group relative w-full rounded">
        <div
          class="absolute h-full w-full -rotate-3 transform-gpu rounded-lg bg-gray-500 opacity-20 transition duration-300 group-hover:rotate-0 dark:opacity-25 dark:mix-blend-overlay"
        ></div>
        <div class="rounded">
          <div class="relative w-full rounded-lg bg-cover bg-center">
            <NuxtPicture
              v-if="post.feature_image"
              format="avif,webp,jpg"
              :src="post.feature_image"
              sizes="lg:500px sm:300px xs:200px"
              :width="2000"
              :height="1500"
              class="blogpost-image"
              placeholder="blur"
            />
          </div>
          <div
            class="absolute left-0 top-0 h-full w-full transform-gpu rounded-lg bg-gradient-to-t from-black to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
          />
        </div>
        <div
          class="absolute left-0 top-0 flex h-full w-full flex-col justify-between rounded-lg bg-gradient-to-b from-black to-transparent px-6 py-4"
        >
          <div>
            <div class="text-lg font-medium text-white md:text-xl">
              {{ post.title }}
            </div>
            <div
              class="md:text-md line-clamp-4 transform-gpu font-mono text-sm text-white opacity-0 transition duration-300 group-hover:opacity-100 md:mb-0"
            >
              {{ post.excerpt }}
            </div>
          </div>
          <div
            class="absolute bottom-0 my-4 transform-gpu font-mono text-xs text-white opacity-0 transition duration-300 group-hover:opacity-100"
          >
            {{ postDataString }}
          </div>
          <div
            class="absolute bottom-0 my-4 flex transform-gpu flex-row items-center justify-start gap-1 font-mono text-xs text-white opacity-100 transition duration-300 group-hover:opacity-0"
          >
            <div
              v-for="tag in filteredTags"
              :key="tag.id"
              class="flex flex-row items-center rounded-md bg-pink-600 p-1 text-xs font-medium uppercase shadow-2xl"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.blogpost-image > img {
  @apply rounded-lg z-30;
}
</style>

<script setup lang="ts">
import { format } from "date-fns";

const props = defineProps<{
  post: Awaited<
    ReturnType<typeof import("@/server/api/post/[slug].get").default>
  >;
}>();

const postDataString = computed(() => {
  const strParts = [];
  if (props.post.published_at) {
    strParts.push(format(Date.parse(props.post.published_at), "MMMM d, yyyy"));
  }
  if (props.post.featured) {
    strParts.push("Featured");
  }
  return strParts.join(" • ");
});

const filteredTags = computed(() => {
  if (!props.post.tags) {
    return [];
  }
  return props.post.tags.filter((tag) => tag.slug !== "projects");
});
</script>
