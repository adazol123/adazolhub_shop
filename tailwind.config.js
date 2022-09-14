/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'Roboto', 'Ubuntu', 'sans-serif']
      },
      colors: {
        'theme-gray': {
          700: '#575E5C',
          600: '#A3A9A7',
          500: '#B3BCB9',
          300: '#D3E0DD',
          100: '#E9F2F0'
        },
        'marine': {
          900: '#1B3E39',
          700: '#2E6962',
          500: '#4D9C93',
          300: '#52B6AA',
          100: '#DFF7F5',
        },
        'theme-dark': 'var(--color-theme-dark)',
        'theme-light': 'var(--color-theme-light)',
      },
    },
  },
  plugins: [],
}
