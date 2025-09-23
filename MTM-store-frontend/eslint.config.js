// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignore build output and dependencies
  { ignores: ["dist", "build", "node_modules"] },

  // Node environment for config and scripts (process, __dirname, etc.)
  {
    files: [
      "vite.config.*",
      "eslint.config.*",
      "*.config.{js,cjs,mjs,ts}",
      "scripts/**/*.{js,ts}",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Browser + React app files
  {
    files: ["**/*.{js,jsx}"],
    // exclude config and scripts from this browser block
    ignores: [
      "vite.config.*",
      "eslint.config.*",
      "*.config.{js,cjs,mjs,ts}",
      "scripts/**/*.{js,ts}",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
      globals: { ...globals.browser },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Base JS recommended rules
      ...js.configs.recommended.rules,

      // React Hooks rules (recommended set)
      ...reactHooks.configs.recommended.rules,

      // Helpful React Fast Refresh rule for Vite React projects
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Example: ignore ALL_CAPS globals (env-injected constants, etc.)
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
];
