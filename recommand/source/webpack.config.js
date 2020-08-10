const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  // 入口模块路径
  entry: './src/index.js',
  // 出口配置（生成 bundle 文件）
  output: {
    path: resolve('./dist'),
    filename: 'main.js'
  }
}
