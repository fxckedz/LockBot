import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  { files: ["./src/**/*.ts"],
    plugins: {
      js,
      "@stylistic": stylistic,},
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "never"],
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node } },

  tseslint.configs.recommended,
]);
