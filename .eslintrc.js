module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    indent: ['error', 2],
    'linebreak-style': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}