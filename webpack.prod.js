const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const base = require('./webpack.config');

module.exports = merge(base, {
  mode: 'production',
  // Consider when building files with several extensions
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  // how Webpack will handle different files when building our app
  module: {
    // tell Webpack that while building when it reaches file
    // with .js or .jsx extension to use babel-loader on them
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html'),
    }),
  ],
});
