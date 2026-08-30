import { Reveal } from './Reveal'

// Place Hounds(2).jpg in the project's public folder so this path resolves.
const STUDIO = {
  name: 'Houndstooth Tattoo Studio',
  address: '4045 S Buffalo Dr, A109',
  city: 'Las Vegas, Nevada',
  image: '/Hounds(2).jpg',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=4045%20S%20Buffalo%20Dr%20A109%2C%20Las%20Vegas%2C%20NV',
  googleBusiness: 'https://share.google/yOOHZ19SVHRyVjGOM',
  instagram: 'https://www.instagram.com/houndstoothtattoo_lv/',
  instagramHandle: '@houndstoothtattoo_lv',
} as const

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.89h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.24c1.9-1.75 2.98-4.33 2.98-7.37Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.4l-3.24-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.13H3.06v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.91A6.02 6.02 0 0 1 6.1 12c0-.66.11-1.3.31-1.91v-2.6H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.51l3.35-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.8.51 3.84 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.94 5.49l3.35 2.6C7.2 7.72 9.4 5.96 12 5.96Z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="ig-grad-studio" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="30%" stopColor="#FA7E1E" />
          <stop offset="55%" stopColor="#D62976" />
          <stop offset="80%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="url(#ig-grad-studio)" />
      <circle cx="12" cy="12" r="4.4" stroke="url(#ig-grad-studio)" />
      <circle cx="17.6" cy="6.4" r="1.3" fill="url(#ig-grad-studio)" />
    </svg>
  )
}

export function Studio() {
  return (
    <section
      id="studio"
      className="section-pad relative overflow-hidden border-y border-[#3b2b23] bg-[#080706]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#6e1118]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#c9aa7c]/10 blur-3xl"
      />

      <div className="container-site relative">
        <Reveal>
          <article className="relative overflow-hidden rounded-[1.5rem] border border-[#c9aa7c]/30 bg-[#090807] shadow-[0_32px_120px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#dbc08f] to-transparent" />

            {/* Thin editorial frame above the panoramic artwork. */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#c9aa7c]/20 bg-[#090807]/95 px-6 py-4 sm:px-9">
              <span className="text-[0.6rem] uppercase tracking-[0.32em] text-[#9d8568]">
                Kevin Inks · Studio
              </span>
              <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.28em] text-[#c9aa7c]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8f1921] shadow-[0_0_14px_rgba(143,25,33,0.95)]" />
                Las Vegas, Nevada
              </span>
            </div>

            {/* Natural 1672×941 ratio. Desktop displays it at 83% width —
                exactly 17% smaller — while mobile and tablet remain full width. */}
            <div className="relative bg-black min-[900px]:py-8">
              <div className="group relative mx-auto w-full overflow-hidden min-[900px]:w-[83%] min-[900px]:rounded-xl min-[900px]:border min-[900px]:border-[#c9aa7c]/25 min-[900px]:shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                <img
                  src={STUDIO.image}
                  alt="Houndstooth Tattoo Studio artwork featuring a traditional black dog on an oxblood background"
                  width="1672"
                  height="941"
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.012]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#090807] to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#e0c08e]/10"
                />
              </div>
            </div>

            {/* Information panel continues the colors and texture of the artwork. */}
            <div
              className="relative border-t border-[#c9aa7c]/25"
              style={{
                background: 'linear-gradient(135deg, #190d0c 0%, #090807 48%, #24090c 100%)',
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[8%] top-0 h-px w-[42%] bg-gradient-to-r from-[#8f1921] via-[#d1af7b] to-transparent"
              />

              <div className="grid gap-9 p-7 sm:p-10 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[1100px]:gap-14 min-[1100px]:p-14">
                <div>
                  <p className="mb-5 text-[0.62rem] uppercase tracking-[0.34em] text-[#b28e62]">The Studio</p>
                  <h2
                    className="h-display mb-6 text-[#f0e5d0]"
                    style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}
                  >
                    Houndstooth
                    <span className="block text-[#c9a66f]">Tattoo Studio</span>
                  </h2>

                  <p
                    className="max-w-[39em] text-[#aa9b8b]"
                    style={{ fontSize: 'clamp(1rem, 1.3vw, 1.14rem)', lineHeight: 1.75 }}
                  >
                    Kevin works from Houndstooth Tattoo Studio in Las Vegas. Find the studio, view its
                    Google Business Profile, or explore its work and artists on Instagram.
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-full rounded-xl border border-[#c9aa7c]/25 bg-black/25 p-5 backdrop-blur-sm sm:p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9aa7c]/35 bg-[#c9aa7c]/[0.06] text-[#d7b77f]">
                        <MapPinIcon />
                      </span>
                      <div className="min-w-0">
                        <p className="mb-2 text-[0.55rem] uppercase tracking-[0.28em] text-[#8e7a65]">
                          Studio Address
                        </p>
                        <address className="not-italic">
                          <span className="block text-sm font-medium tracking-[0.06em] text-[#eee3cf]">
                            {STUDIO.address}
                          </span>
                          <span className="mt-1.5 block text-xs tracking-[0.12em] text-[#a28e76]">
                            {STUDIO.city}
                          </span>
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#c9aa7c]/20 bg-black/20 px-7 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:px-10 min-[1100px]:px-14">
                <span className="mb-1 text-[0.55rem] uppercase tracking-[0.28em] text-[#8e7a65] sm:mb-0 sm:mr-auto">
                  Visit Houndstooth
                </span>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={STUDIO.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-fill inline-flex items-center justify-center gap-2 whitespace-nowrap border-[#8f1921] bg-[#7b151c] hover:bg-[#941c25]"
                    aria-label={`Get directions to ${STUDIO.name}`}
                  >
                    <MapPinIcon />
                    Directions
                  </a>

                  <a
                    href={STUDIO.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost inline-flex items-center justify-center gap-2 whitespace-nowrap border-[#c9aa7c]/30 hover:border-[#c9aa7c]/70"
                    aria-label={`View ${STUDIO.name} on Google`}
                  >
                    <GoogleIcon />
                    Google Profile
                  </a>

                  <a
                    href={STUDIO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost inline-flex items-center justify-center gap-2 whitespace-nowrap border-[#c9aa7c]/30 hover:border-[#c9aa7c]/70"
                    aria-label={`Visit ${STUDIO.name} on Instagram at ${STUDIO.instagramHandle}`}
                  >
                    <InstagramIcon />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}