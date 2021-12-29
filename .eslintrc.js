module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "google",
    "prettier",
    "next",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "require-jsdoc": 0,
    "react-hooks/exhaustive-deps": "off",
    "react/display-name": ["off", { ignoreTranspilerName: true }],
    "no-unused-vars": ["off"],
  },
  settings: {
    react: {
      version: "latest",
    },
  },
};
