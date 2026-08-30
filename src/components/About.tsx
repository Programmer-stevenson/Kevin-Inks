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
      <style>{`
        .about-dark-field {
          background:
            radial-gradient(ellipse at 31% 42%, rgba(184,190,188,.12) 0%, rgba(81,83,80,.085) 25%, rgba(22,22,21,0) 62%),
            radial-gradient(ellipse at 76% 58%, rgba(105,108,105,.075) 0%, rgba(48,49,47,.055) 32%, transparent 64%),
            linear-gradient(180deg, #0a0a09 0%, #11110f 48%, #090909 100%);
        }

        .about-dark-smoke {
          position: absolute;
          inset: -22%;
          pointer-events: none;
          opacity: .52;
          filter: blur(36px);
          background:
            radial-gradient(ellipse at 22% 52%, rgba(132,136,133,.11), transparent 34%),
            radial-gradient(ellipse at 66% 38%, rgba(75,77,74,.13), transparent 31%),
            radial-gradient(ellipse at 52% 78%, rgba(42,43,41,.18), transparent 38%);
          animation: about-smoke-drift 14s ease-in-out infinite alternate;
        }

        .about-dark-vignette {
          background:
            linear-gradient(90deg, rgba(7,7,7,.88) 0%, transparent 22%, transparent 78%, rgba(7,7,7,.88) 100%),
            linear-gradient(180deg, rgba(7,7,7,.62) 0%, transparent 18%, transparent 80%, rgba(7,7,7,.72) 100%);
        }

        .about-portrait {
          border: 1px solid rgba(218,214,205,.13);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.018),
            0 0 42px rgba(188,195,193,.075),
            0 0 95px rgba(65,67,65,.13),
            0 26px 75px rgba(0,0,0,.68);
        }

        .about-portrait::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          border-radius: 999px;
          box-shadow:
            inset 0 0 0 1px rgba(236,230,218,.055),
            inset 0 -24px 52px rgba(0,0,0,.22),
            inset 0 18px 42px rgba(196,202,200,.035);
        }

        @keyframes about-smoke-drift {
          from { transform: translate3d(-2%, 1%, 0) scale(.98); }
          to { transform: translate3d(3%, -2%, 0) scale(1.04); }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-dark-smoke { animation: none; }
        }
      `}</style>

      {/* Graphite smoke and cold-silver light replace the previous gold glow. */}
      <div
        aria-hidden="true"
        className="about-dark-field pointer-events-none absolute inset-0"
      />
      <div aria-hidden="true" className="about-dark-smoke" />
      <div
        aria-hidden="true"
        className="about-dark-vignette pointer-events-none absolute inset-0"
      />

      <div className="container-site relative z-10 grid items-center gap-12 min-[900px]:grid-cols-[5fr_6fr] min-[900px]:gap-[5.5rem]">
        <Reveal className="flex flex-col items-center gap-5 min-[900px]:items-start">
          <div
            className="about-portrait group relative aspect-square overflow-hidden rounded-full bg-bg-0"
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
