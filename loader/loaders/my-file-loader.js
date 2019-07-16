const loaderUtils = require('loader-utils');

// 导出文件名
function loader(source) {

  // 修改文件名
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source });
  // 发射文件
  this.emitFile(filename, source);
  console.log(filename);
  return `module.exports = "${filename}"`;
}

loader.raw = true;
module.exports = loader;