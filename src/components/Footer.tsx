import { CONTACT } from '../data'
import { Reveal } from './Reveal'

const COLUMNS = [
  {
    heading: 'Follow',
    links: [
      { label: 'Instagram', href: CONTACT.instagram, external: true },
      { label: 'Threads', href: CONTACT.threads, external: true },
      { label: 'TikTok', href: CONTACT.tiktok, external: true },
      { label: 'Google Reviews', href: CONTACT.googleBusiness, external: true },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { label: 'Book Consultation', href: '#book', external: false },
      { label: 'Email', href: `mailto:${CONTACT.email}`, external: false },
      { label: 'Privacy Policy', href: '#', external: false },
      { label: 'Terms', href: '#', external: false },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-line"
      style={{ padding: 'clamp(3.5rem,7vw,5.5rem) var(--pad) 3rem', background: '#0A0A0A' }}
    >
      {/* ===== LINEWORK ANIMATION =====
          Thin white lines that draw themselves across the black, like a
          single-needle pass — then retrace, endlessly. Pure CSS stroke
          animation, no JS, respects prefers-reduced-motion globally. */}
      <style>{`
        .foot-line{
          fill:none;stroke:#F5F1EA;stroke-width:1;vector-effect:non-scaling-stroke;
          stroke-dasharray:1200;stroke-dashoffset:1200;
          animation:foot-draw 14s ease-in-out infinite alternate;
        }
        .foot-line:nth-child(2){animation-delay:-3s;opacity:.55}
        .foot-line:nth-child(3){animation-delay:-6s;opacity:.4}
        .foot-line:nth-child(4){animation-delay:-9s;opacity:.3}
        .foot-line:nth-child(5){animation-delay:-11s;opacity:.45}
        .foot-line:nth-child(6){animation-delay:-13s;opacity:.25}
        @keyframes foot-draw{
          0%{stroke-dashoffset:1200;opacity:0}
          12%{opacity:.16}
          88%{opacity:.16}
          100%{stroke-dashoffset:0;opacity:.06}
        }
      `}</style>
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMid slice"
      >
        <path className="foot-line" d="M-40 330 C 180 240, 320 410, 540 320 S 900 180, 1120 300 S 1380 380, 1500 290" />
        <path className="foot-line" d="M-40 120 C 200 200, 420 60, 660 140 S 1020 240, 1240 130 S 1420 80, 1500 150" />
        <path className="foot-line" d="M-40 230 C 260 150, 480 290, 760 220 S 1140 110, 1500 210" />
        <path className="foot-line" d="M-40 50 C 240 110, 520 10, 780 70 S 1180 150, 1500 60" />
        <path className="foot-line" d="M-40 390 C 300 350, 560 430, 860 380 S 1260 300, 1500 370" />
        <path className="foot-line" d="M-40 175 C 160 95, 400 215, 640 165 S 980 70, 1260 180 S 1440 230, 1500 190" />
      </svg>

      <div className="container-site relative flex flex-col items-center text-center gap-12">
        {/* brand mark + social logos */}
        <Reveal className="flex flex-col items-center gap-3">
          <a href="#top" className="font-display text-2xl tracking-[0.06em] text-ink no-underline">
            KEVIN<span className="text-crimson">.</span>INKS
          </a>
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-ink-faint">
            Original Tattoos. Lasting Stories.
          </p>

          {/* logo row: Instagram / Threads / Google Business Profile.
              Framed icon plaques: corner brackets draw in on hover, the icon
              warms to gold, a micro-label sits beneath each. */}
          <style>{`
            .soc{position:relative;transition:all .45s cubic-bezier(.22,1,.36,1)}
            .soc::before,.soc::after{
              content:"";position:absolute;width:10px;height:10px;
              border:0 solid #C9A55F;opacity:0;
              transition:all .45s cubic-bezier(.22,1,.36,1);
            }
            .soc::before{top:-1px;left:-1px;border-top-width:1px;border-left-width:1px;transform:translate(4px,4px)}
            .soc::after{bottom:-1px;right:-1px;border-bottom-width:1px;border-right-width:1px;transform:translate(-4px,-4px)}
            .group:hover .soc{transform:translateY(-3px);box-shadow:0 10px 28px rgba(201,165,95,.16)}
            .group:hover .soc::before,.group:hover .soc::after{opacity:1;transform:translate(0,0)}
          `}</style>
          <div className="flex items-start gap-6 mt-5">
            {[
              {
                href: CONTACT.instagram,
                label: 'Instagram',
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                    <defs>
                      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FEDA75" />
                        <stop offset="30%" stopColor="#FA7E1E" />
                        <stop offset="55%" stopColor="#D62976" />
                        <stop offset="80%" stopColor="#962FBF" />
                        <stop offset="100%" stopColor="#4F5BD5" />
                      </linearGradient>
                    </defs>
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="url(#ig-grad)" />
                    <circle cx="12" cy="12" r="4.4" stroke="url(#ig-grad)" />
                    <circle cx="17.6" cy="6.4" r="1.15" fill="url(#ig-grad)" />
                  </svg>
                ),
              },
              {
                href: CONTACT.threads,
                label: 'Threads',
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="th-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#9C948A" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#th-grad)" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.471 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32l-1.757-1.18c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
                  </svg>
                ),
              },
              {
                href: CONTACT.googleBusiness,
                label: 'Reviews',
                icon: (
                  <svg width="19" height="19" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                ),
              },
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener"
                aria-label={soc.label}
                className="group flex flex-col items-center gap-2.5 no-underline"
              >
                <span className="soc grid place-items-center w-12 h-12 border border-line-strong bg-bg-1/50 text-ink-dim transition-colors duration-500 group-hover:border-gold/70 group-hover:text-gold">
                  {soc.icon}
                </span>
                <span className="text-[0.52rem] tracking-[0.28em] uppercase text-ink-faint transition-colors duration-300 group-hover:text-gold">
                  {soc.label}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* two columns — on every screen size, centered */}
        <Reveal delay={1} className="grid grid-cols-2 gap-x-10 gap-y-0 w-full max-w-xl">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col items-center gap-4">
              <h3 className="text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-gold">
                {col.heading}
              </h3>
              <ul className="flex flex-col items-center gap-3.5 list-none">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
                      className="text-ink-dim no-underline text-[0.7rem] tracking-[0.18em] uppercase transition-colors duration-300 hover:text-gold active:text-gold focus-visible:text-gold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        {/* bottom line */}
        <Reveal
          delay={2}
          className="w-full pt-8 border-t border-line flex flex-col items-center gap-2 text-[0.62rem] text-ink-faint tracking-[0.14em] uppercase"
        >
          <span>
            © 2026 Kevin Inks <span className="text-crimson">●</span> Original artwork only
          </span>
          <span>Private Studio — By Appointment — Las Vegas, NV</span>
          <a
            href="https://plexura.net"
            target="_blank"
            rel="noopener"
            className="no-underline text-ink-faint transition-colors duration-300 hover:text-gold active:text-gold"
          >
            Designed by <span className="text-[#E3C77F] font-semibold">Plexura</span>
          </a>
        </Reveal>
      </div>
    </footer>
  )
}