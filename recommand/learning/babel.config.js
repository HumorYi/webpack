module.exports = {
  // 语法转换
  presets: [
    [
      // env 一系列语法转换集合工具
      '@babel/preset-env',
      {
        // 目标浏览器版本
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1'
          // android: '',
          // ios: '',
        },
        corejs: 2, // 新版本需要指定核心库版本
        /**
         * useBuiltIns 选项是 babel 7 的新功能，这个选项告诉 babel 如何配置 @babel/polyfill
         *
         * ①entry: 需要在 webpack 的入口⽂件⾥ import "@babel/polyfill" ⼀次。 babel 会根据你的使用情况导入垫片，没有使用的功能不会被导入相应的垫片。
         * ②usage: 不需要 import ，全自动检测，但是要安装 @babel/polyfill 。（试验阶段）
         * ③false: 如果你 import "@babel/polyfill" ，它不会排除掉没有使用的垫片，程序体积会庞大。(不推荐)
         *
         * 请注意： usage 的⾏为类似 babel-transform-runtime，不会造成全局污染，因此也会不会对类似Array.prototype.includes() 进⾏ polyfill
         */
        useBuiltIns: 'usage' // 按需注入
      }
    ],
    // 解析 react 语法
    '@babel/preset-react'
  ]
}
