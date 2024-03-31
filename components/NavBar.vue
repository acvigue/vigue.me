<template>
  <div
    class="fixed flex justify-between items-center p-6 px-14 pl-8 w-full"
    id="navbar"
  >
    <div
      @click="scrollToBlock('jumbotron')"
      class="!pointer-events-auto hover:stroke-gray-500 stroke-[0.2rem] fill-none stroke-white duration-150 transform-gpu cursor-pointer"
    >
      <svg viewBox="0 0 100 100" class="md:w-20 md:h-20 h-12 w-12">
        <path
          class="st0"
          d="M76.61,25.27c-9.98,10.41-13.55,25.15-18.46,38.71c-0.58,1.6-1.37,3.37-2.98,3.9c-1,0.32-2.1,0.07-3.05-0.37
		c-4.25-1.98-5.89-7.1-6.77-11.7c-1.47-7.69-2.09-15.54-1.84-23.36c-11.4,10.89-14.44,27.58-20.13,42.28"
        />
        <path class="st0" d="M26.38,56.86c6.66-3.99,13.68-7.46,20.94-10.34" />
      </svg>
    </div>
    <div class="flex-1 md:flex justify-end items-center hidden gap-4">
      <div
        @click="scrollToBlock('projects')"
        class="text-xl font-bold font-mono hover:text-gray-500 duration-150 !pointer-events-auto cursor-pointer"
      >
        projects
      </div>
      <div
        @click="scrollToBlock('work')"
        class="text-xl font-bold font-mono hover:text-gray-500 duration-150 !pointer-events-auto cursor-pointer"
      >
        work
      </div>
      <div
        @click="scrollToBlock('contact')"
        class="text-xl font-bold font-mono hover:text-gray-500 duration-150 !pointer-events-auto cursor-pointer"
      >
        contact
      </div>
      <a
        href="https://koiosdigital.net"
        class="text-xl font-bold font-mono hover:text-gray-500 duration-150 !pointer-events-auto cursor-pointer"
        active-class="text-gray-500"
        >shop</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const { $event } = useNuxtApp();
const navBar = shallowRef<HTMLDivElement>();

const route = useRoute();

const scrollToBlock = (block: string) => {
  if (route.path === "/") {
    $event("scrollToBlock", block);
  } else {
    navigateTo({ path: "/" });
    setTimeout(() => {
      $event("scrollToBlock", block);
    }, 300);
  }
};
</script>
