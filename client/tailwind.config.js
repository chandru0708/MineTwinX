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
        navy: {
          950: '#040F1D',
          900: '#071B33', // Deep Navy
          850: '#09203C',
          800: '#0B2545', // Midnight Blue
          700: '#133560',
          600: '#1A4982',
        },
        electric: '#1677FF',
        cyan: {
          DEFAULT: '#00D9FF',
          400: '#38E1FF',
          500: '#00D9FF',
          600: '#00B4D8',
        },
        teal: {
          DEFAULT: '#00C9A7',
          400: '#1AD1B2',
          500: '#00C9A7',
        },
        purple: {
          DEFAULT: '#7957FF',
          500: '#7957FF',
          600: '#643EEB',
        },
        violet: {
          DEFAULT: '#A855F7',
          500: '#A855F7',
        },
        orange: {
          DEFAULT: '#FF9F43',
          500: '#FF9F43',
        },
        yellow: {
          DEFAULT: '#FACC15',
          400: '#FACC15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'tech-grid': 'linear-gradient(to right, rgba(22, 119, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(22, 119, 255, 0.08) 1px, transparent 1px)',
        'tech-dots': 'radial-gradient(rgba(0, 217, 255, 0.15) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

