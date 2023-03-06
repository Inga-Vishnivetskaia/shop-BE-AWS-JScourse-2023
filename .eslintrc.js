module.exports = {
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  plugins: ["prettier"],
  extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "max-len": [
      "warn",
      {
        code: 120,
        ignoreUrls: true,
      },
    ],
    "prefer-destructuring": [
      "warn",
      {
        array: false,
        object: true,
      },
    ],
    "no-trailing-spaces": ["error", { skipBlankLines: true }],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-restricted-syntax": "off",
    complexity: ["warn", 15],
  },
};
