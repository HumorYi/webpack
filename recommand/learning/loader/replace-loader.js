// 官方推荐处理loader,query的⼯具
const loaderUtils = require('loader-utils')

// 需要用声明式函数，因为要上到上下⽂的this,用到this的数据，该函数接受⼀个参数，是源码
module.exports = function (source) {
  // console.log('source', source)
  // console.log('query', this.query)

  // const result = source.replace('webpack', 'webpack custom replace loader')

  // const result = source.replace('webpack', this.query.name)

  const options = loaderUtils.getOptions(this)
  const result = source.replace('webpack', options.name)
  // return result

  this.callback(null, result)

  /*
  this.callback(
    err: Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    meta: any
  )
  */
}
