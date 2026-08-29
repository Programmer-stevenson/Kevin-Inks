import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal'
import { useWordPressContent } from '../wordpress'

// Background image for this section.
// File must live at: <project root>/public/sexy.jpg
// ===== MOBILE TUNING KNOBS =====
// All mobile structural sizes are in vw so the composition is IDENTICAL on
// every phone (SE to Pro Max) — values calibrated to a 390px-wide screen.
const MOBILE_ZOOM = '105%'
const MOBILE_SHIFT_X = '7.7vw'        // horizontal nudge (was 30px @390)
const MOBILE_IMAGE_WINDOW = '67.7vw'  // clear image space above the text

// ===== TABLET TUNING KNOBS (600–899px) =====
const TABLET_ZOOM = '72%'
const TABLET_SHIFT_X = '0px'
const TABLET_IMAGE_WINDOW = 'clamp(18rem, 48vw, 26rem)'

export function EmailList() {
  const { site } = useWordPressContent()
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !e.currentTarget.checkValidity()) return
    // TODO: wire to your email service provider (ConvertKit / Mailchimp / Beehiiv)
    setJoined(true)
  }

  return (
    /*
      STICKY IMAGE: the photo rides up with the page while the section
      enters, then PINS to the screen the moment the section top reaches the
      viewport top — and stays pinned while the text scrolls over it,
      releasing only when the section ends. Pure CSS position:sticky inside
      a full-height track. NOTE: ancestors use overflow-x:CLIP (not hidden) —
      hidden would break sticky; clip does not.
    */
    <section
      id="stories"
      className="email-sec section-pad relative isolate border-b border-line bg-bg-0"
      style={{ clipPath: 'inset(0)', overflowX: 'clip' }}
    >
      <style>{`
        .email-sec{
          --em-zoom:${MOBILE_ZOOM};
          --em-shift:${MOBILE_SHIFT_X};
          --em-window:${MOBILE_IMAGE_WINDOW};
        }
        @media(min-width:600px) and (max-width:899px){
          .email-sec{
            --em-zoom:${TABLET_ZOOM};
            --em-shift:${TABLET_SHIFT_X};
            --em-window:${TABLET_IMAGE_WINDOW};
          }
        }
        /* mobile type scales with the viewport (390px baseline) so the
           text-on-image structure is identical on every phone */
        .email-h2{font-size:10.7vw}
        .email-sec .eyebrow{font-size:2.9vw;letter-spacing:0.32em}
        .email-sec .lede{font-size:4.15vw}
        @media(min-width:600px){
          .email-h2{font-size:clamp(2.6rem, 8vw, 6.4rem)}
          .email-sec .eyebrow{font-size:0.7rem}
          .email-sec .lede{font-size:clamp(1rem, 1.4vw, 1.125rem)}
        }
      `}</style>

      {/* MOBILE/TABLET: background track + sticky frame (image rides in,
          pins to the screen, text scrolls over it) */}
      <div aria-hidden className="absolute inset-0 -z-20 min-[900px]:hidden">
        <div className="sticky top-0 h-screen">
          <img
            src={site.email.image}
            alt=""
            className="absolute top-0 left-1/2 max-w-none"
            style={{
              width: 'var(--em-zoom)',
              transform: 'translateX(calc(-50% + var(--em-shift)))',
              filter: 'grayscale(45%) brightness(0.6) contrast(1.08)',
            }}
          />
        </div>
      </div>

      {/* DESKTOP: the original scroll effect — the image is FIXED to the
          screen and the section's clip-path acts as a window passing over it
          (curtain reveal on entry, text scrolling over the pinned photo).
          The section's clip-path:inset(0) confines it to this section. */}
      <div
        aria-hidden
        className="fixed inset-y-0 right-0 -z-20 hidden w-[55%] bg-cover bg-center min-[900px]:block"
        style={{
          backgroundImage: `url(${site.email.image})`,
          filter: 'grayscale(45%) brightness(0.6) contrast(1.08)',
        }}
      />

      {/* Mobile/tablet scrim: clear in the image window, darkening toward the text */}
      <div className="absolute inset-0 -z-10 min-[900px]:hidden bg-gradient-to-b from-bg-0/25 via-bg-0/65 via-[55%] to-bg-0" />
      {/* Desktop blend */}
      <div className="absolute inset-0 -z-10 hidden min-[900px]:block bg-gradient-to-r from-bg-0 from-[42%] via-bg-0/55 via-[62%] to-bg-0/15" />

      {/* Spacer: the clear image window above the text */}
      <div aria-hidden className="min-[900px]:hidden" style={{ height: 'var(--em-window)' }} />

      <div className="container-site">
        <Reveal as="p" className="eyebrow mb-6">
          {site.email.eyebrow}
        </Reveal>
        <Reveal as="h2" delay={1} className="h-display mb-5" >
          <span className="email-h2 block leading-[0.94]">
            {site.email.line1}
            <br />
            <span className="text-champagne">{site.email.line2}</span>
            <br />
            {site.email.line3}
          </span>
        </Reveal>
        <Reveal as="p" delay={2} className="lede mb-10 min-[900px]:max-w-[26em]">
          {site.email.copy}
        </Reveal>

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
                placeholder={site.email.placeholder}
                aria-label="Email address"
                className="flex-1 bg-transparent border border-line-strong px-5 py-4 text-ink font-body text-[0.9rem] tracking-[0.04em] outline-none placeholder:text-ink-faint placeholder:tracking-[0.08em] focus:border-crimson transition-colors duration-500"
              />
              <button type="submit" className="btn btn-fill">
                {site.email.button} <span className="arr">→</span>
              </button>
            </motion.form>
          ) : (
            <motion.p
              key="success"
              className="text-champagne text-[0.8rem] tracking-[0.12em] uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
            >
              {site.email.success}
            </motion.p>
          )}
        </AnimatePresence>

        <Reveal as="p" delay={4} className="mt-5 text-[0.68rem] text-ink-faint tracking-[0.08em]">
          {site.email.note}
        </Reveal>
      </div>
    </section>
  )
}
