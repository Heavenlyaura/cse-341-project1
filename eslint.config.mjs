import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        process: "readonly",
      },
    },
    rules: {
      // Adding custom rules
      "no-unused-vars": "off", // Warn when variables are declared but not used
      quotes: ["error", "double"], // Enforce double quotes for strings
      semi: ["error", "always"], // Require semicolons at the end of statements
      eqeqeq: ["error", "always"], // Require strict equality (===) instead of loose equality (==)
    },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
];
