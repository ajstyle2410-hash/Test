import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  ignorePatterns: ['.next/**', 'out/**', 'build/**', 'node_modules/**'],
});
