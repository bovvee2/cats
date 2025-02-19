module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './assets/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4E2096',
        'primary-text': '#26203B',
        'text-secondary': '#4D4E4E',
        stroke: '#DFE4E8',
        placeholder: '#B2B2B2',
        danger: '#E03131',
        success: '#08D58B',
        box: '#F1F6FC',
        'box-danger': '#FFF5F5',
        'light-gray': '#F7F7F7',
        'light-gray-2': '#818282',

      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
      },
    },
  },


  plugins: [],
}
