/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        intraship: {
          green: {
            50: "#f0f7f3",
            100: "#e6efe8",
            200: "#c7ded0",
            300: "#9dbba7",
            400: "#6b9c7b",
            500: "#2d7a58",
            600: "#225740",
            700: "#1e4d3a",
            800: "#16382b",
            900: "#10281d",
            950: "#091710",
          },
          sage: "#8fb07a",
          mint: "#e6efe8",
          bg: "#f4f7f4",
          card: "#ffffff",
          border: "#dbe5dd",
          muted: "#6b7c72",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
