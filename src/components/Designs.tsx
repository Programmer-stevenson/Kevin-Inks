import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Design, DesignStatus } from '../data'
import { useWordPressContent } from '../wordpress'
import { Reveal, EASE } from './Reveal'

// Seconds for one full loop of the ribbon. Higher = slower drift.
const RIBBON_SPEED_S = 40

const statusStyles: Record<DesignStatus, string> = {
  available: 'text-champagne border-champagne/40',
  'one-of-one': 'text-[#d98a83] border-oxblood bg-crimson-soft',
  reserved: 'text-ink-faint border-line',
}

export function Designs() {
  const { designs, site } = useWordPressContent()
  const [open, setOpen] = useState<Design | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) =>
      event.key === 'Escape' && setOpen(null)

    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Two copies are needed for the seamless looping ribbon.
  const ribbonItems = [...designs, ...designs]

  return (
    <section
      id="designs"
      className="section-pad relative overflow-hidden border-y border-line bg-bg-1"
    >
      <style>{`
        /*
         * The old version animated stroke-dashoffset and two drop shadows on
         * every path. That forced the entire SVG to repaint on every frame.
         * These lines remain visible, while one inexpensive opacity animation
         * now runs on the already-composited SVG layer.
         */
        .design-linework {
          opacity: .34;
          will-change: opacity;
          animation: design-line-breathe 10s ease-in-out infinite;
        }

        .design-line {
          fill: none;
          stroke: currentColor;
          stroke-width: 1.1;
          vector-effect: non-scaling-stroke;
        }

        @keyframes design-line-breathe {
          0%, 100% { opacity: .24; }
          50% { opacity: .4; }
        }

        .ribbon-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          backface-visibility: hidden;
          animation: ribbon-drift ${RIBBON_SPEED_S}s linear infinite;
        }

        .ribbon:hover .ribbon-track {
          animation-play-state: paused;
        }

        @keyframes ribbon-drift {
          to { transform: translate3d(-50%, 0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .design-linework {
            animation: none;
            opacity: .3;
          }

          .ribbon-track {
            animation-play-state: paused;
            will-change: auto;
          }
        }
      `}</style>

      <svg
        aria-hidden="true"
        className="design-linework pointer-events-none absolute inset-0 z-0 h-full w-full text-crimson"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path className="design-line" d="M-40 700 C 180 540, 320 820, 540 650 S 900 380, 1120 610 S 1380 760, 1500 570" />
        <path className="design-line" d="M-40 220 C 200 390, 420 100, 660 280 S 1020 480, 1240 240 S 1420 130, 1500 300" />
        <path className="design-line" d="M-40 470 C 260 300, 480 590, 760 440 S 1140 210, 1500 430" />
        <path className="design-line" d="M-40 90 C 240 220, 520 20, 780 150 S 1180 320, 1500 120" />
        <path className="design-line" d="M-40 850 C 300 750, 560 930, 860 800 S 1260 620, 1500 790" />
        <path className="design-line" d="M-40 350 C 160 170, 400 430, 640 330 S 980 140, 1260 360 S 1440 470, 1500 390" />
      </svg>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-10 z-[1] select-none font-display leading-none text-transparent"
        style={{
          right: 'var(--pad)',
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          WebkitTextStroke: '1px rgba(245,241,234,0.06)',
        }}
      >
        VAULT
      </span>

      <div className="relative z-10">
        <div className="container-site mb-[clamp(2.5rem,5vw,4rem)]">
          <Reveal className="max-w-[44em]">
            <p className="eyebrow mb-5">{site.designs.eyebrow}</p>
            <h2
              className="h-display mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.2rem)' }}
            >
              {site.designs.heading}{' '}
              <em className="not-italic text-crimson">
                {site.designs.accentHeading}
              </em>
            </h2>
            <p className="lede mb-9">{site.designs.intro}</p>
            <a href="#book" className="btn btn-red">
              {site.designs.button} <span className="arr">→</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div
            className="ribbon overflow-hidden"
            style={{ margin: '0 calc(var(--pad) * -1)' }}
          >
            <div
              className="ribbon-track py-2"
              style={{ animationPlayState: open ? 'paused' : undefined }}
            >
              {ribbonItems.map((design, index) => (
                <button
                  key={`${design.title}-${index}`}
                  type="button"
                  onClick={() => setOpen(design)}
                  aria-label={`Enlarge design: ${design.title}`}
                  className="group relative w-[min(48vw,320px)] shrink-0 cursor-zoom-in overflow-hidden border border-line bg-bg-0 text-left transition-colors duration-500 hover:border-oxblood"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#1c1a18]">
                    <img
                      src={design.img}
                      alt={design.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3.5">
                    <span className="font-display text-[1rem] uppercase tracking-[0.04em]">
                      {design.title}
                    </span>
                    <span
                      className={`whitespace-nowrap border px-2 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] ${statusStyles[design.status]}`}
                    >
                      {design.statusLabel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="container-site mt-8">
          <Reveal delay={2}>
            <p className="max-w-[34em] text-[0.78rem] tracking-[0.06em] text-ink-faint">
              <strong className="font-medium text-champagne">
                {site.designs.memberNote}
              </strong>
            </p>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-bg-0/95 backdrop-blur-sm"
            style={{ padding: 'var(--pad)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              className="relative w-full max-w-3xl"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={open.img}
                alt={open.alt}
                decoding="async"
                className="max-h-[72vh] w-full border border-line bg-bg-0 object-contain"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-4 pt-5">
                <div>
                  <h3 className="h-display text-2xl">{open.title}</h3>
                  <p className="mt-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
                    {open.placement} · {open.size}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`whitespace-nowrap border px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${statusStyles[open.status]}`}
                  >
                    {open.statusLabel}
                  </span>
                  <a
                    href="#book"
                    onClick={() => setOpen(null)}
                    className="link-line"
                  >
                    Claim This Design <span className="arr">→</span>
                  </a>
                </div>
              </figcaption>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close enlarged design"
                className="absolute -right-4 -top-4 grid h-11 w-11 cursor-pointer place-items-center border-0 bg-champagne text-xl leading-none text-[#121212] transition-colors duration-300 hover:bg-ink"
              >
                ×
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}