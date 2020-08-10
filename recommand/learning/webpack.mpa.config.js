const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

const resolve = dir => path.resolve(__dirname, dir)
const join = dir => path.join(__dirname, dir)

/**
 * 多页打包通用方案，根据约定自动打包入口及html模板
 *
 * 1、页面存放位置：./src/pages/
 * 2、页面目录格式：目录名为入口名，下面包含 index.js 和 index.html
 *
 * ex: 新增一个 login 页面
 *  1、在 ./src/pages/ 创建 login 目录
 *  2、在 login 目录下 创建 index.js 和 index.html
 */

const setMpa = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(join('./src/pages/*/index.js'))

  entryFiles.forEach(entryFile => {
    const match = entryFile.match(/src\/pages\/(.*)\/index.js$/)
    const pageName = match && match[1]

    if (pageName) {
      entry[pageName] = entryFile

      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          title: pageName,
          template: `./src/pages/${pageName}/index.html`,
          filename: `${pageName}.html`,
          chunks: [pageName],
          inject: true
        })
      )
    }
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMpa()

module.exports = {
  entry,
  output: {
    path: resolve('./mpa'),
    filename: '[name]-[chunkhash:8].js'
  },
  mode: 'development',
  plugins: [...htmlWebpackPlugins]
}
