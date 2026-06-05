import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, EASE } from './Reveal'

// Background image for this section.
// File must live at: <project root>/public/sexy.jpg
const EMAIL_BG = '/sexy.jpg'

// ===== MOBILE TUNING KNOBS =====
const MOBILE_ZOOM = '105%'
const MOBILE_SHIFT_X = '30px'
const MOBILE_IMAGE_WINDOW = 'clamp(14rem, 55vw, 20rem)'
const MOBILE_TEXT_DROP = '40px'

export function EmailList() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  // The image is pinned to the SCREEN while the section scrolls over it,
  // then freezes (relative to the section) the moment the end of the copy
  // reaches the bottom of the screen, and travels out with the section.
  // Scrolling up reverses everything.
  const sectionRef = useRef<HTMLElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState({ vh: 0, markerOffset: 0, sectionH: 1 })

  useEffect(() => {
    const measure = () => {
      const section = sectionRef.current
      const marker = markerRef.current
      if (!section || !marker) return
      setGeo({
        vh: window.innerHeight,
        markerOffset:
          marker.getBoundingClientRect().top - section.getBoundingClientRect().top,
        sectionH: section.offsetHeight || 1,
      })
    }
    measure()
    // Re-measure after fonts/images settle — early measurements can be off,
    // which silently shifts the lock point.
    const t = window.setTimeout(measure, 600)
    window.addEventListener('load', measure)
    window.addEventListener('resize', measure)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })
  const imageY = useTransform(scrollYProgress, (p) => {
    const lockDist = Math.max(1, geo.markerOffset)
    const scrolled = p * geo.sectionH
    const d = Math.min(scrolled, lockDist) // pin until lock, then freeze
    return d - geo.vh
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !e.currentTarget.checkValidity()) return
    // TODO: wire to your email service provider (ConvertKit / Mailchimp / Beehiiv)
    setJoined(true)
  }

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="section-pad relative isolate border-b border-line bg-bg-0"
      style={{ clipPath: 'inset(0)' }}
    >
      {/* Image frame: pinned to the screen during the reveal, frozen at the lock */}
      <motion.div aria-hidden className="absolute inset-x-0 top-0 -z-20 h-screen" style={{ y: imageY }}>
        <img
          src={EMAIL_BG}
          alt=""
          className="absolute top-0 left-1/2 max-w-none min-[900px]:hidden"
          style={{
            width: MOBILE_ZOOM,
            transform: `translateX(calc(-50% + ${MOBILE_SHIFT_X}))`,
            filter: 'grayscale(45%) brightness(0.6) contrast(1.08)',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-[55%] bg-cover bg-center min-[900px]:block"
          style={{
            backgroundImage: `url(${EMAIL_BG})`,
            filter: 'grayscale(45%) brightness(0.6) contrast(1.08)',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 min-[900px]:hidden bg-gradient-to-b from-bg-0/25 via-bg-0/65 via-[55%] to-bg-0" />
      <div className="absolute inset-0 -z-10 hidden min-[900px]:block bg-gradient-to-r from-bg-0 from-[42%] via-bg-0/55 via-[62%] to-bg-0/15" />

      <div
        aria-hidden
        className="min-[900px]:hidden"
        style={{ height: `calc(${MOBILE_IMAGE_WINDOW} + ${MOBILE_TEXT_DROP})` }}
      />

      <div className="container-site">
        <Reveal as="p" className="eyebrow mb-6">
          The Inner Circle
        </Reveal>
        <Reveal as="h2" delay={1} className="h-display mb-5" >
          <span style={{ fontSize: 'clamp(2.6rem, 8vw, 6.4rem)' }} className="block leading-[0.94]">
            New Designs.
            <br />
            <span className="text-champagne">Exclusive Access.</span>
            <br />
            Early Booking.
          </span>
        </Reveal>
        <Reveal as="p" delay={2} className="lede mb-10 min-[900px]:max-w-[26em]">
          Instagram decides who sees my work. The list doesn't. Members get every design drop 48
          hours early, first access to booking openings, and the stories behind each piece —
          straight to your inbox, nothing else.
        </Reveal>

        {/* LOCK MARKER: the image freezes when this point reaches the bottom
            of the screen. */}
        <div ref={markerRef} aria-hidden />

        <AnimatePresence mode="wait">
          {!joined ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate={false}
              className="flex flex-col sm:flex-row gap-4 max-w-[34rem]"
              exit={{ opacity: 0, y: -12, transition: { duration: 0.35, ease: EASE } }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                aria-label="Email address"
                className="flex-1 bg-transparent border border-line-strong px-5 py-4 text-ink font-body text-[0.9rem] tracking-[0.04em] outline-none placeholder:text-ink-faint placeholder:tracking-[0.08em] focus:border-crimson transition-colors duration-500"
              />
              <button type="submit" className="btn btn-fill">
                Join The List <span className="arr">→</span>
              </button>
            </motion.form>
          ) : (
            <motion.p
              key="success"
              className="text-champagne text-[0.8rem] tracking-[0.12em] uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
            >
              You're in<span className="text-crimson">.</span> Watch your inbox for the next drop.
            </motion.p>
          )}
        </AnimatePresence>

        <Reveal as="p" delay={4} className="mt-5 text-[0.68rem] text-ink-faint tracking-[0.08em]">
          One or two emails a month. No noise. Unsubscribe anytime.
        </Reveal>
      </div>
    </section>
  )
}