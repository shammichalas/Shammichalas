/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          orange: '#f97316',
          gold: '#fbbf24',
          rose: '#f43f5e',
          purple: '#8b5cf6',
          dark: '#030712',
          card: 'rgba(15, 23, 42, 0.45)',
          border: 'rgba(249, 115, 22, 0.15)',
        },
        space: {
          dark: '#02040a',
          slate: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        }
      },
      boxShadow: {
        'glow-orange': '0 0 25px rgba(249, 115, 22, 0.3)',
        'glow-purple': '0 0 25px rgba(139, 92, 246, 0.3)',
        'glow-gold': '0 0 25px rgba(251, 191, 36, 0.3)',
      }
    },
  },
  plugins: [],
}
