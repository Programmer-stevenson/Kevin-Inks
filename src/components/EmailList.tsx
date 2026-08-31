import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, EASE } from './Reveal'
import { useWordPressContent } from '../wordpress'

// ===== MOBILE TUNING KNOBS =====
// All mobile structural sizes are in vw so the composition is identical on
// every phone (SE to Pro Max) — values calibrated to a 390px-wide screen.
const MOBILE_ZOOM = '105%'
const MOBILE_SHIFT_X = '7.7vw'
const MOBILE_IMAGE_WINDOW = '67.7vw'

// ===== TABLET TUNING KNOBS (600–899px) =====
const TABLET_ZOOM = '72%'
const TABLET_SHIFT_X = '0px'
const TABLET_IMAGE_WINDOW = 'clamp(18rem, 48vw, 26rem)'

// Uses your existing VITE_WORDPRESS_URL in local/Vercel environments.
// The fallback lets the form work immediately against Kevin's current CMS
// while you're testing locally.
const WORDPRESS_URL = (
  import.meta.env.VITE_WORDPRESS_URL ||
  'https://kevininkscms.wpcomstaging.com'
).replace(/\/$/, '')

const SUBSCRIBE_ENDPOINT = `${WORDPRESS_URL}/wp-json/kevin-inks/v1/subscribe`

type SubscribeResponse = {
  success?: boolean
  message?: string
  status?: string
}

export function EmailList() {
  const { site } = useWordPressContent()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // Honeypot: real users never see this.
  const [joined, setJoined] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (!email.trim() || submitting) return

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          website,
        }),
      })

      let result: SubscribeResponse = {}

      try {
        result = (await response.json()) as SubscribeResponse
      } catch {
        // If WordPress returns a non-JSON error page, the HTTP status below
        // still produces a useful message for the visitor.
      }

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message ||
            `Unable to join the list right now (HTTP ${response.status}). Please try again.`,
        )
      }

      setSuccessMessage(result.message || site.email.success)
      setJoined(true)
      setEmail('')
      setWebsite('')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to join the list right now. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
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

        .email-h2{font-size:10.7vw}
        .email-sec .eyebrow{font-size:2.9vw;letter-spacing:0.32em}
        .email-sec .lede{font-size:4.15vw}

        @media(min-width:600px){
          .email-h2{font-size:clamp(2.6rem, 8vw, 6.4rem)}
          .email-sec .eyebrow{font-size:0.7rem}
          .email-sec .lede{font-size:clamp(1rem, 1.4vw, 1.125rem)}
        }
      `}</style>

      {/* MOBILE/TABLET: sticky image frame. */}
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

      {/* DESKTOP: fixed image behind the clipped section. */}
      <div
        aria-hidden
        className="fixed inset-y-0 right-0 -z-20 hidden w-[55%] bg-cover bg-center min-[900px]:block"
        style={{
          backgroundImage: `url(${site.email.image})`,
          filter: 'grayscale(45%) brightness(0.6) contrast(1.08)',
        }}
      />

      <div className="absolute inset-0 -z-10 min-[900px]:hidden bg-gradient-to-b from-bg-0/25 via-bg-0/65 via-[55%] to-bg-0" />
      <div className="absolute inset-0 -z-10 hidden min-[900px]:block bg-gradient-to-r from-bg-0 from-[42%] via-bg-0/55 via-[62%] to-bg-0/15" />

      <div
        aria-hidden
        className="min-[900px]:hidden"
        style={{ height: 'var(--em-window)' }}
      />

      <div className="container-site">
        <Reveal as="p" className="eyebrow mb-6">
          {site.email.eyebrow}
        </Reveal>

        <Reveal as="h2" delay={1} className="h-display mb-5">
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
              className="relative flex max-w-[34rem] flex-col gap-4 sm:flex-row"
              exit={{
                opacity: 0,
                y: -12,
                transition: { duration: 0.35, ease: EASE },
              }}
            >
              {/*
                Honeypot anti-spam field. It is intentionally off-screen rather
                than display:none because basic form bots often skip hidden inputs.
              */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="email-list-website">Website</label>
                <input
                  id="email-list-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={site.email.placeholder}
                aria-label="Email address"
                autoComplete="email"
                disabled={submitting}
                className="flex-1 border border-line-strong bg-transparent px-5 py-4 font-body text-[0.9rem] tracking-[0.04em] text-ink outline-none transition-colors duration-500 placeholder:tracking-[0.08em] placeholder:text-ink-faint focus:border-crimson disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-fill disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  'Joining...'
                ) : (
                  <>
                    {site.email.button} <span className="arr">→</span>
                  </>
                )}
              </button>

              {error && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[0.72rem] tracking-[0.06em] text-crimson sm:absolute sm:left-0 sm:top-full sm:mt-3"
                >
                  {error}
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.p
              key="success"
              className="text-[0.8rem] uppercase tracking-[0.12em] text-champagne"
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              }}
            >
              {successMessage || site.email.success}
            </motion.p>
          )}
        </AnimatePresence>

        <Reveal
          as="p"
          delay={4}
          className="mt-5 text-[0.68rem] tracking-[0.08em] text-ink-faint"
        >
          {site.email.note}
        </Reveal>
      </div>
    </section>
  )
}