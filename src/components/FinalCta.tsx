import { CONTACT } from '../data'
import { Reveal } from './Reveal'

const FOOT_LINKS = [
  { label: 'Instagram', href: CONTACT.instagram, external: true },
  { label: 'TikTok', href: CONTACT.tiktok, external: true },
  { label: 'Email', href: `mailto:${CONTACT.email}`, external: false },
  { label: 'Privacy Policy', href: '#', external: false },
  { label: 'Terms', href: '#', external: false },
]

export function FinalCta() {
  return (
    <>
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

      <footer className="border-t border-line" style={{ padding: '2.6rem var(--pad) 3rem' }}>
        <div className="container-site flex flex-col gap-8">
          <ul className="flex flex-wrap gap-x-10 gap-y-6 list-none">
            {FOOT_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="text-ink-dim no-underline text-[0.7rem] tracking-[0.22em] uppercase transition-colors duration-300 hover:text-champagne"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-between gap-4 text-[0.65rem] text-ink-faint tracking-[0.14em] uppercase">
            <span>
              © 2026 Kevin Inks <span className="text-crimson">●</span> Original artwork only
            </span>
            <span>Private Studio — By Appointment</span>
          </div>
        </div>
      </footer>
    </>
  )
}
