const loaderUtils = require('loader-utils');
const mime = require('mime');

// 导出文件名
function loader(source) {
  let {limit} = loaderUtils.getOptions(this);

  if (limit && limit > source.length) {
    // 把文件变成base64
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`;
  }
  else {
    return require('./my-file-loader').call(this, source);
  }

}

loader.raw = true;
module.exports = loader;