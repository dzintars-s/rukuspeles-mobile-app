/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rs-green':'#8dc642',
        'rs-dark-blue':'#0b3677',
        'rs-yellow':'#ffcb7e',
        'rs-blue': "#7eb2ff",
        'rs-pink': '#ee378e',
      }
    },
  },
  plugins: [],
}