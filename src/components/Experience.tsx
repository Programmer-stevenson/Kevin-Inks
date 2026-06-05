import { Reveal } from './Reveal'

// Steps live here now (self-contained — no numbers, no data.ts dependency).
// Edit freely.
const STEPS = [
  {
    label: 'Where It Starts',
    title: 'The Spark',
    copy: "No forms, no flash books. Just you, me, and the reason you walked in. Tell me the story — I'll find the image hiding inside it.",
  },
  {
    label: 'The Artwork',
    title: 'Drawn From Nothing',
    copy: "Your piece doesn't exist yet. That's the point. I design it from a blank page — one composition, built for your body, refined until neither of us can imagine it any other way.",
  },
  {
    label: 'The Day',
    title: 'The Session',
    copy: 'A private studio. No crowd, no clock. Music you choose, a pace your body sets. The kind of day you end up telling people about along with the tattoo.',
  },
  {
    label: 'Decades Later',
    title: 'Made To Outlast',
    copy: 'Linework engineered to hold its shape. Healing guidance that comes with follow-up, not a pamphlet. This piece should look deliberate at year one and year thirty.',
  },
]

export function Experience() {
  return (
    <section id="experience" className="section-pad bg-bg-0">
      <div className="container-site">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-line mb-[clamp(2.5rem,5vw,4.5rem)]">
          <div>
            <p className="eyebrow mb-3.5">The Experience</p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}>
              From First Idea
              <br />
              To Lasting Artwork
            </h2>
          </div>
          <a className="link-line" href="#book">
            Start Yours <span className="arr">→</span>
          </a>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 border-t border-line min-[900px]:grid-cols-4 min-[900px]:gap-x-0 min-[900px]:border-b">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i}
              className="group relative py-8 border-b border-line min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:py-12 min-[900px]:pr-8 min-[900px]:mr-8 min-[900px]:last:border-r-0 min-[900px]:last:mr-0 transition-all duration-500 ease-lux hover:pl-2 min-[900px]:hover:pl-0 min-[900px]:hover:pt-9"
            >
              {/* red progress line on hover */}
              <span className="absolute left-0 bottom-[-1px] min-[900px]:bottom-auto min-[900px]:top-[-1px] h-px w-0 bg-crimson transition-all duration-700 ease-lux group-hover:w-full" />
              {/* micro-label replaces the old step number */}
              <span className="flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-crimson">
                <span className="h-px w-5 bg-crimson/70" />
                {s.label}
              </span>
              <h3 className="h-display mt-5 mb-2.5" style={{ fontSize: 'clamp(1.3rem, 4.6vw, 2.2rem)' }}>
                {s.title}
              </h3>
              <p className="text-ink-dim text-[0.85rem] min-[900px]:text-[0.95rem] max-w-[32em]">{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}