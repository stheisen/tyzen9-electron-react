const path = require('path');

module.exports = {
  entry: ['./app/src/Index.jsx'],
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
};
