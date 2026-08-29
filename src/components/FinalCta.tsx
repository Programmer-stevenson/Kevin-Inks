import { useWordPressContent } from '../wordpress'
import { Reveal } from './Reveal'

export function FinalCta() {
  const { site } = useWordPressContent()
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
        <Reveal delay={2}>
          <a href={`mailto:${site.contact.email}`} className="btn btn-fill">
            {site.finalCta.button} <span className="arr">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
