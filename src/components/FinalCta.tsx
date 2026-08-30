import { CONTACT } from '../data'
import { useWordPressContent } from '../wordpress'
import { Reveal } from './Reveal'

export function FinalCta() {
  const { site } = useWordPressContent()
  const textHref = `sms:${CONTACT.phoneE164}?body=${encodeURIComponent(CONTACT.consultationText)}`

  return (
    <section
      id="book"
      className="section-pad relative overflow-hidden border-y border-line bg-bg-0 pb-[clamp(4rem,8vw,7rem)] text-center"
    >
      {/* Warm champagne aura matching the About section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 44%, rgba(214, 168, 74, 0.27) 0%, rgba(124, 86, 23, 0.15) 31%, rgba(18, 16, 15, 0) 67%), linear-gradient(180deg, rgba(18, 16, 15, 0.18) 0%, rgba(49, 33, 10, 0.30) 50%, rgba(18, 16, 15, 0.2) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'linear-gradient(90deg, rgba(18, 16, 15, 0.9) 0%, transparent 24%, transparent 76%, rgba(18, 16, 15, 0.9) 100%)',
        }}
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

        <Reveal delay={3} className="mt-7 flex flex-col items-center gap-2">
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