export const TINT = {
  teal: '#c6e8e0',   // --db-accent1 at 30%
  yellow: '#fdebac', // --db-accent4 at 35%
  purple: '#e2ccdc', // --db-accent6 at 28%
  red: '#fbd0c8',    // --db-accent5 at 30%
  blue: '#c9d8f3',   // --db-accent2 at 30%
} as const

export type Tint = keyof typeof TINT
