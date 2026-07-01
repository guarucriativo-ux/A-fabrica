/**
 * MascoteDemo — personagem SVG animado com Remotion
 *
 * Técnicas demonstradas:
 * 1. spring entrance    — personagem cai do topo com física
 * 2. idle float         — sin wave contínuo, sombra inversamente proporcional
 * 3. arm wave           — braço direito levanta + oscila (spring + sin)
 * 4. head tilt          — cabeça acompanha o sway
 * 5. blink              — olhos fecham via interpolate(eyeRY)
 * 6. speech bubble      — pop-in com spring scale
 */

import {
  AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig,
} from 'remotion'

const LIME = '#CCFF00'
const DARK = '#0A0A0A'
const WHITE = '#F0F0EC'
const FONT = "'Bricolage Grotesque', 'Inter', sans-serif"

export function MascoteDemo() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // ── Entrada (spring, desce do alto) ────────────────────────────────────
  const enterProg = spring({ frame, fps, config: { damping: 11, stiffness: 46, mass: 1.9 } })
  const enterY = interpolate(enterProg, [0, 1], [-680, 0])

  // ── Idle float (sin contínuo) ───────────────────────────────────────────
  const floatY = Math.sin(frame * 0.048) * 14

  // ── Piscada a cada 85 frames ────────────────────────────────────────────
  const blinkT = frame % 85
  const eyeRY = blinkT < 4 ? interpolate(blinkT, [0, 2, 4], [18, 1, 18]) : 18

  // ── Inclinação da cabeça ────────────────────────────────────────────────
  const headTilt = Math.sin(frame * 0.036) * 5

  // ── Braço esquerdo — balanço passivo ────────────────────────────────────
  const leftArmRot = Math.sin(frame * 0.043 + 1.1) * 10 + 8

  // ── Braço direito — aceno (inicia f=80) ────────────────────────────────
  const waveRaise = spring({ frame: frame - 80, fps, config: { damping: 9, stiffness: 82, mass: 0.75 } })
  const waveBase  = interpolate(waveRaise, [0, 1], [10, -108])
  const waveWiggle = frame > 96 ? Math.sin((frame - 96) * 0.26) * 22 : 0
  const rightArmRot = waveBase + waveWiggle

  // ── Balão de fala (spring pop a partir de f=215) ─────────────────────
  const bubbleProg = spring({ frame: frame - 215, fps, config: { damping: 13, stiffness: 135, mass: 0.48 } })
  const bubbleS  = interpolate(bubbleProg, [0, 1], [0.6, 1])
  const bubbleOp = interpolate(bubbleProg, [0, 0.25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // ── Fade global ─────────────────────────────────────────────────────────
  const fadeIn  = interpolate(frame, [0, 18],    [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const fadeOut = interpolate(frame, [535, 575], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const charY = enterY + floatY
  const footY = 500 + charY + 148   // posição canvas do pé, para sombra

  return (
    <AbsoluteFill style={{ background: DARK, opacity: Math.min(fadeIn, fadeOut) }}>
      <svg width={1080} height={1080} style={{ position: 'absolute', inset: 0 }}>

        {/* Sombra — encolhe conforme float sobe */}
        <ellipse
          cx={540} cy={820}
          rx={interpolate(floatY, [-14, 14], [88, 112])}
          ry={interpolate(floatY, [-14, 14], [10, 17])}
          fill="rgba(204,255,0,0.07)"
        />

        {/* ── PERSONAGEM — origem no centro do corpo ── */}
        <g transform={`translate(540, ${500 + charY})`}>

          {/* Braço esquerdo — pivô em (-76, -32) */}
          <g transform={`translate(-76, -32) rotate(${leftArmRot})`}>
            <rect x={-17} y={0} width={34} height={88} rx={14} fill={WHITE} />
            <circle cx={0} cy={98} r={19} fill={WHITE} />
          </g>

          {/* Braço direito — pivô em (76, -32), faz aceno */}
          <g transform={`translate(76, -32) rotate(${rightArmRot})`}>
            <rect x={-17} y={0} width={34} height={88} rx={14} fill={WHITE} />
            <circle cx={0} cy={98} r={19} fill={WHITE} />
            {/* Brilho na mão durante aceno */}
            <circle cx={0} cy={98} r={8} fill={LIME}
              opacity={interpolate(rightArmRot, [-108, -60, 0], [0.9, 0.4, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            />
          </g>

          {/* Corpo */}
          <rect x={-66} y={-100} width={132} height={172} rx={22} fill={WHITE} />
          {/* Detalhe linhas */}
          <rect x={-36} y={-52} width={72} height={2} rx={1} fill="rgba(10,10,10,0.07)" />
          <rect x={-36} y={-40} width={50} height={2} rx={1} fill="rgba(10,10,10,0.07)" />
          {/* Peito — glow + dot lime */}
          <circle cx={0} cy={28} r={22} fill={LIME} opacity={0.18} style={{ filter: 'blur(8px)' }} />
          <circle cx={0} cy={28} r={17} fill={LIME} />
          <circle cx={0} cy={28} r={9.5} fill={DARK} />

          {/* Pernas */}
          <rect x={-50} y={65} width={38} height={72} rx={13} fill={WHITE} />
          <rect x={12}  y={65} width={38} height={72} rx={13} fill={WHITE} />

          {/* Pés */}
          <ellipse cx={-31} cy={143} rx={31} ry={17} fill={LIME} />
          <ellipse cx={31}  cy={143} rx={31} ry={17} fill={WHITE} />

          {/* ── Cabeça — gira levemente ── */}
          <g transform={`rotate(${headTilt}, 0, -145)`}>
            {/* Base */}
            <rect x={-77} y={-258} width={154} height={148} rx={30} fill={WHITE} />
            {/* Faixa lime topo */}
            <rect x={-77} y={-258} width={154} height={30} rx={30} fill={LIME} />
            <rect x={-77} y={-236} width={154} height={8} fill={LIME} />
            {/* Antena */}
            <rect x={-5} y={-276} width={10} height={22} rx={5} fill={WHITE} />
            <circle cx={0} cy={-282} r={12} fill={LIME} />
            <circle cx={0} cy={-282} r={5.5} fill={DARK} />
            {/* Olhos */}
            <ellipse cx={-27} cy={-168} rx={19} ry={eyeRY} fill={DARK} />
            <circle  cx={-19} cy={-176} r={4.5} fill={WHITE} />
            <ellipse cx={27}  cy={-168} rx={19} ry={eyeRY} fill={DARK} />
            <circle  cx={35}  cy={-176} r={4.5} fill={WHITE} />
            {/* Boca */}
            <path d="M -19 -134 Q 0 -118 19 -134"
              fill="none" stroke={DARK} strokeWidth={3.5} strokeLinecap="round" />
          </g>

        </g>

        {/* ── Balão de fala — escala a partir do centro do balão ── */}
        <g
          opacity={bubbleOp}
          style={{ transform: `scale(${bubbleS})`, transformOrigin: '800px 215px' }}
        >
          {/* Cauda apontando para a mão */}
          <polygon points="666,236 638,262 686,250" fill={WHITE} />
          {/* Corpo do balão */}
          <rect x={666} y={170} width={268} height={92} rx={22} fill={WHITE} />
          <text x={800} y={210} textAnchor="middle"
            fill={DARK} fontSize={24} fontFamily={FONT} fontWeight={700} letterSpacing="-0.02em">
            mascotes!
          </text>
          <text x={800} y={240} textAnchor="middle"
            fill="rgba(10,10,10,0.35)" fontSize={12} fontFamily={FONT} letterSpacing="0.18em">
            ANIMADOS COM REMOTION
          </text>
        </g>

      </svg>

      {/* Caption */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        textAlign: 'center',
        opacity: interpolate(frame, [55, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        fontFamily: FONT, fontSize: 11,
        color: 'rgba(240,240,236,0.20)',
        letterSpacing: '0.28em',
      }}>
        SPRING ENTRANCE · IDLE FLOAT · ARM WAVE · BLINK · SPEECH BUBBLE
      </div>
    </AbsoluteFill>
  )
}

export const mascoteConfig = {
  id: 'MascoteDemo',
  component: MascoteDemo,
  durationInFrames: 600,
  fps: 30,
  width: 1080,
  height: 1080,
}
