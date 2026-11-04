// Row colours shared by the tables, the Venn diagrams and the slide timelines:
// brand accents mixed with white, so the row text stays readable. On the set
// operation slides they mean "only in the left input" (teal), "in both"
// (yellow) and "only in the right input" (purple); on the DISTINCT slides they
// mark groups of duplicates.
export const TINT = {
  teal: '#c6e8e0', // --db-accent1 at 30%
  yellow: '#fdebac', // --db-accent4 at 35%
  purple: '#e2ccdc', // --db-accent6 at 28%
} as const

export type Tint = keyof typeof TINT

/** The same colour at zero alpha, to fade a tinted cell back out cleanly. */
export function clear(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0)`
}

/** fromTo() arguments that fade a tint into a cell that has no background yet. */
export function tintIn(target: string, tint: Tint, duration = 0.4) {
  return [target, { backgroundColor: clear(TINT[tint]) }, { backgroundColor: TINT[tint], duration }] as const
}
