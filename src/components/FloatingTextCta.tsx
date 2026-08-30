import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWordPressContent } from '../wordpress'
import { EASE } from './Reveal'

const AUTO_HIDE_MS = 15_000

export function FloatingTextCta() {
  const { site } = useWordPressContent()
  const [isVisible, setIsVisible] = useState(true)

  const contact = site.contact as typeof site.contact & {
    phoneE164?: string
    consultationText?: string
  }

  const phoneNumber = contact.phoneE164 || '+17025088136'
  const message =
    contact.consultationText ||
    "Hi Kevin, I'd like to book a tattoo consultation."
  const smsHref = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`
  const ctaClassName =
    'ki-fantasy-cta group relative z-10 w-full items-center justify-center gap-2.5 border border-[#b02a34] px-4 py-2.5 text-[0.56rem] font-semibold uppercase tracking-[0.19em] text-[#fff7eb] no-underline transition-all duration-500 hover:border-champagne hover:text-white focus-visible:border-champagne min-[700px]:gap-3 min-[700px]:px-5 min-[700px]:py-3.5 min-[700px]:text-[0.66rem] min-[700px]:tracking-[0.24em]'

  useEffect(() => {
    const autoHideTimer = window.setTimeout(() => {
      setIsVisible(false)
    }, AUTO_HIDE_MS)

    return () => window.clearTimeout(autoHideTimer)
  }, [])

  return (
    <>
      <style>{`
        .ki-fantasy-card {
          isolation: isolate;
          clip-path: polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px);
          background: linear-gradient(135deg, #5e1118 0%, #c9a55f 28%, #3a090e 50%, #c9a55f 72%, #5e1118 100%);
          box-shadow: 0 22px 65px rgba(0,0,0,.72), 0 0 44px rgba(143,25,33,.28);
        }
        .ki-fantasy-card::before {
          content: '';
          position: absolute;
          inset: -60%;
          z-index: 0;
          background: conic-gradient(from 0deg, transparent, rgba(185,31,43,.7), transparent 26%, transparent 72%, rgba(201,165,95,.55), transparent);
          animation: ki-orbit 9s linear infinite;
        }
        .ki-fantasy-inner {
          position: relative;
          z-index: 1;
          clip-path: polygon(13px 0, calc(100% - 13px) 0, 100% 13px, 100% calc(100% - 13px), calc(100% - 13px) 100%, 13px 100%, 0 calc(100% - 13px), 0 13px);
          background:
            radial-gradient(circle at 50% 0%, rgba(143,25,33,.22), transparent 48%),
            linear-gradient(145deg, rgba(18,15,14,.99), rgba(5,5,5,.99));
        }
        .ki-fantasy-sigil {
          box-shadow: inset 0 0 18px rgba(201,165,95,.13), 0 0 24px rgba(143,25,33,.33);
          animation: ki-sigil-pulse 2.8s ease-in-out infinite;
        }
        .ki-fantasy-ember {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: #d7b56e;
          box-shadow: 0 0 9px #a71925;
          animation: ki-ember-rise 4s ease-in infinite;
        }
        .ki-fantasy-ember:nth-of-type(2) { left: 18%; animation-delay: -1.2s; }
        .ki-fantasy-ember:nth-of-type(3) { left: 62%; animation-delay: -2.7s; }
        .ki-fantasy-ember:nth-of-type(4) { left: 86%; animation-delay: -.4s; }
        .ki-fantasy-cta {
          position: relative;
          overflow: hidden;
          clip-path: polygon(9px 0, calc(100% - 9px) 0, 100% 50%, calc(100% - 9px) 100%, 9px 100%, 0 50%);
          background: linear-gradient(90deg, #651018, #a71925 52%, #651018);
          box-shadow: 0 0 25px rgba(143,25,33,.25);
        }
        .ki-fantasy-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-115%);
          background: linear-gradient(100deg, transparent 30%, rgba(255,240,210,.25), transparent 70%);
          transition: transform .7s cubic-bezier(.22,1,.36,1);
        }
        .ki-fantasy-cta:hover::before { transform: translateX(115%); }
        @keyframes ki-orbit { to { transform: rotate(360deg); } }
        @keyframes ki-sigil-pulse {
          0%,100% { transform: scale(1); filter: brightness(.9); }
          50% { transform: scale(1.04); filter: brightness(1.18); }
        }
        @keyframes ki-ember-rise {
          0% { bottom: 8%; opacity: 0; transform: translate3d(0,8px,0) scale(.7); }
          25% { opacity: .8; }
          100% { bottom: 92%; opacity: 0; transform: translate3d(12px,-8px,0) scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ki-fantasy-card::before,
          .ki-fantasy-sigil,
          .ki-fantasy-ember { animation: none; }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.aside
            className="ki-fantasy-card fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-6 right-6 z-[85] mx-auto max-w-[22rem] p-px min-[700px]:bottom-6 min-[700px]:left-auto min-[700px]:right-6 min-[700px]:mx-0 min-[700px]:w-[27rem] min-[700px]:max-w-[27rem]"
            initial={{ opacity: 0, y: 42, scale: 0.9, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' }}
            transition={{ duration: 0.72, ease: EASE }}
            aria-label="Text Kevin to book a consultation"
          >
            <div className="ki-fantasy-inner relative overflow-hidden px-3.5 pb-3.5 pt-3 min-[700px]:px-5 min-[700px]:pb-5 min-[700px]:pt-4">
              <span className="ki-fantasy-ember left-[8%]" aria-hidden="true" />
              <span className="ki-fantasy-ember" aria-hidden="true" />
              <span className="ki-fantasy-ember" aria-hidden="true" />
              <span className="ki-fantasy-ember" aria-hidden="true" />

              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
                viewBox="0 0 430 210"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M12 54V18h48M370 18h48v36M12 156v36h48M370 192h48v-36" fill="none" stroke="#C9A55F" strokeWidth="1" />
                <path d="M30 18l14 10 14-10M372 18l14 10 14-10M30 192l14-10 14 10M372 192l14-10 14 10" fill="none" stroke="#8F1921" strokeWidth="1" />
                <path d="M105 18h220M105 192h220" fill="none" stroke="#8F1921" strokeWidth=".65" strokeDasharray="3 7" />
              </svg>

              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-2 z-20 grid h-7 w-7 cursor-pointer place-items-center border border-[#6d5a45]/60 bg-black/30 text-sm leading-none text-[#a99d8d] transition-all duration-300 hover:rotate-90 hover:border-crimson hover:text-crimson focus-visible:border-crimson focus-visible:text-crimson min-[700px]:right-3 min-[700px]:top-3 min-[700px]:h-8 min-[700px]:w-8 min-[700px]:text-base"
                aria-label="Dismiss booking message"
              >
                ×
              </button>

              <div className="relative z-10 flex items-center gap-3 pr-7 min-[700px]:gap-4 min-[700px]:pr-8">
                <div className="ki-fantasy-sigil grid h-11 w-11 shrink-0 rotate-45 place-items-center border border-champagne/60 bg-[#17090a] min-[700px]:h-[3.4rem] min-[700px]:w-[3.4rem]">
                  <svg
                    className="-rotate-45"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 5.5h16v11H8l-4 3v-14Z" stroke="#D7B56E" strokeWidth="1.35" />
                    <path d="m7 9 5 3.5L17 9" stroke="#A71925" strokeWidth="1.35" />
                  </svg>
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-px w-5 bg-crimson" aria-hidden="true" />
                    <p className="text-[0.44rem] font-semibold uppercase tracking-[0.24em] text-crimson min-[700px]:text-[0.52rem] min-[700px]:tracking-[0.3em]">
                      A new mark awaits
                    </p>
                  </div>
                  <p className="font-display text-[1.12rem] leading-[1.05] tracking-[0.015em] text-[#f2e9dc] min-[700px]:text-[1.55rem]">
                    Begin Your Next Story
                  </p>
                </div>
              </div>

              <div className="relative z-10 my-2.5 flex items-center gap-3 min-[700px]:my-4" aria-hidden="true">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#6f4e39]" />
                <span className="block h-1.5 w-1.5 rotate-45 border border-champagne/70" />
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#6f4e39]" />
              </div>

              <a
                href={smsHref}
                className={`${ctaClassName} inline-flex min-[700px]:hidden`}
              >
                <span className="relative z-10">Text to Book Now</span>
                <span className="relative z-10 text-sm transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true">
                  ✦
                </span>
              </a>

              <a
                href="#book"
                className={`${ctaClassName} hidden min-[700px]:inline-flex`}
              >
                <span className="relative z-10">Book Now</span>
                <span className="relative z-10 text-sm transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true">
                  ✦
                </span>
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}