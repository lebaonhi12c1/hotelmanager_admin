/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotateY: {
          '0%': {
            transform: 'rotateY(0deg)',
          },
          '100%': {
            transform: 'rotateY(360deg)',
          },
        },
      },
      animation: {
        'spin-y': 'rotateY 3s linear infinite', // Sử dụng keyframes animation ở đây
      },
    },
  },
  plugins: [],
}