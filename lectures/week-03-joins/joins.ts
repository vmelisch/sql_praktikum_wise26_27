// The join operators of relational algebra, drawn as SVG paths so they look
// the same on every machine (few fonts have ⟕ ⟖ ⟗). Centred on (0, 0), 14
// units wide (plus the outer join's 6-unit flags) and 12 high:
//   inner ⋈ — two triangles meeting in the middle;
//   left ⟕ / right ⟖ / full ⟗ — ⋈ with flags on the side(s) whose rows are kept.
export type JoinType = 'inner' | 'left' | 'right' | 'full'

/** A join tree: a table name, or an operator over two subtrees. */
export type JoinNode = string | { op: JoinType, left: JoinNode, right: JoinNode }

const BOWTIE = 'M -7 -6 L 7 6 V -6 L -7 6 Z'
const LEFT_FLAGS = 'M -7 -6 H -13 M -7 6 H -13'
const RIGHT_FLAGS = 'M 7 -6 H 13 M 7 6 H 13'

export function joinPath(type: JoinType): string {
  return [
    BOWTIE,
    type === 'left' || type === 'full' ? LEFT_FLAGS : '',
    type === 'right' || type === 'full' ? RIGHT_FLAGS : '',
  ].join(' ')
}
