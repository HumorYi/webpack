const fs = require('fs');
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

function loader(source) {
  // webpack 默认打包时启用缓存，如果传递false，表示不启用缓存
  this.cacheable && this.cacheable();
  let options = loaderUtils.getOptions(this);
  let filename = options.filename;
  let cb = this.async();
  let schema = {
    type: 'object',
    properties: {
      text: { type: 'string', },
      filename: { type: 'string' }
    }
  };

  validateOptions(schema, options, 'my-banner-loader');

  if (filename) {
    // 自动添加文件依赖 + watch
    this.addDependency(filename);
    fs.readFile(filename, 'utf8', (err, data) => {
      cb(err, `/** ${data} **/${source}`);
    });
  }
  else {
    cb(null, `/** ${options.text} **/${source}`);
  }

  return source;
};

module.exports = loader;