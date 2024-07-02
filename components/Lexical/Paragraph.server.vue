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
  <div class="md:text-lg text-md text-licorice font-serif">
    <LexicalNodeRenderer :node="props.node.children" />
  </div>
</template>
