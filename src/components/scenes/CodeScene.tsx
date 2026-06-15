import { type CSSProperties } from 'react'
import type { CodeSlide } from '../../data/slides'

type Region = 0 | 1 | 2 // schema · tool · ui

/* Folio — one Zod type, defined once, checked everywhere (AI SDK v6). The shared
   type is the ONLY colored token; it brightens as it travels schema → tool → UI.
   Current v6 API: tool({ inputSchema }) + streamText + UIToolInvocation<typeof t>
   (NOT the deprecated streamObject/parameters; NOT the paused RSC/streamUI). */
export function CodeScene({ content, subStep }: { content: CodeSlide['content']; subStep: number }) {
  // highlight state for a region given the current subStep
  const hl = (r: Region): CSSProperties => {
    const all = subStep >= 3
    const bright = all || r === subStep
    const soft = !bright && r < subStep
    if (bright) return { color: 'var(--talk-accent)', background: 'rgba(224,85,44,0.16)', fontWeight: 700, borderRadius: 3, padding: '0 0.2em' }
    if (soft) return { color: 'var(--talk-accent)', fontWeight: 600 }
    return { color: 'var(--talk-ink)' }
  }
  const T = ({ r, children }: { r: Region; children: string }) => <span style={hl(r)}>{children}</span>
  const c = { color: 'var(--talk-muted)' } // comment

  return (
    <div className="scene scene--flow" style={{ paddingTop: '14cqh' }}>
      <h2 className="flow-head" style={{ marginBottom: '2cqh', maxWidth: '40ch' }}>
        {content.assertion}
      </h2>

      <pre
        style={{
          fontFamily: 'var(--talk-font-mono)',
          fontSize: '1.28cqw',
          lineHeight: 1.36,
          color: 'var(--talk-ink)',
          background: 'var(--talk-surface)',
          border: '1px solid var(--talk-rule)',
          borderLeft: '3px solid var(--talk-accent)',
          borderRadius: 6,
          padding: '1.8cqw 2.2cqw',
          maxWidth: '62cqw',
          overflow: 'hidden',
          whiteSpace: 'pre',
        }}
      >
        <span style={c}>{`// 1 · define the type once\n`}</span>
        {`const `}<T r={0}>Recipe</T>{` = z.object({\n`}
        {`  title: z.string(),\n`}
        {`  steps: z.array(z.string()),\n`}
        {`})\n\n`}
        <span style={c}>{`// 2 · the model fills it, as a streamed tool\n`}</span>
        {`const recipe = tool({ inputSchema: `}<T r={1}>Recipe</T>{` })\n`}
        {`streamText({ model, tools: { recipe } })\n\n`}
        <span style={c}>{`// 3 · the browser renders it, fully typed\n`}</span>
        {`function Card({ `}<T r={2}>part</T>{` }: {\n`}
        {`  `}<T r={2}>part</T>{`: UIToolInvocation<typeof recipe>\n`}
        {`}) {\n`}
        {`  return <RecipeCard {...`}<T r={2}>part</T>{`.input} />\n`}
        {`}`}
      </pre>

      <p className="num muted" style={{ fontSize: 'var(--fs-micro)', marginTop: '2cqh' }}>
        {subStep >= 3 ? '✓ one type · checked end to end' : 'defined once · checked everywhere'}
      </p>
    </div>
  )
}
