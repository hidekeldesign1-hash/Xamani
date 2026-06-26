/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        xamani: {
          navy: "#113345",
          "navy-surface": "#0f1d2c",
          silver: "#babab9",
          wine: "#771335",
          cyan: "#6ec4d9",
          "navy-deep": "#0a1f2c",
          "navy-light": "#1a4a5e",
          "silver-muted": "#8a8a89",
          "wine-muted": "#5c0e28",
        },
      },
      fontFamily: {
        ambit: ["var(--font-ambit)", "system-ui", "sans-serif"],
        archia: ["var(--font-archia)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "0.08em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "0.06em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "0.04em" }],
        micro: ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.35em" }],
      },
      spacing: {
        section: "clamp(4rem, 10vh, 8rem)",
      },
      borderRadius: {
        pill: "9999px",
        card: "1.5rem",
        "card-lg": "2.5rem",
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.24)",
        glow: "0 0 40px rgba(110, 196, 217, 0.08)",
        "glow-wine": "0 0 40px rgba(119, 19, 53, 0.12)",
      },
      animation: {
        "scroll-chevron": "scroll-chevron 2s ease-in-out infinite",
      },
      keyframes: {
        "scroll-chevron": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};
