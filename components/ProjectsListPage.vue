<template>
  <div class="flex justify-center items-center w-full py-10" ref="panel">
    <div class="flex flex-col h-full lg:max-w-7xl w-[80vw] gap-4">
      <div class="flex flex-1 justify-start gap-2">
        <span
          class="font-serif italic md:text-7xl text-4xl text-taupe font-bold"
          ref="panelHeader"
          >All</span
        >
        <span
          class="font-serif italic md:text-7xl text-4xl mt-6"
          ref="panelHeader2"
          >Projects</span
        >
      </div>

      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full"
        v-if="data"
      >
        <div v-for="project in data.posts" ref="projectRefs" :key="project.id">
          <BlogPost
            :post="project"
            class="flex p-4 w-full justify-between items-center gap-4"
          />
        </div>
      </div>
      <div class="flex-1 flex justify-center items-start">
        <button
          :disabled="page == 1"
          @click="goToPage(page - 1)"
          class="rounded-l-lg text-taupe p-2 border-taupe border-2 border-r-0 h-10 w-10 flex items-center justify-center font-bold font-serif2 disabled:border-khaki disabled:text-khaki"
        >
          <ArrowLeftIcon class="h-5 w-5" />
        </button>
        <button
          @click="goToPage(p.name)"
          :disabled="p.isDisabled"
          v-for="p in pages"
          :key="p.name"
          class="text-taupe p-2 border-taupe border-2 border-l-1 border-r-0 h-10 w-10 flex items-center justify-center font-bold font-serif2 disabled:border-khaki disabled:text-khaki"
        >
          {{ p.name }}
        </button>
        <button
          :disabled="page == totalPages"
          @click="goToPage(page + 1)"
          class="rounded-r-lg text-taupe p-2 border-taupe border-2 border-l-1 h-10 w-10 flex items-center justify-center font-bold font-serif2 disabled:border-khaki disabled:text-khaki"
        >
          <ArrowRightIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
const appConfig = useAppConfig();

const props = defineProps<{
  page: number;
}>();

useSeoMeta({
  title: `Projects - Page ${props.page} - ${appConfig.name}`,
  description: appConfig.description,
  ogImage: appConfig.defaultOGImage,
  ogType: "website",
  ogUrl: `${appConfig.baseUrl}/projects/${props.page}`,
});

const maxVisibleButtons = 5;

const startPage = computed(() => {
  // When on the first page
  if (props.page === 1) {
    return 1;
  }

  // When on the last page
  if (props.page === totalPages.value) {
    return Math.max(1, totalPages.value - maxVisibleButtons);
  }

  // When inbetween
  return props.page - 1;
});

const totalPages = computed(() => {
  if (!data.value) return 0;
  return data.value.pagination.pages;
});

const pages = computed(() => {
  const range = [];

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + maxVisibleButtons - 1, totalPages.value);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.page,
    });
  }

  return range;
});

const goToPage = (page: number) => {
  if (page === props.page) return;
  navigateTo(`/projects/${page}`);
};

const { data, pending } = await useFetch("/api/posts", {
  query: { page: props.page },
});
</script>
