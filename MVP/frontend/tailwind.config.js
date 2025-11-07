/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#eb7f6f',
          hover: '#e87b6a',
          active: '#e56959',
          light: 'rgba(231, 109, 87, 0.1)',
        },
        cream: {
          DEFAULT: '#f8f3eb',
          hover: '#f0e8d9',
          active: '#e5ddd5',
        },
        border: {
          light: '#e5ddd5',
          medium: '#cdc9c1',
        },
        text: {
          primary: '#000000',
          secondary: '#6B6563',
          tertiary: '#cdc9c1',
        },
      },
      fontFamily: {
        heading: ["'Figtree:Bold'", 'sans-serif'],
        body: ["'SF_Pro_Rounded:Regular'", 'sans-serif'],
      },
      spacing: {
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
      },
      borderRadius: {
        '4xl': '30px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}