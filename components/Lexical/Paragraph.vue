<script setup lang="ts">
import type { LexicalNode } from '~/utilities/LexicalTypes'

export interface ParagraphNode {
  type: 'paragraph'
  children: LexicalNode[]
}

const props = defineProps<{
  node: ParagraphNode
}>()
</script>

<template>
  <div class="md:text-xl text-lg mx-2 text-licorice">
    <LexicalNodeRenderer :node="props.node.children" />
  </div>
</template>
