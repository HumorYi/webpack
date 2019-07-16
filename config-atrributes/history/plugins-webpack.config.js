const path = require('path');
// html 模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除webpack打包目录文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 拷贝文件插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    // [name] => home,other output
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './doc', to: './' },
    ]),
    // 添加js文件头注释：版权、作者等信息
    new webpack.BannerPlugin('make 2019-07-12 by HumorYi'),
  ]
}