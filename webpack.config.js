const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  stats: 'normal', // options here: https://webpack.js.org/configuration/stats/pki-win
  entry: ['./app/src/index.jsx'],
  // Specifies where the app will run
  target: 'web',
  // This is where Webpack will put it's files after bundling and we specify the path and the file
  // name of that Webpack bundle
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'r_bundle.js',
    clean: true,
  },
  module: {
    rules: [{
      // loads .html files
      test: /\.(html)$/,
      include: [path.resolve(__dirname, 'app/src')],
      use: {
        loader: 'html-loader',
        options: {
          sources: {
            list: [{
              tag: 'img',
              attribute: 'data-src',
              type: 'src',
            }],
          },
        },
      },
    },
    // loads .js/jsx/tsx files
    {
      test: /\.[jt]sx?$/,
      include: [path.resolve(__dirname, 'app/src')],
      loader: 'babel-loader',
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
    // loads common image formats
    {
      test: /\.(svg|png|jpg|gif)$/,
      include: [
        path.resolve(__dirname, 'resources/images'),
      ],
      type: 'asset/inline',
    },
    // loads common font formats
    {
      test: /\.(eot|woff|woff2|ttf)$/,
      include: [
        path.resolve(__dirname, 'resources/fonts'),
      ],
      type: 'asset/inline',
    },
    ],
  },
  plugins: [
    // This copies the icon.png file into the build/icons directory for supporting Linux
    // Tried doing this in the electron-builder config but this would not work for some reason
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'resources/icons/icon.png'),
          to: path.resolve(__dirname, 'build/icons/icon.png') },
      ],
    }),
  ],
};
