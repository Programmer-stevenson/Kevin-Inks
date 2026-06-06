import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '../data'
import { EASE } from './Reveal'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[100] flex items-center justify-between transition-all duration-500 ease-lux border-b ${
          scrolled
            ? 'bg-bg-0/90 backdrop-blur-xl border-line py-3.5'
            : 'bg-transparent border-transparent py-5'
        }`}
        style={{ paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)' }}
      >
        <a href="#top" className="font-display text-xl tracking-[0.06em] text-ink no-underline">
          KEVIN<span className="text-crimson">.</span>INKS
        </a>

        {/* Link row: condensed spacing/type from 900–1149px (iPad landscape,
            small laptops), full spacing from 1150px up — never crams */}
        <nav className="hidden min-[900px]:block">
          <ul className="flex list-none gap-5 min-[1150px]:gap-10">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-ink-dim no-underline font-medium uppercase transition-colors duration-300 hover:text-champagne whitespace-nowrap text-[0.64rem] tracking-[0.12em] min-[1150px]:text-[0.72rem] min-[1150px]:tracking-[0.18em]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 min-[1150px]:gap-6">
          <a
            href="#book"
            className="btn btn-fill hidden min-[900px]:inline-flex whitespace-nowrap !px-4 !py-2.5 !text-[0.62rem] min-[1150px]:!px-6 min-[1150px]:!py-3 min-[1150px]:!text-[0.72rem]"
          >
            Book Consultation
          </a>
          <button
            className="bg-transparent border-0 cursor-pointer flex min-[900px]:hidden flex-col gap-1.5 p-1.5 z-[110]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block w-[26px] h-px bg-ink transition-all duration-500 ease-lux ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block w-[26px] h-px bg-ink transition-all duration-500 ease-lux ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-[26px] h-px bg-ink transition-all duration-500 ease-lux ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-bg-0 flex flex-col justify-center"
            style={{ paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="h-display text-ink no-underline border-b border-line py-2 leading-[1.25] transition-all duration-300 hover:text-crimson hover:pl-4"
                style={{ fontSize: 'clamp(2.4rem, 9vw, 4rem)' }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.08 + i * 0.06, duration: 0.7, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#book"
              onClick={() => setOpen(false)}
              className="btn btn-fill self-start mt-10"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.45, duration: 0.7, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              Book Consultation <span className="arr">→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}