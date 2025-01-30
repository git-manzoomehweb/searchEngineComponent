/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          700: "var(--primary-700)",
          600: "var(--primary-600)",
          500: "var(--primary-500)",
          300: "var(--primary-300)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          600: "var(--secondary-600)",
          500: "var(--secondary-500)",
          800: "var(--secondary-800)",
        },
        textColor: {
          DEFAULT: "var(--textColor)",
        },
        bgColor: {
          DEFAULT: "var(--bgColor)",
          100: "var(--bgColor-100)",
          500: "var(--bgColor-500)",
        },
      }
    },
  },
  plugins: [],
}

