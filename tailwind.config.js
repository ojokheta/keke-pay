/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: "#121212",
        "surface-2": "#1c1c1e",
        raised: "#232325",
        hair: "rgba(255,255,255,0.10)",
        "hair-2": "rgba(255,255,255,0.16)",
        muted: "rgba(255,255,255,0.62)",
        faint: "rgba(255,255,255,0.36)",
        accent: "#2ee881",
        "accent-ink": "#04150c",
        "green-a": "#0c4a34",
        "green-b": "#1fbf75",
        "gold-a": "#5c3d00",
        "gold-b": "#e6a917",
        "gold-ink": "#1c1200",
        danger: "#ff453a",
      },
      borderRadius: {
        "2xl": "14px",
        "3xl": "22px",
        "4xl": "24px",
      },
    },
  },
  plugins: [],
};
