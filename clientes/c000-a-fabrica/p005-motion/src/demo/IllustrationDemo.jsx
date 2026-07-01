/**
 * IllustrationDemo — SVG illustration animada com Remotion
 *
 * Técnicas demonstradas:
 * 1. strokeDashoffset  — paths se "desenham" progressivamente
 * 2. spring physics    — needle e hub com física real
 * 3. color interpolation — gauge muda de vermelho → lime conforme score sobe
 * 4. stagger ticks     — marcações aparecem em cascata
 * 5. SVG + HTML híbrido — SVG puro para shapes, HTML para tipografia
 */

import {
  AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig,
} from 'remotion'

const LIME  = '#CCFF00'
const DARK  = '#0A0A0A'
const WHITE = '#F0F0EC'
const MUTED = 'rgba(240,240,236,0.30)'
const FONT  = "'Bricolage Grotesque', 'Inter', sans-serif"
const PI    = Math.PI

// ── Geometria do gauge ────────────────────────────────────────────────────────
const CX = 540, CY = 500          // centro ligeiramente acima do meio
const R_BG    = 390               // anel decorativo externo
const R_TRACK = 310               // trilho do score
const R_INNER = 230               // anel interno decorativo
const R_LABEL = 360               // raio dos labels (0, 50, 100)
const R_TICK_OUT = 384            // tick outer
const R_TICK_IN  = 368            // tick inner (major)
const R_TICK_IN2 = 374            // tick inner (minor)

// O gauge vai das 8h às 4h no sentido horário (240° de varredura)
// Em coordenadas SVG (0° = 3h, crescente CW):
const START_DEG = 150             // 8 o'clock
const SWEEP_DEG = 240             // varredura total
const END_DEG   = START_DEG + SWEEP_DEG  // 4 o'clock (390° ≡ 30°)

// Comprimento do arco trilha
const TRACK_LEN = R_TRACK * (SWEEP_DEG * PI / 180) // ≈ 1319

// Ponto em coordenadas SVG dado ângulo em graus
const pt = (r, deg) => ({
  x: CX + r * Math.cos(deg * PI / 180),
  y: CY + r * Math.sin(deg * PI / 180),
})

// Path de arco: de START_DEG até START_DEG + sweepDeg (CW)
const arcPath = (r, startDeg, sweepDeg) => {
  const s = pt(r, startDeg)
  const e = pt(r, startDeg + sweepDeg)
  const large = sweepDeg > 180 ? 1 : 0
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`
}

// Cor do score: vermelho (0) → amarelo (50) → lime (100)
const scoreToColor = (pct) => {
  const clamped = Math.max(0, Math.min(100, pct))
  if (clamped < 50) {
    const t = clamped / 50
    return `rgb(255, ${Math.round(t * 200)}, 0)`
  } else if (clamped < 90) {
    const t = (clamped - 50) / 40
    return `rgb(${Math.round(255 - t * 150)}, ${Math.round(200 + t * 55)}, 0)`
  } else {
    const t = (clamped - 90) / 10
    return `rgb(${Math.round(105 + t * 99)}, 255, 0)`
  }
}

// ── Componente principal ──────────────────────────────────────────────────────

export function IllustrationDemo() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Fase 1: rings desenham (0-80f)
  const bgRingLen    = 2 * PI * R_BG
  const innerRingLen = 2 * PI * R_INNER
  const bgRingProg   = interpolate(frame, [0,  70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const trackProg    = interpolate(frame, [15, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const innerProg    = interpolate(frame, [30, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Fase 2: score anima de 0 → 97 (spring a partir de f=70)
  const scoreProg = spring({ frame: frame - 70, fps, config: { damping: 32, stiffness: 38, mass: 1.8 } })
  const score     = Math.round(interpolate(scoreProg, [0, 1], [0, 97]))
  const color     = scoreToColor(score)

  // Arco do score (strokeDashoffset)
  const scoreArcLen = TRACK_LEN * (score / 100)

  // Needle — ângulo proporcional ao score
  const needleAngle = interpolate(score, [0, 100], [START_DEG, END_DEG])
  const needleTip   = pt(R_INNER - 28, needleAngle)
  const needleBack  = pt(26, needleAngle + 180)

  // Hub aparece com spring
  const hubProg = spring({ frame: frame - 75, fps, config: { damping: 18, stiffness: 220, mass: 0.4 } })
  const hubR    = interpolate(hubProg, [0, 1], [0, 20])

  // Ticks (13 marcações ao longo dos 240°)
  const numTicks = 24
  const ticks = Array.from({ length: numTicks + 1 }, (_, i) => {
    const deg      = START_DEG + (i / numTicks) * SWEEP_DEG
    const isMajor  = i % 4 === 0
    const innerR   = isMajor ? R_TICK_IN : R_TICK_IN2
    return { deg, inner: pt(innerR, deg), outer: pt(R_TICK_OUT, deg), isMajor, delay: i * 2 }
  })

  // Labels de escala (0, 50, 100)
  const scaleLabels = [
    { val: 0,   deg: START_DEG },
    { val: 50,  deg: START_DEG + 120 },
    { val: 100, deg: END_DEG },
  ]

  // Texto fade
  const textOp  = interpolate(frame, [65, 95],  [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const labelOp = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // "EXCELENTE" badge quando score ≥ 90
  const badgeOp = interpolate(score, [89, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Fade global
  const fadeIn  = interpolate(frame, [0, 18],   [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const fadeOut = interpolate(frame, [545, 580], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ background: DARK, opacity: Math.min(fadeIn, fadeOut) }}>

      {/* ── SVG layer ── */}
      <svg width={1080} height={1080} style={{ position: 'absolute', inset: 0 }}>

        {/* Anel externo decorativo */}
        <circle cx={CX} cy={CY} r={R_BG}
          fill="none" stroke="rgba(240,240,236,0.05)" strokeWidth={1}
          strokeDasharray={bgRingLen}
          strokeDashoffset={bgRingLen * (1 - bgRingProg)}
          transform={`rotate(-90, ${CX}, ${CY})`}
        />

        {/* Trilho do score (background) */}
        <path d={arcPath(R_TRACK, START_DEG, SWEEP_DEG)}
          fill="none" stroke="rgba(240,240,236,0.07)" strokeWidth={32} strokeLinecap="round"
          opacity={trackProg}
        />

        {/* Arco do score (animado com strokeDashoffset) */}
        <path d={arcPath(R_TRACK, START_DEG, SWEEP_DEG)}
          fill="none" stroke={color} strokeWidth={32} strokeLinecap="round"
          strokeDasharray={TRACK_LEN}
          strokeDashoffset={TRACK_LEN - scoreArcLen}
        />

        {/* Glow no arco do score */}
        <path d={arcPath(R_TRACK, START_DEG, SWEEP_DEG)}
          fill="none" stroke={color} strokeWidth={48} strokeLinecap="round"
          strokeDasharray={TRACK_LEN}
          strokeDashoffset={TRACK_LEN - scoreArcLen}
          opacity={0.12}
          style={{ filter: 'blur(8px)' }}
        />

        {/* Anel interno */}
        <circle cx={CX} cy={CY} r={R_INNER}
          fill="none" stroke="rgba(240,240,236,0.06)" strokeWidth={1}
          strokeDasharray={innerRingLen}
          strokeDashoffset={innerRingLen * (1 - innerProg)}
          transform={`rotate(-90, ${CX}, ${CY})`}
        />

        {/* Ticks */}
        {ticks.map(({ inner, outer, isMajor, delay }, i) => (
          <line key={i}
            x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
            stroke={isMajor ? 'rgba(240,240,236,0.35)' : 'rgba(240,240,236,0.12)'}
            strokeWidth={isMajor ? 2 : 1}
            opacity={interpolate(frame, [delay + 10, delay + 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        ))}

        {/* Labels de escala */}
        {scaleLabels.map(({ val, deg }, i) => {
          const p = pt(R_LABEL + 28, deg)
          return (
            <text key={i} x={p.x} y={p.y + 6} textAnchor="middle"
              fill="rgba(240,240,236,0.30)" fontSize={18} fontFamily={FONT}
              opacity={labelOp}
            >
              {val}
            </text>
          )
        })}

        {/* Needle */}
        {frame > 72 && (
          <>
            <line
              x1={needleBack.x} y1={needleBack.y} x2={needleTip.x} y2={needleTip.y}
              stroke={color} strokeWidth={4} strokeLinecap="round"
              opacity={textOp}
            />
            {/* Hub — glow */}
            <circle cx={CX} cy={CY} r={hubR + 6} fill={color} opacity={0.18 * textOp} />
            {/* Hub — fill */}
            <circle cx={CX} cy={CY} r={hubR} fill={color} opacity={textOp} />
            {/* Hub — dot */}
            <circle cx={CX} cy={CY} r={8} fill={DARK} opacity={textOp} />
          </>
        )}
      </svg>

      {/* ── HTML layer (tipografia) ── */}

      {/* Score numérico */}
      <div style={{
        position: 'absolute',
        top: CY - 100,
        left: 0, right: 0,
        textAlign: 'center',
        opacity: textOp,
      }}>
        <div style={{
          fontFamily: FONT,
          fontSize: 148,
          fontWeight: 800,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          color,
        }}>
          {score}
        </div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: MUTED, letterSpacing: '0.32em', marginTop: 6, opacity: labelOp }}>
          PERFORMANCE SCORE
        </div>
      </div>

      {/* Badge EXCELENTE */}
      <div style={{
        position: 'absolute',
        top: CY + 96,
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: badgeOp,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 20px',
          border: `1.5px solid ${LIME}`,
          borderRadius: 24,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: LIME }} />
          <span style={{ fontFamily: FONT, fontSize: 13, color: LIME, letterSpacing: '0.28em' }}>EXCELENTE</span>
        </div>
      </div>

      {/* Rodapé */}
      <div style={{
        position: 'absolute',
        bottom: 88,
        left: 0, right: 0,
        textAlign: 'center',
        opacity: labelOp,
        fontFamily: FONT,
        fontSize: 12,
        color: 'rgba(240,240,236,0.22)',
        letterSpacing: '0.28em',
      }}>
        SVG PATH DRAWING · SPRING PHYSICS · COLOR INTERPOLATION · REMOTION
      </div>

    </AbsoluteFill>
  )
}

export const illustrationConfig = {
  id: 'IllustrationDemo',
  component: IllustrationDemo,
  durationInFrames: 600,
  fps: 30,
  width: 1080,
  height: 1080,
}
