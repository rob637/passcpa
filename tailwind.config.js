/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Google-inspired color palette - clean, professional, modern
        primary: {
          50: '#e8f0fe',
          100: '#d2e3fc',
          200: '#aecbfa',
          300: '#8ab4f8',
          400: '#669df6',
          500: '#4285f4',  // Google Blue
          600: '#1a73e8',  // Google Blue (primary)
          700: '#1967d2',
          800: '#185abc',
          900: '#174ea6',
          950: '#0d47a1',
        },
        // Success/Correct - Google Green
        success: {
          50: '#e6f4ea',
          100: '#ceead6',
          200: '#a8dab5',
          300: '#81c995',
          400: '#5bb974',
          500: '#34a853',  // Google Green
          600: '#1e8e3e',
          700: '#188038',
          800: '#137333',
          900: '#0d652d',
        },
        // Warning - Google Yellow/Amber
        warning: {
          50: '#fef7e0',
          100: '#feefc3',
          200: '#fdd663',
          300: '#fcc934',
          400: '#fbbc04',  // Google Yellow
          500: '#f9ab00',
          600: '#f29900',
          700: '#ea8600',
          800: '#e37400',
          900: '#d56e0c',
        },
        // Error/Incorrect - Google Red
        error: {
          50: '#fce8e6',
          100: '#fad2cf',
          200: '#f6aea9',
          300: '#f28b82',
          400: '#ee675c',
          500: '#ea4335',  // Google Red
          600: '#d93025',
          700: '#c5221f',
          800: '#b31412',
          900: '#a50e0e',
        },
        // Neutral grays - carefully tuned for readability
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'sans-serif'
        ],
        mono: ['SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      boxShadow: {
        // Crisp, defined shadows - Google Material 3 inspired
        'soft': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(66, 133, 244, 0.2)',
        'glow-success': '0 0 20px rgba(52, 168, 83, 0.2)',
        // Card specific
        'card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'bounce-soft': 'bounceSoft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'progress': 'progress 1s ease-out forwards',
        'check': 'check 0.4s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'number-up': 'numberUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        progress: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: 'var(--progress-offset, 0)' },
        },
        check: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        numberUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
