import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0E0F12",
        gold: "#D4AF37",
        silver: "#E5E5E5",
        bone: "#F9F7F2",
        charcoal: "#1A1A1A",
        cloud: "#F6F4EF",
        amber: "#D4AF37",
        espresso: "#1B1410"
      },
      fontFamily: {
        heading: ["var(--font-playfair-display)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      letterSpacing: {
        luxe: "0.2em"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" }
        }
      },
      animation: {
        "fade-up": "fade-up 900ms ease-out both",
        "ken-burns": "ken-burns 6s ease-out both"
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
