import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  // Base JS rules
  js.configs.recommended,

  // Ignore paths
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "target",
      "src-tauri",
      "**/*.md",
      "**/*.json",
    ],
  },

  // React config
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Prettier override (must be last)
  prettier,
];