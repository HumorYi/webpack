// webpack的功能扩展
// 注册事件，webpack在编译构建的时候，会经历很多的（生命周期，hook,事件）机制

/* const webpack = require('webpack')
const config = require('../webpack.config')
const compiler = webpack(config)

// webpack hooks
Object.keys(compiler.hooks).forEach(hookName => {
  // tap 触发同步钩子
  compiler.hooks[hookName].tap('custom', () => {
    console.log(`run in ${hookName}`)
  })
})

compiler.run() */

class TextWebpackPlugin {
  constructor(options) {
    this.options = options
    console.log(options)
  }

  // 插件如何钩入 webpack compiler hook？
  // 插件必须实现 apply 函数
  apply(compiler) {
    // console.log('compiler', compiler)
    // tapAsync 触发异步钩子
    compiler.hooks.emit.tapAsync('TextWebpackPlugin', (compilation, cb) => {
      // compilation 依赖模块、chunk、输出到 dist 资源目录信息
      // console.log('compilation', compilation.assets)
      // 增加一个资源
      compilation.assets['hjy.txt'] = {
        source() {
          return 'hello hjy.txt'
        },
        size() {
          return 1024
        }
      }
      cb()
    })

    // tap 同步钩子
    /* compiler.hooks.compile.tap('TextWebpackPlugin', compilation => {
      console.log('compilation')
    }) */
  }
}

module.exports = TextWebpackPlugin
