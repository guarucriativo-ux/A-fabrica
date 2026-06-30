export default function Footer() {
  return (
    <footer style={{
      background: '#0A0A0A',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: 'clamp(56px, 8vh, 80px) clamp(20px, 5vw, 80px) 40px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 26, fontWeight: 900, letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#F0F0EC', marginBottom: 8 }}>
            GUARU<span style={{ color: '#CCFF00' }}>.</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(240,240,236,0.35)' }}>Design que vende. Execução que cresce.</p>
        </div>
        <nav style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
          {[
            { title: 'Serviços', links: ['Identidade Visual', 'Site Profissional', 'Redes Sociais', 'Tráfego Pago'] },
            { title: 'Empresa', links: ['Sobre', 'Cases', 'Método', 'Contato'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,240,236,0.3)', marginBottom: 16 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: 13, color: 'rgba(240,240,236,0.5)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#CCFF00'}
                      onMouseLeave={e => e.target.style.color = 'rgba(240,240,236,0.5)'}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 12, color: 'rgba(240,240,236,0.25)' }}>© 2026 Guaru Estúdio. Todos os direitos reservados.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="https://instagram.com/guaruestudio" target="_blank" rel="noopener" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(240,240,236,0.35)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#CCFF00'}
            onMouseLeave={e => e.target.style.color = 'rgba(240,240,236,0.35)'}>
            @guaruestudio
          </a>
          <a href="#cta-final" style={{ fontSize: 12, fontWeight: 600, color: 'rgba(240,240,236,0.35)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#CCFF00'}
            onMouseLeave={e => e.target.style.color = 'rgba(240,240,236,0.35)'}>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
