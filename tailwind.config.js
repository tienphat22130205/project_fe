/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35',
        secondary: '#004e92',
        brand: '#0069ad',
      },
      fontFamily: {
        'heading': ['Tahoma', 'Arial', 'sans-serif'],
        'body': ['Tahoma', 'Arial', 'sans-serif'],
        'sans': ['Tahoma', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'normal': '400',
        'bold': '700',
      },
    },
  },
  plugins: [],
}
