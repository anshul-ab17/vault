import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0e12",
        foreground: "#f2f3f7",
        edge: "rgba(255, 255, 255, 0.08)",
        snow: "#13151b",
        mist: "#1a1d26",
        ink: "#08090c",
        graphite: "#14161f",
        cement: "#0f1117",
        primary: {
          DEFAULT: "#7c5ce6",
          hover: "#6b4ad8",
          subtle: "rgba(124, 92, 230, 0.12)",
        },
        amber: {
          accent: "#d69e1f",
        }
      },
      fontFamily: {
        mono: ["Geist Mono", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
