module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      fontSize: {
        xxxs: "8px",
        xxs: "10px",
      },
      inset: {
        "2px": "2px",
      },
      height: {
        "42px": "42px",
      },
      width: {
        "42px": "42px",
      },
      minWidth: {
        "380px": "380px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        primary: "#7EBDC2",
        secondary: "#0D1B2A",
        white: "#FFF",
        black: "#000",
        redWarning: "#b1000b",
        turquoise: "#7ebdc2",
      },
      fontFamily: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
