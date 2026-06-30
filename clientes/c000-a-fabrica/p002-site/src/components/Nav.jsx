import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'O que fazemos', href: '#servicos' },
  { label: 'Cases', href: '#cases' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#cta' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 clamp(24px, 5vw, 80px)',
          height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(248,248,244,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(10,10,10,0.07)' : 'none',
          transition: 'background 0.5s, border-color 0.5s',
        }}
      >
        <a href="#" style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 18, fontWeight: 700,
          letterSpacing: '-0.01em',
          color: '#0A0A0A',
          transition: 'color 0.4s',
        }}>
          Guaru<span style={{ color: '#CCFF00' }}>.</span>
        </a>

        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 40, listStyle: 'none' }}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                fontSize: 13, fontWeight: 400,
                color: 'rgba(10,10,10,0.55)',
                letterSpacing: '0.01em',
                transition: 'color 0.25s',
              }}
                onMouseEnter={e => e.target.style.color = '#0A0A0A'}
                onMouseLeave={e => e.target.style.color = 'rgba(10,10,10,0.55)'}
              >{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#cta" style={{
              fontSize: 12, fontWeight: 600,
              color: '#0A0A0A',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              paddingBottom: 2,
              borderBottom: '1px solid #CCFF00',
              transition: 'color 0.3s',
            }}>
              Proposta
            </a>
          </li>
        </ul>

        <button onClick={() => setOpen(v => !v)} aria-label="Menu" className="nav-burger"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 4, background: 'none', border: 'none' }}>
          {[0, 1].map(i => (
            <motion.span key={i}
              animate={open ? (i === 0 ? { rotate: 45, y: 7 } : { rotate: -45, y: -2 }) : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: 22, height: 1.5, background: '#0A0A0A', display: 'block', transition: 'background 0.4s' }}
            />
          ))}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
              background: 'rgba(248,248,244,0.98)', backdropFilter: 'blur(12px)',
              padding: '32px clamp(24px, 5vw, 80px) 40px',
              borderBottom: '1px solid rgba(10,10,10,0.07)',
            }}
          >
            {links.map((l, i) => (
              <motion.div key={l.href}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{ borderTop: '1px solid rgba(10,10,10,0.07)', padding: '18px 0' }}>
                <a href={l.href} onClick={() => setOpen(false)}
                  style={{ fontSize: 24, fontWeight: 500, color: '#0A0A0A', fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: '-0.01em' }}>
                  {l.label}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
