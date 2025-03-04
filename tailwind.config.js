/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-img": "url('./assets/images/서명란.png')",
      },
    },
  },
  plugins: [],
};
