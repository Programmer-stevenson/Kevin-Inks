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
  // The design currently enlarged in the lightbox (null = ribbon running)
  const [open, setOpen] = useState<Design | null>(null)

  // Lock page scroll + close on Escape while the lightbox is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Two copies of the list = seamless infinite loop
  const ribbonItems = [...designs, ...designs]

  return (
    <section id="designs" className="section-pad relative bg-bg-1 border-y border-line overflow-hidden">
      {/* oversized outline word for vault atmosphere */}
      <span
        aria-hidden
        className="absolute top-10 font-display leading-none pointer-events-none select-none text-transparent"
        style={{
          right: 'var(--pad)',
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          WebkitTextStroke: '1px rgba(245,241,234,0.06)',
        }}
      >
        VAULT
      </span>

      {/* ===== INTRO ===== */}
      <div className="container-site mb-[clamp(2.5rem,5vw,4rem)]">
        <Reveal className="max-w-[44em]">
          <p className="eyebrow mb-5">{site.designs.eyebrow}</p>
          <h2 className="h-display mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.2rem)' }}>
            {site.designs.heading} <em className="not-italic text-crimson">{site.designs.accentHeading}</em>
          </h2>
          <p className="lede mb-9">
            {site.designs.intro}
          </p>
          <a href="#book" className="btn btn-red">
            {site.designs.button} <span className="arr">→</span>
          </a>
        </Reveal>
      </div>

      {/* ===== RIBBON SCROLL =====
          Continuously drifting strip of designs. Pauses while a design is
          enlarged (and on hover), resumes when the lightbox closes. */}
      <style>{`
        .ribbon-track{
          display:flex;gap:1.25rem;width:max-content;
          animation:ribbon-drift ${RIBBON_SPEED_S}s linear infinite;
        }
        .ribbon:hover .ribbon-track{animation-play-state:paused}
        @keyframes ribbon-drift{to{transform:translateX(-50%)}}
      `}</style>
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

      {/* ===== LIGHTBOX ===== */}
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
