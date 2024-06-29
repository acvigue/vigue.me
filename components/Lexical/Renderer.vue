<script setup lang="ts">
import type { LexicalState } from '~/utilities/LexicalTypes'

const props = defineProps<{
  state: string
}>()

const parsedState = JSON.parse(props.state) as LexicalState
</script>

<template>
  <LexicalNodeRenderer :node="parsedState.root.children" />
</template>