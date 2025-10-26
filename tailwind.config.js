/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#16a34a',
          600: '#15803d',
          700: '#166534',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        medical: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        success: {
          500: '#16a34a',
          600: '#15803d',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'gradient-primary-dark': 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
        'gradient-primary-light': 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
        'gradient-success': 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-cool': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        'gradient-warm': 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
        'gradient-health': 'linear-gradient(135deg, #16a34a 0%, #14b8a6 100%)',
        'gradient-medical': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
        'gradient-teal': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'gradient-vibrant': 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(22, 163, 74, 0.05) 100%)',
        'gradient-professional': 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,250,0.95) 100%)',
      },
    },
  },
  plugins: [],
}
