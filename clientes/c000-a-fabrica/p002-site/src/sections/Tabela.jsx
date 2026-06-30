import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealText from '../components/RevealText'

const rows = [
  { label: 'Preço justo pra PME', free: true, big: false, guaru: true },
  { label: 'Processo estruturado', free: false, big: true, guaru: true },
  { label: 'Entrega rápida', free: 'às vezes', big: false, guaru: true },
  { label: 'Design + marketing integrado', free: false, big: true, guaru: true },
  { label: 'Foco em resultado', free: 'depende', big: false, guaru: true },
  { label: 'Comunicação direta', free: true, big: false, guaru: true },
  { label: 'IA na produção', free: false, big: 'alguns', guaru: true },
]

const ck = <span style={{ color: '#0A0A0A', fontSize: 18 }}>✓</span>
const nx = <span style={{ color: 'rgba(10,10,10,0.15)', fontSize: 18 }}>✗</span>
const mb = v => <span style={{ fontSize: 12, color: '#888882' }}>{v}</span>

function cell(v) {
  if (v === true) return ck
  if (v === false) return nx
  return mb(v)
}

const ckGuaru = <span style={{ color: '#0A0A0A', fontSize: 18 }}>✓</span>

export default function Tabela() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="tabela" style={{
      background: '#F0F0EC',
      padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px)',
    }}>
      <RevealText>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888882', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ width: 20, height: 1, background: '#CCFF00', display: 'block' }} />
          Por que o Guaru
        </div>
      </RevealText>
      <RevealText delay={0.1}>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 'clamp(40px, 6vw, 76px)',
          fontWeight: 900, lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: '#0A0A0A', marginBottom: 64,
        }}>
          A comparação que<br />
          ninguém mostra
        </h2>
      </RevealText>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflowX: 'auto' }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead>
            <tr>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888882', borderBottom: '1px solid rgba(10,10,10,0.1)' }}></th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888882', borderBottom: '1px solid rgba(10,10,10,0.1)' }}>Freelancer</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888882', borderBottom: '1px solid rgba(10,10,10,0.1)' }}>Agência Grande</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0A0A0A', background: '#E8E8E4', borderBottom: '2px solid #0A0A0A', borderLeft: '1px solid rgba(10,10,10,0.1)' }}>Guaru ✦</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td style={{ padding: '16px 20px', fontSize: 14, color: '#555550', borderBottom: '1px solid rgba(10,10,10,0.07)' }}>{r.label}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid rgba(10,10,10,0.07)' }}>{cell(r.free)}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '1px solid rgba(10,10,10,0.07)' }}>{cell(r.big)}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center', background: '#E8E8E4', borderBottom: '1px solid rgba(10,10,10,0.07)', borderLeft: '1px solid rgba(10,10,10,0.1)' }}>{ckGuaru}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  )
}
