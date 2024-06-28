<script setup lang="ts">
import highlight from 'highlight.js'
import 'highlight.js/styles/nord.css'

export interface CodeNode {
  type: 'codeblock'
  language: string
  code: string
}

const props = defineProps<{
  node: CodeNode
}>()

const html = computed(() => {
  const { value } = highlight.highlight(props.node.code, {
    language: props.node.language,
  })
  return value
})
</script>

<template>
  <div class="rounded-lg bg-licorice p-4 shadow-inner relative">
    <pre class="overflow-x-auto" v-html="html" />
    <div class="absolute top-0 right-0 p-3 bg-gray-500 bg-opacity-80 text-xs text-gray-200 rounded-tr-md">
      {{ props.node.language }}
    </div>
  </div>
</template>

<style lang="scss">
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}

.hljs {
  background: #23241f;
  color: #f8f8f2;
}

.hljs-tag,
.hljs-subst {
  color: #f8f8f2;
}

.hljs-strong,
.hljs-emphasis {
  color: #a8a8a2;
}

.hljs-bullet,
.hljs-quote,
.hljs-number,
.hljs-regexp,
.hljs-literal,
.hljs-link {
  color: #ae81ff;
}

.hljs-code,
.hljs-title,
.hljs-section,
.hljs-selector-class {
  color: #a6e22e;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-name,
.hljs-attr {
  @apply text-pink-600;
}

.hljs-symbol,
.hljs-attribute {
  color: #66d9ef;
}

.hljs-params,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #f8f8f2;
}

.hljs-string,
.hljs-type,
.hljs-built_in,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-variable {
  color: #e6db74;
}

.hljs-comment,
.hljs-deletion,
.hljs-meta {
  color: #75715e;
}
</style>
