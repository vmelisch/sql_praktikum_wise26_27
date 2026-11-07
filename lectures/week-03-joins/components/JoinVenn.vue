<script setup lang="ts">
import { computed, useId } from 'vue'
import type { JoinType } from '../joins'
import { TINT } from '../tints'

// Two-set Venn diagram of a join type, captioned with its keyword: the left
// circle is the left table, the right circle the right table. The overlap
// (the matched rows) is always filled; an outer join also fills the part of
// the circle(s) whose unmatched rows it keeps. (As week 4's Venn.)
const props = withDefaults(defineProps<{
  type: JoinType
  width?: number
}>(), { width: 150 })

const filled = computed(() => ({
  left: props.type === 'left' || props.type === 'full',
  right: props.type === 'right' || props.type === 'full',
}))

// Every rendered slide shares one document, so clip and mask ids must be unique.
const id = useId()
</script>

<template>
  <figure class="join-venn" :style="{ width: `${props.width}px` }">
    <figcaption>{{ props.type.toUpperCase() }} JOIN</figcaption>
    <svg viewBox="0 0 160 98">
      <defs>
        <clipPath :id="`${id}-a`"><circle cx="49" cy="49" r="48" /></clipPath>
        <mask :id="`${id}-not-a`">
          <rect width="160" height="98" fill="#fff" />
          <circle cx="49" cy="49" r="48" fill="#000" />
        </mask>
        <mask :id="`${id}-not-b`">
          <rect width="160" height="98" fill="#fff" />
          <circle cx="110" cy="49" r="48" fill="#000" />
        </mask>
      </defs>
      <circle v-if="filled.left" cx="49" cy="49" r="48" :fill="TINT.blue" :mask="`url(#${id}-not-b)`" />
      <circle v-if="filled.right" cx="110" cy="49" r="48" :fill="TINT.blue" :mask="`url(#${id}-not-a)`" />
      <circle cx="110" cy="49" r="48" :fill="TINT.blue" :clip-path="`url(#${id}-a)`" />
      <circle cx="49" cy="49" r="48" class="join-venn__line" />
      <circle cx="110" cy="49" r="48" class="join-venn__line" />
    </svg>
  </figure>
</template>

<style scoped>
.join-venn {
  margin: 0;
}
.join-venn figcaption {
  padding-left: 4px;
  margin-bottom: 4px;
  font-family: var(--slidev-code-font-family);
  font-size: var(--db-fs-body);
  line-height: 1.2;
  color: var(--db-heading-blue);
}
.join-venn svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}
.join-venn__line {
  fill: none;
  stroke: var(--db-text-soft);
  stroke-width: 1.2;
}
</style>
