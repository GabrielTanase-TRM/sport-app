module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
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
      fontFamily: {
        primary: "Inter",
        playfair: "PlayfairDisplay",
        germania: "GermaniaOne",
      },
      inset: {
        "2px": "2px",
      },
      padding: {
        2.5: "10px",
        "2px": "2px",
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
        "250px": "250px",
        "40%": "40%",
      },
      maxWidth: {
        "2/5": "40%",
        "3/4": "75%",
        "440px": "440px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        overlay: "rgba(0,0,0, .5)",
        lightBackground: "#F1F1F1",
        lightSecondaryBackground: "#ddd",
        darkBackground: "#0D1B2A",
        darkSecondaryBackground: "#192C41",
        primary: "#7EBDC2",
        primaryText: "rgba(0,0,0, .87)",
        darkPrimaryText: "rgba(250,250,250, .87)",
        helperText: "rgba(0,0,0, .60)",
        disabled: "rgba(0,0,0, .38)",
        darkDisabled: "rgba(255,255,255, .38)",
        secondary: "#0D1B2A",
        white: "#FFF",
        divider: "#F6F6F6",
        black: "#000",
        redError: "#B00020", // old #b1000b
        yellowWarning: "#eed202",
        greenSuccess: "#39DB80",
        badgeText: "#333333",
        turquoise: "#7ebdc2",
        grayBlue: "#7188ac",
      },
      boxShadow: {
        darkMDAllSides: "0px 0px 7px -3px #7188ac",
        lightMDAllSides: "0px 0px 7px -3px #000",
      },
      transitionDuration: {
        inputSwitch: "0.25s -0.1s",
      },
      stroke: {
        placeholder: "#f3f3f3",
        progress: "#03a9f4",
        turquoise: "#7ebdc2",
        darkBackground: "#0D1B2A",
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
