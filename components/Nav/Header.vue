<script setup lang="ts">
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)
const route = useRoute()

const openNavbar = () => {
  isOpen.value = true
}

const closeNavbar = () => {
  isOpen.value = false
}

const nameOpacity = computed(() => {
  return route.fullPath === '/' ? 0 : 1
});
</script>

<template>
  <WidthContainer>
    <div class="flex w-full bg-transparent border-khaki items-center h-20 px-5 z-50 text-licorice">
      <div class="flex-1 flex">
        <NavLogoBlock />
      </div>

      <NavNameBlock class="!items-center hidden md:flex" :style="{
        opacity: nameOpacity
      }" />

      <div class="flex-1 flex justify-end h-10">
        <button
          class="flex text-licorice items-center gap-4 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
          @click="openNavbar">
          <span class="font-serif2 text-lg">Menu</span>
          <Bars3BottomLeftIcon class="h-5" />
        </button>
      </div>
    </div>
  </WidthContainer>


  <Teleport to="body">
    <Transition name="fade-x">
      <div v-if="isOpen" class="fixed top-0 left-0 w-full h-[100vh] bg-licorice flex flex-col p-5 text-champagne z-50">
        <div class="flex">
          <div class="flex flex-1 justify-start">
            <button class="cursor-pointer hover:scale-125 duration-500 h-10" data-cursor-stick @click="closeNavbar">
              <XMarkIcon class="h-full" />
            </button>
          </div>
          <NavNameBlock class="!items-center" />
          <div class="flex-1" />
        </div>
        <div class="flex flex-col items-center justify-center flex-1 gap-6">
          <NavItem to="/" @click="closeNavbar">
            home
          </NavItem>
          <NavItem to="/about" @click="closeNavbar">
            about
          </NavItem>
          <NavItem to="/posts" @click="closeNavbar">
            blog
          </NavItem>
          <NavItem to="/contact" @click="closeNavbar">
            contact
          </NavItem>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
