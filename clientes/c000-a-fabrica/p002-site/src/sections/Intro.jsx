import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Intro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <section ref={ref} style={{
      background: '#F8F8F4',
      padding: 'clamp(80px, 14vh, 160px) clamp(24px, 5vw, 80px)',
      borderBottom: '1px solid rgba(10,10,10,0.07)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(48px, 8vw, 120px)',
        alignItems: 'start',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#0A0A0A',
          }}>
            12 anos<br />
            <span style={{ color: 'rgba(10,10,10,0.28)' }}>de experiência</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingTop: 8 }}
        >
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555550', maxWidth: 480, marginBottom: 32 }}>
            Combinamos design estratégico, tecnologia e inteligência artificial para construir marcas e presença digital que geram resultado real para pequenas e médias empresas brasileiras.
          </p>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {[['50+', 'Projetos'], ['3x', 'Mais rápido'], ['100%', 'Dedicação']].map(([n, l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 28, fontWeight: 600,
                  letterSpacing: '-0.02em', color: '#0A0A0A',
                  marginBottom: 4,
                }}>
                  {n}<span style={{ color: '#CCFF00', fontSize: 20 }}></span>
                </div>
                <div style={{ fontSize: 12, color: '#888882', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
