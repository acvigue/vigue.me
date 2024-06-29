<template>
    <div class="flex flex-1 justify-start items-center gap-2 lg:flex-row flex-col">
        <span class="font-serif italic lg:text-6xl text-4xl text-persian font-bold lg:ml-0 -ml-32">{{ title }}</span>
        <span class="font-serif italic lg:text-5xl text-3xl lg:mt-8 mt-0 lg:pl-0 pl-20">{{ subtitle }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    subtitle: string;
}>();
</script>