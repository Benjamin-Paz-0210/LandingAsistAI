/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0b1f14",
          900: "#14532d",
          800: "#166534",
          700: "#15803d",
          600: "#16a34a",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e4c766",
          dark: "#a3841c",
        },
        ivory: "#f4f1e8",
        stoneink: "#3d4550",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(12, 36, 22, 0.4)",
      },
      backgroundImage: {
        campus:
          "linear-gradient(180deg, rgba(11,31,20,0.72), rgba(11,31,20,0.55)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80')",
      },
    },
  },
  plugins: [],
};
