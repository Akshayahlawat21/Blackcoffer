/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        bento: {
          bg: '#f4f5f7',
          card: '#ffffff',
          sidebar: '#fbfcfd',
          border: '#edf0f2',
          subtle: '#e2e6ea',
          darkGreen: '#0f482f',
          deepGreen: '#0a3522',
          accentMint: '#34d399',
          lightMint: '#d1fae5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'bento': '0 2px 12px -2px rgba(0, 0, 0, 0.04), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'bento-hover': '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.03)',
        'emerald-glow': '0 8px 24px -4px rgba(15, 72, 47, 0.35)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
