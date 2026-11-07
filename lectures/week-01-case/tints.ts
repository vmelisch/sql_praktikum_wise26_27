// The deck's highlight colours, as in weeks 2 and 4: the brand accents for
// text and lines, and the same accents mixed with white for table cells that
// text sits on. A part of a query is highlighted by recolouring its text (and
// fading the rest of the code, like Slidev's line highlighting); the table
// cells it produces get the matching tint. (No yellow: as text it is
// unreadable on white.)
export const ACCENT = {
  teal: '#40b498', // --db-accent1
  blue: '#1f8299', // --db-accent3
  red: '#ea4f30', // --db-accent5
  purple: '#994781', // --db-accent6
} as const

export const TINT = {
  teal: '#c6e8e0', // --db-accent1 at 30%
  blue: '#bcdae0', // --db-accent3 at 30%
  red: '#f9cac1', // --db-accent5 at 30%
  purple: '#e2ccdc', // --db-accent6 at 28%
} as const

export type Color = keyof typeof ACCENT

/** How far the code outside the highlighted part fades, as Slidev's line highlighting does. */
export const FADED = 0.3

/** The same colour at zero alpha, to fade a tint in from nothing cleanly. */
export function clear(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0)`
}

/** fromTo() arguments that fade a tint in behind table cells. */
export function tintIn(target: string | HTMLElement[], color: Color, duration = 0.4) {
  return [target, { backgroundColor: clear(TINT[color]) }, { backgroundColor: TINT[color], duration }] as const
}

/** A selector list extended to the syntax-coloured tokens inside each match. */
function withTokens(target: string): string {
  return target.split(',').map(t => `${t.trim()}, ${t.trim()} span`).join(', ')
}

/**
 * to() arguments that recolour the text of the theme's code marks
 * (⟦name:text⟧). A mark can span several syntax-coloured tokens, so the
 * tokens inside it are recoloured too. (As in week 2.)
 */
export function markColor(target: string, color: Color, duration = 0.4) {
  return [withTokens(target), { color: ACCENT[color], duration }] as const
}

/**
 * Everything in the code blocks matching `code` that lies outside the marks
 * matching `marks`: each line's tokens and other marks, to fade so that only
 * the marked part stands out.
 */
export function outside(root: ParentNode, code: string, marks: string): HTMLElement[] {
  const keep = new Set(root.querySelectorAll(marks))
  return [...root.querySelectorAll<HTMLElement>(`${code} .line > *`)].filter(el => !keep.has(el))
}
