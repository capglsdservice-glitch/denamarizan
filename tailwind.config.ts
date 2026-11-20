import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFF9F3",
        blush: "#F8DDE3",
        rose: "#D98C9D",
        burgundy: "#702D43",
        cherry: "#C7475B",
        champagne: "#E9CDAF",
        ink: "#292124",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.9rem, 6.4vw, 6.4rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.4rem, 5.6vw, 5.2rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.9rem, 3.8vw, 3.4rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
      },
      keyframes: {
        spin360: { to: { transform: "rotate(360deg)" } },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" },
          "50%": { transform: "translateY(-14px) rotate(var(--r,0deg))" },
        },
      },
      animation: {
        "spin-slow": "spin360 26s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
