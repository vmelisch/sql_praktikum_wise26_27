// Tints shared by the tables, the Venn diagrams and the slide timelines: brand
// accents mixed with white, so text on them stays readable. In a table a tint
// goes on the chip around a value (see DbTable), not on the whole cell or row.
// On the set operation slides teal means "only in the left input" and purple
// "only in the right input"; what is in both is striped in the two colours
// (the mark 'both'), in the tables as in the Venn diagrams. On the DISTINCT
// slides the tints mark groups of duplicates.
export const TINT = {
  teal: '#c6e8e0', // --db-accent1 at 30%
  yellow: '#fdebac', // --db-accent4 at 35%
  purple: '#e2ccdc', // --db-accent6 at 28%
} as const

export type Tint = keyof typeof TINT
/** What a chip can carry: a tint, or the teal and purple stripes of "in both inputs". */
export type Mark = Tint | 'both'

/** The same colour at zero alpha, to fade a tint in from nothing cleanly. */
export function clear(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0)`
}

/** fromTo() arguments that fade a tint into chips that are still clear. */
export function tintIn(target: string, tint: Tint, duration = 0.4) {
  return [target, { backgroundColor: clear(TINT[tint]) }, { backgroundColor: TINT[tint], duration }] as const
}

/**
 * fromTo() arguments that fade the stripes of "in both inputs" into chips. A
 * chip draws them as strong as its --both (0 to 1); to turn a striped chip
 * into a plain one, tween --both back to 0 and a tint in.
 */
export function bothIn(target: string, duration = 0.4) {
  return [target, { '--both': 0 }, { '--both': 1, duration }] as const
}

/**
 * Selector for the chips in column `col` of the rows `rows` (both 1-based) of
 * the DbTable matching `table`.
 */
export function chips(table: string, rows: number[], col: number): string {
  return `${table} :is(${rows.map(r => `.r${r}`).join(', ')}) .c${col} .chip`
}
