const webpack = require('webpack');

module.exports = {
  babel: {
    plugins: [
      'react-require',
      [
        'babel-plugin-formatjs',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          ast: true,
        },
      ],
    ],
  },
  eslint: {
    enable: true,
    configure: {
      extends: ['react-app'],
      plugins: ['eslint-plugin-formatjs'],
      rules: {
        'formatjs/enforce-default-message': 'error',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'warn',
        'default-param-last': 'warn',
        'arrow-body-style': 'warn',
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-no-bind': 'warn',
        'react/function-component-definition': 'warn',
        'no-undef': 'off',
      },
    },
    pluginOptions: (eslintOptions) => {
      eslintOptions.failOnError = false;
      return eslintOptions;
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'process/browser': require.resolve('process/browser.js'),
      };
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url'),
        buffer: require.resolve('buffer'),
        fs: false,
        path: false,
        net: false,
        tls: false,
        child_process: false,
        vm: require.resolve('vm-browserify'),
      };
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ];
      // Ignore source-map warnings from node_modules
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];
      return webpackConfig;
    },
  },
};
