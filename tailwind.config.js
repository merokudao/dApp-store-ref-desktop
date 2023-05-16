/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      container: {
        center:true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        'canvas-color':'#0a090d',
        'border-color': '#2D2C33',
      },
      fontSize: {
        '4xl': ['2rem', "120%"],
        '5xl': ['2.625rem',"114%"],
      },
    },
  },
  plugins: [],
}

