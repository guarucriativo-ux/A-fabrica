import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function RevealText({ children, delay = 0, y = 60 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: y, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
