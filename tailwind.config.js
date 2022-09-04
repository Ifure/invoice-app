module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      },
      colors: {
        'dark-blue': '#141625',
        'purple': '#1e2139',
        'bright-purple': '#7c5dfa',
        'modal-blue': '#5259a3',
        'red': ' #ec5757',
        'dark-purple': '#252945',
        'orange': '#ff8f00',
        'green': '#33d69f',
      },
      container: {
        center: true,
      },
     
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
