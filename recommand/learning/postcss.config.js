// 自动插入 css 浏览器前缀，实现 css 兼容
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      // 兼容市场使用量 >1% 的浏览器最近2个版本
      overrideBrowserslist: ['last 2 versions', '>1%']
    })
  ]
}
