const path = require('path');

// html 模板
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 抽离css样式文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 文件压缩
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const webpack = require('webpack');

module.exports = {
  // 忽略引入的模块
  externals: {
    jquery: '$'
  },
  // 优化项
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin()
    ],
  },
  // 开发服务器的配置
  /* devServer: {
    port: 8080,
    progress: true,
    contentBase: './build',
    compress: true
  }, */
  // 模式：production development
  mode: 'development',
  // 入口文件
  entry: "./src/index.js",
  // 出口文件
  output: {
    // filename: 'bundle.[hash:8].js',
    filename: 'bundle.js',
    // 路径必须是一个绝对路径
    path: path.resolve(__dirname, 'build'),
    // 添加输出资源公共路径
    // publicPath: 'http://www.xxx.cn'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    // 在每个模块中都注入$符
    // new webpack.ProvidePlugin({ $: 'jquery' })
  ],
  module: {
    rules: [
      // loader 的特点是希望功能单一，
      // 用法：
      // 一个：字符串 => "css-loader"
      // 多个：数组,默认是从右向左，从下往上 执行 => ['style-loader', 'css-loader']
      // 也可以是对象，内部可传递更多的数据 => { loader: '...', options: {}}

      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          // 做一个限制，当图片小于多少k时用base64来转换，其他的用file-loader
          loader: 'url-loader',
          options: {
            limit: 1 * 1024,
            outputPath: '/img/',
            // 添加输出资源公共路径
            publicPath: 'http://www.xxx.cn'
          }
          /* loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          } */
        }
      },
      // 暴露变量到全局：expose-loader
      /* {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
      }, */
      /* {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre' // previous(在normal loader前执行) post（在normal loader后执行）
          }
        }
      }, */
      {
        test: /\.js$/,
        use: { // normal loader
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },

      // css-loader 处理 @import 语法
      // style-loader 把css文件 插入到 <head/> 标签中
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          /* {
            loader: 'style-loader',
            options: {
              // 把生成的css文件插入到head标签顶部，使模板中引入的css文件层级升高，在最后加载
              insertAt: 'top'
            }
          }, */
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
    ]
  }
}