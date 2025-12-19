// eslint.config.cjs
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const playwrightPlugin = require('eslint-plugin-playwright');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**', // <--- исключаем отчёты
    ],
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright: playwrightPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'playwright/no-page-pause': 'warn',
    },
  },
];
