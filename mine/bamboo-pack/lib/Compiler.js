const path = require('path');
const fs = require('fs');
// babylon 主要就是把源码转换成ast语法树
const babylon = require('babylon');
// @babel/traverse 遍历ast语法树节点
const traverse = require('@babel/traverse').default;
// @babel/types 替换ast语法树节点
const types = require('@babel/types');
// @babel/generator 生成ast语法树源码
const generator = require('@babel/generator').default;
const ejs = require('ejs');
const { SyncHook } = require('tapable');

class Compiler {
  constructor(config) {
    // webpack.config.js entry output
    this.config = config;
    // 工作路径
    this.root = process.cwd();
    // 保存文件入口的路径 => './src/index.js'
    this.entryId;
    // 保存所有的模块依赖
    this.modules = {};
    // 保存所有的打包资源
    this.assets = {};
    // 钩子
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    };
  }
  run() {
    // 执行入口钩子
    this.hooks.entryOption.call();
    // 执行启动钩子
    this.hooks.run.call();
    // 如果用户传递了plugins参数，执行插件钩子
    let plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => plugin.apply(this));
      this.hooks.afterPlugins.call();
    }
    // 执行编译钩子
    this.hooks.compile.call();
    // 创建模块的依赖
    this.buildModule(path.resolve(this.root, this.config.entry), true);
    this.hooks.afterCompile.call();

    // 发射一个文件 打包后的文件
    this.emitFile();
    // 执行发射钩子
    this.hooks.emit.call();
    // 执行完成钩子
    this.hooks.done.call();
  }
  /**
   * 构建模块
   *
   * @param {String} modulePath 模块绝对路径
   * @param {Boolean} isEntry 是否入口文件
   * @memberof Compiler
   */
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    let source = this.getSource(modulePath);
    // 模块id: modulePath = modulePath - this.root; => './src/index.js'
    let moduleName = this.formatPath('./' + path.relative(this.root, modulePath));

    if (isEntry) { this.entryId = moduleName; }

    // 解析源码并进行改造，返回依赖列表 => ./src 父路径
    let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));

    // 把相对路径和模块中的内容进行关联
    this.modules[moduleName] = sourceCode;

    // 附属模块的加载 递归加载
    dependencies.forEach((dependency) => {
      this.buildModule(path.join(this.root, dependency), false);
    });
  }
  /**
   * 发射文件，用数据选入模板
   *
   * @memberof Compiler
   */
  emitFile() {
    // 获取输出资源路径文件名
    let outputPathFilename = path.join(this.config.output.path, this.config.output.filename);
    // 获取模板
    let templateStr = this.getSource(path.join(__dirname, 'template.ejs'));
    // 渲染模板，替换数据
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules
    });
    // 资源中输出路径对应的代码
    this.assets[outputPathFilename] = code;
    // 把代码写到输出路径中
    fs.writeFileSync(outputPathFilename, code)
  }
  /**
   * 读取文件内容
   *
   * @param {String} modulePath 模块绝对路径
   * @returns {String}
   * @memberof Compiler
   */
  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf8');

    // 遍历规则
    this.config.module.rules.forEach((rule) => {
      // 获取规则中的正则和需要的loader
      let { test, use } = rule;
      let useMaxIndex = use.length - 1;

      // 正则验证成功，使用loader解析
      if (test.test(modulePath)) {
        // 获取loader
        while (useMaxIndex >= 0) {
          // loader是从右至左，即从后往前解析
          content = require(use[useMaxIndex--])(content);
        }
      }
    });

    return content;
  }
  /**
   * 解析源码，使用ast解析语法树，进行源码转移
   *
   * @param {String} source
   * @param {String} parentPath
   * @returns { sourceCode, dependencies }
   * @memberof Compiler
   */
  parse(source, parentPath) {
    // 通过babylon解析源码得到ast语法树
    let ast = babylon.parse(source);
    // 模块依赖的数组
    let dependencies = [];
    let self = this;

    // 通过traverse遍历ast语法树的节点
    traverse(ast, {
      // a() require()
      CallExpression(modulePath) {
        // 获取模块路径对应的节点
        let node = modulePath.node;

        if (node.callee.name === 'require') {
          // 修改节点的调用名
          node.callee.name = '__webpack_require__';
          // 获取模块的引用名
          let moduleName = node.arguments[0].value;
          // 给模块的引用名加后缀 => ./a.js
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          // 获取模块的相对父路径 => ./src/a.js
          moduleName = self.formatPath('./' + path.join(parentPath, moduleName));
          // 添加模块依赖
          dependencies.push(moduleName);
          // 替换ast语法树模块的引用值
          node.arguments = [types.stringLiteral(moduleName)];
        }
      }
    });

    // 生成ast语法树源码
    let sourceCode = generator(ast).code;

    return {
      sourceCode,
      dependencies
    }
  }
  /**
   * 格式化路径 \ => /
   *
   * @param {String} path
   * @returns
   * @memberof Compiler
   */
  formatPath(path) {
    return path.replace(/\\/g, '/');
  }
};

module.exports = Compiler;