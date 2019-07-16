const HtmlWebpackPlugin = require('html-webpack-plugin');

// 把外联的标签变成内联的标签
class InlineSourcePlugin {
  constructor({ reg }) {
    // 文件后缀匹配正则
    this.reg = reg;
  }
  apply(compiler) {
    // 要通过webpackPlugin来实现这个功能
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      console.log('The compiler is starting a new compilation...')

      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'alterAssetTagGroups',
        (data, cb) => {
          cb(null, this.processTags(data, compilation));
        }
      )
    })
  }
  /**
   * 处理所有引入标签的数据
   *
   * @param {Object} data 打包的资源数据
   * @param {Object} compilation 编译对象
   * @returns {Object} newData
   * @memberof InlineSourcePlugin
   */
  processTags(data, compilation) {
    let headTags = [];
    let bodyTags = [];

    data.headTags.forEach((headTag) => headTags.push(this.processTag(headTag, compilation)));

    data.bodyTags.forEach((bodyTag) => bodyTags.push(this.processTag(bodyTag, compilation)));

    return {...data, headTags, bodyTags};
  }
  /**
   * 处理单个引入标签的数据
   *
   * @param {Object} tag 要处理的标签
   * @param {Object} compilation 编译对象
   * @returns {Object} newTag
   * @memberof InlineSourcePlugin
   */
  processTag(tag, compilation) {
    let { tagName, attributes: { href, src } } = tag;
    let newTag = {};
    let url;

    if (this.reg.test(href) && tagName === 'link') {
      newTag.tagName = 'style';
      url = href;
    }
    else if (this.reg.test(src) && tagName === 'script') {
      url = src;
    }

    if (url) {
      newTag.innerHTML = compilation.assets[url].source();
      delete compilation.assets[url];
    }

    return newTag;
  }
}

module.exports = InlineSourcePlugin;