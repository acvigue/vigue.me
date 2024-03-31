<template>
  <div class="text-lg mx-2">
    <LexicalNodeRenderer :node="props.node.children" />
  </div>
</template>

<script setup lang="ts">
import type { LexicalNode } from "~/utilities/LexicalTypes";

export type ParagraphNode = {
  type: "paragraph";
  children: LexicalNode[];
};

const props = defineProps<{
  node: ParagraphNode;
}>();
</script>
