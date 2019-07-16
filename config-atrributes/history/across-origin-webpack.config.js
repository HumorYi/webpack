const path = require('path');
// html 模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    // 跨域解决方案：
    // 3、有服务端，不想用代理来处理，在服务端启动webpack且服务端端口使用webpack端口

    // 2、mock数据
    // 钩子函数，服务启动之前调用
    /* before(app) {
      app.get('/user', (req, res) => {
        res.json({name: 'HumorYi-bofore'});
      });
    } */

    // 1、重写的方式，把请求代理到express服务器上
    // 前提：已有提供的服务器
    /* proxy: {
      // 对接口前缀为/api进行代理地址和重指向路径
      '/api': {
        target: 'http://localhost:3000',
        pathReWrite: ''
      }
    } */
  },
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