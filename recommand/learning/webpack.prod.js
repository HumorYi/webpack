const path = require('path')

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

const resolve = dir => path.resolve(__dirname, dir)

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: resolve('./src/assets/css'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 资源访问路径，例如：背景图
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        include: resolve('./src/assets/less'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 资源访问路径，例如：背景图
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // contenthash 资源内容改变时才会重新生成 hash
    new MiniCssExtractPlugin({
      // HMR 不能有 contenthash
      // filename: 'css/[name]-[contenthash:8].css'
      filename: 'css/[name]-[hash:8].css'
    }),
    // 清除无用 css
    new PurgeCSSPlugin({
      // 要做 CSS Tree Shaking 的路径文件
      // 请注意，同样需要对 html 文件进行 tree shaking
      paths: glob.sync([resolve('./src/*.html'), resolve('./src/*.js')])
    })
  ],
  optimization: {
    /**
     * js tree shaking
     *
     * production 默认开启
     *
     * development 需要手动开启，因为 webpack 为了⽅便开发者调试
     *
     * 可以查看打包后的代码注释以辨别是否生效。
     */
    usedExports: true
  }
}

module.exports = merge(baseConfig, prodConfig)
