/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      daisyui: {
        themes: [
          {
            mytheme: {
              primary: "#F56D91",
              secondary: "#8c74fb",
              accent: "#633795",
              neutral: "#f7f5f2",
              "base-100": "#424251",
              info: "#89eac5",
              success: "#0ec68c",
              warning: "#dbda0a",
              error: "#ed4704",
            },
          },
          {
            darkTheme: {
              primary: "#F56D91",
              secondary: "#8c74fb",
              accent: "#633795",
              neutral: "#424251",
              "base-100": "#f7f5f2",
              info: "#89eac5",
              success: "#0ec68c",
              warning: "#dbda0a",
              error: "#ed4704",
            },
          },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
