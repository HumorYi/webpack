const fs = require('fs')
const path = require('path')

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

function isExistDir(path) {
  try {
    return fs.lstatSync(path).isDirectory()
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false
  }
}

class Webpack {
  constructor(options) {
    this.options = options
    this.entry = options.entry
    this.output = options.output

    // 依赖模块集合
    this.modules = []
  }

  run() {
    // 获取解析后的入口模块数据
    const entryModule = this.parseFile(this.entry)

    // TODO: 将 modules 数据类型改成 {}，循环处理改成递归

    // 将入口模块存储到依赖模块集合中
    this.modules.push(entryModule)

    // 遍历依赖模块集合，将当前模块内部的依赖模块存储到依赖模块集合中
    for (let i = 0; i < this.modules.length; i++) {
      const { module } = this.modules[i]

      for (let filepath in module) {
        this.modules.push(this.parseFile(module[filepath]))
      }
    }

    // 将 依赖模块集合 转换成 依赖模块对象
    const moduleObj = {}
    this.modules.forEach(module => {
      moduleObj[module.filepath] = {
        module: module.module,
        code: module.code
      }
    })

    // 生成 bundle 文件
    this.genFile(moduleObj)
  }

  parseFile(filepath) {
    // 读取文件内容
    const fileContent = fs.readFileSync(filepath, 'utf-8')

    // 借助 @babel/parser 解析文件内容，得到 ast（Abstract Syntax Tree 抽象语法树）
    const ast = parser.parse(fileContent, { sourceType: 'module' })

    // 存储文件内部依赖模块数据对象
    const module = {}

    // 借助 @babel/traverse 遍历 ast，将依赖模块数据存储到 module 中
    traverse(ast, {
      // import 引入依赖模块方式
      ImportDeclaration({ node }) {
        const moduleFilepath = node.source.value
        module[moduleFilepath] = './' + path.join(path.dirname(filepath), moduleFilepath)
      }
    })

    // 借助 @babel/core 获取 ast 中 文件源码内容
    const { code } = transformFromAst(ast, null, {
      // 使用 @babel/preset-env 处理 es6+ 语法转换
      presets: ['@babel/preset-env']
    })

    // 返回解析后的文件数据
    return {
      filepath,
      module,
      code
    }
  }

  genFile(moduleObj) {
    if (!isExistDir(this.output.path)) {
      fs.mkdirSync(this.output.path)
    }

    const filepath = path.join(this.output.path, this.output.filename)
    const fileContent = `
      (function(moduleObj) {
        // 实现 require 函数，兼容 require 导入
        function require(filepath) {
          // 获取文件 模块
          var module = moduleObj[filepath]

          // 定义 exports 对象，兼容 exports 导出
          var exports = {}

          // 实现相对文件路径导入函数
          function relativeFilepathRequire(relativeFilepath) {
            return require(module.module[relativeFilepath])
          }

          (function(require, exports, code) {
            eval(code)
          })(relativeFilepathRequire, exports, module.code)

          return exports
        }

        require('${this.entry}')
      })(${JSON.stringify(moduleObj)})
    `

    fs.writeFileSync(filepath, fileContent, 'utf-8')
  }
}

module.exports = Webpack
