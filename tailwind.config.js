/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-4': 'repeat(4, minmax(0, auto))'
      }
    },
  },
  plugins: [require('daisyui')],
}
