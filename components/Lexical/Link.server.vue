<template>
  <a :href="node.url" class="text-pink-600 underline">
    <LexicalNodeRenderer :node="props.node.children" />
  </a>
</template>

<script setup lang="ts">
import type { LexicalNode } from "~/utilities/LexicalTypes";

export type LinkNode = {
  type: "link";
  url: string;
  children: LexicalNode[];
};

const props = defineProps<{
  node: LinkNode;
}>();
</script>
