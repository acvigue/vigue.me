<script setup lang="ts">
import type { LexicalNode } from '~/utilities/LexicalTypes'

export interface BlockquoteNode {
  type: 'quote' | 'extended-quote'
  children: LexicalNode[]
}

const props = defineProps<{
  node: BlockquoteNode
}>()
</script>

<template>
  <blockquote class="md:text-lg text-md py-4 font-serif">
    <LexicalNodeRenderer :node="props.node.children" />
  </blockquote>
</template>

<style lang="scss">
blockquote {
  position: relative;
  font-style: italic;
  padding-left: 0.3rem;
}

blockquote::before {
  content: "";
  position: absolute;
  left: -1em;
  top: 0;
  bottom: 0;
  width: 0.3rem;
  @apply bg-persian;
}

blockquote * {
  margin: 0 !important;
}
</style>
