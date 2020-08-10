const path = require('path')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const resolve = dir => path.resolve(__dirname, dir)

const isProduction = process.env.NODE_ENV === 'production'

const getDevtool = () => {
  /**
   * 开发环境配置开启
   * devtool:"cheap-module-eval-source-map",
   *
   * 线上不推荐开启，如果开启，推荐使用下面配置
   * devtool:"cheap-module-source-map",
   */
  return isProduction ? 'none' : 'cheap-module-source-map'
}

const devConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: resolve('./src/assets/css'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        include: resolve('./src/assets/less'),
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    // 开启 hotOnly，局部替换不刷新浏览器
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: getDevtool(),
  devServer: {
    // 存储构建内容目录
    contentBase: './dist',
    // 构建完成自动在浏览器中打开新页签访问页面
    open: true,
    // 开启 Hot Module Replacement (HMR:热模块替换)
    // 启动HMR后，css抽离会不⽣效，还有不⽀持contenthash，chunkhash
    hot: true,
    // 即便HMR不⽣效，浏览器也不⾃动刷新，就开启hotOnly
    hotOnly: true,
    // 自动在浏览器中打开新页签访问页面 端口
    port: 8080,
    // 代理服务器，用于开发环境解决 跨域问题
    proxy: {
      '/api': {
        // TODO: 服务器端接口地址
        target: 'http://localhost:8082'
      }
    }
  }
}

module.exports = merge(baseConfig, devConfig)
