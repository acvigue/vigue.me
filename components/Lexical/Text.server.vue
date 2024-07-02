<script setup lang="ts">
import { computed, h } from 'vue'

export interface TextNode {
  type: 'text' | 'extended-text'
  text: string
  format: number
}

const props = defineProps<{
  node: TextNode
}>()

const formatFlags = computed(() => {
  const f = props.node.format
  return {
    bold: (f & 1) !== 0,
    italic: (f & (1 << 1)) !== 0,
    strikethrough: (f & (1 << 2)) !== 0,
    underline: (f & (1 << 3)) !== 0,
    code: (f & (1 << 4)) !== 0,
    subscript: (f & (1 << 5)) !== 0,
    superscript: (f & (1 << 6)) !== 0,
    inverted: (f & (1 << 7)) !== 0,
  }
})

function renderText() {
  let node = h('span', props.node.text)
  if (formatFlags.value.bold)
    node = h('b', node)
  if (formatFlags.value.italic)
    node = h('i', node)
  if (formatFlags.value.strikethrough)
    node = h('s', node)
  if (formatFlags.value.underline)
    node = h('u', node)
  if (formatFlags.value.code)
    node = h('code', { class: 'inline' }, node)
  if (formatFlags.value.subscript)
    node = h('sub', node)
  if (formatFlags.value.superscript)
    node = h('sup', node)
  if (formatFlags.value.inverted)
    node = h('div', { class: 'bg-carribean text-licorice' }, node)
  return node
}
</script>

<template>
  <renderText />
</template>
