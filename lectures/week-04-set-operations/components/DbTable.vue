<script setup lang="ts">
import type { Mark } from '../setops'
import { TINT } from '../setops'

// A table from data, styled by the theme like a Markdown table, with hooks for
// the slide timelines: row i (1-based) has class r<i>, column j class c<j>, and
// every value sits in a .chip, the small rounded label that carries a tint (as
// in week 3) instead of colouring the whole cell. `tints` colours the chips of a
// row (for result tables), in the columns `tintCols` (1-based) or in all of
// them: a tint, or 'both' for the teal and purple stripes of a value that is in
// both inputs of a set operation. `code` sets the caption in mono (for an
// operator such as UNION ALL). The table is at least as wide as its caption.
const props = withDefaults(defineProps<{
  caption?: string
  head: string[]
  rows: (string | number)[][]
  tints?: (Mark | null)[]
  tintCols?: number[]
  code?: boolean
}>(), { caption: '', tints: () => [], tintCols: () => [], code: false })

const tintOf = (i: number, j: number) => {
  const t = props.tints[i]
  const marked = !props.tintCols.length || props.tintCols.includes(j + 1)
  if (!t || !marked)
    return undefined
  return t === 'both' ? { '--both': 1 } : { backgroundColor: TINT[t] }
}
</script>

<template>
  <div class="dbt" :style="{ '--stripe-a': TINT.teal, '--stripe-b': TINT.purple }">
    <p v-if="props.caption">
      <span class="table-caption" :class="{ 'dbt__code': props.code }">{{ props.caption }}</span>
    </p>
    <table>
      <thead>
        <tr>
          <th v-for="(h, j) in props.head" :key="j" :class="`c${j + 1}`">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in props.rows" :key="i" :class="`r${i + 1}`">
          <td v-for="(cell, j) in row" :key="j" :class="`c${j + 1}`"><span class="chip" :style="tintOf(i, j)">{{ cell }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* A faint zebra (as in week 3): on the theme's grey rows the chips' tints
   hardly show. */
.dbt {
  --db-table-stripe: #f2f2f2;
  display: grid;
  grid-template-columns: max-content;
}
.dbt table {
  width: 100%;
}
/* Even rows get an explicit white, so a colour tween starts from white rather
   than from transparent black. */
.dbt tbody tr:nth-child(even) {
  background-color: #fff;
}
/* The bottom rule belongs to the table, not to its last row, so it stays at the
   bottom when a timeline moves rows around. */
.slidev-layout .dbt table {
  border-bottom: 1px solid var(--db-table-rule);
}
.slidev-layout .dbt tbody tr:last-child td {
  border-bottom: none;
}
.dbt__code {
  font-family: var(--slidev-code-font-family);
}
/* A value's chip: clear until `tints` or a slide's timeline colours it. As
   high as the cell's line of text; the negative margin takes the padding back
   out of the layout, so the chip reaches into the cell's own padding and the
   table is exactly as wide as without chips. */
.chip {
  position: relative;
  isolation: isolate;
  display: inline-block;
  margin: 0 -0.45em;
  padding: 0 0.45em;
  border-radius: 0.75em;
  line-height: 1.4;
}
/* "In both inputs": stripes in the colours of the two inputs, behind the text
   and as strong as --both (set by `tints` or tweened by a slide's timeline). */
.chip::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: repeating-linear-gradient(135deg, var(--stripe-a) 0 4px, var(--stripe-b) 4px 8px);
  opacity: var(--both, 0);
}
</style>
