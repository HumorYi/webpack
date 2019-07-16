const babel = require('@babel/core');
// 获取loader的配置项
const loaderUtils = require('loader-utils');

function loader(source) {
  let options = loaderUtils.getOptions(this);
  let cb = this.async();

  babel.transform(source, {
    ...options,
    sourceMap: true,
    // sourceMap文件名
    filename: this.resourcePath.split('/').pop()
  }, (err, {code, map}) => {
    // 异步调用
    cb(err, code, map);
  });
};

module.exports = loader;