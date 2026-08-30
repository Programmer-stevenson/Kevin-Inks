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
    <section
      id="about"
      className="section-pad relative overflow-hidden border-y border-line bg-bg-1"
    >
      {/* Warm golden light fading naturally into the site's dark background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(214, 168, 74, 0.28) 0%, rgba(124, 86, 23, 0.16) 30%, rgba(18, 16, 15, 0) 66%), linear-gradient(180deg, rgba(18, 16, 15, 0.18) 0%, rgba(49, 33, 10, 0.34) 48%, rgba(18, 16, 15, 0.2) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'linear-gradient(90deg, rgba(18, 16, 15, 0.88) 0%, transparent 24%, transparent 76%, rgba(18, 16, 15, 0.88) 100%)',
        }}
      />

      <div className="container-site relative z-10 grid items-center gap-12 min-[900px]:grid-cols-[5fr_6fr] min-[900px]:gap-[5.5rem]">
        <Reveal className="flex flex-col items-center gap-5 min-[900px]:items-start">
          <div
            className="group relative aspect-square overflow-hidden rounded-full bg-bg-0 shadow-[0_0_75px_rgba(214,168,74,0.34)]"
            style={{ width: PORTRAIT_SIZE }}
          >
            <img
              src={site.about.image}
              alt={site.about.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.04]"
            />
          </div>

          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-ink-dim">
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
            <span className="text-champagne">{site.about.accentHeading}</span>
          </h2>

          <blockquote
            className="mb-10 max-w-[30em] border-l border-champagne/50 pl-6 text-ink-dim"
            style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)' }}
          >
            “{site.about.quote}”
          </blockquote>

          <div className="mb-10 grid grid-cols-2 gap-x-8 gap-y-8 min-[900px]:flex min-[900px]:flex-wrap min-[900px]:gap-11">
            {site.about.stats.map((stat, index) => (
              <div
                key={stat.l}
                className={`min-w-28 border-t border-line-strong pt-3.5 text-center min-[900px]:text-left ${
                  index === 2
                    ? 'col-span-2 justify-self-center min-[900px]:col-auto min-[900px]:justify-self-auto'
                    : ''
                }`}
              >
                <div className="font-display text-3xl text-ink">{stat.n}</div>
                <div className="text-[0.62rem] uppercase tracking-[0.24em] text-ink-faint">
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
              <div className="mt-8 max-w-[34em] border-l border-champagne/50 pl-6 text-left text-ink-dim">
                <p className="eyebrow mb-4">{storyTitle}</p>

                <div className="space-y-4">
                  {storyParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="whitespace-pre-line leading-relaxed"
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