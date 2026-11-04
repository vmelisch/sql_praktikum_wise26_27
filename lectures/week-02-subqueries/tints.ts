// The deck's highlight colours: the brand accents, for text and lines, and the
// same accents mixed with white (as in week 4), for row backgrounds that text
// sits on. In code they recolour parts of a query (an inner query teal, its
// parentheses yellow, a correlation predicate red, which keeps it apart from
// the purple SQL keywords around it); in tables they tint the
// rows of a department (see DEPT).
export const ACCENT = {
  teal: '#40b498', // --db-accent1
  yellow: '#f9c611', // --db-accent4
  purple: '#994781', // --db-accent6
  blue: '#1f8299', // --db-accent3
  red: '#ea4f30', // --db-accent5
} as const

export const TINT = {
  teal: '#c6e8e0', // --db-accent1 at 30%
  yellow: '#fdebac', // --db-accent4 at 35%
  purple: '#e2ccdc', // --db-accent6 at 28%
  blue: '#bcdae0', // --db-accent3 at 30%
  red: '#f9cac1', // --db-accent5 at 30%
} as const

export type Tint = keyof typeof TINT

/**
 * Each department's colour, wherever rows are tinted by department: the
 * matching tuple on the row-subquery slide, and the runs of the correlated
 * subquery, where a repeated colour shows a repeated computation.
 */
export const DEPT: Record<string, Tint> = { 268: 'teal', 192: 'yellow', 451: 'purple' }

/** The same colour at zero alpha, to fade a tint in from nothing cleanly. */
export function clear(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0)`
}

/** A selector list extended to the syntax-coloured tokens inside each match. */
function withTokens(target: string): string {
  return target.split(',').map(t => `${t.trim()}, ${t.trim()} span`).join(', ')
}

/**
 * to() arguments that recolour the text of the theme's code marks
 * (⟦name:text⟧), or of inline code. A mark can span several syntax-coloured
 * tokens, so the tokens inside it are recoloured too, each from its own
 * colour. `vars` adds to the tween, e.g. { fontWeight: 700 } for glyphs too
 * thin to carry a light colour (the code font is monospaced, so bold moves
 * nothing).
 */
export function markColor(target: string, color: Tint, vars: Record<string, unknown> = {}) {
  return [withTokens(target), { color: ACCENT[color], duration: 0.4, ...vars }] as const
}

/**
 * to() arguments that undo markColor: every element back to the colour it
 * has now. Call it in onMounted while building the timeline, before anything
 * is recoloured.
 */
export function markReset(root: ParentNode, target: string) {
  const own = new Map([...root.querySelectorAll<HTMLElement>(withTokens(target))]
    .map(el => [el, getComputedStyle(el).color]))
  return [withTokens(target), { color: (_: number, el: HTMLElement) => own.get(el)!, duration: 0.4 }] as const
}
