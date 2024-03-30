<template>{{ data }}</template>

<script setup lang="ts">
const slug = useRoute().params.slug;

const { data, pending, error, refresh } = await useAsyncData("post", () =>
  $fetch(`/api/post/${slug}`)
);
</script>
