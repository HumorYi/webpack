const path = require('path');
// html 模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置环境变量
module.exports = {
  resolve: {
    // 指定第三方包引用路径，减少查询的层级，提升效率
    modules: [path.resolve('node_modules')],
    // 给指定的引用文件取别名，方便引用
    // alias: { bootstrap: 'bootstrap/dist/css/bootstrap.css' }
    // 指定入口文件引用字段，识别package.json中的字段执行的路径，从左到右，找到即停止查询
    mainFields: ['style', 'main'],
    // 指定入口文件名，默认index.js
    // mainFiles: [],
    // 添加识别后缀名,
    extensions: ['.js', '.json', '.css', '.less', '.sass', '.vue']
  },
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