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
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const ribbonItems = [...designs, ...designs]

  return (
    <section id="designs" className="section-pad relative bg-bg-1 border-y border-line overflow-hidden">
      {/* Animated linework copied from the footer and kept behind all content. */}
      <style>{`
        .design-line{
          --line-alpha:.5;
          fill:none;stroke:currentColor;stroke-width:1.25;vector-effect:non-scaling-stroke;
          stroke-dasharray:1200;stroke-dashoffset:1200;
          filter:drop-shadow(0 0 3px currentColor) drop-shadow(0 0 9px rgba(164,24,34,.38));
          animation:design-line-draw 14s ease-in-out infinite alternate;
        }
        .design-line:nth-child(2){--line-alpha:.58;animation-delay:-3s}
        .design-line:nth-child(3){--line-alpha:.44;animation-delay:-6s}
        .design-line:nth-child(4){--line-alpha:.38;animation-delay:-9s}
        .design-line:nth-child(5){--line-alpha:.54;animation-delay:-11s}
        .design-line:nth-child(6){--line-alpha:.4;animation-delay:-13s}
        @keyframes design-line-draw{
          0%{stroke-dashoffset:1200;opacity:0}
          12%{opacity:var(--line-alpha)}
          88%{opacity:var(--line-alpha)}
          100%{stroke-dashoffset:0;opacity:.2}
        }
        @media (prefers-reduced-motion: reduce){
          .design-line{animation:none;stroke-dashoffset:0;opacity:.32}
        }
        .ribbon-track{
          display:flex;gap:1.25rem;width:max-content;
          animation:ribbon-drift ${RIBBON_SPEED_S}s linear infinite;
        }
        .ribbon:hover .ribbon-track{animation-play-state:paused}
        @keyframes ribbon-drift{to{transform:translateX(-50%)}}
      `}</style>

      <svg
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full pointer-events-none text-crimson"
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
        aria-hidden
        className="absolute z-[1] top-10 font-display leading-none pointer-events-none select-none text-transparent"
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
            <h2 className="h-display mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.2rem)' }}>
              {site.designs.heading}{' '}
              <em className="not-italic text-crimson">{site.designs.accentHeading}</em>
            </h2>
            <p className="lede mb-9">{site.designs.intro}</p>
            <a href="#book" className="btn btn-red">
              {site.designs.button} <span className="arr">→</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="ribbon overflow-hidden" style={{ margin: '0 calc(var(--pad) * -1)' }}>
            <div
              className="ribbon-track py-2"
              style={{ animationPlayState: open ? 'paused' : undefined }}
            >
              {ribbonItems.map((d, i) => (
                <button
                  key={`${d.title}-${i}`}
                  type="button"
                  onClick={() => setOpen(d)}
                  aria-label={`Enlarge design: ${d.title}`}
                  className="group relative w-[min(48vw,320px)] shrink-0 cursor-zoom-in border border-line bg-bg-0 text-left overflow-hidden transition-colors duration-500 hover:border-oxblood"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#1c1a18]">
                    <img
                      src={d.img}
                      alt={d.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-t border-line">
                    <span className="font-display text-[1rem] uppercase tracking-[0.04em]">{d.title}</span>
                    <span
                      className={`text-[0.55rem] font-semibold tracking-[0.2em] uppercase px-2 py-1.5 border whitespace-nowrap ${statusStyles[d.status]}`}
                    >
                      {d.statusLabel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="container-site mt-8">
          <Reveal delay={2}>
            <p className="text-[0.78rem] text-ink-faint tracking-[0.06em] max-w-[34em]">
              <strong className="text-champagne font-medium">{site.designs.memberNote}</strong>
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
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={open.img}
                alt={open.alt}
                className="w-full max-h-[72vh] object-contain border border-line bg-bg-0"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-4 pt-5">
                <div>
                  <h3 className="h-display text-2xl">{open.title}</h3>
                  <p className="text-[0.72rem] tracking-[0.18em] uppercase text-ink-faint mt-1.5">
                    {open.placement} · {open.size}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[0.6rem] font-semibold tracking-[0.22em] uppercase px-3 py-2 border whitespace-nowrap ${statusStyles[open.status]}`}
                  >
                    {open.statusLabel}
                  </span>
                  <a href="#book" onClick={() => setOpen(null)} className="link-line">
                    Claim This Design <span className="arr">→</span>
                  </a>
                </div>
              </figcaption>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close enlarged design"
                className="absolute -top-4 -right-4 w-11 h-11 grid place-items-center bg-champagne text-[#121212] text-xl leading-none cursor-pointer border-0 transition-colors duration-300 hover:bg-ink"
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