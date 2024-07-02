<script setup lang="ts">
import { h } from 'vue'
import NodeRenderer from './NodeRenderer.vue'
import type { LexicalNode } from '~/utilities/LexicalTypes'

export interface ListItemNode {
  type: 'listitem'
  children: LexicalNode[]
}

const props = defineProps<{
  node: ListItemNode
}>()

function renderListItem() {
  return h('li', h(NodeRenderer, { node: props.node.children }))
}
</script>

<template>
  <div class="md:text-lg text-md text-licorice">
    <renderListItem />
  </div>
</template>
