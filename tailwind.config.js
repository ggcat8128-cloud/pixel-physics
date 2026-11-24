/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          deep: '#000000',
          obsidian: '#040407',
          elevated: '#0a0a10',
          glass: 'rgba(12, 14, 22, 0.7)'
        },
        silver: {
          pure: '#ffffff',
          liquid: '#f1f5f9',
          chrome: '#cbd5e1',
          muted: '#94a3b8',
          dark: '#475569'
        },
        phosphor: {
          red: '#ff1a53',
          green: '#00ff73',
          blue: '#0077ff'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
