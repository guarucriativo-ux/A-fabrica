import {
  AbsoluteFill, Sequence, useCurrentFrame,
  interpolate, spring, useVideoConfig,
} from 'remotion'

const LIME  = '#CCFF00'
const DARK  = '#0A0A0A'
const WHITE = '#F0F0EC'
const MUTED = 'rgba(240,240,236,0.40)'
const FONT  = "'Bricolage Grotesque', 'Inter', sans-serif"

// ─── Scene 1 · SPRING LETTERS (0-160f) ───────────────────────────────────────

function SpringLetter({ char, index }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const delay = index * 10

  const prog = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 90, mass: 1.3 } })
  const y    = interpolate(prog, [0, 1], [-320, 0])
  const rot  = interpolate(prog, [0, 1], [-18, 0])
  const op   = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const accents = [2, 4]

  return (
    <span style={{
      display: 'inline-block',
      transform: `translateY(${y}px) rotate(${rot}deg)`,
      opacity: op,
      color: accents.includes(index) ? LIME : WHITE,
      fontSize: 148,
      fontFamily: FONT,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1,
    }}>{char}</span>
  )
}

function Scene1() {
  const frame = useCurrentFrame()
  const fadeOut = interpolate(frame, [120, 155], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const subOp   = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: DARK, opacity: fadeOut, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {'SPRING'.split('').map((c, i) => <SpringLetter key={i} char={c} index={i} />)}
      </div>
      <div style={{ opacity: subOp, fontFamily: FONT, fontSize: 15, color: MUTED, letterSpacing: '0.36em' }}>
        PHYSICS-BASED ANIMATION
      </div>
    </AbsoluteFill>
  )
}

// ─── Scene 2 · KINETIC TYPE (130-340f) ───────────────────────────────────────

function KineticWord({ text, fromLeft, top, delay, fontSize, color }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const prog = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 80, mass: 1 } })
  const x    = interpolate(prog, [0, 1], [fromLeft ? -1100 : 1100, 0])
  const fadeOut = interpolate(frame, [155, 185], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <div style={{
      position: 'absolute',
      top,
      [fromLeft ? 'left' : 'right']: 72,
      transform: `translateX(${x}px)`,
      opacity: fadeOut,
      fontFamily: FONT,
      fontSize,
      fontWeight: 700,
      color,
      letterSpacing: '-0.03em',
      lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>
      {text}
    </div>
  )
}

function Scene2() {
  const frame = useCurrentFrame()
  const tagOp = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const words = [
    { text: 'velocity',     fromLeft: true,  top: 110, delay: 0,  fontSize: 118, color: WHITE },
    { text: 'acceleration', fromLeft: false, top: 258, delay: 14, fontSize: 82,  color: LIME  },
    { text: 'momentum',     fromLeft: true,  top: 388, delay: 28, fontSize: 104, color: WHITE },
    { text: 'inertia',      fromLeft: false, top: 520, delay: 42, fontSize: 76,  color: MUTED },
    { text: 'friction',     fromLeft: true,  top: 648, delay: 56, fontSize: 94,  color: WHITE },
    { text: 'elasticity',   fromLeft: false, top: 790, delay: 70, fontSize: 72,  color: LIME  },
  ]

  return (
    <AbsoluteFill style={{ background: DARK, overflow: 'hidden' }}>
      {words.map((w, i) => <KineticWord key={i} {...w} />)}
      <div style={{ position: 'absolute', bottom: 72, left: 72, opacity: tagOp, fontFamily: FONT, fontSize: 14, color: MUTED, letterSpacing: '0.32em' }}>
        KINETIC TYPOGRAPHY
      </div>
    </AbsoluteFill>
  )
}

// ─── Scene 3 · GRID DANCE (310-520f) ─────────────────────────────────────────

const COLS = 7
const ROWS = 7
const CELL = 116
const CGAP = 14

function GridCell({ col, row }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const delay = (col + row) * 4

  const prog  = spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 160, mass: 0.55 } })
  const scale = interpolate(prog, [0, 1], [0, 1])
  const pulse = Math.sin(frame * 0.12 + (col + row) * 0.6) * 0.07 + 1

  const idx = row * COLS + col
  const isLime = (idx * 7 + 3) % 17 === 0
  const isMid  = (idx * 3 + 1) % 11 === 0 && !isLime
  const bg     = isLime ? LIME : isMid ? 'rgba(240,240,236,0.16)' : 'rgba(240,240,236,0.05)'

  return (
    <div style={{
      width: CELL, height: CELL, borderRadius: 10,
      background: bg,
      transform: `scale(${scale * (frame > 40 ? pulse : 1)})`,
    }} />
  )
}

function Scene3() {
  const frame = useCurrentFrame()
  const fadeOut = interpolate(frame, [170, 200], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const tagOp  = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: DARK, opacity: fadeOut, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
        gap: CGAP,
      }}>
        {Array.from({ length: ROWS * COLS }, (_, i) => (
          <GridCell key={i} col={i % COLS} row={Math.floor(i / COLS)} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 72, left: 72, opacity: tagOp, fontFamily: FONT, fontSize: 14, color: MUTED, letterSpacing: '0.32em' }}>
        STAGGERED SPRING GRID
      </div>
    </AbsoluteFill>
  )
}

// ─── Scene 4 · COUNTERS (490-660f) ───────────────────────────────────────────

function Stat({ value, label, suffix, delay, accent }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const prog = spring({ frame: frame - delay, fps, config: { damping: 28, stiffness: 55, mass: 1 } })
  const num  = Math.round(interpolate(prog, [0, 1], [0, value]))
  const bar  = interpolate(prog, [0, 1], [0, 100])

  const fadeOut = interpolate(frame, [140, 168], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <div style={{ opacity: fadeOut, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ fontFamily: FONT, fontSize: 100, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: accent ? LIME : WHITE }}>
        {num}{suffix}
      </div>
      <div style={{ fontFamily: FONT, fontSize: 13, color: MUTED, letterSpacing: '0.28em' }}>{label}</div>
      <div style={{ width: 180, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }}>
        <div style={{ width: `${bar}%`, height: '100%', background: accent ? LIME : WHITE, borderRadius: 1, transition: 'none' }} />
      </div>
    </div>
  )
}

function Scene4() {
  const frame = useCurrentFrame()
  const tagOp = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 64 }}>
      <div style={{ opacity: tagOp, fontFamily: FONT, fontSize: 14, color: MUTED, letterSpacing: '0.32em' }}>
        COUNTER ANIMATION
      </div>
      <div style={{ display: 'flex', gap: 88 }}>
        <Stat value={127} label="PROJETOS"   suffix="+"  delay={0}  accent={false} />
        <Stat value={320} label="CLIENTES"   suffix=""   delay={18} accent={true}  />
        <Stat value={98}  label="SATISFAÇÃO" suffix="%"  delay={36} accent={false} />
      </div>
    </AbsoluteFill>
  )
}

// ─── Scene 5 · LIME WIPE (630-720f) ──────────────────────────────────────────

function Scene5() {
  const frame = useCurrentFrame()
  const ease  = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t

  const lime  = interpolate(frame, [0, 45], [-1080, 0],   { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease })
  const dark  = interpolate(frame, [35, 80], [-1080, 0],  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease })

  return (
    <AbsoluteFill style={{ background: DARK }}>
      <div style={{ position: 'absolute', inset: 0, background: LIME, transform: `translateX(${lime}px)` }} />
      <div style={{ position: 'absolute', inset: 0, background: DARK, transform: `translateX(${dark}px)` }} />
    </AbsoluteFill>
  )
}

// ─── Scene 6 · FINALE (700-900f) ─────────────────────────────────────────────

function Scene6() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const titleProg = spring({ frame, fps, config: { damping: 15, stiffness: 75, mass: 1 } })
  const y     = interpolate(titleProg, [0, 1], [100, 0])
  const scale = interpolate(titleProg, [0, 1], [0.82, 1])

  const subOp  = interpolate(frame, [28, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const lineS  = interpolate(frame, [18, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const dotOp  = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const caps   = ['SPRING', 'KINETIC', 'GRID', 'COUNTER', 'WIPE']

  return (
    <AbsoluteFill style={{ background: DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <div style={{ transform: `translateY(${y}px) scale(${scale})`, textAlign: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 80, fontWeight: 800, color: WHITE, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
          MADE WITH
        </div>
        <div style={{ fontFamily: FONT, fontSize: 96, fontWeight: 800, color: LIME, letterSpacing: '-0.05em', lineHeight: 0.95 }}>
          REMOTION
        </div>
      </div>

      <div style={{ width: 500, height: 2, background: LIME, transform: `scaleX(${lineS})`, transformOrigin: 'center', opacity: subOp }} />

      <div style={{ opacity: subOp, fontFamily: FONT, fontSize: 17, color: MUTED, letterSpacing: '0.18em', textAlign: 'center' }}>
        REACT → MP4 · SPRING PHYSICS · ZERO DEPENDENCIES
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 8, opacity: dotOp }}>
        {caps.map((cap, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: LIME }} />
            <span style={{ fontFamily: FONT, fontSize: 12, color: MUTED, letterSpacing: '0.2em' }}>{cap}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}

// ─── Root composition ─────────────────────────────────────────────────────────

export function Demo() {
  const frame = useCurrentFrame()
  const globalFade = interpolate(frame, [875, 900], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ opacity: globalFade }}>
      <Sequence from={0}   durationInFrames={165}><Scene1 /></Sequence>
      <Sequence from={130} durationInFrames={215}><Scene2 /></Sequence>
      <Sequence from={310} durationInFrames={215}><Scene3 /></Sequence>
      <Sequence from={490} durationInFrames={175}><Scene4 /></Sequence>
      <Sequence from={630} durationInFrames={90}> <Scene5 /></Sequence>
      <Sequence from={700} durationInFrames={200}><Scene6 /></Sequence>
    </AbsoluteFill>
  )
}

export const demoConfig = {
  id: 'Demo',
  component: Demo,
  durationInFrames: 900,
  fps: 30,
  width: 1080,
  height: 1080,
}
