<template>
  <renderNode
    v-if="Array.isArray(node)"
    v-for="(n, i) in node"
    :node="n"
    :key="i"
  />

  <renderNode v-else :node="node" />
</template>

<script setup lang="ts">
import { type LexicalNode } from "@/utilities/LexicalTypes";

import Text from "./Text.server.vue";
import Heading from "./Heading.server.vue";
import Paragraph from "./Paragraph.server.vue";
import List from "./List.server.vue";
import ListItem from "./ListItem.server.vue";
import Image from "./Image.vue";
import Code from "./Code.server.vue";
import Blockquote from "./Blockquote.server.vue";
import Bookmark from "./Bookmark.server.vue";
import Gallery from "./Gallery.vue";
import Link from "./Link.server.vue";

const props = defineProps<{
  node: LexicalNode | LexicalNode[];
}>();

const renderNode = (props: { node: LexicalNode }) => {
  switch (props.node.type) {
    case "text":
      return h(Text, { node: props.node });
    case "extended-text":
      return h(Text, { node: props.node });
    case "link":
      return h(Link, { node: props.node });
    case "heading":
      return h(Heading, { node: props.node });
    case "paragraph":
      return h(Paragraph, { node: props.node });
    case "list":
      return h(List, { node: props.node });
    case "listitem":
      return h(ListItem, { node: props.node });
    case "image":
      return h(Image, { node: props.node });
    case "gallery":
      return h(Gallery, { node: props.node });
    case "quote":
      return h(Blockquote, { node: props.node });
    case "bookmark":
      return h(Bookmark, { node: props.node });
    case "codeblock":
      return h(Code, { node: props.node });
    default:
      return h(
        "div",
        { class: "text-red-500" },
        `Render state error (bad node): ${JSON.stringify(props.node)}`
      );
  }
};
</script>
