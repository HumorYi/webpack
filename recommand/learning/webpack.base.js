const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => path.resolve(__dirname, dir)

const baseConfig = {
  // entry: './src/index.js',
  entry: {
    index: './src/index.js'
    // list: './src/list.js',
    // detail: './src/detail.js'
  },
  output: {
    path: resolve('./dist'),
    // chunkhash 只有 chunk 依赖的内容改变了才会重新 hash
    // filename: '[name]-[chunkhash:8].js'
    // HMR 不能有 chunkhash
    filename: '[name]-[hash:8].js'
  },
  // 处理引入loader的路径问题
  resolveLoader: {
    modules: ['node_modules', './loader']
  },
  resolve: {
    alias: {
      '@img': resolve('./src/assets/images')
    },
    /**
     * 导入模块后缀，webpack 内部帮助查找文件后缀
     * 建议导入的模块都添加上后缀，减少 webpack 查找匹配文件后缀时间，
     * 避免同名文件不同后缀匹配不一致，性能优化来之不易，一丝一毫都要珍惜
     */
    extensions: ['.ts', '.vue', '.js', '.json', '.tsx', '.jsx'],
    /**
     * 配置 webpack 去哪些目录下寻找第三方模块，默认是['node_modules']
     * 寻找第三方模块，默认是在当前项目目录下的node_modules里面去找，如果没有找到，
     * 就会去上一级目录../node_modules找，再没有会去../../node_modules中找，
     * 以此类推，和Node.js的模块寻找机制很类似。
     * 如果我们的第三方模块都安装在了项目根目录下，就可以直接指明这个路径
     */
    modules: [resolve('./node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|svg)$/i,
        include: resolve('./src/assets/images'),
        use: {
          // url-loader内部使用了file-loader,所以可以处理file-loader所有的事情，但是遇到jpg格式的模块，会把该图片转换成base64格式字符串，并打包到js⾥。对⼩体积的图片⽐较合适，大图片不合适。
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            outputPath: 'images',
            // hash 入口内容变化就重新 hash
            name: '[name]-[hash].[ext]',
            //⼩于2048，才转换成base64
            limit: 2048
          }
        }
      },
      {
        test: /\.js$/,
        include: resolve('./src'),
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // 在 html 模板中 引用对应的 chunk，避免多入口时自动导入其它入口文件
      // chunk 引用文件根顺序没关，按照 entry 声明的顺序加载的
      chunks: ['index'],
      // chunks: ['index', 'detail', 'list']
      // 使用手工排序
      // string:  none auto manual function
      // chunksSortMode: 'manual'

      // 压缩HTML⽂件
      minify: {
        removeComments: true, // 移除 HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      }
    })
  ]
}

module.exports = baseConfig
