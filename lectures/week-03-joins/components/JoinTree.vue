<script setup lang="ts">
import { computed } from 'vue'
import type { JoinNode, JoinType } from '../joins'
import { joinPath } from '../joins'

// A join tree in relational algebra: bare operators (⋈ ⟕ ⟖ ⟗) at the inner
// nodes, table names at the leaves, every node one level below its parent.
// The two inputs of an operator sit as close as their subtrees allow (a
// small Reingold–Tilford layout: on every level, the right subtree keeps GAP
// from the left one), with the operator midway above them, so the branches
// stay steep.
//   <JoinTree :tree="{ op: 'right', left: { op: 'left', left: 'customers', right: 'orders' }, right: 'shipments' }" />
const props = defineProps<{ tree: JoinNode }>()

const LEVEL = 50 // from a node down to its inputs
const GAP = 24 // between neighbours on one level
const CHAR = 8 // advance of a leaf's character: the code font at 10pt
const OP_SCALE = 0.95
const OP_HALF_HEIGHT = 6 * OP_SCALE

/** An operator's horizontal extent: its flags stick out on the kept side(s). */
function opExtent(t: JoinType): [number, number] {
  return [(t === 'left' || t === 'full' ? -13 : -7) * OP_SCALE, (t === 'right' || t === 'full' ? 13 : 7) * OP_SCALE]
}

interface Laid {
  // positions relative to the subtree's root, d = levels below it
  ops: { x: number, d: number, type: JoinType }[]
  leaves: { x: number, d: number, name: string }[]
  edges: { x1: number, d1: number, x2: number, d2: number, leaf: boolean }[]
  contour: [number, number][] // per level below the root: [left edge, right edge]
}

function lay(node: JoinNode): Laid {
  if (typeof node === 'string') {
    const half = node.length * CHAR / 2
    return { ops: [], leaves: [{ x: 0, d: 0, name: node }], edges: [], contour: [[-half, half]] }
  }
  const l = lay(node.left)
  const r = lay(node.right)
  // the smallest distance between the inputs that keeps GAP on every level
  let dist = 0
  for (let d = 0; d < Math.min(l.contour.length, r.contour.length); d++)
    dist = Math.max(dist, l.contour[d][1] - r.contour[d][0] + GAP)
  const move = (t: Laid, dx: number): Laid => ({
    ops: t.ops.map(o => ({ ...o, x: o.x + dx, d: o.d + 1 })),
    leaves: t.leaves.map(f => ({ ...f, x: f.x + dx, d: f.d + 1 })),
    edges: t.edges.map(e => ({ ...e, x1: e.x1 + dx, x2: e.x2 + dx, d1: e.d1 + 1, d2: e.d2 + 1 })),
    contour: t.contour.map(([a, b]) => [a + dx, b + dx] as [number, number]),
  })
  const L = move(l, -dist / 2)
  const R = move(r, dist / 2)
  const below: [number, number][] = []
  for (let d = 0; d < Math.max(L.contour.length, R.contour.length); d++) {
    const sides = [L.contour[d], R.contour[d]].filter(Boolean)
    below.push([Math.min(...sides.map(c => c[0])), Math.max(...sides.map(c => c[1]))])
  }
  return {
    ops: [{ x: 0, d: 0, type: node.op }, ...L.ops, ...R.ops],
    leaves: [...L.leaves, ...R.leaves],
    edges: [
      { x1: 0, d1: 0, x2: -dist / 2, d2: 1, leaf: typeof node.left === 'string' },
      { x1: 0, d1: 0, x2: dist / 2, d2: 1, leaf: typeof node.right === 'string' },
      ...L.edges,
      ...R.edges,
    ],
    contour: [opExtent(node.op), ...below],
  }
}

const layout = computed(() => {
  const t = lay(props.tree)
  const left = Math.min(...t.contour.map(c => c[0])) - 2
  const right = Math.max(...t.contour.map(c => c[1])) + 2
  const depth = t.contour.length - 1
  return {
    ...t,
    // from below an operator to above its input: an operator's top, or a
    // table name's cap height
    lines: t.edges.map(e => ({
      x1: e.x1,
      y1: e.d1 * LEVEL + OP_HALF_HEIGHT + 2,
      x2: e.x2,
      y2: e.d2 * LEVEL - (e.leaf ? 10 : OP_HALF_HEIGHT + 2),
    })),
    box: { x: left, y: -10, w: right - left, h: depth * LEVEL + 20 },
  }
})
</script>

<template>
  <svg
    class="join-tree"
    :viewBox="`${layout.box.x} ${layout.box.y} ${layout.box.w} ${layout.box.h}`"
    :width="layout.box.w"
    :height="layout.box.h"
  >
    <line v-for="(e, i) in layout.lines" :key="`e${i}`" class="join-tree__edge" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" />
    <path
      v-for="(o, i) in layout.ops"
      :key="`o${i}`"
      class="join-tree__op"
      :d="joinPath(o.type)"
      :transform="`translate(${o.x} ${o.d * LEVEL}) scale(${OP_SCALE})`"
    />
    <text v-for="(f, i) in layout.leaves" :key="`l${i}`" class="join-tree__leaf" :x="f.x" :y="f.d * LEVEL + 5">{{ f.name }}</text>
  </svg>
</template>

<style scoped>
.join-tree {
  display: block;
  overflow: visible;
}
.join-tree__edge {
  stroke: var(--db-text);
  stroke-width: 1.1;
  stroke-linecap: round;
}
.join-tree__op {
  fill: none;
  stroke: var(--db-text-soft);
  stroke-width: 1.1;
  stroke-linejoin: round;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}
.join-tree__leaf {
  font-family: var(--slidev-code-font-family);
  font-size: calc(10 * var(--db-pt));
  fill: var(--db-text-soft);
  text-anchor: middle;
}
</style>
