const { smart } = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');

module.exports = smart(base, {
  mode: 'development',
  devServer: {},
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify('development')
    })
  ],
});