import { useState } from 'react'
import { useWordPressContent } from '../wordpress'
import { Reveal } from './Reveal'

const PORTRAIT_SIZE = 'min(68vw, 400px)'

export function About() {
  const { site } = useWordPressContent()
  const [isStoryOpen, setIsStoryOpen] = useState(false)

  const about = site.about as typeof site.about & {
    storyTitle?: string
    storyBody?: string
  }

  const storyTitle = about.storyTitle?.trim() || "Kevin's Story"
  const storyBody =
    about.storyBody?.trim() ||
    "Kevin's full story will go here. Add his background and creative journey in WordPress."

  const storyParagraphs = storyBody.split(/\n\s*\n/).filter(Boolean)

  return (
    <section id="about" className="section-pad bg-bg-1 border-y border-line">
      <div className="container-site grid gap-12 items-center min-[900px]:grid-cols-[5fr_6fr] min-[900px]:gap-[5.5rem]">
        <Reveal className="flex flex-col items-center min-[900px]:items-start gap-5">
          <div
            className="group relative aspect-square overflow-hidden rounded-full border border-line-strong"
            style={{ width: PORTRAIT_SIZE }}
          >
            <img
              src={site.about.image}
              alt={site.about.imageAlt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.04]"
            />

            <span className="pointer-events-none absolute inset-0 rounded-full border border-champagne/0 transition-colors duration-700 group-hover:border-champagne/30" />
          </div>

          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-ink-dim">
            {site.about.imageCaption}
          </span>
        </Reveal>

        <Reveal delay={1}>
          <p className="eyebrow mb-5">{site.about.eyebrow}</p>

          <h2
            className="h-display mb-7"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            {site.about.heading}{' '}
            <span className="text-champagne">
              {site.about.accentHeading}
            </span>
          </h2>

          <blockquote
            className="text-ink-dim border-l border-crimson pl-6 mb-10 max-w-[30em]"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)' }}
          >
            “{site.about.quote}”
          </blockquote>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-10 min-[900px]:flex min-[900px]:flex-wrap min-[900px]:gap-11">
            {site.about.stats.map((stat, index) => (
              <div
                key={stat.l}
                className={`border-t border-line-strong pt-3.5 min-w-28 text-center min-[900px]:text-left ${
                  index === 2
                    ? 'col-span-2 justify-self-center min-[900px]:col-auto min-[900px]:justify-self-auto'
                    : ''
                }`}
              >
                <div className="font-display text-3xl text-ink">
                  {stat.n}
                </div>

                <div className="text-[0.62rem] tracking-[0.24em] uppercase text-ink-faint">
                  {stat.l}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center min-[900px]:justify-start">
            <button
              type="button"
              className="btn btn-ghost"
              aria-expanded={isStoryOpen}
              aria-controls="kevin-story"
              onClick={() => setIsStoryOpen((open) => !open)}
            >
              {isStoryOpen ? 'Close Story' : site.about.cta}

              <span
                className={`arr transition-transform duration-500 ${
                  isStoryOpen ? 'rotate-90' : ''
                }`}
                aria-hidden="true"
              >
                →
              </span>
            </button>
          </div>

          <div
            id="kevin-story"
            className={`grid transition-[grid-template-rows,opacity] duration-700 ease-lux ${
              isStoryOpen
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
            aria-hidden={!isStoryOpen}
          >
            <div className="overflow-hidden">
              <div className="mt-8 max-w-[34em] border-l border-crimson pl-6 text-left text-ink-dim">
                <p className="eyebrow mb-4">{storyTitle}</p>

                <div className="space-y-4">
                  {storyParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="leading-relaxed whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}