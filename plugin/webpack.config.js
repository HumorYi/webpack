const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 将css拆分成单独的文件，自动在模板文件中使用link标签替代style标签引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let DonePlugin = require('./plugins/done-plugin');
let AsyncPlugin = require('./plugins/async-plugin');
let FileListPlugin = require('./plugins/file-list-plugin');
let InlineSourcePlugin = require('./plugins/inline-source-plugin');
let UploadPlugin = require('./plugins/upload-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new DonePlugin(),
    new AsyncPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new FileListPlugin({ filename: 'assets.md' }),
    new MiniCssExtractPlugin({filename: 'main.css'}),
    // new InlineSourcePlugin({reg: /\.(js|css)$/}),
    new UploadPlugin({
      bucket: '',
      domain: '',
      accessKey: '',
      secretKey: ''
    })
  ]
};