
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

        require('./src/index.js')
      })({"./src/index.js":{"module":{"./a.js":"./src\\a.js","./b.js":"./src\\b.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nvar _b = require(\"./b.js\");\n\n//npx webpack\nconsole.log(\"\".concat(_a.a, \",\").concat(_b.b)); //webpack bundle\n//接收配置：要知道打包入口 打包出口\n//处理入口文件\n// 处理依赖 为了拿到依赖的路径\n// 处理内容 -》 chunk代码片段 - eval()\n// (function(){\n// })({\n//     // ./src/index.js\n//     \"./src/index.js\":{\n//     }\n// })"},"./src\\a.js":{"module":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\nvar a = 'HumorYi';\nexports.a = a;"},"./src\\b.js":{"module":{"./test.js":"./src\\test.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = void 0;\n\nvar _test = require(\"./test.js\");\n\nvar b = \"\".concat(_test.test, \" Bamboo\");\nexports.b = b;"},"./src\\test.js":{"module":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.test = void 0;\nvar test = \"test\";\nexports.test = test;"}})
    