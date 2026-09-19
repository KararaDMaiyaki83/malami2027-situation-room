/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        adc: {
          emerald: "#059669",
          teal: "#0d9488",
          dark: "#022c22",
          navy: "#0f172a",
          gold: "#f59e0b",
          red: "#ef4444"
        },
        kebbi: {
          green: "#047857",
          gold: "#d97706",
          slate: "#0f172a"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
