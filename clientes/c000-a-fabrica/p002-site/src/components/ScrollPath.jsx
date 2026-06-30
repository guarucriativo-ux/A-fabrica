import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * ScrollPath — anima um <motion.path> com pathLength de 0 → 1 ao entrar na viewport.
 *
 * Props:
 *   children   — um único <motion.path> (ou elemento SVG) que aceita pathLength
 *   delay      — atraso da animação em segundos (default 0)
 *   duration   — duração em segundos (default 2.4)
 *   once       — dispara só uma vez (default true)
 *
 * Uso:
 *   <svg viewBox="...">
 *     <ScrollPath delay={0.3}>
 *       <motion.path d="..." fill="none" stroke="#000" strokeWidth={2} />
 *     </ScrollPath>
 *   </svg>
 *
 * O componente injeta as props de animação no filho via cloneElement,
 * então NÃO defina initial/animate/variants no filho — ScrollPath cuida disso.
 */
import { cloneElement } from 'react'

const EASE = [0.22, 1, 0.36, 1]

export default function ScrollPath({
  children,
  delay = 0,
  duration = 2.4,
  once = true,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-10% 0px' })

  // Injeta initial / animate / transition no filho
  const animated = cloneElement(children, {
    ref,
    initial: { pathLength: 0, opacity: 0 },
    animate: inView
      ? { pathLength: 1, opacity: 1 }
      : { pathLength: 0, opacity: 0 },
    transition: {
      pathLength: { duration, delay, ease: EASE },
      opacity: { duration: 0.3, delay },
    },
  })

  return animated
}
