// 生成 打包后生成的 资源文件列表
class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename;
  }
  apply(compiler) {
    // 文件已经准备好了，要准备发射
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      // compilation.assets 编译打包前生成的资源对象
      let { assets } = compilation;
      let content = `## 文件名    资源大小\r\n`;

      // 获取每个资源的文件名和大小
      Object.entries(assets).forEach(([filename, statObj]) => {
        content += `- ${filename}    ${statObj.size()}\r\n`;
      });

      // 生成传递过来的文件内容和大小
      assets[this.filename] = {
        source() { return content; },
        size() { return content.length; }
      };
    });
  }
}

module.exports = FileListPlugin;