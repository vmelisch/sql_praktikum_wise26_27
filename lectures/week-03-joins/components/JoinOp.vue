<script setup lang="ts">
import type { JoinType } from '../joins'
import { joinPath } from '../joins'

// A join operator (⋈ ⟕ ⟖ ⟗) between two tables, sized with the text around it.
const props = withDefaults(defineProps<{ type?: JoinType }>(), { type: 'inner' })
</script>

<template>
  <svg class="join-op" viewBox="-14 -7 28 14" :aria-label="`${props.type} join`">
    <path :d="joinPath(props.type)" />
  </svg>
</template>

<style scoped>
.join-op {
  flex: none;
  width: 2em;
  height: 1em;
  fill: none;
  stroke: var(--db-text-soft);
  stroke-width: 1.1;
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>
