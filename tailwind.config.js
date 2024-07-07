// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'light-blue': '#87CEEB',
        'light-purple': '#E6E6FA',
        'light-pink': '#FFB6C1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}