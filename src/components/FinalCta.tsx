import { CONTACT } from '../data'
import { Reveal } from './Reveal'

export function FinalCta() {
  return (
    <section id="book" className="section-pad text-center pb-[clamp(4rem,8vw,7rem)]">
      <div className="container-site">
        <Reveal as="h2" className="h-display mb-10" >
          <span style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }} className="block leading-[0.94]">
            Ready To Start
            <br />
            <span className="text-crimson">Your Next Piece?</span>
          </span>
        </Reveal>
        <Reveal as="p" delay={1} className="text-ink-dim mx-auto mb-10 max-w-[32em]">
          Consultations are free, unhurried, and obligation-free. Bring an idea — even a
          half-formed one — and we'll find the artwork inside it.
        </Reveal>
        <Reveal delay={2}>
          <a href={`mailto:${CONTACT.email}`} className="btn btn-fill">
            Book Consultation <span className="arr">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}