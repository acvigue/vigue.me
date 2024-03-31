<template>
  <div class="rounded-md bg-gray-800 p-4 shadow-inner relative">
    <pre v-html="html" class="overflow-x-auto"></pre>
    <div
      class="absolute top-0 right-0 p-3 bg-gray-900 text-xs text-gray-200 rounded-tr-md"
    >
      {{ props.node.language }}
    </div>
  </div>
</template>

<script setup lang="ts">
import highlight from "highlight.js";

export type CodeNode = {
  type: "codeblock";
  language: string;
  code: string;
};

const props = defineProps<{
  node: CodeNode;
}>();

const html = computed(() => {
  const { value } = highlight.highlight(props.node.code, {
    language: props.node.language,
  });
  return value;
});
</script>
