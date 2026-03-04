module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/no-unescaped-entities': 'off',
    'import/extensions': 'off',
    'arrow-parens': 'off',
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-mutable-exports': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'warn',
    'react/destructuring-assignment': 'warn',
    'consistent-return': 'warn',
    eqeqeq: 'warn',
    'react/jsx-one-expression-per-line': 'off',
    // Rules relaxed for Node/CRA 5 upgrade compatibility
    'no-undef': 'off', // TypeScript handles this via type checking
    'no-redeclare': 'off',
    'no-use-before-define': 'off',
    'no-promise-executor-return': 'off',
    'no-param-reassign': ['error', { props: false }],
    'default-param-last': 'warn',
    'arrow-body-style': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['craco.config.js'] },
    ],
    'react/require-default-props': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/no-array-index-key': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-no-bind': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/no-unstable-nested-components': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
};
