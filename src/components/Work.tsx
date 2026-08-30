import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { WorkPiece } from '../data'
import { useWordPressContent } from '../wordpress'
import { Reveal, EASE } from './Reveal'

// Same drift speed as the Designs ribbon. Higher = slower.
const RIBBON_SPEED_S = 40

export function Work() {
  const { work, site } = useWordPressContent()
  const [open, setOpen] = useState<WorkPiece | null>(null)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const portfolioRef = useRef<HTMLDivElement | null>(null)
  const ribbonRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!showPortfolio) return

    const timer = window.setTimeout(() => {
      portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 450)

    return () => window.clearTimeout(timer)
  }, [showPortfolio])

  const ribbonItems = [...work, ...work]

  const closePortfolio = () => {
    setShowPortfolio(false)

    // Wait for the ribbon's height animation to restore it before scrolling.
    window.setTimeout(() => {
      ribbonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 475)
  }

  return (
    <section id="work" className="section-pad bg-bg-0 overflow-hidden">
      <style>{`
        .work-ribbon-track{
          display:flex;gap:1.25rem;width:max-content;
          animation:work-ribbon-drift ${RIBBON_SPEED_S}s linear infinite;
        }
        .work-ribbon:hover .work-ribbon-track{animation-play-state:paused}
        @keyframes work-ribbon-drift{to{transform:translateX(-50%)}}

        @media (prefers-reduced-motion: reduce){
          .work-ribbon-track{animation-play-state:paused}
        }
      `}</style>

      <div className="container-site">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-line mb-[clamp(2.5rem,5vw,4.5rem)]">
          <div>
            <p className="eyebrow mb-3.5">{site.work.eyebrow}</p>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' }}>
              {site.work.heading}
            </h2>
            <button
              type="button"
              onClick={() => (showPortfolio ? closePortfolio() : setShowPortfolio(true))}
              className="link-line mt-4 block border-0 bg-transparent p-0 cursor-pointer"
              aria-expanded={showPortfolio}
              aria-controls="full-portfolio"
            >
              {showPortfolio ? (
                'Close Portfolio'
              ) : (
                <>
                  <span className="hidden min-[700px]:inline">Click here to view portfolio</span>
                  <span className="min-[700px]:hidden">Tap here to view portfolio</span>
                </>
              )}{' '}
              <span className="arr" aria-hidden>
                {showPortfolio ? '↑' : '→'}
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* The featured ribbon collapses completely while the full grid is open. */}
      <AnimatePresence initial={false}>
        {!showPortfolio && (
          <motion.div
            key="featured-work-ribbon"
            ref={ribbonRef}
            className="overflow-hidden scroll-mt-24"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable full portfolio. */}
      <AnimatePresence initial={false}>
        {showPortfolio && (
          <motion.div
            id="full-portfolio"
            ref={portfolioRef}
            className="container-site scroll-mt-24 pt-[clamp(3rem,6vw,5rem)]"
            initial={{ opacity: 0, height: 0, y: 24 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 16 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
              <div>
                <p className="eyebrow mb-3">Portfolio</p>
                <h3 className="h-display text-[clamp(2rem,5vw,3.5rem)]">All Work</h3>
              </div>
              <p className="max-w-[32rem] text-sm leading-relaxed text-ink-faint">
                Select any piece to view it at full size.
              </p>
            </div>

            <div className="grid grid-cols-2 min-[700px]:grid-cols-3 min-[1100px]:grid-cols-4 gap-3 min-[700px]:gap-5">
              {work.map((w, i) => (
                <motion.button
                  key={`${w.num}-${w.title}`}
                  type="button"
                  onClick={() => setOpen(w)}
                  aria-label={`Enlarge work: ${w.title}`}
                  className="group relative aspect-[3/4] overflow-hidden border border-line bg-bg-1 text-left cursor-zoom-in transition-colors duration-500 hover:border-oxblood"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.045, 0.4) }}
                >
                  <img
                    src={w.img}
                    alt={w.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3 min-[700px]:p-5 bg-gradient-to-t from-bg-0 via-bg-0/75 to-transparent">
                    <span className="block font-display text-[0.85rem] min-[700px]:text-[1rem] uppercase tracking-[0.04em]">
                      {w.title}
                    </span>
                    <span className="block mt-1.5 text-[0.5rem] min-[700px]:text-[0.58rem] tracking-[0.2em] uppercase text-champagne">
                      {w.tag}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center pt-10">
              <button type="button" onClick={closePortfolio} className="btn btn-ghost">
                Close Portfolio <span className="arr">↑</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remains accessible while the visitor scrolls through the full grid. */}
      <AnimatePresence>
        {showPortfolio && (
          <motion.button
            type="button"
            onClick={closePortfolio}
            className="group fixed right-4 top-[4.75rem] z-[85] flex cursor-pointer items-center gap-3 overflow-hidden border border-[#752029] bg-[#080808]/95 px-3 py-2.5 text-left shadow-[0_14px_40px_rgba(0,0,0,0.55),0_0_24px_rgba(143,25,33,0.12)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne/70 hover:shadow-[0_16px_42px_rgba(0,0,0,0.62),0_0_30px_rgba(143,25,33,0.22)] min-[900px]:right-6 min-[900px]:top-[5.25rem]"
            style={{
              clipPath:
                'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
            aria-label="Close portfolio and return to featured work"
            initial={{ opacity: 0, x: 24, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 18, y: -6, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-crimson to-transparent"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-champagne/45 to-transparent"
              aria-hidden="true"
            />

            <span className="grid h-8 w-8 shrink-0 rotate-45 place-items-center border border-crimson/70 bg-crimson/10 transition-all duration-500 group-hover:border-champagne/70 group-hover:bg-champagne/10">
              <span className="-rotate-45 font-display text-sm text-crimson transition-colors duration-500 group-hover:text-champagne" aria-hidden="true">
                ↑
              </span>
            </span>

            <span className="flex flex-col pr-1">
              <span className="text-[0.43rem] font-semibold uppercase tracking-[0.3em] text-ink-faint">
                Return to work
              </span>
              <span className="mt-0.5 font-display text-[0.92rem] tracking-[0.045em] text-ink transition-colors duration-500 group-hover:text-champagne">
                Close Portfolio
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image lightbox shared by the ribbon and expanded grid. */}
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