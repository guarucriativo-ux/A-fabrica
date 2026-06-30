import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    let animationId
    let points = []

    function countPoints() {
      return window.innerWidth < 768 ? 25 : 55
    }

    function randomBetween(min, max) {
      return Math.random() * (max - min) + min
    }

    function initPoints(w, h) {
      const n = countPoints()
      points = []
      for (let i = 0; i < n; i++) {
        points.push({
          x: randomBetween(0, w),
          y: randomBetween(0, h),
          vx: randomBetween(-0.25, 0.25),
          vy: randomBetween(-0.25, 0.25),
        })
      }
    }

    function resizeCanvas() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      initPoints(w, h)
    }

    function draw() {
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // Update positions
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) }
        if (p.x > w) { p.x = w; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) }
        if (p.y > h) { p.y = h; p.vy = -Math.abs(p.vy) }
      }

      // Draw lines
      ctx.strokeStyle = 'rgba(180, 180, 174, 0.15)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw points
      ctx.fillStyle = 'rgba(180, 180, 174, 0.5)'
      for (const p of points) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resizeCanvas()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}
