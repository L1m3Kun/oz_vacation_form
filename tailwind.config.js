/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-img": "url('./assets/images/사인칸.png')",
      },
    },
  },
  plugins: [],
};
