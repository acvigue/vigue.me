<template>
    <div class="flex flex-1 justify-start items-center gap-2 md:flex-row flex-col">
        <span class="font-serif italic md:text-6xl text-5xl text-persian font-bold md:ml-0 -ml-28">{{ title }}</span>
        <span class="font-serif italic md:text-5xl text-4xl md:mt-8 mt-[-2rem] md:pl-0 pl-20">{{ subtitle }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    subtitle: string;
}>();
</script>