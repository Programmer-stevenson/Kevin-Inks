import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWordPressContent } from '../wordpress'
import { EASE } from './Reveal'

const AUTO_HIDE_MS = 15_000
const POPUP_ART = '/gargoyle.png'

export function FloatingTextCta() {
  const { site } = useWordPressContent()
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  const contact = site.contact as typeof site.contact & {
    phoneE164?: string
    consultationText?: string
  }

  const phoneNumber = contact.phoneE164 || '+17025088136'
  const message =
    contact.consultationText ||
    "Hi Kevin, I'd like to book a tattoo consultation."
  const smsHref = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 699px)')
    let hero: HTMLElement | null = null
    let heroObserver: IntersectionObserver | null = null
    let isListeningForScroll = false

    const stopWatchingHero = () => {
      heroObserver?.disconnect()
      heroObserver = null

      if (isListeningForScroll) {
        window.removeEventListener('scroll', checkHeroExit)
        isListeningForScroll = false
      }
    }

    const revealPopup = () => {
      if (hasTriggered.current) return

      hasTriggered.current = true
      setIsVisible(true)
      stopWatchingHero()
    }

    const checkHeroExit = () => {
      if (hero && hero.getBoundingClientRect().bottom <= 0) {
        revealPopup()
      }
    }

    const configureTrigger = () => {
      stopWatchingHero()

      if (hasTriggered.current) return

      // Desktop keeps the original behavior: show as soon as the page loads.
      if (!mobileQuery.matches) {
        revealPopup()
        return
      }

      // Phones wait until the entire hero section has passed above the screen.
      hero = document.getElementById('top')
      if (!hero) {
        revealPopup()
        return
      }

      heroObserver = new IntersectionObserver(checkHeroExit, { threshold: 0 })
      heroObserver.observe(hero)
      window.addEventListener('scroll', checkHeroExit, { passive: true })
      isListeningForScroll = true
      checkHeroExit()
    }

    configureTrigger()
    mobileQuery.addEventListener('change', configureTrigger)

    return () => {
      stopWatchingHero()
      mobileQuery.removeEventListener('change', configureTrigger)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Start the countdown only after the popup has actually appeared.
    const autoHideTimer = window.setTimeout(() => {
      setIsVisible(false)
    }, AUTO_HIDE_MS)

    return () => window.clearTimeout(autoHideTimer)
  }, [isVisible])

  return (
    <>
      <style>{`
        .ki-dark-card {
          isolation: isolate;
          filter: drop-shadow(0 24px 38px rgba(0,0,0,.72));
        }

        .ki-dark-frame,
        .ki-dark-inner {
          clip-path: polygon(
            18px 0,
            calc(100% - 18px) 0,
            100% 18px,
            100% calc(100% - 8px),
            calc(100% - 8px) 100%,
            8px 100%,
            0 calc(100% - 8px),
            0 18px
          );
        }

        .ki-dark-frame {
          position: relative;
          padding: 1px;
          overflow: hidden;
          background: linear-gradient(
            126deg,
            rgba(230,218,197,.72) 0%,
            rgba(74,72,68,.48) 25%,
            rgba(28,28,27,.92) 56%,
            rgba(201,187,164,.54) 100%
          );
        }

        .ki-dark-frame::before {
          content: '';
          position: absolute;
          top: -120%;
          left: -35%;
          width: 32%;
          height: 340%;
          z-index: 5;
          pointer-events: none;
          transform: rotate(24deg);
          background: linear-gradient(90deg, transparent, rgba(241,231,214,.16), transparent);
          animation: ki-moon-sweep 8s ease-in-out infinite;
        }

        .ki-dark-inner {
          position: relative;
          min-height: 10.4rem;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 22% 0%, rgba(112,112,106,.18), transparent 48%),
            linear-gradient(112deg, #0e0e0d 0%, #0a0a09 52%, #11110f 100%);
        }

        .ki-dark-art {
          position: absolute;
          inset: 0 0 0 auto;
          width: 58%;
          pointer-events: none;
          background-repeat: no-repeat;
          background-size: auto 108%;
          background-position: right center;
          filter: grayscale(1) brightness(.62) contrast(1.15);
          opacity: .82;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.2) 20%, black 58%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.2) 20%, black 58%);
        }

        .ki-dark-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(6,6,6,.99) 0%, rgba(6,6,6,.94) 46%, rgba(6,6,6,.28) 78%, rgba(4,4,4,.46) 100%),
            linear-gradient(to top, rgba(4,4,4,.92) 0%, transparent 46%),
            radial-gradient(circle at 84% 21%, rgba(218,222,216,.12), transparent 24%);
        }

        .ki-dark-smoke {
          position: absolute;
          inset: auto -12% -48% 28%;
          height: 85%;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(24px);
          opacity: .55;
          background:
            radial-gradient(ellipse, rgba(102,102,96,.24), transparent 58%),
            radial-gradient(ellipse at 72% 42%, rgba(58,58,55,.26), transparent 55%);
          animation: ki-smoke-drift 9s ease-in-out infinite alternate;
        }

        .ki-dark-rune {
          display: grid;
          place-items: center;
          width: 1.25rem;
          height: 1.25rem;
          flex: 0 0 auto;
          transform: rotate(45deg);
          border: 1px solid rgba(218,202,177,.55);
          background: rgba(9,9,8,.72);
          box-shadow: inset 0 0 12px rgba(218,202,177,.08), 0 0 22px rgba(214,218,214,.08);
        }

        .ki-dark-rune > span {
          display: block;
          width: .26rem;
          height: .26rem;
          border: 1px solid rgba(238,226,207,.8);
          background: rgba(219,207,187,.16);
        }

        .ki-dark-rule {
          height: 1px;
          background: linear-gradient(90deg, rgba(218,202,177,.72), rgba(218,202,177,.12), transparent);
        }

        .ki-dark-cta {
          position: relative;
          display: inline-flex;
          min-height: 2.3rem;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          border: 1px solid rgba(226,214,194,.78);
          padding: .58rem .72rem .58rem .82rem;
          color: #121211;
          background: linear-gradient(110deg, #e9dfcf, #cbbda6 58%, #eee5d7);
          font-size: .5rem;
          font-weight: 700;
          letter-spacing: .22em;
          line-height: 1;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color .35s ease, color .35s ease, transform .35s ease, box-shadow .35s ease;
        }

        .ki-dark-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(100deg, transparent 25%, rgba(255,255,255,.58), transparent 72%);
          transition: transform .7s cubic-bezier(.22,1,.36,1);
        }

        .ki-dark-cta:hover {
          transform: translateY(-2px);
          border-color: #f4ecdf;
          box-shadow: 0 10px 28px rgba(0,0,0,.42), 0 0 20px rgba(218,202,177,.1);
        }

        .ki-dark-cta:hover::before { transform: translateX(120%); }
        .ki-dark-cta:focus-visible { outline: 1px solid #f4ecdf; outline-offset: 3px; }
        .ki-dark-cta--desktop { display: none; }

        .ki-dark-close {
          background: rgba(7,7,7,.64);
          border: 1px solid rgba(218,202,177,.22);
          color: rgba(229,220,206,.72);
          backdrop-filter: blur(6px);
        }

        .ki-dark-close:hover,
        .ki-dark-close:focus-visible {
          border-color: rgba(238,226,207,.76);
          color: #f4ecdf;
        }

        .ki-dark-mote {
          position: absolute;
          bottom: 8%;
          width: 2px;
          height: 2px;
          border-radius: 999px;
          pointer-events: none;
          background: rgba(235,224,207,.85);
          box-shadow: 0 0 8px rgba(235,224,207,.7);
          animation: ki-mote-rise 5.5s ease-in infinite;
        }

        .ki-dark-mote:nth-of-type(2) { left: 70%; animation-delay: -1.6s; }
        .ki-dark-mote:nth-of-type(3) { left: 83%; animation-delay: -3.8s; }

        @keyframes ki-moon-sweep {
          0%, 24% { transform: translateX(-180%) rotate(24deg); opacity: 0; }
          42% { opacity: 1; }
          68%, 100% { transform: translateX(620%) rotate(24deg); opacity: 0; }
        }

        @keyframes ki-smoke-drift {
          from { transform: translate3d(-5%, 5%, 0) scale(.92); }
          to { transform: translate3d(8%, -4%, 0) scale(1.08); }
        }

        @keyframes ki-mote-rise {
          0% { opacity: 0; transform: translate3d(0,8px,0) scale(.7); }
          20% { opacity: .65; }
          100% { opacity: 0; transform: translate3d(8px,-115px,0) scale(1.25); }
        }

        @media (min-width:700px) {
          .ki-dark-inner { min-height: 10.9rem; }
          .ki-dark-cta { min-height: 2.45rem; padding: .65rem .8rem .65rem .95rem; font-size: .54rem; }
          .ki-dark-cta--mobile { display: none; }
          .ki-dark-cta--desktop { display: inline-flex; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ki-dark-frame::before,
          .ki-dark-smoke,
          .ki-dark-mote { animation: none; }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.aside
            className="ki-dark-card fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-4 right-4 z-[85] mx-auto max-w-[20rem] min-[700px]:bottom-5 min-[700px]:left-5 min-[700px]:right-auto min-[700px]:mx-0 min-[700px]:w-[23.5rem] min-[700px]:max-w-[23.5rem]"
            initial={{ opacity: 0, y: 38, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 22, scale: 0.96, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, ease: EASE }}
            aria-label="Text Kevin to book a consultation"
          >
            <div className="ki-dark-frame">
              <div className="ki-dark-inner px-3.5 pb-3.5 pt-3.5 min-[700px]:px-4 min-[700px]:pb-4 min-[700px]:pt-4">
                <div
                  className="ki-dark-art"
                  style={{ backgroundImage: `url(${POPUP_ART})` }}
                  aria-hidden="true"
                />
                <div className="ki-dark-vignette" aria-hidden="true" />
                <div className="ki-dark-smoke" aria-hidden="true" />
                <span className="ki-dark-mote left-[62%]" aria-hidden="true" />
                <span className="ki-dark-mote" aria-hidden="true" />
                <span className="ki-dark-mote" aria-hidden="true" />

                <svg
                  className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-55"
                  viewBox="0 0 480 232"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M13 47V14h42M425 14h42v33M13 185v33h42M425 218h42v-33" fill="none" stroke="#D9CBB4" strokeWidth=".8" />
                  <path d="M76 14h110M294 14h110M76 218h110M294 218h110" fill="none" stroke="#736B60" strokeWidth=".55" strokeDasharray="2 7" />
                </svg>

                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="ki-dark-close absolute right-2.5 top-2.5 z-20 grid h-7 w-7 cursor-pointer place-items-center text-sm leading-none transition-all duration-300 hover:rotate-90 min-[700px]:right-3 min-[700px]:top-3"
                  aria-label="Dismiss booking message"
                >
                  ×
                </button>

                <div className="relative z-10 max-w-[76%] min-[700px]:max-w-[70%]">
                  <div className="mb-2.5 flex items-center gap-2 pr-5">
                    <span className="ki-dark-rune" aria-hidden="true"><span /></span>
                    <p className="text-[0.42rem] font-semibold uppercase tracking-[0.24em] text-[#b8ad9c] min-[700px]:text-[0.46rem] min-[700px]:tracking-[0.27em]">
                      Private appointments
                    </p>
                  </div>

                  <div className="ki-dark-rule mb-2.5 w-full" aria-hidden="true" />

                  <h2 className="font-display text-[1.08rem] leading-[.98] tracking-[0.01em] text-[#f0e8db] min-[700px]:text-[1.35rem]">
                    Your Next Story
                    <span className="mt-1 block text-[#cdbda4]">Starts in Ink.</span>
                  </h2>

                  <p className="mt-2 max-w-[13rem] text-[0.61rem] leading-[1.45] text-[#99948b] min-[700px]:text-[0.65rem]">
                    Send Kevin your idea, placement, and meaning.
                  </p>
                </div>

                <div className="relative z-10 mt-3 max-w-[76%] min-[700px]:max-w-[70%]">
                  <a href={smsHref} className="ki-dark-cta ki-dark-cta--mobile">
                    <span className="relative z-10">Text Kevin</span>
                    <span className="relative z-10 text-sm" aria-hidden="true">→</span>
                  </a>

                  <a href="#book" className="ki-dark-cta ki-dark-cta--desktop">
                    <span className="relative z-10">Book Consultation</span>
                    <span className="relative z-10 text-sm" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
