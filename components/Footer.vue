<template>
  <div class="w-full flex flex-col items-center justify-center gap-4">
    <div class="w-full flex items-center justify-center gap-4">
      <NuxtLink to="https://www.linkedin.com/in/aidenvigue" data-cursor-stick>
        <linkedin class="stroke-[2px] stroke-taupe icon !h-6 !w-6" />
      </NuxtLink>
      <NuxtLink to="https://github.com/acvigue" data-cursor-stick>
        <github class="stroke-[2px] stroke-taupe icon !h-6 !w-6" />
      </NuxtLink>
      <NuxtLink
        to="https://open.spotify.com/user/w3g33ot2c4zxlxtzy15i7ldxi?si=bbdc95da1a284d60"
        data-cursor-stick
      >
        <music class="stroke-[2px] stroke-taupe icon !h-6 !w-6" />
      </NuxtLink>
    </div>
    <span class="text-taupe text-lg font-serif2"
      >© {{ currentYear }} Aiden Vigue</span
    >
  </div>
</template>

<script setup lang="ts">
import linkedin from "@/assets/linkedin.svg";
import github from "@/assets/github.svg";
import music from "@/assets/music.svg";

const currentYear = new Date().getFullYear();
</script>
