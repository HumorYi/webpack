const path = require('path')
const fs = require('fs')
// babylon 主要就是把源码转换成ast语法树
const babylon = require('babylon')
// @babel/traverse 遍历ast语法树节点
const traverse = require('@babel/traverse').default
// @babel/types 替换ast语法树节点
const types = require('@babel/types')
// @babel/generator 生成ast语法树源码
const generator = require('@babel/generator').default
const ejs = require('ejs')
// 钩子库
const { SyncHook } = require('tapable')

const defaultConfig = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

const isObject = (data) => Object.prototype.toString.call(data).slice(8, -1) === 'Object'

const isNullObject = (data) => JSON.stringify(data) === '{}'

const configValidator = (config) => {
  // 是一个对象
  if (isObject(config)) {
    // 是一个空对象
    if (isNullObject(config)) {
      return config
    }

    if (config.hasOwnProperty('entry')) {
      let entry = config.entry

      // entry既不是字符串，也不是对象
      if (!(typeof entry === 'string' || isObject(entry))) {
        throw new Error('please transfer a config.entry is string or object, thanks!')
      }

      if (isObject(entry) && isNullObject(entry)) {
        throw new Error('please transfer a config.entry is not null object, thanks!')
      }
    }

    if (config.hasOwnProperty('output')) {
      let output = config.output

      // output不是对象
      if (!isObject(output)) {
        throw new Error('please transfer a config.output is object, thanks!')
      }

      // 必须携带filename和path属性，且值必须为字符串
      if (!(output.hasOwnProperty('filename') && output.hasOwnProperty('path'))
        || typeof output.filename !== 'string'
        || typeof output.path !== 'string'
      ) {
        throw new Error("please transfer a config.output like { filename: 'xxx', path: 'xxx' }, thanks!")
      }
    }

    return config
  }

  throw new Error('please transfer a not null object config, thanks!')
}

class Compiler {
  /**
   * Creates an instance of Compiler.
   * @param {Object} [config={}]
   * @memberof Compiler
   */
  constructor(config = {}) {
    configValidator(config)
    this.config = { ...defaultConfig, ...config }
    // 工作路径
    this.root = process.cwd()
    // 保存文件入口的路径 => './src/index.js'
    this.entryId = undefined
    // 保存所有的模块依赖
    this.modules = {}
    // 保存所有的打包资源
    this.assets = {}
    // 钩子
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    }
  }
  /**
   * 启动编译
   *
   * @memberof Compiler
   */
  run() {
    // 执行入口钩子
    this.hooks.entryOption.call()

    // 执行启动钩子
    this.hooks.run.call()

    // 执行插件处理
    this.handlePlugins()

    // 执行编译钩子
    this.hooks.compile.call()
    // 创建模块的依赖
    this.buildModules()

    // 执行完成钩子
    this.hooks.done.call()
  }
  buildModulesFinal(filename) {
    // 执行编译后处理钩子
    this.hooks.afterCompile.call()
    // 发射一个文件 打包后的文件
    this.emitFile(filename)
    // 执行发射钩子
    this.hooks.emit.call()
  }
  /**
   * 构建模块列表
   *
   * @memberof Compiler
   */
  buildModules() {
    let { entry } = this.config
    if (typeof entry === 'string') {
      this.buildModule(path.resolve(this.root, entry), true)
      this.buildModulesFinal(this.config.output.filename)
    }
    else {
      Object.keys(entry).forEach((name) => {
        this.entryId = undefined
        this.modules = {}
        this.buildModule(path.resolve(this.root, entry[name]), true)
        this.buildModulesFinal(name)
      })
    }
  }
  /**
   * 构建模块
   *
   * @param {String} modulePath 模块绝对路径
   * @param {Boolean} isEntry 是否入口文件
   * @param {String} ?entryName 入口文件名
   * @memberof Compiler
   */
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    let fileContent = this.getFileContent(modulePath)
    // 模块id: modulePath = modulePath - this.root => './src/index.js'
    let moduleName = this.formatPath('./' + path.relative(this.root, modulePath))

    if (isEntry) { this.entryId = moduleName }

    // 解析源码并进行改造，返回依赖列表 => ./src 父路径
    let { sourceCode, dependencies } = this.parse(fileContent, path.dirname(moduleName))

    // 把相对路径和模块中的内容进行关联
    this.modules[moduleName] = sourceCode

    // 附属模块的加载 递归加载
    dependencies.forEach((dependency) => {
      this.buildModule(path.join(this.root, dependency), false)
    })
  }
  /**
   * 发射文件，用数据选入模板
   *
   * @param {String} filename
   * @memberof Compiler
   */
  emitFile(filename) {
    const templateName = 'template.ejs'
    // 获取输出资源路径文件名
    let outputPathFilename = path.join(this.config.output.path, this.outputFileName(filename))
    // 获取模板
    let templateStr = this.getFileContent(path.join(__dirname, templateName))
    // 渲染模板，替换数据
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules
    })

    // 资源中输出路径对应的代码
    this.assets[outputPathFilename] = code
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
  getFileContent(modulePath) {
    let fileContent = fs.readFileSync(modulePath, 'utf-8')

    return this.handleLoaders(fileContent, modulePath)
  }
  /**
   * 解析源码(文件内容)，使用ast解析语法树，进行源码转移
   *
   * @param {String} fileContent
   * @param {String} parentPath
   * @returns { sourceCode, dependencies }
   * @memberof Compiler
   */
  parse(fileContent, parentPath) {
    const nodeCallName = 'require'
    const nodeCallReplaceName = '__webpack_require__'
    let self = this
    // 通过babylon解析源码得到ast语法树
    let ast = babylon.parse(fileContent)
    // 模块依赖的数组
    let dependencies = []

    // 通过traverse遍历ast语法树的节点
    traverse(ast, {
      // a() require()
      CallExpression(modulePath) {
        // 获取模块路径对应的节点
        let node = modulePath.node

        if (node.callee.name === nodeCallName) {
          // 修改节点的调用名
          node.callee.name = nodeCallReplaceName
          // 获取模块的引用名
          let moduleName = node.arguments[0].value
          // 给模块的引用名加后缀 => ./a.js
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
          // 获取模块的相对父路径 => ./src/a.js
          moduleName = self.formatPath('./' + path.join(parentPath, moduleName))
          // 添加模块依赖
          dependencies.push(moduleName)
          // 替换ast语法树模块的引用值
          node.arguments = [types.stringLiteral(moduleName)]
        }
      }
    })

    // 生成ast语法树源码
    let sourceCode = generator(ast).code

    return { sourceCode, dependencies }
  }
  /**
   * 格式化路径 \ => /
   *
   * @param {String} path
   * @returns {String}
   * @memberof Compiler
   */
  formatPath(path) {
    return path.replace(/\\/g, '/')
  }
  /**
   * 处理插件
   *
   * @memberof Compiler
   */
  handlePlugins() {
    // 如果用户传递了plugins参数，执行插件钩子
    if (Array.isArray(this.config.plugins)) {
      this.config.plugins.forEach((plugin) => plugin.apply(this))
      this.hooks.afterPlugins.call()
    }
  }
  /**
   * 处理loader
   *
   * @param {String} fileContent
   * @returns {String} fileContent
   * @memberof Compiler
   */
  handleLoaders(fileContent, modulePath) {
    // 如果携带了模块解析规则，则遍历规则
    if (this.config.module && Array.isArray(this.config.module.rules)) {
      this.config.module.rules.forEach((rule) => {
        // 获取规则中的正则和需要的loader
        let { test, use } = rule
        let useMaxIndex = use.length - 1

        // 正则验证成功，使用loader解析
        if (test.test(modulePath)) {
          // 获取loader
          while (useMaxIndex >= 0) {
            // loader是从右至左，即从后往前解析
            fileContent = require(use[useMaxIndex--])(fileContent)
          }
        }
      })
    }

    return fileContent
  }
  /**
   * 输出文件名，用于处理多实体名情况
   *
   * @param {String} entryName
   * @returns {String}
   * @memberof Compiler
   */
  outputFileName(entryName) {
    let {entry, output:{filename}} = this.config

    if (isObject(entry) && filename.includes('[name]')) {
      let ext = filename.split('[name]').pop()

      return entryName + ext
    }

    return filename
  }
}

module.exports = Compiler