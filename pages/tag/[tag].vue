<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag
const page = parseInt(route.params.page as string ?? '1')

//if no slug
if (typeof tag !== 'string') {
  navigateTo('/posts')
}
</script>

<template>
  <PostsListPage :page="page" :filter-by-tag="tag" />
</template>
