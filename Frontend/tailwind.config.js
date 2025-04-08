/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { // Default variant
          dark: '#15161b ',   // Dark variant
        },
        secondary: {
          dark: '#1e2029',
        }
      },
    },
  },
  plugins: [],
}