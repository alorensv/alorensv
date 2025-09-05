/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#1a1a1a',
        'secondary': '#2d2d2d',
        'accent': '#00ff9d'
      },
      fontFamily: {
        'bahnschrift': ['Bahnschrift', 'Arial', 'sans-serif'],
      },
      animation: {
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        matrix: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        }
      }
    },
  },
  plugins: [],
}
