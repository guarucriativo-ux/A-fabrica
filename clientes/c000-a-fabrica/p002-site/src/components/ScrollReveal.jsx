import { motion } from 'framer-motion'

/**
 * ScrollReveal — wrapper genérico de reveal para blocos de texto/conteúdo.
 *
 * Props:
 *   children   — qualquer conteúdo React
 *   delay      — atraso em segundos (default 0)
 *   y          — deslocamento vertical inicial em px (default 32)
 *   duration   — duração em segundos (default 0.9)
 *   once       — dispara só uma vez (default true)
 *   className  — classe CSS opcional no wrapper
 *   style      — estilos inline opcionais no wrapper
 *
 * Uso:
 *   <ScrollReveal delay={0.2}>
 *     <h2>Título</h2>
 *     <p>Texto...</p>
 *   </ScrollReveal>
 */

const EASE = [0.22, 1, 0.36, 1]

export default function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  once = true,
  className,
  style,
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
