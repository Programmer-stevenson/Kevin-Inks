import { CONTACT, IMAGES, NAV_LINKS } from './data'

export interface SiteContent {
  brand: string
  navLabels: string[]
  hero: { eyebrow: string; line1: string; line2: string; subtext: string; primaryCta: string; secondaryCta: string; instagramHandle: string; location: string; desktopNote: string; image: string; imageAlt: string }
  work: { eyebrow: string; heading: string; linkLabel: string }
  designs: { eyebrow: string; heading: string; accentHeading: string; intro: string; button: string; memberNote: string }
  experience: { eyebrow: string; headingLine1: string; headingLine2: string; cta: string; steps: Array<{ label: string; title: string; copy: string }> }
  about: { eyebrow: string; heading: string; accentHeading: string; quote: string; image: string; imageAlt: string; imageCaption: string; cta: string; stats: Array<{ n: string; l: string }> }
  email: { eyebrow: string; line1: string; line2: string; line3: string; copy: string; placeholder: string; button: string; success: string; note: string; image: string }
  finalCta: { line1: string; line2: string; copy: string; button: string }
  footer: { tagline: string; copyright: string; locationLine: string; designerLabel: string; designerUrl: string }
  contact: typeof CONTACT
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: 'KEVIN.INKS',
  navLabels: NAV_LINKS.map((link) => link.label),
  hero: { eyebrow: 'Artist First. Tattooer Second.', line1: 'Original Tattoos.', line2: 'Lasting Stories.', subtext: 'Custom artwork designed with meaning.', primaryCta: 'Book Consultation', secondaryCta: 'Browse Designs', instagramHandle: '@Kevin.inks', location: 'Las Vegas, NV', desktopNote: 'By Appointment Only', image: IMAGES.hero, imageAlt: 'Kevin tattooing a client in the studio' },
  work: { eyebrow: 'Portfolio', heading: 'Selected Work', linkLabel: 'View Portfolio' },
  designs: { eyebrow: 'The Design Vault', heading: 'New Designs', accentHeading: 'Available.', intro: "Each piece in the vault is an original composition, drawn once and tattooed once. When a design is claimed, it's retired — your tattoo stays yours alone. Tap any design to take a closer look.", button: 'Explore All Designs', memberNote: 'List members see every drop 48 hours early. Most designs are claimed before they reach this page.' },
  experience: { eyebrow: 'The Experience', headingLine1: 'From First Idea', headingLine2: 'To Lasting Artwork', cta: 'Start Yours', steps: [
    { label: 'Where It Starts', title: 'The Spark', copy: "No forms, no flash books. Just you, me, and the reason you walked in. Tell me the story — I'll find the image hiding inside it." },
    { label: 'The Artwork', title: 'Drawn From Nothing', copy: "Your piece doesn't exist yet. That's the point. I design it from a blank page — one composition, built for your body, refined until neither of us can imagine it any other way." },
    { label: 'The Day', title: 'The Session', copy: 'A private studio. No crowd, no clock. Music you choose, a pace your body sets. The kind of day you end up telling people about along with the tattoo.' },
    { label: 'Decades Later', title: 'Made To Outlast', copy: 'Linework engineered to hold its shape. Healing guidance that comes with follow-up, not a pamphlet. This piece should look deliberate at year one and year thirty.' },
  ] },
  about: { eyebrow: 'About Kevin', heading: 'Art Is', accentHeading: 'Personal.', quote: "I'm Kevin, a tattoo artist who believes every tattoo should carry meaning, and every client deserves the best experience.", image: IMAGES.portrait, imageAlt: 'Portrait of Kevin in his studio', imageCaption: 'Est. Studio Practice', cta: 'Read My Story', stats: [{ n: '10+', l: 'Years Tattooing' }, { n: '100%', l: 'Original Designs' }, { n: '1:1', l: 'Private Sessions' }] },
  email: { eyebrow: 'The Inner Circle', line1: 'New Designs.', line2: 'Exclusive Access.', line3: 'Early Booking.', copy: "Instagram decides who sees my work. The list doesn't. Members get every design drop 48 hours early, first access to booking openings, and the stories behind each piece — straight to your inbox, nothing else.", placeholder: 'YOUR EMAIL ADDRESS', button: 'Join The List', success: "You're in. Watch your inbox for the next drop.", note: 'One or two emails a month. No noise. Unsubscribe anytime.', image: IMAGES.emailBg },
  finalCta: { line1: 'Ready To Start', line2: 'Your Next Piece?', copy: "Consultations are free, unhurried, and obligation-free. Bring an idea — even a half-formed one — and we'll find the artwork inside it.", button: 'Book Consultation' },
  footer: { tagline: 'Original Tattoos. Lasting Stories.', copyright: '© 2026 Kevin Inks ● Original artwork only', locationLine: 'Private Studio — By Appointment — Las Vegas, NV', designerLabel: 'Plexura', designerUrl: 'https://plexura.net' },
  contact: CONTACT,
}
