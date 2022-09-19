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
      fontSize: {
        'tiny': 'clamp(0.55rem, 0.49090903rem + 0.727273vw, 0.75rem)',
        'base': 'clamp(0.75rem, 0.62454538rem + 0.976364vw, 1rem)',
        'md': 'clamp(1.18rem, 0.94454538rem + 1.076364vw, 1.55rem)',
        'lg': 'clamp(1.35rem, 0.93636366rem + 1.890909vw, 2rem)',
        'xl': 'clamp(1.7rem, 0.73636366rem + 3.490909vw, 3rem)',
        '2xl': 'clamp(2rem, -0.22727269rem + 10.181818vw, 5.5rem)',

      },
      padding: {
        'sm': 'clamp(12px, 6.615383px + 1.538462vw, 22px)',
        'md': 'clamp(24px, 15.384617px + 2.461538vw, 40px)',
        'lg': 'clamp(32px, 8.8461525px + 6.615385vw, 75px)',
      },
      space: {
        'sm': 'clamp(12px, 6.615383px + 1.538462vw, 22px)',
        'md': 'clamp(24px, 15.384617px + 2.461538vw, 40px)',
        'lg': 'clamp(32px, 8.8461525px + 6.615385vw, 75px)',
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
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateZ(0)'
          },
          'to': {
            transform: 'translate3d(-100%,0,0)'
          }
        }
      }

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

// @-webkit-keyframes slidein {
//   0% {
//       transform: translateZ(0)
//   }

//   to {
//       transform: translate3d(-100%,0,0)
//   }
// }

// @keyframes slidein {
//   0% {
//       transform: translateZ(0)
//   }

//   to {
//       transform: translate3d(-100%,0,0)
//   }
// }
