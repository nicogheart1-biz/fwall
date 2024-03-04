import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          100: "#6a7282",
          200: "#515b6d",
          300: "#384358",
          500: "#06142e",
          600: "#051229",
          700: "#051025",
          900: "#020812",
          absolute: "#02060e",
        },

        primary: {
          100: "#918ba3",
          200: "#7e7894",
          300: "#6c6585",
          500: "#473e66",
          600: "#40385c",
          700: "#393252",
          900: "#2b253d",
        },

        /* yellow
        secondary: {
          100: "#ffca80",
          200: "#ffc16b",
          300: "#ffb855",
          500: "#ffa62b",
          600: "#e69527",
          700: "#cc8522",
          900: "#99641a",
        },*/
        
        /* pink */
        secondary: {
          100: "#d7b5d4",
          200: "#d1a8cd",
          300: "#ca9cc6",
          500: "#bd83b8",
          600: "#aa76a6",
          700: "#976993",
          900: "#714f6e",
        },

        // region WHITE
        white: {
          100: "#f9e7e9",
          200: "#f8e3e6",
          300: "#f7dfe2",
          500: "#f5d7db",
          600: "#ddc2c5",
          700: "#c4acaf",
          900: "#938183",
        },
        pureWhite: "#faebed",
        // endregion WHITE
      },
      height: {
        '112': "26rem",
        '128': "30rem",
        '144': "36rem",
        '160': "40rem",
        '176': "44rem",
        '192': '48rem',
      },
    },
  },
  plugins: [],
};
export default config;
