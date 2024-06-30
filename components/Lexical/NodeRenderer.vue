<script setup lang="ts">
import Text from './Text.vue'
import Heading from './Heading.vue'
import Paragraph from './Paragraph.vue'
import List from './List.vue'
import ListItem from './ListItem.vue'
import Image from './Image.vue'
import Blockquote from './Blockquote.vue'
import Bookmark from './Bookmark.vue'
import Gallery from './Gallery.vue'
import Link from './Link.vue'
import HorizontalRule from './HorizontalRule.vue'
import Embed from './Embed.vue'
import type { LexicalNode } from '@/utilities/LexicalTypes'

defineProps<{
  node: LexicalNode | LexicalNode[]
}>()

function renderNode(props: { node: LexicalNode }) {
  switch (props.node.type) {
    case 'text':
      return h(Text, { node: props.node })
    case 'extended-text':
      return h(Text, { node: props.node })
    case 'link':
      return h(Link, { node: props.node })
    case 'heading':
      return h(Heading, { node: props.node })
    case 'extended-heading':
      return h(Heading, { node: props.node })
    case 'paragraph':
      return h(Paragraph, { node: props.node })
    case 'list':
      return h(List, { node: props.node })
    case 'listitem':
      return h(ListItem, { node: props.node })
    case 'image':
      return h(Image, { node: props.node })
    case 'gallery':
      return h(Gallery, { node: props.node })
    case 'quote':
      return h(Blockquote, { node: props.node })
    case 'extended-quote':
      return h(Blockquote, { node: props.node })
    case 'bookmark':
      return h(Bookmark, { node: props.node })
    case 'horizontalrule':
      return h(HorizontalRule, { node: props.node })
    case 'html':
      return h(Embed, { node: props.node })
    default:
      return h(
        'div',
        { class: 'text-red-500' },
        `Render state error (bad node): ${JSON.stringify(props.node)}`,
      )
  }
}
</script>

<template>
  <template v-if="Array.isArray(node)">
    <template v-for="(n, i) in node" :key="i">
      <LexicalCode v-if="n.type === 'codeblock'" :node="n" />
      <renderNode v-else :node="n" />
    </template>
  </template>

  <renderNode v-else :node="node" />
</template>
