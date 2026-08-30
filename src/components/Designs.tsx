import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Design, DesignStatus } from '../data'
import { useWordPressContent } from '../wordpress'
import { Reveal, EASE } from './Reveal'

// Seconds for one full loop of the ribbon. Higher = slower drift.
const RIBBON_SPEED_S = 40
const VAULT_HERO_IMAGE = '/arc.png'

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
      className="relative overflow-hidden border-y border-line bg-bg-1"
    >
      <style>{`
        /* Arc is scaled by height on every phone. This keeps his full body and
           sword inside the frame while the dark left side absorbs the crop. */
        .vault-hero {
          min-height: min(145vw, 88svh);
          display: flex;
          align-items: flex-start;
          padding-top: clamp(3rem, 12vw, 5rem);
          padding-bottom: clamp(2.5rem, 9vw, 4rem);
        }

        .vault-hero-art {
          background-repeat: no-repeat;
          background-size: auto 100%;
          background-position: right bottom;
          filter: grayscale(1) brightness(.78) contrast(1.08);
          transform-origin: right center;
        }

        .vault-hero-shade {
          background:
            linear-gradient(90deg, #090909 0%, rgba(9,9,9,.96) 24%, rgba(9,9,9,.68) 52%, rgba(9,9,9,.06) 84%),
            linear-gradient(to top, #090909 0%, rgba(9,9,9,.5) 14%, transparent 42%),
            linear-gradient(to bottom, rgba(9,9,9,.58) 0%, transparent 26%);
        }

        .vault-copy {
          max-width: 62%;
        }

        .vault-heading {
          font-size: clamp(2.05rem, 9.6vw, 3.25rem);
          line-height: .92;
        }

        @media (max-width: 599px) {
          .vault-hero {
            min-height: min(170vw, 92svh);
            display: block;
            padding-top: 0;
            padding-bottom: 0;
          }

          .vault-content {
            position: absolute;
            inset: 0;
            height: 100%;
            padding-top: clamp(2.75rem, 11vw, 4rem);
            padding-bottom: 25px;
          }

          /* The centered copy gets its own clean upper zone; the CTA is
             independently pinned 25px above the hero's bottom edge. */
          .vault-copy {
            max-width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .vault-heading {
            max-width: 12ch;
            margin-left: auto;
            margin-right: auto;
            font-size: clamp(2.15rem, 10vw, 3.25rem);
          }

          .vault-copy .lede {
            max-width: 30em;
            margin-left: auto;
            margin-right: auto;
          }

          .vault-cta { margin-top: auto; }

          .vault-hero-art {
            inset: auto 0 0 0;
            height: 68%;
            background-size: auto 100%;
            background-position: right bottom;
          }

          .vault-hero-shade {
            background:
              linear-gradient(to bottom, #090909 0%, #090909 27%, rgba(9,9,9,.91) 40%, rgba(9,9,9,.35) 61%, transparent 78%),
              linear-gradient(to top, #090909 0%, rgba(9,9,9,.38) 13%, transparent 35%);
          }
        }

        @media (min-width: 600px) and (max-width: 1199px) {
          .vault-hero {
            min-height: min(90vw, 78svh);
            align-items: center;
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .vault-content {
            padding-left: calc(var(--pad) + clamp(1.25rem, 3vw, 2.25rem));
            padding-right: var(--pad);
          }

          .vault-copy { max-width: 50%; }
          .vault-heading { font-size: clamp(3rem, 7.2vw, 4.5rem); }
        }

        @media (min-width: 1200px) {
          .vault-hero {
            min-height: min(70vw, 88svh);
            align-items: center;
            padding-top: clamp(5rem, 8vw, 8rem);
            padding-bottom: clamp(5rem, 8vw, 8rem);
          }

          .vault-copy { max-width: min(47%, 44rem); }
          .vault-heading { font-size: clamp(3.6rem, 6.5vw, 6.6rem); }
          .vault-hero-art { background-size: auto 100%; }
        }

        /* Preserve the tablet composition on large iPad Pro landscape widths
           without forcing ordinary desktop/laptop screens into tablet mode. */
        @media (min-width: 1200px) and (max-width: 1366px) and (any-pointer: coarse) {
          .vault-hero {
            min-height: min(90vw, 78svh);
            align-items: center;
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .vault-content {
            padding-left: calc(var(--pad) + clamp(1.25rem, 3vw, 2.25rem));
            padding-right: var(--pad);
          }

          .vault-copy { max-width: 50%; }
          .vault-heading { font-size: clamp(3rem, 7.2vw, 4.5rem); }
        }

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

      {/* ===== VAULT HERO ===== */}
      <div className="vault-hero relative z-[1] overflow-hidden">
        <motion.div
          role="img"
          aria-label="Arc, an armored archangel holding a sword above a shadowed battlefield"
          className="vault-hero-art absolute inset-0 -z-20"
          style={{ backgroundImage: `url(${VAULT_HERO_IMAGE})` }}
          initial={{ opacity: 0.35, scale: 1.025 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <div className="vault-hero-shade absolute inset-0 -z-10" />

        <div className="vault-content container-site relative z-10 w-full">
          <Reveal className="vault-copy">
            <p className="eyebrow mb-4 min-[600px]:mb-5">
              {site.designs.eyebrow}
            </p>
            <h2 className="vault-heading h-display mb-5 min-[600px]:mb-6">
              {site.designs.heading}{' '}
              <em className="not-italic text-crimson">
                {site.designs.accentHeading}
              </em>
            </h2>
            <p className="lede mb-7 text-[0.78rem] leading-relaxed min-[600px]:mb-9 min-[600px]:text-[inherit]">
              {site.designs.intro}
            </p>
            <a href="#book" className="vault-cta btn btn-red">
              {site.designs.button} <span className="arr">→</span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* ===== DESIGN RIBBON ===== */}
      <div className="relative z-10 pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,5vw,4rem)]">
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
