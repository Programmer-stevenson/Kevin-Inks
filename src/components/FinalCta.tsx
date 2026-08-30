import { CONTACT } from '../data'
import { useWordPressContent } from '../wordpress'
import { Reveal } from './Reveal'

const ctaStyles = `
.cta-dark-field {
  background:
    radial-gradient(ellipse at 31% 42%, rgba(184,190,188,.12) 0%, rgba(81,83,80,.085) 25%, rgba(22,22,21,0) 62%),
    radial-gradient(ellipse at 76% 58%, rgba(105,108,105,.075) 0%, rgba(48,49,47,.055) 32%, transparent 64%),
    linear-gradient(180deg, #0a0a09 0%, #11110f 48%, #090909 100%);
}

.cta-dark-smoke {
  position: absolute;
  inset: -22%;
  pointer-events: none;
  opacity: .52;
  filter: blur(36px);
  background:
    radial-gradient(ellipse at 22% 52%, rgba(132,136,133,.11), transparent 34%),
    radial-gradient(ellipse at 66% 38%, rgba(75,77,74,.13), transparent 31%),
    radial-gradient(ellipse at 52% 78%, rgba(42,43,41,.18), transparent 38%);
  animation: cta-smoke-drift 14s ease-in-out infinite alternate;
}

.cta-dark-vignette {
  background:
    linear-gradient(90deg, rgba(7,7,7,.88) 0%, transparent 22%, transparent 78%, rgba(7,7,7,.88) 100%),
    linear-gradient(180deg, rgba(7,7,7,.62) 0%, transparent 18%, transparent 80%, rgba(7,7,7,.72) 100%);
}

@keyframes cta-smoke-drift {
  from {
    transform: translate3d(-2%, 1%, 0) scale(.98);
  }

  to {
    transform: translate3d(3%, -2%, 0) scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cta-dark-smoke {
    animation: none;
  }
}
`

export function FinalCta() {
  const { site } = useWordPressContent()

  const textHref = `sms:${CONTACT.phoneE164}?body=${encodeURIComponent(
    CONTACT.consultationText
  )}`

  return (
    <section
      id="book"
      className="section-pad relative overflow-hidden border-y border-line bg-bg-0 pb-[clamp(4rem,8vw,7rem)] text-center"
    >
      <style>{ctaStyles}</style>

      <div
        aria-hidden="true"
        className="cta-dark-field pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="cta-dark-smoke"
      />

      <div
        aria-hidden="true"
        className="cta-dark-vignette pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[14%] top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
      />

      <div className="container-site relative z-10">
        <Reveal as="h2" className="h-display mb-10">
          <span
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            className="block leading-[0.94]"
          >
            {site.finalCta.line1}
            <br />

            <span className="text-champagne drop-shadow-[0_0_28px_rgba(214,168,74,0.22)]">
              {site.finalCta.line2}
            </span>
          </span>
        </Reveal>

        <Reveal
          as="p"
          delay={1}
          className="mx-auto mb-10 max-w-[32em] text-ink-dim"
        >
          {site.finalCta.copy}
        </Reveal>

        <Reveal
          delay={2}
          className="mx-auto flex max-w-[34rem] flex-row justify-center gap-2 sm:gap-3"
        >
          <a
            href={textHref}
            className="btn btn-fill flex-1 whitespace-nowrap"
            aria-label={`Text Kevin at ${CONTACT.phone}`}
          >
            Text to Book <span className="arr">→</span>
          </a>

          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="btn flex-1 whitespace-nowrap border border-line-strong hover:border-champagne"
            aria-label={`Call Kevin at ${CONTACT.phone}`}
          >
            Call Kevin <span className="arr">→</span>
          </a>
        </Reveal>

        <Reveal
          delay={3}
          className="mt-7 flex flex-col items-center gap-2"
        >
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-ink-faint">
            Call or text Kevin directly
          </span>

          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="font-display text-[clamp(1.45rem,4vw,2rem)] tracking-[0.08em] text-ink no-underline transition-colors duration-300 hover:text-champagne focus-visible:text-champagne"
            aria-label={`Call Kevin at ${CONTACT.phone}`}
          >
            {CONTACT.phone}
          </a>
        </Reveal>
      </div>
    </section>
  )
}