module.exports = [
  [
    '.env.mainnet',
    {
      presets: ['react-app'],
      plugins: [
        'react-require',
        [
          '.env.mainnet',
          {
            idInterpolationPattern: '[sha512:contenthash:base64:6]',
            ast: true,
          },
        ],
      ],
    },
  ],
  [
    'use-eslint-config',
    {
      extends: ['react-app'],
      plugins: ['eslint-plugin-formatjs'],
      rules: {
        'formatjs/enforce-default-message': 'error',
      },
    },
  ],
];
