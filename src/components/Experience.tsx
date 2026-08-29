import { Reveal } from './Reveal'
import { useWordPressContent } from '../wordpress'

export function Experience() {
  const { site } = useWordPressContent()
  return (
    <section id="experience" className="section-pad bg-bg-0">
      <div className="container-site">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-line mb-[clamp(2.5rem,5vw,4.5rem)]">
          <div>
            <p className="eyebrow mb-3.5">{site.experience.eyebrow}</p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}>
              {site.experience.headingLine1}
              <br />
              {site.experience.headingLine2}
            </h2>
          </div>
          <a className="link-line" href="#book">
            {site.experience.cta} <span className="arr">→</span>
          </a>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 border-t border-line min-[900px]:grid-cols-4 min-[900px]:gap-x-0 min-[900px]:border-b">
          {site.experience.steps.map((s, i) => (
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
