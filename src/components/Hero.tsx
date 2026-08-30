import { motion } from 'framer-motion'
import { useWordPressContent } from '../wordpress'
import { EASE } from './Reveal'

// ===== HERO LAYOUT KNOBS =====
const NAV_CLEARANCE = '62px'
// Gap below the nav before the text block starts, per breakpoint:
const HERO_TEXT_TOP_DESKTOP = '20px'
// Extra left offset for the hero text block (eyebrow + headline + lede):
const HERO_TEXT_LEFT = '15px'
// ===== HERO HEIGHT =====
// Match the iPad Mini reference composition on every sub-900px viewport.
// The height cap keeps landscape devices from becoming excessively tall.
const HERO_HEIGHT_MOBILE = 'min(137.2vw, 100svh)'
// Phone-only breathing room between the nav and the hero artboard.
const MOBILE_NAV_GAP = '15px'
// Average color sampled from the artwork's bottom edge for a seamless phone
// extension beneath the image.
const MOBILE_EXTENSION_COLOR = '#0A0A09'
const MOBILE_EXTENSION_BACKGROUND = [
  `linear-gradient(to bottom, ${MOBILE_EXTENSION_COLOR} 0%, rgba(10,10,9,0.76) 22%, transparent 55%)`,
  'radial-gradient(ellipse at 28% 42%, rgba(76,76,72,0.24) 0%, rgba(38,38,36,0.12) 34%, transparent 68%)',
  'radial-gradient(ellipse at 78% 76%, rgba(58,58,55,0.18) 0%, rgba(28,28,27,0.08) 36%, transparent 66%)',
  `linear-gradient(to bottom, ${MOBILE_EXTENSION_COLOR} 0%, #11110F 58%, #080808 100%)`,
].join(', ')
const HERO_HEIGHT_DESKTOP = '125svh'
// Buttons drop, per breakpoint:
const BUTTONS_PUSH_DOWN_MOBILE = '0px'
const BUTTONS_PUSH_DOWN_DESKTOP = 'w50px'

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
  const { site } = useWordPressContent()
  return (
    <section
      id="top"
      className="hero-root relative flex flex-col justify-between isolate overflow-hidden bg-bg-0"
      style={{ paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)' }}
    >
      <style>{`
        .hero-root{
          min-height:${HERO_HEIGHT_MOBILE};
          padding-bottom:0;
        }
        @media(min-width:900px){
          .hero-root{
            min-height:${HERO_HEIGHT_DESKTOP};
            padding-bottom:max(clamp(3rem,8vh,6rem), calc(${BUTTONS_PUSH_DOWN_DESKTOP} + 28px));
          }
        }
        .hero-text{padding-top:clamp(42px,min(10vw,10svh),78px)}
        @media(min-width:900px){
          .hero-text{padding-top:calc(${NAV_CLEARANCE} + ${HERO_TEXT_TOP_DESKTOP})}
        }
        /* Sub-900px layout keeps the iPad Mini reference proportions. */
        .hero-h1{font-size:min(10vw,10svh,4.8rem)}
        @media(max-width:899px){
          .hero-text{
            text-align:left;
            padding-right:0;
          }
          .hero-eyebrow{text-align:left}
          .hero-lede-wrap{justify-content:flex-start}
        }
        @media(max-width:599px){
          .hero-root{
            min-height:calc(${HERO_HEIGHT_MOBILE} + ${MOBILE_NAV_GAP} + 110px);
            background-color:${MOBILE_EXTENSION_COLOR};
          }
          .hero-text{
            padding-top:calc(${MOBILE_NAV_GAP} + clamp(42px,min(10vw,10svh),78px));
          }
          .hero-lede-wrap{display:none}
          .hero-mobile-art{
            top:${MOBILE_NAV_GAP};
            height:${HERO_HEIGHT_MOBILE};
            bottom:auto;
          }
        }
        @media(min-width:900px){
          .hero-h1{font-size:clamp(3.4rem, 7.5vw, 6.5rem)}
        }
      `}</style>

      {/* ===== MOBILE + TABLET BACKDROP: matches the iPad Mini reference ===== */}
      <motion.div
        aria-label={site.hero.imageAlt}
        role="img"
        className="hero-mobile-art absolute inset-0 -z-20 overflow-hidden bg-[#1a1816] min-[900px]:hidden"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${site.hero.image})`,
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right top',
          }}
        />
      </motion.div>
      {/* Phone-only nav-to-art gap, blended with the same smoky charcoal used
          beneath the artwork. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 min-[600px]:hidden"
        style={{
          height: MOBILE_NAV_GAP,
          backgroundColor: MOBILE_EXTENSION_COLOR,
          backgroundImage: MOBILE_EXTENSION_BACKGROUND,
        }}
      />
      <div className="absolute inset-0 -z-10 min-[900px]:hidden bg-gradient-to-t from-bg-0 from-[4%] via-bg-0/45 via-[30%] to-transparent to-[70%]" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 min-[600px]:hidden"
        style={{
          top: `calc(${HERO_HEIGHT_MOBILE} + ${MOBILE_NAV_GAP})`,
          backgroundColor: MOBILE_EXTENSION_COLOR,
          backgroundImage: MOBILE_EXTENSION_BACKGROUND,
        }}
      />

      {/* ===== DESKTOP BACKDROP: image right, black left, fluid blend ===== */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-20 hidden bg-no-repeat min-[900px]:block"
        style={{
          width: DESKTOP_IMAGE_WIDTH,
          backgroundImage: 'url(/fallen-gargoyle.png)',
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
        className="hero-text w-full"
        style={{
          // padding (not margin) so the 15px offset can't widen the page
          paddingLeft: HERO_TEXT_LEFT,
        }}
      >
        <motion.p className="hero-eyebrow eyebrow mb-6" {...fade(0.35)}>
          {site.hero.eyebrow}
        </motion.p>

        {/* heading size: min (mobile) / fluid / max (large desktop).
            Layered text-shadow lifts the type off the photo: a tight dark
            edge for definition plus a wide soft halo for contrast. */}
        <h1
          className="hero-h1 h-display mb-7"
          style={{
            textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 4px 18px rgba(0,0,0,0.5), 0 12px 48px rgba(0,0,0,0.4)',
          }}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={line} custom={0} initial="hidden" animate="visible">
              {site.hero.line1}
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
              {site.hero.line2}
            </motion.span>
          </span>
        </h1>

        {/* Supporting line is hidden on phones and remains visible on tablet
            and desktop. */}
        <div className="hero-lede-wrap flex justify-center min-[900px]:justify-start">
          <motion.p
            className="lede inline-block text-center bg-transparent px-0 py-0 min-[900px]:text-ink min-[900px]:text-left"
            style={{
              textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 4px 18px rgba(0,0,0,0.5), 0 12px 48px rgba(0,0,0,0.4)',
            }}
            {...fade(0.55)}
          >
            {site.hero.subtext}
          </motion.p>
        </div>
      </div>

      {/* CTA BUTTONS — anchored low, CENTERED horizontally.
          IMPORTANT: the translateY lives on this OUTER wrapper, not on the
          motion.div — Framer Motion overwrites `transform` on elements it
          animates, which silently cancelled the drop in earlier versions. */}
      <style>{`
        .hero-ctas{--btn-drop:${BUTTONS_PUSH_DOWN_MOBILE}}
        @media(max-width:899px){
          .hero-ctas{
            position:absolute;
            bottom:8px;
            left:0;
            right:0;
          }
        }
        @media(max-width:599px){
          .hero-ctas{
            top:calc(${HERO_HEIGHT_MOBILE} + ${MOBILE_NAV_GAP} + 12px);
            bottom:auto;
          }
        }
        @media(min-width:600px) and (max-width:899px){.hero-ctas{bottom:16px}}
        @media(min-width:900px){.hero-ctas{--btn-drop:${BUTTONS_PUSH_DOWN_DESKTOP}}}
      `}</style>
      <div className="hero-ctas container-site w-full" style={{ transform: 'translateY(var(--btn-drop))' }}>
        <motion.div
          className="flex flex-nowrap gap-2 min-[600px]:gap-4 justify-center"
          {...fade(0.7)}
        >
          <a
            href="#book"
            className="btn btn-fill px-3 py-2 text-[0.55rem] min-[600px]:px-5 min-[600px]:py-3 min-[600px]:text-[0.62rem] min-[900px]:px-[1.9rem] min-[900px]:py-[1.05rem] min-[900px]:text-[0.72rem]"
          >
            {site.hero.primaryCta} <span className="arr">→</span>
          </a>
          <a
            href="#designs"
            className="btn btn-ghost px-3 py-2 text-[0.55rem] min-[600px]:px-5 min-[600px]:py-3 min-[600px]:text-[0.62rem] min-[900px]:px-[1.9rem] min-[900px]:py-[1.05rem] min-[900px]:text-[0.72rem]"
          >
            {site.hero.secondaryCta} <span className="arr">→</span>
          </a>
        </motion.div>

        {/* studio meta — mobile & tablet version: centered under the buttons
            (desktop keeps the absolute bottom-right block below) */}
       <motion.div
  className="min-[900px]:hidden mt-4 flex flex-col items-center gap-1 text-center text-[0.64rem] tracking-[0.22em] uppercase text-ink-faint"
  {...fade(0.9)}
>
  <a
    href="https://www.instagram.com/kevin.inks"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit Kevin Inks on Instagram"
    className="text-ink-dim font-medium inline-flex items-center gap-2 no-underline transition-colors duration-300 hover:text-ink focus-visible:text-ink"
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="ig-grad-hero"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="30%" stopColor="#FA7E1E" />
          <stop offset="55%" stopColor="#D62976" />
          <stop offset="80%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>

      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="url(#ig-grad-hero)"
      />

      <circle
        cx="12"
        cy="12"
        r="4.4"
        stroke="url(#ig-grad-hero)"
      />

      <circle
        cx="17.6"
        cy="6.4"
        r="1.3"
        fill="url(#ig-grad-hero)"
      />
    </svg>

    {site.hero.instagramHandle}
  </a>

  <span>{site.hero.location}</span>
</motion.div>
      </div>

      <motion.div
        className="absolute hidden min-[900px]:flex flex-col gap-1.5 text-right text-[0.68rem] tracking-[0.22em] uppercase text-ink-faint"
        style={{ right: 'var(--pad)', bottom: 'clamp(3rem, 8vh, 6rem)' }}
        {...fade(0.9)}
      >
        <a
          href="https://www.instagram.com/kevin.inks"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Kevin Inks on Instagram"
          className="self-end text-ink-dim font-medium inline-flex items-center gap-2 no-underline transition-colors duration-300 hover:text-ink focus-visible:text-ink"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="ig-grad-hero-desktop"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FEDA75" />
                <stop offset="30%" stopColor="#FA7E1E" />
                <stop offset="55%" stopColor="#D62976" />
                <stop offset="80%" stopColor="#962FBF" />
                <stop offset="100%" stopColor="#4F5BD5" />
              </linearGradient>
            </defs>

            <rect
              x="2.5"
              y="2.5"
              width="19"
              height="19"
              rx="5.5"
              stroke="url(#ig-grad-hero-desktop)"
            />
            <circle
              cx="12"
              cy="12"
              r="4.4"
              stroke="url(#ig-grad-hero-desktop)"
            />
            <circle
              cx="17.6"
              cy="6.4"
              r="1.3"
              fill="url(#ig-grad-hero-desktop)"
            />
          </svg>

          {site.hero.instagramHandle}
        </a>
        <span>{site.hero.desktopNote}</span>
        <span>{site.hero.location}</span>
      </motion.div>
    </section>
  )
}
