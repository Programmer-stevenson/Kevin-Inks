import { motion } from 'framer-motion'
import { IMAGES } from '../data'
import { EASE } from './Reveal'

// ===== HERO LAYOUT KNOBS =====
const NAV_CLEARANCE = '72px'
const HERO_TEXT_TOP = '20px'
// Extra left offset for the hero text block (eyebrow + headline + lede):
const HERO_TEXT_LEFT = '15px'
// ===== HERO HEIGHT =====
// How tall the hero section is, per breakpoint. 100svh = exactly one screen.
const HERO_HEIGHT_MOBILE = '115svh'
const HERO_HEIGHT_DESKTOP = '125svh'
// Buttons drop, per breakpoint:
const BUTTONS_PUSH_DOWN_MOBILE = '105px'
const BUTTONS_PUSH_DOWN_DESKTOP = '50px'

// ===== DESKTOP IMAGE KNOBS =====
// The hero photo occupies the right side on desktop; the left side is solid
// black that dissolves into the image.
// How much of the hero width the image occupies:
const DESKTOP_IMAGE_WIDTH = '68%'
// Scale of the photo itself. 100% fills the hero height; LOWER numbers
// shrink the photo, revealing more of it. Gaps fade into the dark gradients.
const DESKTOP_IMAGE_ZOOM = '96%'
// Where the photo sits inside its column ('right top' pairs best with the
// zoom-out: gaps fall bottom-left where the gradients hide them).
const DESKTOP_IMAGE_ANCHOR = 'right top'

const line = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: 0.15 + i * 0.12 },
  }),
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

export function Hero() {
  return (
    <section
      id="top"
      className="hero-root relative flex flex-col justify-between isolate overflow-hidden bg-bg-0"
      style={{ paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)' }}
    >
      <style>{`
        .hero-root{
          min-height:${HERO_HEIGHT_MOBILE};
          /* bottom padding grows with the button drop so they're never clipped */
          padding-bottom:max(clamp(3rem,8vh,6rem), calc(${BUTTONS_PUSH_DOWN_MOBILE} + 28px));
        }
        @media(min-width:900px){
          .hero-root{
            min-height:${HERO_HEIGHT_DESKTOP};
            padding-bottom:max(clamp(3rem,8vh,6rem), calc(${BUTTONS_PUSH_DOWN_DESKTOP} + 28px));
          }
        }
      `}</style>
      {/* ===== MOBILE BACKDROP: full-bleed (unchanged) ===== */}
      <motion.div
        aria-label="Kevin tattooing a client in the studio"
        role="img"
        className="absolute inset-0 -z-20 bg-[#1a1816] bg-cover bg-no-repeat min-[900px]:hidden"
        style={{
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundPosition: 'center 30%',
          filter: 'grayscale(35%) contrast(1.05)',
        }}
        initial={{ scale: 1.07, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
      <div className="absolute inset-0 -z-10 min-[900px]:hidden bg-gradient-to-t from-bg-0 from-[4%] via-bg-0/70 via-[35%] to-bg-0/55" />

      {/* ===== DESKTOP BACKDROP: image right, black left, fluid blend ===== */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-20 hidden bg-no-repeat min-[900px]:block"
        style={{
          width: DESKTOP_IMAGE_WIDTH,
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: `auto ${DESKTOP_IMAGE_ZOOM}`,
          backgroundPosition: DESKTOP_IMAGE_ANCHOR,
          filter: 'grayscale(35%) brightness(0.78) contrast(1.05)',
          // black -> clear fade baked onto the image itself
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 55%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 55%)',
        }}
        initial={{ x: '-16%', opacity: 0 }}
        animate={{ x: '0%', opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.25 }}
      />
      {/* horizontal blend: solid black left dissolving continuously ACROSS the
          photo, reaching full clear only at the hero's right edge */}
      <div className="absolute inset-0 -z-10 hidden min-[900px]:block bg-gradient-to-r from-bg-0 from-[36%] via-bg-0/45 via-[62%] to-transparent to-[98%]" />
      {/* bottom fade into the next section */}
      <div className="absolute inset-0 -z-10 hidden min-[900px]:block bg-gradient-to-t from-bg-0 from-[3%] to-transparent to-[26%]" />

      {/* TEXT BLOCK — top of the hero, flush left on desktop (no centered
          max-width container; it starts at the section's edge padding) */}
      <div
        className="w-full"
        style={{
          paddingTop: `calc(${NAV_CLEARANCE} + ${HERO_TEXT_TOP})`,
          marginLeft: HERO_TEXT_LEFT,
        }}
      >
        <motion.p className="eyebrow mb-6" {...fade(0.35)}>
          Artist First. Tattooer Second.
        </motion.p>

        {/* heading size: min (mobile) / fluid / max (large desktop) */}
        <h1 className="h-display mb-7" style={{ fontSize: 'clamp(3.4rem, 7.5vw, 6.5rem)' }}>
          <span className="block overflow-hidden">
            <motion.span className="block" variants={line} custom={0} initial="hidden" animate="visible">
              Original Tattoos.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-champagne"
              variants={line}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              Lasting Stories.
            </motion.span>
          </span>
        </h1>

        <motion.p className="lede" {...fade(0.55)}>
          Custom artwork designed with meaning and tattooed with precision.
        </motion.p>
      </div>

      {/* CTA BUTTONS — anchored low, CENTERED horizontally.
          IMPORTANT: the translateY lives on this OUTER wrapper, not on the
          motion.div — Framer Motion overwrites `transform` on elements it
          animates, which silently cancelled the drop in earlier versions. */}
      <style>{`
        .hero-ctas{--btn-drop:${BUTTONS_PUSH_DOWN_MOBILE}}
        @media(min-width:900px){.hero-ctas{--btn-drop:${BUTTONS_PUSH_DOWN_DESKTOP}}}
      `}</style>
      <div className="hero-ctas container-site w-full" style={{ transform: 'translateY(var(--btn-drop))' }}>
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          {...fade(0.7)}
        >
          <a
            href="#book"
            className="btn btn-fill px-5 py-3 text-[0.62rem] min-[900px]:px-[1.9rem] min-[900px]:py-[1.05rem] min-[900px]:text-[0.72rem]"
          >
            Book Consultation <span className="arr">→</span>
          </a>
          <a
            href="#designs"
            className="btn btn-ghost px-5 py-3 text-[0.62rem] min-[900px]:px-[1.9rem] min-[900px]:py-[1.05rem] min-[900px]:text-[0.72rem]"
          >
            Browse Designs <span className="arr">→</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute hidden min-[900px]:flex flex-col gap-1.5 text-right text-[0.68rem] tracking-[0.22em] uppercase text-ink-faint"
        style={{ right: 'var(--pad)', bottom: 'clamp(3rem, 8vh, 6rem)' }}
        {...fade(0.9)}
      >
        <strong className="text-ink-dim font-medium">@Kevin.Inks</strong>
        <span>By Appointment Only</span>
        <span>Las Vegas</span>
      </motion.div>
    </section>
  )
}