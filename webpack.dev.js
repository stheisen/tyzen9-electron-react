const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const base = require('./webpack.config');

module.exports = merge(base, {
  mode: 'development',
  // specifies our development server settings
  devServer: {
    port: '3000',
    static: {
      directory: path.join(__dirname, 'build'),
    },
    // automatically open the browser after it had bundled our files
    open: false,
    // enables webpack Hot module replacement exchanges, adds, or
    // removes modules while an application is running, without a full reload.
    hot: true,
    // automatically update the app as you make changes
    liveReload: true,
  },
  // Consider when building files with several extensions
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  // how Webpack will handle different files when building our app
  module: {
    // tell Webpack that while building when it reaches file with
    // .js or .jsx extensionto use babel-loader on them
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
