<template>
  <blockquote class="text-xl py-4">
    <LexicalNodeRenderer :node="props.node.children" />
  </blockquote>
</template>

<style lang="scss">
blockquote {
  position: relative;
  font-style: italic;
  padding-left: 1.2em;
}

blockquote::before {
  content: "";
  position: absolute;
  left: 0em;
  top: 0;
  bottom: 0;
  width: 0.3rem;
  @apply bg-pink-600;
}
</style>

<script setup lang="ts">
import type { LexicalNode } from "~/utilities/LexicalTypes";

export type BlockquoteNode = {
  type: "quote";
  children: LexicalNode[];
};

const props = defineProps<{
  node: BlockquoteNode;
}>();
</script>
