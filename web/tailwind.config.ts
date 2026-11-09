import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1220", 800: "#111A2E", 700: "#1B2540" },
        brand: { DEFAULT: "#2563EB", dark: "#1D4ED8", soft: "#EEF3FF", 50: "#F5F8FF" },
        ink: { DEFAULT: "#0B1220", muted: "#4B5565", faint: "#9AA4B2" },
        line: "#E6E9EF",
        surface: "#F5F7FA",
      },
      fontFamily: { sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"] },
      borderRadius: { xl: "12px", "2xl": "18px", "3xl": "24px" },
      boxShadow: {
        card: "0 1px 2px rgba(11,18,32,.04)",
        lift: "0 1px 2px rgba(11,18,32,.04), 0 12px 32px -8px rgba(11,18,32,.12)",
        pop: "0 12px 40px -6px rgba(11,18,32,.18)",
        glow: "0 8px 24px -6px rgba(37,99,235,.45)",
      },
    },
  },
  plugins: [],
};
export default config;
