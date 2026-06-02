import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        sans: ["Jost", "sans-serif"],
      },
      colors: {
        ivory:   "#FDFAF5",
        gold:    "#C9A96E",
        "gold-light": "#E8D5AA",
        sage:    "#8A9E8B",
        rose:    "#D4A5A5",
        charcoal:"#2C2926",
        "warm-gray":"#7A746E",
      },
    },
  },
  plugins: [],
};
export default config;
