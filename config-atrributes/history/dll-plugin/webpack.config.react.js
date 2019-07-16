const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode:'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, './dist'),
    // 打包后内部执行返回结果存储于指定的变量名中
    library: '_dll_[name]',
    // 接收变量的方式
    // "var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
    // libraryTarget: 'var'
  },
  plugins: [
    // 构建动态链接库任务清单
    new webpack.DllPlugin({
      // name === library
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}