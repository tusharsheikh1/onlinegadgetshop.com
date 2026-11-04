import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { navy: "#101828", brand: { DEFAULT: "#2563EB", dark: "#1D4ED8", soft: "#EFF4FF" }, ink: { DEFAULT: "#101828", muted: "#475467", faint: "#98A2B3" }, line: "#E4E7EC", surface: "#F7F9FC" },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      borderRadius: { xl: "12px", "2xl": "16px" },
      boxShadow: { card: "0 1px 2px rgba(16,24,40,.05)", pop: "0 8px 24px rgba(16,24,40,.12)" },
    },
  },
  plugins: [],
};
export default config;
