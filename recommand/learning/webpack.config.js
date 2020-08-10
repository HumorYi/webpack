const path = require('path')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TextWebpackPlugin = require('./plugins/text-webpack-plugin')

const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

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

module.exports = {
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
  mode: 'development',
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
      /*
      {
        test: /\.js$/,
        // 借助 resolveLoader 声明 loader 路径，直接引用 文件名即可
        use: [
          {
            loader: 'replace-loader',
            options: {
              name: 'webpack custom sync replace loader'
            }
          },
          {
            loader: 'replace-async-loader',
            options: {
              name: 'webpack custom async replace loader'
            }
          }
        ]
        //  use: [
        //   {
        //     loader: resolve('./loader/replace-loader.js'),
        //     options: {
        //       name: 'webpack custom sync replace loader'
        //     }
        //   },
        //   {
        //     loader: resolve('./loader/replace-async-loader.js'),
        //     options: {
        //       name: 'webpack custom async replace loader'
        //     }
        //   }
        // ]
      },
      {
        test: /\.css$/,
        use: ['hjy-style-loader', 'hjy-css-loader']
      },
      {
        test: /\.less$/,
        use: ['hjy-style-loader', 'hjy-css-loader', 'hjy-less-loader']
      },
      */
      {
        test: /\.css$/,
        // 指定 loader 搜索文件路径范围，减少搜索时间
        include: resolve('./src/assets/css'),
        use: [
          {
            loader: 'style-loader',
            options: {
              // 将所有的style标签合并成一个
              injectType: 'singletonStyleTag'
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
      },
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
    // 开启 hotOnly，局部替换不刷新浏览器
    new webpack.HotModuleReplacementPlugin(),
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
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/list.html',
    //   filename: 'list.html',
    //   chunks: ['list']
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/detail.html',
    //   filename: 'detail.html',
    //   chunks: ['detail']
    // }),
    // contenthash 资源内容改变时才会重新生成 hash
    new MiniCssExtractPlugin({
      // HMR 不能有 contenthash
      // filename: 'css/[name]-[contenthash:8].css'
      filename: 'css/[name]-[hash:8].css'
    }),
    new TextWebpackPlugin({
      name: 'custom plugin'
    }),
    // 清除无用 css
    new PurifyCSS({
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
  },
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
