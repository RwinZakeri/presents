/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily : {
      iranYkan : "iranYekan"
    } , 
    extend: {
      colors: {
        primeGreen: "#4CA773",
        primeBlack: "#000000", // Assuming you meant to define black as #000000
      },
      backgroundImage: {
        mainBgImage: "url('./public/images/finalbg.png')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        // Define your custom themes here if needed
        mytheme: {
          primary: "#4CA773",
          secondary: "#000000", // Or any other colors you want
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      // Add other themes if needed, excluding the dark theme
    ],
  },
  plugins: [daisyui],
};
