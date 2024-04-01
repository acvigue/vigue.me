<template>
  <!-- Vertical left navbar -->
  <div
    class="fixed top-0 left-0 hidden lg:flex h-dvh w-24 flex-col border-khaki border-r items-center p-5 bg-champagne z-50"
  >
    <div class="flex-1 flex items-start h-10">
      <button
        class="cursor-pointer hover:scale-125 duration-500 h-10"
        data-cursor-stick
        @click="openNavbar"
      >
        <Bars3BottomLeftIcon class="h-full" />
      </button>
    </div>
    <NuxtLink
      to="/"
      class="text-vertical rotate-180 flex flex-col items-center hover:scale-105 duration-500"
      data-cursor-stick
    >
      <span class="font-serif italic text-lg">Online Portfolio</span>
      <span class="font-serif2 text-xl">{{ appConfig.name }}</span>
    </NuxtLink>
    <div class="flex-1 flex flex-col items-center justify-end">
      <div class="text-vertical rotate-180">
        <span class="font-serif2 text-sm">Mar. 2024</span>
      </div>
    </div>
  </div>

  <!-- Horizontal top navbar -->
  <div
    class="fixed top-0 left-0 lg:hidden flex w-dvw border-khaki border-b items-center h-20 p-5 bg-champagne z-50"
  >
    <NuxtLink
      to="/"
      class="flex flex-col items-start hover:scale-105 duration-500"
      data-cursor-stick
    >
      <span class="font-serif italic text-sm">Online Portfolio</span>
      <span class="font-serif2 text-md">{{ appConfig.name }}</span>
    </NuxtLink>

    <div class="flex-1 flex justify-end h-10">
      <button
        class="cursor-pointer hover:scale-125 duration-500 h-10"
        data-cursor-stick
        @click="openNavbar"
      >
        <Bars3BottomLeftIcon class="h-full" />
      </button>
    </div>
  </div>

  <!-- Nav menu -->
  <Transition name="fade-x">
    <div
      class="fixed top-0 left-0 w-full h-full bg-licorice flex flex-col p-5 text-champagne z-50"
      v-if="isOpen"
    >
      <div class="flex">
        <div class="flex flex-1 justify-start">
          <button
            class="cursor-pointer hover:scale-125 duration-500 h-10"
            data-cursor-stick
            @click="closeNavbar"
          >
            <XMarkIcon class="h-full" />
          </button>
        </div>
        <NuxtLink
          to="/"
          class="flex flex-col items-center hover:scale-105 duration-500"
          data-cursor-stick
        >
          <span class="font-serif2 text-xl">{{ appConfig.name }}</span>
          <span class="font-serif italic">Online Portfolio</span>
        </NuxtLink>
        <div class="flex-1"></div>
      </div>
      <div class="flex flex-col items-center justify-center flex-1">
        <NavItem to="/about">about</NavItem>
        <NavItem to="/projects">projects</NavItem>
        <NavItem to="/experience">experience</NavItem>
        <NavItem to="/contact">contact</NavItem>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const { $listen } = useNuxtApp();
const appConfig = useAppConfig();

const isOpen = ref(false);

const props = defineProps<{
  vertical?: boolean;
}>();

const openNavbar = () => {
  isOpen.value = true;
};

const closeNavbar = () => {
  isOpen.value = false;
};

onMounted(() => {
  $listen("closeNav", closeNavbar);
});
</script>
