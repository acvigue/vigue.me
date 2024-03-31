<template>
  <renderList />
</template>

<script setup lang="ts">
import { h } from "vue";
import NodeRenderer from "./NodeRenderer.vue";
import type { LexicalNode } from "~/utilities/LexicalTypes";

export type ListNode = {
  type: "list";
  children: LexicalNode[];
  listType: "bullet" | "number";
};

const props = defineProps<{
  node: ListNode;
}>();

const renderList = () => {
  const tag = props.node.listType === "bullet" ? "ul" : "ol";

  const classes = {
    "pl-4": true,
    "list-disc": props.node.listType === "bullet",
    "list-decimal": props.node.listType === "number",
  };

  return h(
    tag,
    { class: classes },
    h(NodeRenderer, { node: props.node.children })
  );
};
</script>
