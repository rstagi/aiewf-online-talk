import type { HouseKey } from './houses'

export interface Chapter {
  roman: string
  title: string
  /** inclusive 1-based slide range */
  range: [number, number]
}

/* The "books" of the song — the realm-chrome banner shows the current one.
   (Slides 1 & 5 — the title open and the about card — run chrome-off, so their
   book label never shows; the ranges stay contiguous for the find().) */
export const CHAPTERS: Chapter[] = [
  { roman: 'I', title: 'The Iron King', range: [1, 5] },
  { roman: 'II', title: 'The Shift in the Stack', range: [6, 8] },
  { roman: 'III', title: 'The Overtake', range: [9, 14] },
  { roman: 'IV', title: 'The Bannermen', range: [15, 24] },
  { roman: 'V', title: 'The Prophecy', range: [25, 29] },
]

export function chapterForSlide(oneBased: number): Chapter {
  return CHAPTERS.find(c => oneBased >= c.range[0] && oneBased <= c.range[1]) ?? CHAPTERS[0]
}

/* who the realm believes sits the throne, per slide — Python reigns through the
   open and the concession (the brain/app split, slide 9), then flips
   teal→vermilion at slide 10, where the contributor data shows the overtake.
   Slide 1 opens Contested (the ? throne). */
export function throneHolderForSlide(oneBased: number): HouseKey {
  if (oneBased <= 1) return 'unknown'
  if (oneBased <= 9) return 'python'
  return 'typescript'
}
