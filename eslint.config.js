import js from "@eslint/js";
import react from "eslint-plugin-react";
import astro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "public/**",
      ".tina/**",
      ".astro/**",
      ".netlify/**",
      ".vscode/**",
      "**/*.astro",
    ]
  },

  js.configs.recommended,

  // React config
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-undef": "off",
    },
  },

  // Astro config
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      astro,
    },
    rules: {
      ...astro.configs.recommended.rules,
      "astro/no-set-html-directive": "warn",
      "astro/no-conflict-set-directives": "error"
    },
  }
];
