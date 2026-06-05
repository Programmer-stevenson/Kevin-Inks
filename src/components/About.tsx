import { IMAGES } from '../data'
import { Reveal } from './Reveal'

// Diameter of Kevin's circular portrait (caps at 400px on desktop,
// scales down gracefully on small screens):
const PORTRAIT_SIZE = 'min(68vw, 400px)'

const STATS = [
  { n: '10+', l: 'Years Tattooing' },
  { n: '100%', l: 'Original Designs' },
  { n: '1:1', l: 'Private Sessions' },
]

export function About() {
  return (
    <section id="about" className="section-pad bg-bg-1 border-y border-line">
      <div className="container-site grid gap-12 items-center min-[900px]:grid-cols-[5fr_6fr] min-[900px]:gap-[5.5rem]">
        <Reveal className="flex flex-col items-center min-[900px]:items-start gap-5">
          {/* circular portrait — replace IMAGES.portrait with Kevin's photo */}
          <div
            className="group relative aspect-square overflow-hidden rounded-full border border-line-strong"
            style={{ width: PORTRAIT_SIZE }}
          >
            {/* portrait shown in full original color — no tint/grayscale */}
            <img
              src={IMAGES.portrait}
              alt="Portrait of Kevin in his studio"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.04]"
            />
            {/* subtle ring accent */}
            <span className="pointer-events-none absolute inset-0 rounded-full border border-champagne/0 transition-colors duration-700 group-hover:border-champagne/30" />
          </div>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-ink-dim">
            Est. Studio Practice
          </span>
        </Reveal>

        <Reveal delay={1}>
          <p className="eyebrow mb-5">About Kevin</p>
          <h2 className="h-display mb-7" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Art Is <span className="text-champagne">Personal.</span>
          </h2>
          <blockquote
            className="text-ink-dim border-l border-crimson pl-6 mb-10 max-w-[30em]"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)' }}
          >
            "I'm Kevin, a tattoo artist who believes every tattoo should carry meaning, and every
            client deserves the best experience."
          </blockquote>
          {/* Mobile: 2-up grid with the third stat centered beneath the pair.
              Desktop: original 3-across row. */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-10 min-[900px]:flex min-[900px]:flex-wrap min-[900px]:gap-11">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className={`border-t border-line-strong pt-3.5 min-w-28 text-center min-[900px]:text-left ${
                  i === 2 ? 'col-span-2 justify-self-center min-[900px]:col-auto min-[900px]:justify-self-auto' : ''
                }`}
              >
                <div className="font-display text-3xl text-ink">{s.n}</div>
                <div className="text-[0.62rem] tracking-[0.24em] uppercase text-ink-faint">{s.l}</div>
              </div>
            ))}
          </div>
          {/* Button: centered on mobile, left-aligned on desktop */}
          <div className="flex justify-center min-[900px]:justify-start">
            <a href="#stories" className="btn btn-ghost">
              Read My Story <span className="arr">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}