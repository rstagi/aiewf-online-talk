/* The three houses contending for the AIron Throne.
   Colors stay on the 04-slides-style.md two-accent palette:
   - TypeScript = vermilion accent (the riser)
   - Python     = teal accent-2 (the incumbent / the brain)
   - JavaScript = muted tan (the deposed old king — a neutral, NOT a third accent) */

export type HouseKey = 'js' | 'python' | 'typescript' | 'unknown'

export interface House {
  key: HouseKey
  name: string
  word: string
  color: string
  dim: string
}

export const HOUSES: Record<Exclude<HouseKey, 'unknown'>, House> = {
  js: {
    key: 'js',
    name: 'House JavaScript',
    word: 'The Old King',
    color: 'var(--talk-muted)',
    dim: 'var(--talk-rule)',
  },
  python: {
    key: 'python',
    name: 'House Python',
    word: 'The Incumbent',
    color: 'var(--talk-accent-2)',
    dim: 'var(--accent-2-dim)',
  },
  typescript: {
    key: 'typescript',
    name: 'House TypeScript',
    word: 'The Riser',
    color: 'var(--talk-accent)',
    dim: 'var(--accent-dim)',
  },
}

export function houseColor(key: HouseKey): string {
  if (key === 'unknown') return 'var(--talk-muted)'
  return HOUSES[key].color
}
