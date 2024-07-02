<script setup lang="ts">
import { h } from 'vue'
import NodeRenderer from './NodeRenderer.vue'
import type { LexicalNode } from '~/utilities/LexicalTypes'

export interface HeadingNode {
  type: 'heading' | 'extended-heading'
  children: LexicalNode[]
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const props = defineProps<{
  node: HeadingNode
}>()

function classes() {
  return {
    '!text-3xl': props.node.tag === 'h1',
    '!text-2xl': props.node.tag === 'h2',
    '!text-xl': props.node.tag === 'h3',
    '!text-lg': props.node.tag === 'h4',
    '!text-md': props.node.tag === 'h5',
    '!text-sm': props.node.tag === 'h6',
    'text-persian': true,
    'font-serif2': true,
    'font-bold': true,
  }
}

function renderHeading() {
  const applyClasses = classes()
  return h(
    props.node.tag,
    { class: applyClasses },
    h(NodeRenderer, { node: props.node.children }),
  )
}
</script>

<template>
  <renderHeading />
</template>
