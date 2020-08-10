// 官方推荐处理loader,query的⼯具
const loaderUtils = require('loader-utils')

// 需要用声明式函数，因为要上到上下文的this,用到this的数据，该函数接受⼀个参数，是源码
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const result = source.replace('webpack', options.name)
  // 定义⼀个异步处理，告诉webpack,这个loader里有异步事件,在里面调用下这个异步
  // callback 就是 this.callback 注意参数的使用
  const callback = this.async()
  setTimeout(() => callback(null, result), 1000)
}
