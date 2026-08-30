/* ============================================================
   All editable content lives here.
   Swap image URLs for real photography / design scans.
   ============================================================ */

export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'My Craft', href: '#work' },
  { label: 'Available Designs', href: '#designs' },
  { label: 'Your Experience', href: '#experience' },
  { label: 'About Me', href: '#about' },
  
] as const

export interface WorkPiece {
  num: string
  title: string
  tag: string
  img: string
  alt: string
}

export const WORK: WorkPiece[] = [
  {
    num: '01',
    title: 'Purple Rose',
    tag: 'Fine Line',
    img: '/purple-rose.jpg',
    alt: 'Purple Rose',
  },
  {
    num: '02',
    title: 'Undead Bride',
    tag: 'Black & Grey',
    img: '/green-ribs.jpg',
    alt: 'Undead Bride',
  },
  {
    num: '03',
    title: 'Hopper',
    tag: 'Illustrative',
    img: '/hopprt.jpg',
    alt: 'Hopper',
  },
  {
    num: '04',
    title: 'Eternal Dragon',
    tag: 'Blackwork',
    img: 'dragon.jpg',
    alt: 'Dragon Ball',
  },
  {
    num: '05',
    title: 'Tiger',
    tag: 'Micro Realism',
    img: 'tiger.jpg',
    alt: 'Tiger',
  },
]

export type DesignStatus = 'available' | 'one-of-one' | 'reserved'

export interface Design {
  title: string
  status: DesignStatus
  statusLabel: string
  placement: string
  size: string
  img: string
  alt: string
}

export const DESIGNS: Design[] = [
  {
    title: 'Warrior',
    status: 'one-of-one',
    statusLabel: '1 of 1 — Available',
    placement: 'Inner forearm',
    size: '5–7 in',
    img: '/amazon.jpg',
    alt: 'Still Water — original design study',
  },
  {
    title: 'Skull Cowboy',
    status: 'available',
    statusLabel: 'Available',
    placement: 'Upper arm / calf',
    size: '6–9 in',
    img: '/cowboy.jpg',
    alt: 'Quiet Hours — original design study',
  },
  {
    title: 'Prosperity',
    status: 'available',
    statusLabel: 'Available',
    placement: 'Outer thigh',
    size: '8–12 in',
    img: '/blue-rose.jpg',
    alt: 'The Long Field — original design study',
  },
  {
    title: 'Angel',
    status: 'reserved',
    statusLabel: 'Reserved',
    placement: 'Sternum / spine',
    size: '4–6 in',
    img: '/angel-deer.jpg',
    alt: 'Vesper — original design study',
  },
]

export interface Step {
  num: string
  title: string
  copy: string
}

export const STEPS: Step[] = [
  {
    num: '01',
    title: 'Discovery',
    copy: 'We start with a conversation, not a deposit. You bring the story — a person, a place, a chapter you closed. I listen for the detail worth keeping forever.',
  },
  {
    num: '02',
    title: 'Original Design',
    copy: "I draw your piece from scratch. No flash, no recycled references. You'll see the composition before the session and we refine it until it feels inevitable.",
  },
  {
    num: '03',
    title: 'The Session',
    copy: 'A chill studio, unhurried pace, and a process built around your comfort. The day should feel like part of the story — not something to get through.',
  },
  {
    num: '04',
    title: 'Artwork That Lasts',
    copy: 'Healing guidance, follow-up touchpoints, and work engineered to age well. Decades from now, it should still read the way it did on day one.',
  },
]

export const IMAGES = {
  hero: '/fallen-angel.png',
  emailBg: '/sexy.jpg', // <- your image, must live at public/sexy.jpg
  portrait: '/kevin-tatts.jpg',
}

export const CONTACT = {
  email: 'hello@kevininks.com',
  phone: '702-508-8136',
  phoneE164: '+17025088136',
  consultationText: "Hi Kevin, I'd like to book a tattoo consultation.",
  instagram: 'https://www.instagram.com/kevin.inks/',
  threads: 'https://www.threads.com/@kevin.inks',
  tiktok: 'https://tiktok.com',
  // Google Business Profile — replace with the real share link (g.page/r/...)
  googleBusiness: 'https://g.page/',
}