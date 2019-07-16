const { smart } = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');

module.exports = smart(base, {
  mode: 'production',
  optimization: {
    minimizer: { }
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production')
    })
  ]
});