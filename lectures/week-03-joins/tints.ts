// The deck's highlight colours, as in weeks 1 and 2: the brand accents for
// text, and the same accents mixed with white for table cells that text sits
// on. A part of a query is highlighted by recolouring its text; the table
// cells that go with it get the matching tint. (No yellow text: it is
// unreadable on white.)
//
// On the join slides, the colours mean:
//   - KEY: an order and the customer it joins with share a colour in their
//     c_id cells (as the coloured c_id values in the PowerPoint);
//   - purple: the shared column of a USING join;
//   - teal / blue: the table an outer join keeps all rows of / the one it
//     only takes matching rows from.
export const ACCENT = {
  teal: '#40b498', // --db-accent1
  blue: '#1f8299', // --db-accent3
  red: '#ea4f30', // --db-accent5
  purple: '#994781', // --db-accent6
} as const

export const TINT = {
  teal: '#c6e8e0', // --db-accent1 at 30%
  yellow: '#fdebac', // --db-accent4 at 35%
  blue: '#bcdae0', // --db-accent3 at 30%
  red: '#f9cac1', // --db-accent5 at 30%
  purple: '#e2ccdc', // --db-accent6 at 28%
} as const

export type Color = keyof typeof ACCENT
export type Tint = keyof typeof TINT

/** The c_id values that find a partner, each in its own colour. */
export const KEY: Record<string, Tint> = { 1: 'teal', 2: 'yellow', 3: 'purple' }

/** How far the code outside the highlighted part fades, as Slidev's line highlighting does. */
export const FADED = 0.3

/** The same colour at zero alpha, to fade a tint in from nothing cleanly. */
export function clear(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, 0)`
}

/** fromTo() arguments that fade a tint in behind table cells. (As in week 1.) */
export function tintIn(target: string | HTMLElement[], color: Tint, duration = 0.4) {
  return [target, { backgroundColor: clear(TINT[color]) }, { backgroundColor: TINT[color], duration }] as const
}

/**
 * Everything in the code blocks matching `code` that lies outside the marks
 * matching `marks`: each line's tokens and other marks, to fade so that only
 * the marked part stands out. (As in week 1.)
 */
export function outside(root: ParentNode, code: string, marks: string): HTMLElement[] {
  const keep = new Set(root.querySelectorAll(marks))
  return [...root.querySelectorAll<HTMLElement>(`${code} .line > *`)].filter(el => !keep.has(el))
}

/** The body rows of the tables matching `table`, and their cells. */
export function rows(root: ParentNode, table: string): HTMLTableRowElement[] {
  return [...root.querySelectorAll<HTMLTableRowElement>(`${table} tbody tr`)]
}
export function cells(rs: HTMLTableRowElement[]): HTMLTableCellElement[] {
  return rs.flatMap(r => [...r.cells])
}
/** A cell's text. */
export function text(row: HTMLTableRowElement, col: number): string {
  return row.cells[col].textContent!.trim()
}

/** A selector list extended to the syntax-coloured tokens inside each match. */
function withTokens(target: string): string {
  return target.split(',').map(t => `${t.trim()}, ${t.trim()} span`).join(', ')
}

/**
 * to() arguments that recolour the text of the theme's code marks
 * (⟦name:text⟧). A mark can span several syntax-coloured tokens, so the
 * tokens inside it are recoloured too. (As in weeks 1 and 2.)
 */
export function markColor(target: string, color: Color, duration = 0.4) {
  return [withTokens(target), { color: ACCENT[color], duration }] as const
}

/**
 * The cells of the column called `name` in every Markdown table under `root`:
 * header cells and body cells.
 */
export function column(root: ParentNode, name: string) {
  const head: HTMLTableCellElement[] = []
  const body: HTMLTableCellElement[] = []
  for (const table of root.querySelectorAll('table')) {
    const i = [...table.querySelectorAll('thead th')].findIndex(th => th.textContent!.trim() === name)
    if (i < 0)
      continue
    head.push(table.querySelectorAll<HTMLTableCellElement>('thead th')[i])
    for (const row of table.querySelectorAll('tbody tr'))
      body.push((row as HTMLTableRowElement).cells[i])
  }
  return { head, body }
}

/**
 * Tints the c_id cells of the tables under `root` by value, so that an order
 * and the customer it joins with share a colour. Only the values in `keys`
 * (the ones that find a partner) are tinted.
 */
export function tintKeys(root: ParentNode, keys: Record<string, Tint> = KEY) {
  for (const cell of column(root, 'c_id').body) {
    const t = keys[cell.textContent!.trim()]
    if (t)
      cell.style.backgroundColor = TINT[t]
  }
}
