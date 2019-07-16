const path = require('path');
// html 模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  mode: 'production',
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
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
    new HtmlWebpackPlugin({ template: './index.html' }),
    // 打印更新的模块路径
    new webpack.NamedModulesPlugin(),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ]
}