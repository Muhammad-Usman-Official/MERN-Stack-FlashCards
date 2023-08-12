/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 1s ease infinite",
        "bounce-medium": "bounce 1.2s ease-in infinite",
        "bounce-fast": "bounce 1.3s ease-out infinite",
      },
    },
  },
  plugins: [],
};
