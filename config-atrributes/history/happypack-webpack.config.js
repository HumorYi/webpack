const path = require('path');
// html 模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 多线程打包 -- 大项目
const Happypack = require('happypack');

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
        test: /\.css$/,
        use: 'Happypack/loader?id=css'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: 'Happypack/loader?id=js'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new Happypack({
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    }),
    new Happypack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    }),
  ]
}