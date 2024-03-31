<template>
  <renderListItem />
</template>

<script setup lang="ts">
import { h } from "vue";
import NodeRenderer from "./NodeRenderer.vue";
import type { LexicalNode } from "~/utilities/LexicalTypes";

export type ListItemNode = {
  type: "listitem";
  children: LexicalNode[];
};

const props = defineProps<{
  node: ListItemNode;
}>();

const renderListItem = () => {
  return h("li", h(NodeRenderer, { node: props.node.children }));
};
</script>
