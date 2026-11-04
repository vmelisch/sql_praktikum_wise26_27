<script setup lang="ts">
import { TINT } from '../setops'

// Mini picture of duplicate removal for the intro slide: five rows, among them
// two pairs of equal ones (same colour), become three.
const rows = ['teal', 'purple', 'teal', 'yellow', 'purple'] as const
const kept = ['teal', 'purple', 'yellow'] as const
</script>

<template>
  <svg class="dedupe" viewBox="0 0 150 76" width="150" height="76">
    <rect v-for="(t, i) in rows" :key="i" x="1" :y="1 + i * 15" width="44" height="11" rx="2" :fill="TINT[t]" />
    <path class="dedupe__arrow" d="M58 38h30M83 33.5l5 4.5-5 4.5" />
    <rect v-for="(t, i) in kept" :key="`k${i}`" x="105" :y="16 + i * 15" width="44" height="11" rx="2" :fill="TINT[t]" />
  </svg>
</template>

<style scoped>
.dedupe {
  display: block;
}
.dedupe rect {
  stroke: var(--db-table-rule);
  stroke-width: 0.75;
}
.dedupe__arrow {
  fill: none;
  stroke: var(--db-table-rule);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
