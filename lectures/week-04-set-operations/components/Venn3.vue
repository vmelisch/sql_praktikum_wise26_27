<script setup lang="ts">
import { useId } from 'vue'
import { TINT } from '../setops'

// Three-set Venn diagram for A ∪ (B ∩ C). The two shaded parts are separate
// shapes for the slide's timeline to reveal: `.v3-bc` (B ∩ C, yellow, like the
// inner box on the query) and `.v3-a` (A, teal). B ∩ C is painted over A, so the
// part inside all three circles stays yellow.
const id = useId()
</script>

<template>
  <svg class="venn3" viewBox="0 0 160 140" width="160" height="140">
    <defs>
      <clipPath :id="`${id}-b`"><circle cx="105" cy="50" r="42" /></clipPath>
    </defs>
    <circle class="v3-a" cx="55" cy="50" r="42" :fill="TINT.teal" />
    <circle class="v3-bc" cx="80" cy="93" r="42" :fill="TINT.yellow" :clip-path="`url(#${id}-b)`" />
    <circle cx="55" cy="50" r="42" class="venn3__line" />
    <circle cx="105" cy="50" r="42" class="venn3__line" />
    <circle cx="80" cy="93" r="42" class="venn3__line" />
    <text x="6" y="16">A</text>
    <text x="146" y="16">B</text>
    <text x="128" y="134">C</text>
  </svg>
</template>

<style scoped>
.venn3 {
  display: block;
  overflow: visible;
}
.venn3__line {
  fill: none;
  stroke: var(--db-text-soft);
  stroke-width: 1.2;
}
.venn3 text {
  font-family: KaTeX_Math, 'Times New Roman', serif;
  font-style: italic;
  font-size: 16px;
  fill: var(--db-text-soft);
}
</style>
