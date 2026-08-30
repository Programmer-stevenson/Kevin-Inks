import { CONTACT } from '../data'
import { useWordPressContent } from '../wordpress'
import { Reveal } from './Reveal'

export function FinalCta() {
  const { site } = useWordPressContent()
  const textHref = `sms:${CONTACT.phoneE164}?body=${encodeURIComponent(CONTACT.consultationText)}`

  return (
    <section id="book" className="section-pad text-center pb-[clamp(4rem,8vw,7rem)]">
      <div className="container-site">
        <Reveal as="h2" className="h-display mb-10" >
          <span style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }} className="block leading-[0.94]">
            {site.finalCta.line1}
            <br />
            <span className="text-crimson">{site.finalCta.line2}</span>
          </span>
        </Reveal>
        <Reveal as="p" delay={1} className="text-ink-dim mx-auto mb-10 max-w-[32em]">
          {site.finalCta.copy}
        </Reveal>
        <Reveal delay={2} className="mx-auto flex max-w-[34rem] flex-row justify-center gap-2 sm:gap-3">
          <a
            href={textHref}
            className="btn btn-fill flex-1 whitespace-nowrap"
            aria-label={`Text Kevin at ${CONTACT.phone}`}
          >
            Text to Book <span className="arr">→</span>
          </a>
          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="btn flex-1 whitespace-nowrap border border-line-strong hover:border-crimson"
            aria-label={`Call Kevin at ${CONTACT.phone}`}
          >
            Call Kevin <span className="arr">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
