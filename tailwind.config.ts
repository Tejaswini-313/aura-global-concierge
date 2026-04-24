import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        gold: "#C5A059",
        silver: "#E5E5E5"
      },
      fontFamily: {
        heading: ["var(--font-playfair-display)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      letterSpacing: {
        luxe: "0.2em"
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
