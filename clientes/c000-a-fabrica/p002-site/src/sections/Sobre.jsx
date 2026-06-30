import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import WaveDecor from '../svgs/WaveDecor'

export default function Sobre() {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="sobre" style={{
      background: '#fff',
      borderTop: '1px solid rgba(10,10,10,0.07)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}>
        {/* Bloco visual — WaveDecor + monograma */}
        <div ref={imgRef} style={{ overflow: 'hidden', aspectRatio: '4/5', position: 'relative', background: '#ECECEA', minHeight: 400 }}>
          <motion.div style={{ y: imgY, height: '116%', width: '100%', position: 'absolute', top: '-8%' }}>
            {/* Ondas decorativas na base */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
              <WaveDecor />
            </div>

            {/* Monograma central */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 16,
            }}>
              <span style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(64px, 10vw, 120px)',
                fontWeight: 500,
                color: 'rgba(10,10,10,0.08)',
              }}>GE</span>
              <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888882' }}>
                Guaru Estúdio
              </span>
            </div>
          </motion.div>
        </div>

        {/* Texto */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: 'clamp(56px, 10vh, 120px) clamp(32px, 6vw, 80px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888882', marginBottom: 32 }}>
            Quem somos
          </p>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 500, letterSpacing: '-0.02em',
            lineHeight: 1.1, color: '#0A0A0A',
            marginBottom: 32,
          }}>
            Menos agência.<br />Mais resultado.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555550', marginBottom: 20 }}>
            O Guaru Estúdio nasceu da frustração de ver PMEs pagando caro por agências que entregavam pouco. 12 anos de design gráfico transformados em processo: rápido, direto e com resultado mensurável.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555550', marginBottom: 48 }}>
            Hoje usamos IA para escalar a produção sem abrir mão da qualidade. O que uma agência grande leva 6 semanas pra fazer, a gente entrega em dias.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid rgba(10,10,10,0.07)', paddingTop: 32 }}>
            {[
              '12 anos de experiência em design gráfico',
              '50+ projetos entregues para PMEs brasileiras',
              'Design + tráfego pago + redes no mesmo lugar',
            ].map((c) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 14, color: '#555550' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#CCFF00', flexShrink: 0, display: 'block' }} />
                {c}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
