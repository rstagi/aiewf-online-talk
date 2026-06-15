import { Fragment, type ReactNode } from 'react'

/* Minimal inline markup for statements: <ts>…</ts> (TypeScript accent),
   <py>…</py> (Python accent), <em>…</em> (italic emphasis). */
export function renderRich(text: string): ReactNode {
  const tokens = text.split(/(<\/?(?:ts|py|em)>)/g)
  const out: ReactNode[] = []
  const stack: string[] = []

  tokens.forEach((tok, i) => {
    const open = tok.match(/^<(ts|py|em)>$/)
    const close = tok.match(/^<\/(ts|py|em)>$/)
    if (open) {
      stack.push(open[1])
    } else if (close) {
      stack.pop()
    } else if (tok) {
      const tag = stack[stack.length - 1]
      if (tag === 'ts') out.push(<span key={i} className="ts">{tok}</span>)
      else if (tag === 'py') out.push(<span key={i} className="py">{tok}</span>)
      else if (tag === 'em') out.push(<em key={i}>{tok}</em>)
      else out.push(<Fragment key={i}>{tok}</Fragment>)
    }
  })
  return out
}
