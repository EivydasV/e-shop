const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
      },
      fontFamily: {
        body: ['Nunito', 'sans-serif'],
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    // require('@tailwindcss/custom-forms'),
  ],
}
