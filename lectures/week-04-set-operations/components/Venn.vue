<script setup lang="ts">
import { computed, useId } from 'vue'
import { TINT } from '../setops'

// Two-set Venn diagram, captioned with the operation. Its three regions take
// the deck's row colours (only A teal, both yellow, only B purple); the regions
// that make up the operation's result are filled, the others stay white.
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

// Every rendered slide shares one document, so clip and mask ids must be unique.
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
      </defs>
      <circle v-if="filled.a" cx="49" cy="49" r="48" :fill="TINT.teal" :mask="`url(#${id}-not-b)`" />
      <circle v-if="filled.b" cx="110" cy="49" r="48" :fill="TINT.purple" :mask="`url(#${id}-not-a)`" />
      <circle v-if="filled.both" cx="110" cy="49" r="48" :fill="TINT.yellow" :clip-path="`url(#${id}-a)`" />
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
