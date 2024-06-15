import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marjan: {
          "50": "#f1f8f5",
          "100": "#ddeee5",
          "200": "#bdddce",
          "300": "#90c5b0",
          "400": "#61a68d",
          "500": "#418b72",
          "600": "#2e6d59",
          "700": "#255749",
          "800": "#1f463b",
          "900": "#1a3a31",
          "950": "#0e201c",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
