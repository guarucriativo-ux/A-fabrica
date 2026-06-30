import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  { num: '01', name: 'Entendimento', desc: 'Mapeamos seu negócio, público e concorrentes. Só o que importa pra chegar no resultado certo.' },
  { num: '02', name: 'Estratégia', desc: 'Plano com escopo, prazo e preço fechado. Sem surpresa no meio do caminho.' },
  { num: '03', name: 'Execução', desc: 'Design + tecnologia + IA para entregar mais rápido sem perder qualidade.' },
  { num: '04', name: 'Resultado', desc: 'Tudo funcional, aprovado por você. Suporte pós-entrega incluso.' },
]

export default function Metodo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="metodo" style={{
      background: '#F8F8F4',
      padding: 'clamp(80px, 14vh, 160px) clamp(24px, 5vw, 80px)',
      borderTop: '1px solid rgba(10,10,10,0.07)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(48px, 8vw, 100px)',
        marginBottom: 72,
      }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888882', marginBottom: 20 }}>
            Como trabalhamos
          </p>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 500, letterSpacing: '-0.02em',
            lineHeight: 1.1, color: '#0A0A0A',
          }}>
            Do briefing<br />à entrega.
          </h2>
        </motion.div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 1,
        background: 'rgba(10,10,10,0.07)',
      }}>
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            style={{ background: '#F8F8F4', padding: 'clamp(32px, 4vw, 52px) clamp(24px, 3vw, 40px)' }}
          >
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', color: '#888882', display: 'block', marginBottom: 36 }}>
              {s.num}
            </span>
            <h3 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: 500, letterSpacing: '-0.01em',
              color: '#0A0A0A', marginBottom: 12,
            }}>
              {s.name}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.72, color: '#888882' }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
