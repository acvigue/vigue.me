<template>
  <!-- Horizontal top navbar -->
  <div
    class="fixed top-0 left-0 flex w-full border-khaki border-b items-center h-20 p-5 bg-champagne z-50 text-licorice"
  >
    <div class="flex-1 hidden lg:flex">
      <NavLogoBlock />
    </div>

    <NavNameBlock class="stroke-licorice lg:items-center items-start" />

    <div class="flex-1 flex justify-end h-10">
      <button
        class="flex text-licorice items-center gap-4 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
        @click="openNavbar"
      >
        <span class="font-serif2 text-lg">Menu </span>
        <Bars3BottomLeftIcon class="h-5" />
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
        <NavNameBlock class="!items-center" />
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
