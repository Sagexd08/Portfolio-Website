/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,css}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Vibrant purple
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
          dark: '#6D28D9',
          light: '#A78BFA',
        },
        secondary: {
          DEFAULT: '#EC4899', // Vibrant pink
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
          950: '#500724',
          dark: '#BE185D',
          light: '#F472B6',
        },
        neural: {
          light: '#C4B5FD', // Updated to match new primary
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
          glow: '#A78BFA',
          synapse: '#DDD6FE',
        },
        background: {
          light: '#f8fafc',
          DEFAULT: '#0B0F19', // Darker, richer blue-black
          dark: '#050712',
        },
        dark: {
          DEFAULT: '#0F172A', // Rich navy blue
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1E293B', // Slate 800
          900: '#0F172A', // Slate 900
          950: '#050712',
          lighter: '#1E293B', // Lighter navy
          darker: '#050712', // Almost black
        },
        light: {
          DEFAULT: '#f9fafb',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
        'blink': 'blink 1s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'wave': 'wave 2.5s ease-in-out infinite',
        'scale': 'scale 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)', opacity: 0.8 },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)', opacity: 1 },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'top center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'bottom center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left top'
          },
          '25%': {
            'background-size': '200% 200%',
            'background-position': 'right top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom'
          },
          '75%': {
            'background-size': '200% 200%',
            'background-position': 'left bottom'
          }
        },
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'neural-pattern': 'url("/images/neural-bg.svg")',
        'grid-pattern': 'linear-gradient(to right, #8B5CF620 1px, transparent 1px), linear-gradient(to bottom, #8B5CF620 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(#8B5CF615 1px, transparent 1px)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #8B5CF6 0deg, #EC4899 180deg, #8B5CF6 360deg)',
        'hero-gradient': 'linear-gradient(to bottom right, #8B5CF610, #EC489910)',
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      borderWidth: {
        '1': '1px',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.400), 0 0 20px theme(colors.primary.500)',
        'neon-secondary': '0 0 5px theme(colors.secondary.400), 0 0 20px theme(colors.secondary.500)',
        'inner-white': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
