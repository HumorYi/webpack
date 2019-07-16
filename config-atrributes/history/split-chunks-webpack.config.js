const path = require('path');
// html 模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  optimization: {
    // 分割代码块，抽离公共模块，使用多页（入口）应用
    splitChunks: {
      // 缓存组
      cacheGroups: {
        // 公共的模块
        common: {
          // 从入口开始查找模块
          chunks: 'initial',
          // 文件最小字节
          minSize: 0,
          // 引用次数
          minChunks: 2
        },
        vendor: {
          // 提升权重，先抽离第三方模块，再抽离公共模块，要不然执行抽离公共模块就截止不会往下执行
          priority: 1,
          test: /node_modules/,
          // 从入口开始查找模块
          chunks: 'initial',
          // 文件最小字节
          minSize: 0,
          // 引用次数
          minChunks: 2
        }
      }
    }
  },
  mode: 'production',
  entry: {
    index: './src/index.js',
    other: './src/other.js',
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
  ]
}