/**
 * SVGStockDemo — SVGs de stock animados com Remotion
 *
 * Fontes (MIT license, paths inline):
 *   Phosphor Icons   github.com/phosphor-icons/core
 *   Heroicons        github.com/tailwindlabs/heroicons
 *
 * 4 técnicas — uma por card:
 *   1. Spring scale    — rocket entra com spring + duotone reveal
 *   2. strokeDashoffset — sparkles se desenham em cascata
 *   3. Color interp    — chart bg interpola branco → lime
 *   4. Rotation spring — star gira com spring overshot + glow pulse
 */

import {
  AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig,
} from 'remotion'

const LIME = '#CCFF00'
const DARK = '#0A0A0A'
const WHITE = '#F0F0EC'
const FONT = "'Bricolage Grotesque', 'Inter', sans-serif"

// ── SVG path strings ──────────────────────────────────────────────────────────

// Phosphor rocket-launch-duotone (MIT)
const ROCKET_BG = 'M184,120v61.65a8,8,0,0,1-2.34,5.65l-34.35,34.35a8,8,0,0,1-13.57-4.53L128,176ZM136,72H74.35a8,8,0,0,0-5.65,2.34L34.35,108.69a8,8,0,0,0,4.53,13.57L80,128ZM40,216c37.65,0,50.69-19.69,54.56-28.18L68.18,161.44C59.69,165.31,40,178.35,40,216Z'
const ROCKET_FG = 'M223.85,47.12a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.41,27.07L132.69,64H74.36A15.91,15.91,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.94,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A15.91,15.91,0,0,0,192,181.64V123.31l4.77-4.77C223.45,91.86,224.6,59.71,223.85,47.12ZM74.36,80h42.33L77.16,119.52,40,114.34Zm74.41-9.45a76.65,76.65,0,0,1,59.11-22.47,76.46,76.46,0,0,1-22.42,59.16L128,164.68,91.32,128ZM176,181.64,141.67,216l-5.19-37.17L176,139.31Zm-74.16,9.5C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Z'

// Phosphor star-duotone (MIT)
const STAR_BG = 'M229.06,108.79l-48.7,42,14.88,62.79a8.4,8.4,0,0,1-12.52,9.17L128,189.09,73.28,222.74a8.4,8.4,0,0,1-12.52-9.17l14.88-62.79-48.7-42A8.46,8.46,0,0,1,31.73,94L95.64,88.8l24.62-59.6a8.36,8.36,0,0,1,15.48,0l24.62,59.6L224.27,94A8.46,8.46,0,0,1,229.06,108.79Z'
const STAR_FG = 'M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Z'

// Phosphor chart-line-up-duotone (MIT)
const CHART_BG = 'M224,64V208H32V48H208A16,16,0,0,1,224,64Z'
const CHART_FG = 'M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z'

// Heroicons sparkles outline (MIT) — viewBox 0 0 24 24
const SPARK_1 = 'M9.8132 15.9038L9 18.75L8.1868 15.9038C7.75968 14.4089 6.59112 13.2403 5.09619 12.8132L2.25 12L5.09619 11.1868C6.59113 10.7597 7.75968 9.59112 8.1868 8.09619L9 5.25L9.8132 8.09619C10.2403 9.59113 11.4089 10.7597 12.9038 11.1868L15.75 12L12.9038 12.8132C11.4089 13.2403 10.2403 14.4089 9.8132 15.9038Z'
const SPARK_2 = 'M18.2589 8.71454L18 9.75L17.7411 8.71454C17.4388 7.50533 16.4947 6.56117 15.2855 6.25887L14.25 6L15.2855 5.74113C16.4947 5.43883 17.4388 4.49467 17.7411 3.28546L18 2.25L18.2589 3.28546C18.5612 4.49467 19.5053 5.43883 20.7145 5.74113L21.75 6L20.7145 6.25887C19.5053 6.56117 18.5612 7.50533 18.2589 8.71454Z'
const SPARK_3 = 'M16.8942 20.5673L16.5 21.75L16.1058 20.5673C15.8818 19.8954 15.3546 19.3682 14.6827 19.1442L13.5 18.75L14.6827 18.3558C15.3546 18.1318 15.8818 17.6046 16.1058 16.9327L16.5 15.75L16.8942 16.9327C17.1182 17.6046 17.6454 18.1318 18.3173 18.3558L19.5 18.75L18.3173 19.1442C17.6454 19.3682 17.1182 19.8954 16.8942 20.5673Z'

// ── Layout ────────────────────────────────────────────────────────────────────
const CW = 445, CH = 390, GAP = 26
const X1 = 82,  X2 = X1 + CW + GAP
const Y1 = 205, Y2 = Y1 + CH + GAP

export function SVGStockDemo() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Card stagger entrances
  const cardProg = (delay) => spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 62, mass: 1.1 } })
  const c1 = cardProg(0),  c2 = cardProg(16)
  const c3 = cardProg(32), c4 = cardProg(48)

  // ── Card 1: Rocket — spring scale + duotone reveal ────────────────────
  const rocketP = spring({ frame: frame - 14, fps, config: { damping: 10, stiffness: 52, mass: 1.3 } })
  const rocketS  = interpolate(rocketP, [0, 1], [0.2, 1])
  const rocketBg = interpolate(rocketP, [0.2, 0.9], [0, 0.32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rocketFg = interpolate(rocketP, [0.35, 1],  [0, 1],    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // ── Card 2: Sparkles — strokeDashoffset stagger ───────────────────────
  const sp = [28, 50, 72].map(d =>
    spring({ frame: frame - d, fps, config: { damping: 16, stiffness: 78, mass: 0.75 } })
  )
  const spOff = (p) => interpolate(p, [0, 1], [100, 0])
  const spClr = (p) => {
    const t = p
    return `rgb(${Math.round(interpolate(t, [0,1], [240,204]))},${Math.round(interpolate(t, [0,1], [240,255]))},${Math.round(interpolate(t, [0,1], [236,0]))})`
  }

  // ── Card 3: Chart — enter + bg color fill ─────────────────────────────
  const chartP  = spring({ frame: frame - 32, fps, config: { damping: 14, stiffness: 58, mass: 1 } })
  const chartBg = `rgba(204,255,0,${interpolate(chartP, [0.05, 0.9], [0, 0.28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`
  const chartFg = interpolate(chartP, [0.15, 0.7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // ── Card 4: Star — rotation spring + glow pulse ───────────────────────
  const starP   = spring({ frame: frame - 48, fps, config: { damping: 7, stiffness: 42, mass: 1.6 } })
  const starRot = interpolate(starP, [0, 1], [-200, 0])
  const starGlw = 0.12 + Math.sin(frame * 0.1) * 0.07

  // Global fades
  const fadeIn  = interpolate(frame, [0, 18],    [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const fadeOut = interpolate(frame, [530, 572], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // ── Card wrapper helper ────────────────────────────────────────────────
  const cardY = (p) => interpolate(p, [0, 1], [55, 0])
  const cardO = (p) => interpolate(p, [0, 0.3], [0, 1])

  return (
    <AbsoluteFill style={{ background: DARK, opacity: Math.min(fadeIn, fadeOut) }}>
      <svg width={1080} height={1080} style={{ position: 'absolute', inset: 0 }}>

        {/* Header */}
        <text x={540} y={118} textAnchor="middle" fill={WHITE}
          fontSize={50} fontFamily={FONT} fontWeight={800} letterSpacing="-0.04em"
          opacity={interpolate(frame, [4, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
          SVG STOCK
        </text>
        <text x={540} y={156} textAnchor="middle" fill="rgba(240,240,236,0.25)"
          fontSize={11} fontFamily={FONT} letterSpacing="0.22em"
          opacity={interpolate(frame, [14, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
          PHOSPHOR ICONS · HEROICONS · MIT LICENSE · ANIMADOS COM REMOTION
        </text>

        {/* ── CARD 1: ROCKET ── */}
        <g transform={`translate(${X1}, ${Y1 + cardY(c1)})`} opacity={cardO(c1)}>
          <rect width={CW} height={CH} rx={18} fill="rgba(240,240,236,0.03)" stroke="rgba(240,240,236,0.07)" strokeWidth={1} />
          <g transform={`translate(${CW/2}, ${CH/2 - 22}) scale(${rocketS})`}>
            <g transform="translate(-80, -80)">
              <svg viewBox="0 0 256 256" width={160} height={160}>
                <path d={ROCKET_BG} fill={LIME} opacity={rocketBg} style={{ filter: 'blur(2px)' }} />
                <path d={ROCKET_BG} fill={LIME} opacity={rocketBg} />
                <path d={ROCKET_FG} fill={WHITE} opacity={rocketFg} />
              </svg>
            </g>
          </g>
          <text x={CW/2} y={CH-36} textAnchor="middle" fill={LIME} fontSize={10} fontFamily={FONT} letterSpacing="0.22em">SPRING SCALE + DUOTONE</text>
          <text x={CW/2} y={CH-16} textAnchor="middle" fill="rgba(240,240,236,0.28)" fontSize={10} fontFamily={FONT} letterSpacing="0.14em">PHOSPHOR ICONS</text>
        </g>

        {/* ── CARD 2: SPARKLES ── */}
        <g transform={`translate(${X2}, ${Y1 + cardY(c2)})`} opacity={cardO(c2)}>
          <rect width={CW} height={CH} rx={18} fill="rgba(240,240,236,0.03)" stroke="rgba(240,240,236,0.07)" strokeWidth={1} />
          <g transform={`translate(${CW/2 - 84}, ${CH/2 - 84 - 20})`}>
            <svg viewBox="0 0 24 24" width={168} height={168} fill="none">
              <path d={SPARK_1} stroke={spClr(sp[0])} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                pathLength="100" strokeDasharray="100" strokeDashoffset={spOff(sp[0])} />
              <path d={SPARK_2} stroke={spClr(sp[1])} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                pathLength="100" strokeDasharray="100" strokeDashoffset={spOff(sp[1])} />
              <path d={SPARK_3} stroke={spClr(sp[2])} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                pathLength="100" strokeDasharray="100" strokeDashoffset={spOff(sp[2])} />
            </svg>
          </g>
          <text x={CW/2} y={CH-36} textAnchor="middle" fill={LIME} fontSize={10} fontFamily={FONT} letterSpacing="0.22em">STROKEDASHOFFSET STAGGER</text>
          <text x={CW/2} y={CH-16} textAnchor="middle" fill="rgba(240,240,236,0.28)" fontSize={10} fontFamily={FONT} letterSpacing="0.14em">HEROICONS</text>
        </g>

        {/* ── CARD 3: CHART ── */}
        <g transform={`translate(${X1}, ${Y2 + cardY(c3)})`} opacity={cardO(c3)}>
          <rect width={CW} height={CH} rx={18} fill="rgba(240,240,236,0.03)" stroke="rgba(240,240,236,0.07)" strokeWidth={1} />
          <g transform={`translate(${CW/2 - 80}, ${CH/2 - 80 - 20})`}>
            <svg viewBox="0 0 256 256" width={160} height={160}>
              <path d={CHART_BG} fill={chartBg} />
              <path d={CHART_FG} fill={WHITE} opacity={chartFg} />
            </svg>
          </g>
          <text x={CW/2} y={CH-36} textAnchor="middle" fill={LIME} fontSize={10} fontFamily={FONT} letterSpacing="0.22em">COLOR INTERPOLATION</text>
          <text x={CW/2} y={CH-16} textAnchor="middle" fill="rgba(240,240,236,0.28)" fontSize={10} fontFamily={FONT} letterSpacing="0.14em">PHOSPHOR ICONS</text>
        </g>

        {/* ── CARD 4: STAR ── */}
        <g transform={`translate(${X2}, ${Y2 + cardY(c4)})`} opacity={cardO(c4)}>
          <rect width={CW} height={CH} rx={18} fill="rgba(240,240,236,0.03)" stroke="rgba(240,240,236,0.07)" strokeWidth={1} />
          <g transform={`translate(${CW/2}, ${CH/2 - 22})`}>
            <circle r={80} fill={LIME} opacity={starGlw} style={{ filter: 'blur(28px)' }} />
            <g transform={`rotate(${starRot})`}>
              <g transform="translate(-80, -80)">
                <svg viewBox="0 0 256 256" width={160} height={160}>
                  <path d={STAR_BG} fill={LIME} opacity={0.4} />
                  <path d={STAR_FG} fill={WHITE} />
                </svg>
              </g>
            </g>
          </g>
          <text x={CW/2} y={CH-36} textAnchor="middle" fill={LIME} fontSize={10} fontFamily={FONT} letterSpacing="0.22em">ROTATION SPRING + GLOW</text>
          <text x={CW/2} y={CH-16} textAnchor="middle" fill="rgba(240,240,236,0.28)" fontSize={10} fontFamily={FONT} letterSpacing="0.14em">PHOSPHOR ICONS</text>
        </g>

        {/* Footer */}
        <text x={540} y={1022} textAnchor="middle" fill="rgba(240,240,236,0.16)"
          fontSize={10} fontFamily={FONT} letterSpacing="0.26em"
          opacity={interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
          SPRING SCALE · STROKEDASHOFFSET · COLOR INTERP · ROTATION · REMOTION
        </text>

      </svg>
    </AbsoluteFill>
  )
}

export const svgStockConfig = {
  id: 'SVGStockDemo',
  component: SVGStockDemo,
  durationInFrames: 600,
  fps: 30,
  width: 1080,
  height: 1080,
}
