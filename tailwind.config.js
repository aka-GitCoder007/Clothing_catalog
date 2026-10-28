/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#050505',
          900: '#080808',
          850: '#0e0e0e',
          800: '#141414',
          750: '#1a1a1a',
          700: '#222222',
          600: '#333333',
          500: '#555555',
          400: '#888888',
          300: '#A0A0A0',
          200: '#CCCCCC',
          100: '#E8E8E6',
          50: '#F5F3EE',
        },
        brand: {
          accent: '#9E1B22',
          'accent-bright': '#D12630',
          silver: '#C4C4C4',
          titanium: '#8F9094',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.25em',
        mega: '0.35em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

