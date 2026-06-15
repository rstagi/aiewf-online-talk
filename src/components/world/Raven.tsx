/* A messenger raven carrying a sealed scroll — the realm's news arrives.
   Line-art in the TS accent (the news favors House TypeScript). */
export function Raven({ width = '16cqw' }: { width?: string }) {
  return (
    <svg
      width={width}
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', width, height: 'auto', color: 'var(--talk-accent)', overflow: 'visible' }}
      aria-hidden
    >
      {/* body */}
      <path
        d="M44 92 C40 70 58 56 84 58 C96 36 120 34 132 46 C150 44 168 52 176 66 C160 70 150 70 142 66 C150 80 146 96 130 102 L96 104 C70 106 50 104 44 92 Z"
        fill="rgba(33,27,21,0.6)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* wing */}
      <path
        d="M70 70 C92 66 116 70 136 84 C112 86 92 84 76 92 C70 84 68 76 70 70 Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* beak */}
      <path d="M176 66 L196 62 L178 74 Z" fill="currentColor" />
      {/* eye */}
      <circle cx="158" cy="62" r="2.4" fill="var(--talk-bg)" />
      {/* legs */}
      <line x1="96" y1="104" x2="92" y2="124" stroke="currentColor" strokeWidth="2" />
      <line x1="116" y1="104" x2="120" y2="124" stroke="currentColor" strokeWidth="2" />
      {/* sealed scroll */}
      <g transform="rotate(-8 110 132)">
        <rect x="86" y="122" width="48" height="20" rx="3" fill="var(--talk-surface)" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="110" cy="132" r="4" fill="currentColor" />
      </g>
    </svg>
  )
}
