/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#0F0F0F',
          1: '#171717',
        },
        ink: {
          DEFAULT: '#F5F1EA',
          dim: 'rgba(245,241,234,0.62)',
          faint: 'rgba(245,241,234,0.38)',
        },
        champagne: '#CFC3B0',
        bronze: '#8D6E63',
        // Red family — deep, editorial, never neon
        oxblood: '#7A1F1F',
        crimson: '#A32C2C',
        'crimson-soft': 'rgba(163,44,44,0.16)',
        line: 'rgba(245,241,234,0.12)',
        'line-strong': 'rgba(245,241,234,0.22)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Archivo', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.24em',
        widest3: '0.32em',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        site: '1400px',
      },
    },
  },
  plugins: [],
}
