<script setup lang="ts">
import { computed, useId } from 'vue'
import { TINT } from '../setops'

// Two-set Venn diagram, captioned with the operation. Its regions take the
// deck's colours for the set operations: only A teal, only B purple, and what
// both share striped in the two colours (as the chips in the tables). The
// regions that make up the operation's result are filled, the others stay white.
//   <Venn op="union" class="absolute left-[740px] top-[127px]" />
const props = withDefaults(defineProps<{
  op: 'union' | 'intersect' | 'except'
  width?: number
}>(), { width: 160 })

const filled = computed(() => ({
  a: props.op !== 'intersect',
  both: props.op !== 'except',
  b: props.op === 'union',
}))

// Every rendered slide shares one document, so clip, mask and gradient ids must
// be unique.
const id = useId()
</script>

<template>
  <figure class="venn" :style="{ width: `${props.width}px` }">
    <figcaption>{{ props.op.toUpperCase() }}</figcaption>
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
        <!-- diagonal stripes in the colours of A and B: a gradient with hard
             stops that repeats along the diagonal -->
        <linearGradient :id="`${id}-both`" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="6" y2="6" spreadMethod="repeat">
          <stop offset="0" :stop-color="TINT.teal" />
          <stop offset="0.5" :stop-color="TINT.teal" />
          <stop offset="0.5" :stop-color="TINT.purple" />
          <stop offset="1" :stop-color="TINT.purple" />
        </linearGradient>
      </defs>
      <circle v-if="filled.a" cx="49" cy="49" r="48" :fill="TINT.teal" :mask="`url(#${id}-not-b)`" />
      <circle v-if="filled.b" cx="110" cy="49" r="48" :fill="TINT.purple" :mask="`url(#${id}-not-a)`" />
      <circle v-if="filled.both" cx="110" cy="49" r="48" :fill="`url(#${id}-both)`" :clip-path="`url(#${id}-a)`" />
      <circle cx="49" cy="49" r="48" class="venn__line" />
      <circle cx="110" cy="49" r="48" class="venn__line" />
    </svg>
  </figure>
</template>

<style scoped>
.venn {
  margin: 0;
}
.venn figcaption {
  padding-left: 4px;
  margin-bottom: 4px;
  font-family: var(--slidev-code-font-family);
  font-size: var(--db-fs-body);
  line-height: 1.2;
  color: var(--db-heading-blue);
}
.venn svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}
.venn__line {
  fill: none;
  stroke: var(--db-text-soft);
  stroke-width: 1.2;
}
</style>
