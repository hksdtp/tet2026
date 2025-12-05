/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        incanto: {
          // Primary colors - INCANTO 2026 Theme
          primary: '#40979A',      // Teal - Xanh lam ngọc chủ đạo
          secondary: '#3A5777',    // Xanh đen/Indigo - cho chi tiết
          accent: '#C4A76C',       // Vàng đồng - điểm nhấn sang trọng
          gold: '#D8B36A',         // Vàng đồng sáng hơn

          // Background colors
          'bg-main': '#81D8D0',    // Teal nhạt - background chính
          dark: '#2D3B3C',         // Xanh đen đậm
          light: '#E9DCCF',        // Kem ngà - background nhạt
          cream: '#F5F0E8',        // Kem nhạt hơn
          'cloud-dancer': '#F0EDE5', // Pantone Cloud Dancer 2026 - trắng ấm

          // Accent colors
          brown: '#6B4C33',        // Nâu gỗ - ấm áp
          leaf: '#758C5A',         // Xanh lá cây xám - thiên nhiên

          // Teal variants
          teal: '#40979A',         // Teal (alias)
          'teal-dark': '#357577',  // Teal đậm hơn cho hover
          'teal-light': '#5AACAE', // Teal nhạt hơn
          'teal-soft': '#81D8D0',  // Teal rất nhạt
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Noto Serif SC', 'Georgia', 'sans-serif'],
        display: ['Cinzel', 'Noto Serif SC', 'Georgia', 'serif'],
        serif: ['Cinzel', 'Noto Serif SC', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 40px rgba(139, 69, 19, 0.15)',
        'glow-strong': '0 0 60px rgba(139, 69, 19, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
}
