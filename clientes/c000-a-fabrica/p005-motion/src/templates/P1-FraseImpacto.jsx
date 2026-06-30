import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { AnimatedWords, AnimatedLine, ImpactLine } from '../components/AnimatedText'
import { GuaruLogo, InstagramHandle, LimeLine } from '../components/Brand'

/**
 * POST P1 — Pilar 1 · Frase de Impacto
 *
 * "Recebi um briefing semana passada. Empresa de oito anos, carteira fiel,
 * dono orgulhoso do que construiu. Antes de perguntar qualquer coisa,
 * abri o site pelo celular.
 *
 * Onze segundos pra carregar. Travou na metade.
 *
 * Eu não precisei perguntar por que o cliente novo não voltava."
 *
 * Formato: 1080x1080 (feed quadrado) · 30fps · ~8s
 */

// TIMING (em frames a 30fps)
const T = {
  // Bloco 1: contexto — aparece palavra a palavra
  bloco1_start: 10,   // "Recebi um briefing semana passada..."

  // Bloco 2: o momento — impacto visual em lime
  bloco2_start: 80,   // "Onze segundos pra carregar."
  bloco2b_start: 105, // "Travou na metade."

  // Bloco 3: conclusão — o diagnóstico
  bloco3_start: 145,  // "Eu não precisei perguntar..."

  // Branding final
  line_start: 195,
  logo_start: 205,
  handle_start: 215,
}

const TOTAL_FRAMES = 240 // 8 segundos a 30fps

export const P1FraseImpacto = () => {
  const frame = useCurrentFrame()

  // Fade out suave no final (últimos 15 frames)
  const finalOpacity = interpolate(frame, [TOTAL_FRAMES - 15, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{
      background: '#0A0A0A',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '80px 80px 72px',
      opacity: finalOpacity,
    }}>

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 48 }}>

        {/* BLOCO 1 — Contexto (palavra a palavra) */}
        <div style={{ lineHeight: 1.3 }}>
          <AnimatedWords
            text="Recebi um briefing semana passada."
            startFrame={T.bloco1_start}
            color="rgba(240,240,236,0.72)"
            fontSize={42}
            delay={5}
          />
          <br />
          <AnimatedWords
            text="Empresa de oito anos, carteira fiel,"
            startFrame={T.bloco1_start + 30}
            color="rgba(240,240,236,0.72)"
            fontSize={42}
            delay={5}
          />
          <br />
          <AnimatedWords
            text="dono orgulhoso do que construiu."
            startFrame={T.bloco1_start + 58}
            color="rgba(240,240,236,0.72)"
            fontSize={42}
            delay={5}
          />
        </div>

        {/* BLOCO 2 — O Momento · IMPACTO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ImpactLine
            text="Onze segundos pra carregar."
            startFrame={T.bloco2_start}
            color="#CCFF00"
            fontSize={72}
          />
          <AnimatedLine
            text="Travou na metade."
            startFrame={T.bloco2b_start}
            color="rgba(240,240,236,0.55)"
            fontSize={52}
            weight={400}
          />
        </div>

        {/* BLOCO 3 — Diagnóstico */}
        <div>
          <AnimatedLine
            text="Eu não precisei perguntar"
            startFrame={T.bloco3_start}
            color="#F0F0EC"
            fontSize={46}
            weight={500}
          />
          <AnimatedLine
            text="por que o cliente novo não voltava."
            startFrame={T.bloco3_start + 12}
            color="#F0F0EC"
            fontSize={46}
            weight={500}
          />
        </div>

      </div>

      {/* BRANDING FINAL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <LimeLine startFrame={T.line_start} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <GuaruLogo startFrame={T.logo_start} size={26} />
          <InstagramHandle startFrame={T.handle_start} />
        </div>
      </div>

    </AbsoluteFill>
  )
}

// Metadados para o Remotion
export const p1Config = {
  id: 'P1-FraseImpacto',
  component: P1FraseImpacto,
  durationInFrames: TOTAL_FRAMES,
  fps: 30,
  width: 1080,
  height: 1080,
}
