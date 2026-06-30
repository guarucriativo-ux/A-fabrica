import { useEffect } from 'react'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Servicos from './sections/Servicos'
import Cases from './sections/Cases'
import Metodo from './sections/Metodo'
import Sobre from './sections/Sobre'
import CtaFinal from './sections/CtaFinal'
import Footer from './sections/Footer'
import WaveSection from './sections/WaveSection'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Cursor />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <WaveSection />
        <Servicos />
        <Cases />
        <WaveSection flip />
        <Metodo />
        <Sobre />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
