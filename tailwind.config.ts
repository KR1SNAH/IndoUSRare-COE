import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd2ff",
          300: "#8fb4ff",
          400: "#5c8dff",
          500: "#3466f6",
          600: "#2249e0",
          700: "#1b39b3",
          800: "#1a318c",
          900: "#1a2e70",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
