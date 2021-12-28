module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
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
        xxxl: "52px",
      },
      inset: {
        "2px": "2px",
      },
      padding: {
        2.5: "10px",
      },
      height: {
        "42px": "42px",
      },
      width: {
        "42px": "42px",
        fit: "fit-content",
      },
      minHeight: {
        "240px": "240px",
      },
      minWidth: {
        "380px": "380px",
        "40%": "40%",
      },
      maxWidth: {
        "2/5": "40%",
        "3/4": "75%",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        overlay: "rgba(0,0,0, .5)",
        primary: "#7EBDC2",
        secondary: "#0D1B2A",
        white: "#FFF",
        whiteBackground: "#F1F1F1",
        divider: "#F6F6F6",
        black: "#000",
        redWarning: "#b1000b",
        greenSuccess: "#39DB80",
        badgeText: "#333333",
        turquoise: "#7ebdc2",
      },
      boxShadow: {
        darkMDAllSides: "0px 0px 7px -3px #7ebdc2",
        lightMDAllSides: "0px 0px 7px -3px #000",
      },
      fontFamily: {},
      transitionDuration: {
        inputSwitch: "0.25s -0.1s",
      },
      stroke: {
        placeholder: "#f3f3f3",
        progress: "#03a9f4",
      },
      fill: {
        none: "none",
      },
      strokeWidth: {
        "10px": "10px",
      },
      zIndex: {
        1: "1",
      },
      translate: {
        "5px": "5px",
      },
      borderRadius: {
        inherit: "inherit",
      },
    },
  },
  variants: {
    extends: {
      scale: ["responsive", "hover", "focus", "group-hover"],
    },
  },
  plugins: [],
};
