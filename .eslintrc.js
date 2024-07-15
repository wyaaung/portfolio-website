module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
      rules: {
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'next',
    'next/core-web-vitals',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],
      parserOptions: {
        sourceType: 'script',
        project: './tsconfig.json',
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        'import/prefer-default-export': 'off',
        'unused-imports/no-unused-imports': 'error',
        'no-console': 'error',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'unicorn'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
