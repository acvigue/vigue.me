<script setup lang="ts">
import type { LexicalNode } from '~/utilities/LexicalTypes'

export interface LinkNode {
  type: 'link'
  url: string
  children: LexicalNode[]
}

const props = defineProps<{
  node: LinkNode
}>()
</script>

<template>
  <a :href="node.url" class="text-persian underline">
    <LexicalNodeRenderer :node="props.node.children" />
  </a>
</template>
