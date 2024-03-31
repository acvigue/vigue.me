<template>
  <main class="md:pt-32 pt-24 mb-8 py-8 flex justify-center">
    <div
      class="relative flex flex-col items-center justify-start bg-gray-900 rounded-lg max-w-6xl w-[90vw] gap-6 p-6"
    >
      <h1 class="text-2xl w-full lowercase font-mono font-semibold">
        All Posts
      </h1>
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full pb-6"
      >
        <BlogPost
          :post="project"
          v-for="(project, i) in projects.posts"
          :key="project.uuid"
        />
      </div>
      <div class="flex justify-center w-full">
        <button
          :disabled="pending || currentPage >= projects.pagination.pages"
          @click="currentPage++"
          class="text-sm px-4 py-2 bg-pink-600 rounded-lg inline-block w-min whitespace-nowrap hover:bg-opacity-80 transition duration-300 shadow-2xl font-mono disabled:opacity-50 disabled:cursor-not-allowed"
        >
          load more
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
type x = Awaited<
  ReturnType<typeof import("@/server/api/posts/index.get").default>
>;

const projects = ref<x>({
  posts: [],
  pagination: { pages: 0, totalPosts: 0, page: 0 },
});

const currentPage = ref(1);

const { data, pending, error } = useFetch("/api/posts", {
  query: { page: currentPage },
});

watch(
  data,
  (newVal) => {
    if (!newVal) return;
    projects.value.pagination = newVal.pagination;
    newVal.posts.forEach((post) => {
      projects.value.posts.push(post);
    });
  },
  { immediate: true }
);
</script>
