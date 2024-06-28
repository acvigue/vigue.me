<script setup lang="ts">
//This is the master slug router

//We first attempt to match to a page
//Then we attempt to match to a post
//If neither, we redirect to 404

const route = useRoute()
const rawSlug = route.params.slug
</script>

<template>
  <p>{{rawSlug}}</p>
</template>
