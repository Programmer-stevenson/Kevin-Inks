import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { WorkPiece } from '../data'
import { useWordPressContent } from '../wordpress'
import { Reveal, EASE } from './Reveal'

// Same drift speed as the Designs ribbon. Higher = slower.
const RIBBON_SPEED_S = 40

export function Work() {
  const { work, site } = useWordPressContent()
  // The piece currently enlarged (null = ribbon running)
  const [open, setOpen] = useState<WorkPiece | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Two copies = seamless infinite loop
  const ribbonItems = [...work, ...work]

  return (
    <section id="work" className="section-pad bg-bg-0 overflow-hidden">
      <div className="container-site">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-line mb-[clamp(2.5rem,5vw,4.5rem)]">
          <div>
            <p className="eyebrow mb-3.5">{site.work.eyebrow}</p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}>
              {site.work.heading}
            </h2>
          </div>
          <a className="link-line" href="#work">
            {site.work.linkLabel} <span className="arr">→</span>
          </a>
        </Reveal>
      </div>

      {/* ===== RIBBON SCROLL — drifts continuously, pauses on hover and
          while a piece is enlarged, resumes on close ===== */}
      <style>{`
        .work-ribbon-track{
          display:flex;gap:1.25rem;width:max-content;
          animation:work-ribbon-drift ${RIBBON_SPEED_S}s linear infinite;
        }
        .work-ribbon:hover .work-ribbon-track{animation-play-state:paused}
        @keyframes work-ribbon-drift{to{transform:translateX(-50%)}}
      `}</style>
      <Reveal delay={1}>
        <div className="work-ribbon overflow-hidden" style={{ margin: '0 calc(var(--pad) * -1)' }}>
          <div
            className="work-ribbon-track py-2"
            style={{ animationPlayState: open ? 'paused' : undefined }}
          >
            {ribbonItems.map((w, i) => (
              <button
                key={`${w.num}-${i}`}
                type="button"
                onClick={() => setOpen(w)}
                aria-label={`Enlarge work: ${w.title}`}
                className="group relative w-[min(54vw,400px)] shrink-0 aspect-[3/4] cursor-zoom-in overflow-hidden bg-bg-1 border border-line text-left transition-colors duration-500 hover:border-oxblood/60"
              >
                {/* full color, subtle zoom on hover */}
                <img
                  src={w.img}
                  alt={w.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-lux group-hover:scale-[1.05]"
                />
                <span className="absolute top-5 left-6 font-display text-[0.85rem] text-ink-faint tracking-[0.1em]">
                  {w.num}
                </span>
                <span className="absolute inset-x-0 bottom-0 px-6 py-6 bg-gradient-to-t from-bg-0/95 to-transparent flex justify-between items-baseline gap-4">
                  <span className="font-display text-[1.15rem] uppercase tracking-[0.04em]">{w.title}</span>
                  <span className="text-[0.62rem] tracking-[0.22em] uppercase text-champagne whitespace-nowrap">
                    {w.tag}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

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
                <h3 className="h-display text-2xl">{open.title}</h3>
                <span className="text-[0.62rem] tracking-[0.22em] uppercase text-champagne">
                  {open.tag}
                </span>
              </figcaption>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close enlarged work"
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
