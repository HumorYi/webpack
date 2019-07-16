const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1、源码映射，会单独生成一个source.map文件，
  // 用于错误调试，会标识当前报错的行和列，文件比较大和全面
  // devtool: 'source-map',
  // 2、映射文件简易版，会生成映射文件，只有行，没有列
  devtool: 'cheap-module-source-map',
  // 3、不会生成映射文件，把映射集成到源文件中，有行和列
  // devtool: 'eval-source-map',
  // 4、不会生成映射文件，把映射集成到源文件中，只有行，没有列
  // devtool: 'cheap-module-eval-source-map',
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
  ]
}