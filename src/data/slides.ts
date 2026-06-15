import type { HouseKey } from './houses'
import type { SlideNotes } from '../components/core/PresenterNotes'

/* ===========================================================================
   The 24 folios. Assertion titles are verbatim from 02-slides-content.md;
   cue cards verbatim from 03-delivery-plan.md. Spine is locked upstream —
   this file is content, not argument.

   Opening arc: the throne opens Contested (?), the realm crowns Python as the
   sole AI king (the court bows), GitHub proclaims it in 2024, a nameless
   challenger climbs the dais — then a beat of "who's telling you this" —
   before the throughline. JS is dropped from the open and survives only as
   heritage (the about card + Atwood's Law).

   Overtake arc (revised this refine pass, user-directed): the crown moved for
   the SAME reason both years, not opposite ones. Slide 10 shows the crossover
   chart; slide 11 pins GitHub's two REAL Octoverse screenshots side by side
   (2024 Python #1, 2025 TypeScript #1); slide 12 lands the "same reason" turn
   (AI flooded the field with new devs; 2024 they reached for Python, 2025 the
   coding agents made TypeScript the default); slide 13 explains WHAT changed in
   2025 (the coding agents grew up: Lovable/Claude Code/Cursor/Codex); slide 14
   carries the agentic-demand so-what. The old "they meant opposite things"
   framing is retired.
   A "this is just the beginning" future beat (slide 22) now precedes the CTA.
   =========================================================================== */

export type SceneType =
  | 'title'
  | 'about'
  | 'throne'
  | 'statement'
  | 'split'
  | 'road'
  | 'data'
  | 'code'
  | 'bannermen'
  | 'quote'
  | 'recap'

interface BaseSlide {
  id: string
  type: SceneType
  steps: number // fragment count (subSteps beyond rest state)
  chrome?: boolean // show realm chrome (default true)
  notes: SlideNotes
}

export interface ThroneBeat {
  holder: HouseKey
  caption?: string
  headline?: { source: string; text: string }
  punch?: string
}

export interface TitleSlide extends BaseSlide {
  type: 'title'
  content: {
    kicker?: string
    /** big line shown ABOVE the title (e.g. the closing warning before "Thank you").
        When set, the title + byline stage in on subStep 1. */
    overline?: string
    title: string
    subtitle?: string
    byline: string
    closing?: boolean // the close slide — accent the callback word
    throneHolder?: HouseKey // override the title throne's holder (open uses 'unknown')
  }
}

export interface AboutSlide extends BaseSlide {
  type: 'about'
  content: {
    kicker: string
    name: string
    role: string
    org: string // "Ratel, a context layer for AI agents"
    affiliation?: string // "Also, EU Ambassador @ AI Socratic"
    heritage: string // "Long-time JavaScript → TypeScript developer"
  }
}

export interface ThroneSlide extends BaseSlide {
  type: 'throne'
  content: {
    kicker?: string
    assertion: string
    beats: ThroneBeat[]
    variant?: 'fullbleed' | 'court' | 'challenger'
    courtiers?: string[] // 'court' variant — the languages bowing at the dais
    cta?: string // call-to-arms slide
  }
}

export interface StatementSlide extends BaseSlide {
  type: 'statement'
  content: {
    kicker?: string
    /** HTML-ish: use <ts>…</ts>, <py>…</py>, <em>…</em> inline tags */
    main: string
    /** scale the whole statement down so a text-heavy beat fits one slide */
    compact?: boolean
    reveal?: string // appears on subStep 1
    revealBlock?: boolean // render the reveal on its own line instead of inline
    /** render the reveal immediately (no staging) as a smaller sub-heading */
    revealAsSubhead?: boolean
    anchor?: string // muted line, appears after the reveal
    coda?: string // muted body line, staged in below the anchor (the final aside)
    raven?: boolean
    image?: string // optional screenshot/receipt rendered under the line (e.g. the Bun acquisition)
    imageAlt?: string
    /** optional row of real screenshots pinned side by side as the evidence
        (the two GitHub Octoverse headlines on the overtake "same reason" beat) */
    receipts?: { src: string; alt: string; label: string; accent: 'py' | 'ts' }[]
  }
}

export interface SplitSlide extends BaseSlide {
  type: 'split'
  content: {
    assertion: string
    left: { label: string; house: HouseKey; items: string[] }
    right: { label: string; house: HouseKey; items: string[] }
    /** optional muted line under the columns (e.g. the Reflex kicker on the
        one-codebase slide). */
    note?: string
    /** tighten type sizes + gaps so a denser split (more rows + a note) fits */
    compact?: boolean
  }
}

export interface RoadSlide extends BaseSlide {
  type: 'road'
  content: {
    assertion: string
    note: string
  }
}

export type ChartKind = 'pythonRising' | 'crossover' | 'growth'

export interface DataSlide extends BaseSlide {
  type: 'data'
  content: {
    assertion: string
    chart: ChartKind
    source: string
    footnote?: string
    /** optional proclamation cards shown above the chart (the merged crossover
        slide carries GitHub's two real headlines as the evidence). */
    headlines?: { source: string; text: string }[]
  }
}

export interface CodeSlide extends BaseSlide {
  type: 'code'
  content: {
    assertion: string
  }
}

export interface BannermenSlide extends BaseSlide {
  type: 'bannermen'
  content: {
    assertion: string
    houses: { name: string; scale: number }[]
    callout: string
  }
}

export interface QuoteSlide extends BaseSlide {
  type: 'quote'
  content: {
    quote: string
    attribution: string
    note: string
  }
}

export interface RecapSlide extends BaseSlide {
  type: 'recap'
  content: {
    kicker?: string
    assertion: string
    /** the app-layer scoreboard, counted off; all 'typescript' so they land in
        the riser accent. Scoped to the app layer — the model stays Python. */
    reasons: { label: string; house: HouseKey }[]
  }
}

export type Slide =
  | TitleSlide
  | AboutSlide
  | ThroneSlide
  | StatementSlide
  | SplitSlide
  | RoadSlide
  | DataSlide
  | CodeSlide
  | BannermenSlide
  | QuoteSlide
  | RecapSlide

export const slides: Slide[] = [
  // 1 — Title (cold open, no chrome) — the throne opens Contested (?)
  {
    id: 'title',
    type: 'title',
    steps: 0,
    chrome: false,
    content: {
      kicker: 'AI Engineer World’s Fair · Online',
      title: 'A Song of Types and Agents',
      subtitle: 'How TypeScript is taking the AIron Throne',
      byline: 'Roberto Stagi · CTO, Ratel',
      throneHolder: 'unknown',
    },
    notes: {
      line: '“When it comes to AI, there’s one throne that matters: the most-used language in the field. [PAUSE] And for a long time, nobody even argued about who sat on it.”',
      cues: [
        'Cold open to the lens, deck not shared yet. Opening line runs here → slide 2.',
        '(slow) on “nobody even argued.” Let the “?” on the throne sit a beat, then pose the question, don’t answer it yet.',
      ],
    },
  },

  // 2 — Throne: Python the AI king, the whole court bowing (the meme homage)
  {
    id: 'python-king',
    type: 'throne',
    steps: 0,
    content: {
      assertion: 'A few years ago, whenever the subject was AI the throne was Python’s, and Python’s alone.',
      variant: 'court',
      courtiers: ['JS', 'Java', 'C++', 'R', 'Go', 'Rust', 'Julia'],
      beats: [{ holder: 'python' }],
    },
    notes: {
      cues: [
        'Answer the cold-open question: “It was Python. A few years ago, whenever you talked about AI, the throne was Python’s, Python’s alone.”',
        'Sweep the bowing court: “everyone else, JavaScript, Java, C++, R, kneeling at the foot of the dais.” (like the meme)',
        '[PAUSE] let the bow land. No caption: the picture is the joke.',
      ],
    },
  },

  // 3 — Throne: two moments — ChatGPT lights the fire (2022), then Python takes
  // GitHub's crown (Octoverse 2024 proclamation). Moment text swaps per substep.
  {
    id: 'python-2024',
    type: 'throne',
    steps: 1,
    content: {
      assertion: 'Then in 2022, ChatGPT was released, and Python became more ambitious.',
      variant: 'fullbleed',
      beats: [
        { holder: 'python' },
        {
          holder: 'python',
          caption: 'So it conquered GitHub too, claiming the first place.',
          headline: { source: 'GitHub Octoverse, 2024', text: 'AI leads Python to top language' },
        },
      ],
    },
    notes: {
      cues: [
        'Moment 1: “Then in 2022, ChatGPT landed, and Python got ambitious.”',
        'Moment 2: “So it took GitHub too.” Slam GitHub’s own headline: “AI leads Python to top language.” anchor: Octoverse 2024, Python passes JavaScript to #1, first time in ~a decade.',
        'Plant this headline: you’ll call it back on the overtake (slide 10).',
      ],
    },
  },

  // 4 — Throne: two moments — a nameless "?" rises (moment 1), then it resolves
  // into TypeScript (moment 2). The "and I'll tell you why" lives in delivery only.
  {
    id: 'challenger',
    type: 'throne',
    steps: 1,
    content: {
      assertion: 'But little did they know, another contender was rising to challenge their claim to the throne…',
      variant: 'challenger',
      beats: [{ holder: 'python' }],
    },
    notes: {
      cues: [
        'Moment 1: the “?” rises at the dais foot: “But little did they know, another contender was rising to challenge their claim to the throne…” Hold the mystery.',
        'Moment 2: the “?” resolves into TypeScript. Don’t over-explain on screen; “…and I’ll tell you why” is your line, not the slide. The payoff is the data on slides 10 and 11.',
      ],
    },
  },

  // 5 — About: who’s telling you this (no chrome — a step out of the saga)
  {
    id: 'about',
    type: 'about',
    steps: 0,
    chrome: false,
    content: {
      kicker: 'About me',
      name: 'Roberto Stagi',
      role: 'Co-founder & CTO',
      org: '@ Ratel, a context layer for AI agents',
      affiliation: 'Also, EU Ambassador @ AI Socratic',
      heritage: 'Long-time JavaScript → <ts>TypeScript</ts> developer',
    },
    notes: {
      line: '“Just a couple of words about me. [PAUSE] I’m Roberto Stagi, co-founder and CTO of Ratel, a context layer for AI agents, EU Ambassador for the AI Socratic community, and a long-time JavaScript, and then TypeScript, developer.”',
      cues: [
        'Keep it to two breaths. Don’t sell the company: establish that you live in the app layer this talk is about.',
        '“long-time JavaScript and then TypeScript”: this is the only place JS shows up; it’s your standing to make the claim.',
      ],
    },
  },

  // 6 — Statement: the throughline (the spine)
  {
    id: 'throughline',
    type: 'statement',
    steps: 0,
    content: {
      kicker: 'The throughline',
      main: 'AI moved up the stack, to the application layer.',
    },
    notes: {
      cues: [
        'THE spine, part one. [PAUSE] before · deliver the line (slow) · stress “up” · [PAUSE] after.',
        'Don’t name TypeScript yet: that’s the turn on slide 8. Here you only move AI up the stack. Look straight at the lens; let it sit.',
      ],
    },
  },

  // 7 — Statement: the reframe
  {
    id: 'reframe',
    type: 'statement',
    steps: 1,
    content: {
      main: 'AI stopped being something you train. It became something you ship.',
      reveal: 'An <ts>app</ts> that <em>thinks</em>',
      revealBlock: true,
    },
    notes: {
      cues: [
        '“Train → ship” · [PAUSE] · “an app that thinks”',
        'This is the reframe; say “an app that thinks” like you mean it, not like a tagline.',
      ],
    },
  },

  // 8 — Statement: the turn — name who owns the app layer (throughline, part two)
  {
    id: 'app-layer-owner',
    type: 'statement',
    steps: 0,
    content: {
      main: 'And the application layer is owned by <ts>TypeScript</ts>, not <py>Python</py>.',
    },
    notes: {
      cues: [
        '“Owned by TypeScript, not Python” · [PAUSE] before “TypeScript”',
        '(up). A little heat here. Slide 6 moved AI up the stack; this is the turn that names who owns it.',
      ],
    },
  },

  // 9 — Split: brain vs app (the concession — Python owns the brain)
  {
    id: 'brain-app',
    type: 'split',
    steps: 0,
    content: {
      assertion: 'Python owns the brain; TypeScript increasingly owns the app around it.',
      left: { label: 'The brain', house: 'python', items: ['training', 'research', 'GPU serving'] },
      right: { label: 'The app', house: 'typescript', items: ['the agent', 'the UI', 'the deploy'] },
    },
    notes: {
      cues: [
        '“Brain = pip · App = npm” · anchor: train / research / GPU serving → Python vs agent / UI / deploy → TypeScript',
        'Open the book by conceding: Python genuinely owns the brain. [PAUSE] after. This split is the honest spine; callback on slide 18.',
      ],
    },
  },

  // 10 — Data: the overtake — TS passes Python on GitHub (the crossover chart).
  // The two REAL Octoverse screenshots now carry the headline evidence on the
  // next slide, so this stays a clean, flat data beat: the quantified crossover
  // with the thin ~42k margin shown honestly.
  {
    id: 'crossover',
    type: 'data',
    steps: 0,
    content: {
      assertion: 'In August 2025, <ts>TypeScript</ts> passed <py>Python</py> to become GitHub’s most-used language.',
      chart: 'crossover',
      source: 'GitHub Octoverse 2024 + 2025 · 2024 points derived from YoY rates',
    },
    notes: {
      cues: [
        'State it flat: “In August 2025, TypeScript passed Python on GitHub.” anchor: 2.64M vs 2.59M contributors · ~42k ahead (≈1.6%, a thin margin, shown honestly).',
        'The crown changed hands. Don’t editorialize the why yet, the next two slides are the why.',
      ],
    },
  },

  // 11 — Statement + receipts: GitHub said it in its own words, two years
  // running. The two REAL Octoverse screenshots pinned side by side (2024
  // Python #1 · 2025 TypeScript #1). Both headlines literally credit AI AND a
  // surge of new developers — the visual sets up the "same reason" turn.
  {
    id: 'both-crownings',
    type: 'statement',
    steps: 0,
    content: {
      main: 'GitHub crowned a new #1 two years running.',
      receipts: [
        {
          src: `${import.meta.env.BASE_URL}octoverse-2024.png`,
          alt: 'GitHub Octoverse 2024: AI leads Python to top language as the number of global developers surges',
          label: 'GitHub Octoverse · 2024',
          accent: 'py',
        },
        {
          src: `${import.meta.env.BASE_URL}octoverse-2025.png`,
          alt: 'GitHub Octoverse 2025: A new developer joins GitHub every second as AI leads TypeScript to #1',
          label: 'GitHub Octoverse · 2025',
          accent: 'ts',
        },
      ],
    },
    notes: {
      cues: [
        'Here it is in GitHub’s own words. 2024: “AI leads Python.” 2025: “AI leads TypeScript.” [PAUSE]',
        'Read both subtitles out loud: 2024 “as the number of global developers surges”; 2025 “a new developer joins GitHub every second.” Both crownings credit AI, and both credit a flood of new developers. That sets up the turn.',
      ],
    },
  },

  // 12 — Statement: the turn — SAME reason both years (the surprise). AI didn't
  // shrink the field, it flooded it; only the default language changed (2024
  // Python → 2025 TypeScript).
  {
    id: 'same-reason',
    type: 'statement',
    steps: 1,
    content: {
      main: 'Same reason, both times: AI didn’t drain the field. It <em>flooded</em> it.',
      reveal: '2024 the newcomers reached for <py>Python</py>. 2025 they reach for <ts>TypeScript</ts>.',
      revealBlock: true,
    },
    notes: {
      cues: [
        'The twist everyone got backwards: people feared AI would mean fewer developers. The opposite happened, agentic AI pulled millions of NEW people into programming. Not fewer devs, far more.',
        'Same reason crowned both languages, only the landing spot moved. In 2024 AI still meant Python, so the newcomers came to Python. By 2025 the default for new apps had become TypeScript, which the next slide explains.',
      ],
    },
  },

  // 13 — Statement: WHY the landing spot moved in 2025 — the coding agents grew
  // up and became the standard way to build software.
  {
    id: 'agents-grew-up',
    type: 'statement',
    steps: 0,
    content: {
      kicker: 'What changed in 2025',
      main: 'The coding agents <em>grew up</em>.',
      reveal: 'Lovable · Claude Code · Cursor · Codex, now the default way to build apps.',
      revealAsSubhead: true,
    },
    notes: {
      cues: [
        'By 2025 the coding agents got powerful and autonomous: Lovable, Claude Code, Cursor, Codex became a standard way to build software.',
        'And when they scaffold a new app, the default is TypeScript: v0, Lovable, Bolt all emit React + TS out of the box, and GitHub itself credits typed code as an AI guardrail for TS hitting #1. (Honest scope: agents write plenty of Python too, it is still #1 in AI/ML; this is the app-builder layer.)',
      ],
    },
  },

  // 14 — Statement: the agentic-demand so-what — every new app is an agent,
  // each one needs to embed AI, and that demand lands on TypeScript. Carries
  // the second-person cost anchor that pays off in the close (was old slide 12).
  {
    id: 'agentic-demand',
    type: 'statement',
    steps: 1,
    content: {
      main: 'And now every new app is an <em>agent</em>, hungry to embed AI.',
      reveal: 'That demand lands on one stack: <ts>TypeScript</ts>.',
      revealBlock: true,
      anchor: 'Build your agent’s app layer in <py>Python</py> and you’re on your own. Build it in <ts>TypeScript</ts> and the whole realm builds with you.',
    },
    notes: {
      cues: [
        'Nearly every new app now is an agent, or agentic. Each one needs to embed AI, and that demand keeps landing on TypeScript.',
        'Land the “so what” in second person: build the app layer in Python and you’re on your own; in TypeScript the whole realm builds with you. Sets up the bannermen and pays off in the close.',
      ],
    },
  },

  // 15 — Bannermen: the tools
  {
    id: 'bannermen',
    type: 'bannermen',
    steps: 1,
    content: {
      assertion: 'The tools you actually build AI with already run on TypeScript.',
      houses: [
        { name: 'Vercel AI SDK', scale: 1.5 },
        { name: 'Claude Code', scale: 1.35 },
        { name: 'Cursor', scale: 1.25 },
        { name: 'Mastra', scale: 1.0 },
        { name: 'Cloudflare Agents', scale: 1.1 },
        { name: 'v0', scale: 0.9 },
        { name: 'Bolt', scale: 0.95 },
        { name: 'Lovable', scale: 1.05 },
        { name: 'CopilotKit', scale: 0.9 },
      ],
      callout: 'MCP servers ship ~2.5× more on npm than PyPI · schema authored TypeScript-first.',
    },
    notes: {
      cues: [
        '(up) pace through the wall: “AI SDK · Mastra · Cloudflare Agents · Claude Code · v0 · Cursor · Bolt · Lovable”',
        'callout: MCP servers · ~2.5× more on npm · schema authored TypeScript-first',
      ],
    },
  },

  // 17 — Statement: the raven (Anthropic buys Bun) — trimmed to the fact + the
  // receipt. Moved ahead of the registry beat as the proof the app layer is moving.
  {
    id: 'raven-bun',
    type: 'statement',
    steps: 0,
    content: {
      kicker: 'A raven arrives',
      compact: true,
      main: 'An AI lab even acquired a <ts>JavaScript runtime</ts>.',
      image: `${import.meta.env.BASE_URL}anthropic-bun.png`,
      imageAlt: 'Anthropic acquires Bun as Claude Code reaches $1B milestone · Dec 3, 2025',
      raven: true,
    },
    notes: {
      cues: [
        '“Anthropic acquired Bun.” [PAUSE] Let the headline carry the date and the milestone.',
        'Don’t overclaim: the “first acquisition” line was wrong, so it’s gone. The fact alone shows where the app layer is heading.',
      ],
    },
  },

  // 18 — Statement: the honest question that pivots into the case. Pose it, then
  // preview the three reasons the next slides each pay off.
  {
    id: 'does-it-make-sense',
    type: 'statement',
    steps: 0,
    content: {
      kicker: 'The honest question',
      compact: true,
      main: 'But does building AI agents in <ts>TypeScript</ts> actually make sense?',
    },
    notes: {
      cues: [
        'Turn to the room and ask it straight: does building agents in TypeScript actually make sense? [PAUSE]',
        'Answer yes, and the rest of the book pays it off: first the flywheel, then the five reasons the app layer keeps landing on TypeScript.',
      ],
    },
  },

  // 19 — Statement: the flywheel. AI scaffolds and builds in TS by default, which
  // feeds more TS into the models, which scaffold even more TS — a self-reinforcing loop.
  {
    id: 'ts-flywheel',
    type: 'statement',
    steps: 0,
    content: {
      kicker: 'Why yes',
      compact: true,
      main: 'AI already scaffolds and builds in <ts>TypeScript</ts> by default.',
      reveal: 'More TS code trains better TS models, which scaffold even more TS. A self-reinforcing cycle.',
      revealAsSubhead: true,
    },
    notes: {
      cues: [
        'The coding agents reach for TypeScript first: v0, Lovable, Bolt all emit React + TS out of the box.',
        'Name the loop: more TS in the world trains better TS models, which scaffold even more TS. A flywheel that keeps turning the app layer one way.',
      ],
    },
  },

  // 20 — Statement: the registry — concede the ML core to PyPI, then claim the
  // app-layer integration tail for npm (breadth of SDKs, NOT raw count = quality).
  {
    id: 'npm-registry',
    type: 'statement',
    steps: 1,
    content: {
      kicker: 'And the registry behind them',
      compact: true,
      main: 'For the model, <py>PyPI</py> wins. For everything around it, you reach into <ts>npm</ts>.',
      reveal: 'Auth, payments, UI, SaaS, infra: the deepest app-layer tail there is.',
      revealBlock: true,
      anchor: 'npm ~5.6M packages vs PyPI ~820K. Not better code, broader reach: the integrations an app glues together ship JS-first.',
    },
    notes: {
      cues: [
        'Concede FIRST: for the model and the ML core, torch, transformers, the inference stack, PyPI wins and is pulling ahead (+50% YoY). That is not the argument.',
        'The argument is the app layer: Stripe, OAuth, Slack, Postgres, the UI kit, they ship JS/TS-first. npm ~5.6M vs PyPI ~820K (Sonatype 2026), about 7×.',
        'Say it straight, so it’s not a vanity stat: I’m NOT claiming count equals quality, npm even carries most of the registry’s malware. I’m claiming the maintained integrations you reach for are broader and more first-class on npm.',
      ],
    },
  },

  // 19 — Split: one codebase vs two services. The whole agentic app in one
  // TypeScript deploy unit; in Python it is structurally two. The kicker: even
  // Reflex (pure-Python UI) compiles to React + a stateful FastAPI/Redis backend.
  {
    id: 'one-codebase',
    type: 'split',
    steps: 0,
    content: {
      assertion: 'In TypeScript the whole agent is one codebase and one deploy; in Python it is always two.',
      left: {
        label: 'One codebase, one deploy',
        house: 'typescript',
        items: ['the agent loop', 'the tools', 'the API route', 'the UI'],
      },
      right: {
        label: 'Two services, two deploys',
        house: 'python',
        items: ['FastAPI + the agent', 'a separate React app', 'a hand-kept contract'],
      },
      compact: true,
    },
    notes: {
      cues: [
        'Concede: two services is the normal, battle-tested BFF, FastAPI + React is fine, and PydanticAI’s types are real. This is NOT about capability.',
        'It’s topology: one language, one type system, one stateless deploy. anchor: even Reflex is React + FastAPI + Redis under the hood, so you keep two processes and lose serverless/edge.',
        'Never say Python can’t ship agentic UIs. Say: in TypeScript it’s one codebase, one deploy.',
      ],
    },
  },

  // 20 — Road: one type to the browser
  {
    id: 'one-type',
    type: 'road',
    steps: 0,
    content: {
      assertion: 'One type runs from the model’s tool call to the browser, while Python’s stops at the boundary.',
      note: 'PydanticAI is genuinely typed. This is about crossing the browser: a Python agent and a JS UI are two type sets that can drift apart.',
    },
    notes: {
      cues: [
        '“One type · tool call → browser” · anchor: Python’s type checker stops at the process boundary',
        'honest: “PydanticAI is genuinely typed. [PAUSE] this isn’t about types existing, it’s about crossing the browser.” The objection agrees with me.',
        'Receipt: the AG-UI Python and TypeScript SDKs literally drifted (bug #1169, one event’s role field disagreed on the wire). The kind of bug that only exists when two type sets track one spec. Fixed, but it proves the seam.',
      ],
    },
  },

  // 21 — Code: one Zod schema
  {
    id: 'zod-code',
    type: 'code',
    steps: 3,
    content: {
      assertion: 'One Zod schema becomes the tool, the stream, and the typed UI, checked end to end.',
    },
    notes: {
      cues: [
        'DON’T read the code. Narrate the one type’s journey: “defined once · [PAUSE] checked everywhere.”',
        'Point to the highlighted type as it travels (schema → tool → UI). (slow). Recorded: you can zoom/highlight in post.',
      ],
    },
  },

  // 24 — Data: AI SDK 7x growth — the last piece of evidence (the fast-growing
  // TS AI ecosystem) before the scoreboard counts it all off.
  {
    id: 'sdk-growth',
    type: 'data',
    steps: 0,
    content: {
      assertion: 'The TypeScript-only AI SDK grew about 7× in a single year.',
      chart: 'growth',
      source: 'Vercel (Series F) · npm download counter · year to 30 Sep 2025',
    },
    notes: {
      cues: ['“Vercel AI SDK · TS-only · ~7×” · anchor: 446K → 3.2M weekly'],
    },
  },

  // 25 — Recap: the app-layer scoreboard, counted off (the capstone of the case
  // before the honest pip/npm turn). All five land in the riser accent.
  {
    id: 'recap',
    type: 'recap',
    steps: 0,
    content: {
      kicker: 'Why the app layer is TypeScript',
      assertion: 'Put it together, and the app layer keeps landing on <ts>TypeScript</ts>.',
      reasons: [
        { label: 'The web app-builders scaffold it by default', house: 'typescript' },
        { label: 'One language for your whole app', house: 'typescript' },
        { label: 'A fast-growing AI ecosystem in TypeScript', house: 'typescript' },
        { label: 'Types that hold from the model to the browser', house: 'typescript' },
        { label: 'npm’s deep app-layer package tail', house: 'typescript' },
      ],
    },
    notes: {
      cues: [
        'Don’t re-argue, just count it off: the web app-builders default to TypeScript, one language for the whole app, a fast-growing AI ecosystem in TypeScript, types that hold model to browser, and npm’s app-layer tail.',
        'None of this touches the model, that stays Python. But for the app around it, every arrow points the same way. [PAUSE] before the honest turn.',
      ],
    },
  },

  // 23 — Quote: Atwood’s Law (the prophecy)
  {
    id: 'prophecy',
    type: 'quote',
    steps: 0,
    content: {
      quote: 'Any application that can be written in JavaScript will eventually be written in JavaScript.',
      attribution: 'Jeff Atwood · Coding Horror · 2007',
      note: 'And now <ts>TypeScript</ts> is coming for everything.',
    },
    notes: {
      cues: ['“Atwood · 2007 · the joke that came true” · honest: “he said JavaScript, and he was kidding.” [PAUSE]'],
    },
  },

  // 24 — Statement: the future beat — this is just the beginning (raise the
  // stakes before the CTA; sets up "build alone" on the close).
  {
    id: 'just-beginning',
    type: 'statement',
    steps: 1,
    content: {
      kicker: 'And we’re just getting started',
      main: 'This is just the <em>beginning</em>.',
      reveal: 'Picture the app layer a few years from now, with agents writing most of it.',
      revealBlock: true,
      anchor: 'The gap between Python’s brain and <ts>TypeScript</ts>’s app layer only widens from here.',
    },
    notes: {
      cues: [
        'Zoom out. “And we’re just getting started.” [PAUSE] Imagine the app layer a few years from now, with agents writing most of it.',
        'Raise the stakes for the CTA, don’t hedge. The gap only widens from here; that’s what makes “build alone” on the close bite.',
      ],
    },
  },

  // 25 — Statement: pip vs npm (the honest turn)
  {
    id: 'pip-npm',
    type: 'statement',
    steps: 1,
    content: {
      main: 'The model runs on <py>pip</py>. The agent that calls it ships on <ts>npm</ts>.',
      anchor: 'vLLM · TGI · ~85% of open-model inference, all Python.',
      coda: 'Everything else? Probably all <ts>TypeScript</ts>.',
    },
    notes: {
      cues: [
        '“Kill the overclaim, honest” · anchor: vLLM · TGI · ~85% of open-model inference, all Python',
        '[PAUSE] “The model runs on pip. The agent that calls it ships on npm.” (slow). The clean turn before the finale.',
        '[PAUSE] then land the punchline: “And everything above that? Probably it’s going to be TypeScript.”',
      ],
    },
  },

  // 26 — Throne: the call to arms (CTA)
  {
    id: 'call-to-arms',
    type: 'throne',
    steps: 0,
    content: {
      assertion: 'Train in <py>Python</py>, Build in <ts>TypeScript</ts>.',
      beats: [{ holder: 'typescript' }],
    },
    notes: {
      line: '“So here’s the one thing to do this week: that next agent you were about to start in Python out of pure habit, the app layer, not the model, start it in TypeScript instead. [PAUSE] Keep training in Python. But build the part that ships like TypeScript already won the throne. [PAUSE] Because where it counts, it did.”',
      cues: [
        'Closing line lands here. CTA anchor: this week · one agent · app layer in TS · keep training in Python',
        '[PAUSE] before the closing line.',
      ],
    },
  },

  // 27 — Title: the close
  {
    id: 'close',
    type: 'title',
    steps: 1,
    chrome: false,
    content: {
      overline: 'Skip <ts>TypeScript</ts> now, and you might fall behind.',
      title: 'Thank you.',
      byline: 'Roberto Stagi · Ratel · ratel.sh',
      closing: true,
    },
    notes: {
      line: '“Skip TypeScript now, and you might fall behind. [PAUSE] Thank you.”',
      cues: [
        '[PAUSE]. Hold the line. Let it land before the thank-you.',
        'One clean beat: the warning, then the thanks. Don’t talk over the punch.',
      ],
    },
  },
]
