/**
 * Webpack Config.
 *
 * @format
 */
/* eslint-disable new-cap */

const path = require('path');

module.exports = {
  entry: `${path.resolve(__dirname, 'source')}/viewport-example`,
  output: {
    filename: 'viewport-example.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'window',
  },
  devtool: 'source-map',
  mode: 'development',
  watch: false,
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
