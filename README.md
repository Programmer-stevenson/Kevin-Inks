# Kevin Inks — Premium Tattoo Artist Brand Site

Dark luxury editorial homepage built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> /dist
npm run preview   # preview the production build
```

## Where to edit things

| What | Where |
|---|---|
| All copy, design cards, work pieces, process steps, contact links | `src/data.ts` |
| Image URLs (hero, portrait, email background) | `IMAGES` in `src/data.ts` |
| Colors / fonts / spacing tokens | `tailwind.config.js` + `src/index.css` |
| Section components | `src/components/` |
| Email signup wiring (ESP) | `src/components/EmailList.tsx` (see TODO) |

## Color system

- Backgrounds: `#0F0F0F` / `#171717`
- Text: `#F5F1EA` (with dim/faint alpha steps)
- Champagne accent: `#CFC3B0`
- Bronze: `#8D6E63`
- Reds (complementary, used sparingly): oxblood `#7A1F1F`, crimson `#A32C2C`

## Notes

- Placeholder photography from Unsplash — swap with real studio photography in `src/data.ts`.
- Scroll reveals + hero stagger use Framer Motion (`whileInView`, `AnimatePresence`).
- `prefers-reduced-motion` is respected via CSS.
