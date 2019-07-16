const path = require('path');
// html 模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    // [name] => home,other output
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-module-source-map',
  // watch: true,
  resolveLoader: {
    // loader查找顺序，从左到右，推荐使用modules
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
		/* alias: {
			'loader1': path.resolve(__dirname, 'loaders', 'loader1.js')
		} */
  },
  module: {
    // loader的顺序问题：从右向左，从下到上
    // loader的分类：pre 在前面执行，post 在后面，normal 默认规则执行
    // loader的顺U型：pre + normal + inline + post
    rules: [
      {
        test: /\.less$/,
        use: ['my-style-loader', 'my-css-loader', 'my-less-loader']
      },
      /* {
        // 引用自定义loader的路径，结合上面的resolveLoader使用
        test: /\.js$/,
        use: ['loader1', path.resolve(__dirname, 'loaders', 'loader2.js'), 'loader3']
      }, */
      // loader的引用顺序问题，结合enforce属性使用
      /* { test: /\.js$/, use: 'loader1', enforce: 'pre' },
      { test: /\.js$/, use: 'loader2', },
      { test: /\.js$/, use: 'loader3', enforce: 'post' }, */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'my-banner-loader',
            options: {
              text: 'Bamboo',
              filename: path.resolve(__dirname, 'src', 'my-banner.js')
            }
          },
          {
            loader: 'my-babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        // 目的就是根据图片生成一个md5字符串 发射到dist目录下，
        // file-loader 还会返回当前的图片路径
        // use: 'my-file-loader'
        // url-loader 会处理路径，转出base64，交给file-loader发射文件
        use: {
          loader: 'my-url-loader',
          options: {
            // 如果图片小于200KB的交给url-loader，否则交给file-loader
            limit: 200 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
  ]
}