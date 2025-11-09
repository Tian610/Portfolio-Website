/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'panchang-extralight': ['Panchang-Extralight', 'sans-serif'],
        'panchang-light': ['Panchang-Light', 'sans-serif'],
        'panchang': ['Panchang-Regular', 'sans-serif'],
        'panchang-medium': ['Panchang-Medium', 'sans-serif'],
        'panchang-semibold': ['Panchang-Semibold', 'sans-serif'],
        'panchang-bold': ['Panchang-Bold', 'sans-serif'],
        'panchang-extrabold': ['Panchang-Extrabold', 'sans-serif'],
        'panchang-variable': ['Panchang-Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}